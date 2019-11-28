import { databaseGet, databaseSet } from "./database";
import { IResponse } from "@interface/Response";

export function parseResponse(response: string): IResponse {
  if (response) {
    return JSON.parse(response);
  }
  return null;
}

export const responseGet = async (id: string) => parseResponse(await databaseGet(`response:${id}`));

export const responseCreate = async (id: string, response: IResponse) => {
  await databaseSet(`response:${id}`, JSON.stringify(response));
}

export const responseUpdate = async (id: string, response: IResponse) => {
  await databaseSet(`response:${id}`, JSON.stringify(response));
}
