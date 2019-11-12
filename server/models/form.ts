import { databaseExists, databaseGet, databaseSet } from "./database";
import { IFormTemplate, IFormKey } from "@interface/Form";

function parseResponses(responses: string): string[] {
  return responses ? responses.split(',') : [];
}

function stringifyResponses(responses: string[]): string {
  return responses.join(',');
}

export const formExists = (id: string) => databaseExists(`form:${id}`)

export const formGetTemplate = async (id: string) => JSON.parse(await databaseGet(`form:${id}`)) as IFormTemplate;
export const formGetKey = async (id: string) => JSON.parse(await databaseGet(`form:key:${id}`)) as IFormKey;
export const formGetDate = (id: string) => databaseGet(`form:date:${id}`);
export const formGetResponses = async (id: string) => parseResponses(await databaseGet(`form:responses:${id}`));

export const formCreate = async (id: string, template: IFormTemplate, key: IFormKey, date: string) => {
  await databaseSet(`form:${id}`, JSON.stringify(template));
  await databaseSet(`form:key:${id}`, JSON.stringify(key));
  await databaseSet(`form:date:${id}`, date);
  await databaseSet(`form:responses:${id}`, '');
}

export const formUpdateTemplate = async (id: string, template: IFormTemplate) => {
  await databaseSet(`form:${id}`, JSON.stringify(template));
}

export const formPushResponse = async (id: string, responseId: string) => {
  const responses = await formGetResponses(id);
  responses.push(responseId);
  await databaseSet(`form:responses:${id}`, stringifyResponses(responses));
}