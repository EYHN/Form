import { databaseGet, databaseSet } from "./db";
import { IForm } from "@interface/Form";

export interface IFormCache {
  [id: string]: {
    form: IForm;
    updateTime: string;
  }
}

const formCacheGet = async () => {
  const form = await databaseGet('formCache');
  if (form) {
    return JSON.parse(form) as IFormCache;
  }
};

const formCacheSet = async (value: IFormCache) => await databaseSet('formCache', JSON.stringify(value));

export const pushFormCache = async (id: string, form: IForm, updateTime: string) => {
  const old = await formCacheGet();
  await formCacheSet({
    ...old,
    [id]: {
      form,
      updateTime
    }
  });
}

export const updateFormCache = async (id: string, form: IForm, updateTime: string) => {
  const old = await formCacheGet();
  await formCacheSet({
    ...old,
    [id]: {
      form,
      updateTime
    }
  });
}

export const deleteFormCache = async (id: string) => {
  const old = await formCacheGet();
  delete old[id];
  await formCacheSet(old);
}

export const readCacheGet = async (id: string) => {
  const cache = await formCacheGet();
  if (cache) {
    return cache[id];
  }
}

export const readAllFormCache = async () => {
  return await formCacheGet();
}
