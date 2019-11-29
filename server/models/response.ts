import database from "./database";
import { IResponse } from "@interface/Response";

const db = database.namespace('response');

export function parseResponse(response: string): IResponse {
  if (response) {
    return JSON.parse(response);
  }
  return null;
}

export const responseGet = async (id: string) => parseResponse(await db.get(`response:${id}`));

export const responseCreate = async (id: string, response: IResponse) => {
  await db.set(`response:${id}`, JSON.stringify(response));
}

export const responseUpdate = async (id: string, response: IResponse) => {
  await db.set(`response:${id}`, JSON.stringify(response));
}
