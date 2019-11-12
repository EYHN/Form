import compose from 'koa-compose';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import { errorsText, ApiFormNewFormSchema, ApiFormUpdateFormSchema } from '../../schemas';
import { formExists, formCreate, formGetDate, formGetTemplate, formUpdateTemplate, formGetKey } from '../../models/form';
import { IFormTemplate, IFormKey } from '@interface/Form';
import crypto from '@eyhn/crypto';
import { IApiFetchFormResponse, IApiNewFormRequest, IApiUpdateFormRequest } from '@interface/Api/Form';

const formAPI = new Router();

function buildFormResponse(id: string, template: IFormTemplate, key: IFormKey, date: string): IApiFetchFormResponse {
  return {
    url: 'http://theform.app/form/' + id,
    id,
    key,
    date,
    template
  }
}

formAPI.use(bodyParser());

formAPI.get('/form/:id', async (ctx) => {

  const id = ctx.params.id;

  if (!await formExists(id)) {
    ctx.throw(404);
    return;
  }

  const [date, template, key] = await Promise.all([
    formGetDate(id),
    formGetTemplate(id),
    formGetKey(id)
  ]);

  ctx.body = buildFormResponse(id, template, key, date);
});

formAPI.post('/form', async (ctx) => {
  const body: IApiNewFormRequest = ctx.request.body;

  if (!ApiFormNewFormSchema(body)) {
    ctx.throw(400, JSON.stringify({
      message: errorsText(ApiFormNewFormSchema.errors),
      error: true
    }));
    return;
  }

  const publicKey = body.key.publicKey;

  const id = crypto.tools.arrayBufferToHex(
    crypto.hash.sha256(crypto.tools.hexToArrayBuffer(publicKey))
  );

  const signature = ctx.request.header['x-signature'] || '';
  if (signature.length !== 256 &&
    !crypto.rsa.verify(
      crypto.tools.textToArrayBuffer(ctx.request.rawBody),
      crypto.tools.hexToArrayBuffer(signature),
      crypto.tools.hexToArrayBuffer(publicKey),
      10001
    )) {
    ctx.throw(403, JSON.stringify({
      message: 'signature error.',
      error: true
    }));
    return;
  }

  if (await formExists(id)) {
    ctx.throw(JSON.stringify({
      message: 'Form already exists.',
      error: true
    }), 403);
    return;
  }

  const template = body.template;
  const date = body.date;
  await formCreate(id, template, body.key, date);
  ctx.body = buildFormResponse(id, template, body.key, date)
});

formAPI.post('/form/:id', async (ctx) => {
  const body: IApiUpdateFormRequest = ctx.request.body;

  if (!ApiFormUpdateFormSchema(body)) {
    ctx.throw(JSON.stringify({
      message: errorsText(ApiFormUpdateFormSchema.errors),
      error: true
    }), 400);
    return;
  }

  const id = ctx.params.id;

  if (!id || !await formExists(id)) {
    ctx.throw(404);
    return;
  }

  const key = await formGetKey(id);
  const signature = ctx.request.header['x-signature'] || '';
  
  if (signature.length !== 256 &&
    !crypto.rsa.verify(
      crypto.tools.textToArrayBuffer(ctx.request.rawBody),
      crypto.tools.hexToArrayBuffer(signature),
      crypto.tools.hexToArrayBuffer(key.publicKey),
      10001
    )) {
    ctx.throw(JSON.stringify({
      message: 'Unauthorized',
      error: true
    }), 401);
    return;
  }

  const template = body.template;

  await formUpdateTemplate(id, template);

  const date = await formGetDate(id);
  ctx.body = buildFormResponse(id, template, key, date);
});

export default compose([
  formAPI.routes(),
  formAPI.allowedMethods()
]);
