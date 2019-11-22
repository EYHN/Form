export const databaseGet = async (key: string) => localStorage.getItem(key);
export const databaseSet = async (key: string, value: string) => localStorage.setItem(key, value);
export const databaseDelete = async (key: string) => localStorage.removeItem(key);