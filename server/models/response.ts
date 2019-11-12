import { databaseExists, databaseGet, databaseSet } from "./database";
import { IResponse } from "@interface/Response";

export const responseExists = (id: string) => databaseExists(`response:${id}`)

export const responseGet = async (id: string) => JSON.parse(await databaseGet(`response:${id}`)) as IResponse;

export const responseCreate = async (id: string, response: IResponse) => {
  await databaseSet(`response:${id}`, JSON.stringify(response));
}

export const responseUpdate = async (id: string, response: IResponse) => {
  await databaseSet(`response:${id}`, JSON.stringify(response));
}
