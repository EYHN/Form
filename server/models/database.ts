import Redisdb from "./Redisdb";
import Memorydb from "./Memorydb";


let database: Redisdb | Memorydb;

if (process.env.USE_MEMORYDB || process.env.NODE_ENV === 'development') {
  database = new Memorydb(require('./developmentDB.json'))
} else {
  database = new Redisdb(process.env.REDIS_URL)
}

export default database;
export const databaseGet = database.get as (key: string) => Promise<string>;
export const databaseSet = database.set as (key: string, value: string) => Promise<boolean>;
export const databaseDelete = database.delete as (key: string) => Promise<boolean>;
export const databaseExists = database.exists as (key: string) => Promise<boolean>;