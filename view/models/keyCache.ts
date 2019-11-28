import { databaseGet, databaseSet, databaseDelete } from "./db";

export interface IKeyCache {
  privateKey: string;
  aesKey: string;
}

export const keyCacheGet = async (id: string) => {
  const key = await databaseGet('keyCache:' + id);
  if (key) {
    return JSON.parse(key) as IKeyCache;
  }
};

export const keyCacheSet = async (id: string, keyCache: IKeyCache) =>
  await databaseSet('keyCache:' + id, JSON.stringify(keyCache))

export const keyCacheDelete = async (id: string) => await databaseDelete('keyCache:' + id);

export const keyCacheCreate = async (id: string, privateKey: string, aesKey: string) => {
  await keyCacheSet(id, {
    privateKey,
    aesKey
  })
}

export const keyCacheUpdate = async (id: string, privateKey: string, aesKey: string) => {
  await keyCacheSet(id, {
    privateKey,
    aesKey
  })
}
