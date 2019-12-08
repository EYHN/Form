import compose from 'koa-compose';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import { errorsText, ApiFormNewFormSchema, ApiFormUpdateFormSchema } from '../../schemas';
import { formCreate, formUpdateTemplate, formGet } from '../../models/form';
import { IForm, IFormTemplate, IFormKey } from '@interface/Form';
import crypto from '@eyhn/crypto';
import { IApiFetchFormResponse, IApiNewFormRequest, IApiUpdateFormRequest } from '@interface/Api/Form';

const formAPI = new Router();

function buildForm(id: string, template: IFormTemplate, key: IFormKey, date: string): IForm {
  return {
    url: '/form/' + id,
    id,
    key,
    date,
    template
  };
}

function buildFormResponse(form: IForm): IApiFetchFormResponse {
  return form;
}

formAPI.use(bodyParser());

formAPI.get('/form/:id', async (ctx) => {

  const id = ctx.params.id;

  const form = await formGet(id);

  if (!form) {
    ctx.throw(404);
    return;
  }

  ctx.body = buildFormResponse(form);
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

  if (await formGet(id)) {
    ctx.throw(JSON.stringify({
      message: 'Form already exists.',
      error: true
    }), 403);
    return;
  }

  const template = body.template;
  const date = body.date;
  const form = buildForm(id, template, body.key, date);
  await formCreate(id, form);
  ctx.body = buildFormResponse(form)
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
  const form = await formGet(id);

  if (!id || !form) {
    ctx.throw(404);
    return;
  }

  const key = form.key;
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
  ctx.body = buildFormResponse({
    ...form,
    template
  });
});

export default compose([
  formAPI.routes(),
  formAPI.allowedMethods()
]);
