import { databaseGet, databaseSet } from "./database";
import { IFormTemplate, IForm } from "@interface/Form";

function parseResponses(responses: string): string[] {
  return responses ? responses.split(',') : [];
}

function parseForm(form: string): IForm {
  return form ? JSON.parse(form) : null;
}

function stringifyResponses(responses: string[]): string {
  return responses.join(',');
}

export const formGet = async (id: string) => parseForm(await databaseGet(`form:${id}`));
export const formSet = async (id: string, form: IForm) => await databaseSet(`form:${id}`, JSON.stringify(form));
export const formGetResponses = async (id: string) => parseResponses(await databaseGet(`form:responses:${id}`));
export const formSetResponses = async (id: string, responses: string[]) => await databaseSet(`form:responses:${id}`, stringifyResponses(responses));

export const formCreate = async (id: string, form: IForm) => {
  await formSet(id, form);
  await formSetResponses(id, []);
}

export const formUpdateTemplate = async (id: string, template: IFormTemplate) => {
  const form = await formGet(id);
  await formSet(id, {...form,template});
}

export const formPushResponse = async (id: string, responseId: string) => {
  const responses = await formGetResponses(id);
  responses.push(responseId);
  await formSetResponses(id, responses);
}
