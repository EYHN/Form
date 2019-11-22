import { databaseGet, databaseSet, databaseDelete } from "./db";
import { hexToArrayBuffer, arrayBufferToHex } from "@eyhn/crypto/lib/utils/hex";

export const keyCacheGet = async (id: string) => {
  const key = await databaseGet('keyCache:' + id);
  if (key) {
    return hexToArrayBuffer(key);
  }
};
export const keyCacheSet = async (id: string, value: ArrayBuffer) => await databaseSet('keyCache:' + id, arrayBufferToHex(value));
export const keyCacheDelete = async (id: string) => await databaseDelete('keyCache:' + id);