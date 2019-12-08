import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import { formGetResponses, formPushResponse, formGet } from "../../models/form";
import { responseGet, responseCreate } from "../../models/response";
import { ApiResponseNewResponseSchema, errorsText } from '../../schemas';
import { IApiNewResponseRequest } from "@interface/Api/Response";
import crypto from '@eyhn/crypto';
import compose from "koa-compose";

const responseAPI = new Router();

responseAPI.use(bodyParser());

responseAPI.get('/form/:id/responses', async (ctx) => {

  const id = ctx.params.id;

  if (!await formGet(id)) {
    ctx.throw(404);
    return;
  }

  const responseIds = await formGetResponses(id);

  const responses = await Promise.all(responseIds.map(id => responseGet(id)));

  ctx.body = {
    responses: responses
  };
});

responseAPI.post('/form/:id/responses', async (ctx) => {

  const id = ctx.params.id;

  if (!await formGet(id)) {
    ctx.throw(404);
    return;
  }

  const body: IApiNewResponseRequest = ctx.request.body;

  if (!ApiResponseNewResponseSchema(body)) {
    ctx.throw(400, JSON.stringify({
      message: errorsText(ApiResponseNewResponseSchema.errors),
      error: true
    }));
    return;
  }

  let responseId;

  do {
    responseId = crypto.tools.arrayBufferToHex(crypto.prng()(new Uint8Array(32)));
  } while (await responseGet(responseId));

  await responseCreate(responseId, {
    id: responseId,
    formId: id,
    date: body.date,
    template: body.template,
    encryptedData: body.encryptedData,
    key: body.key
  })

  await formPushResponse(id, responseId);

  ctx.body = {};
});

export default compose([
  responseAPI.routes(),
  responseAPI.allowedMethods()
]);
