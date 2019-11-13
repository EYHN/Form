import Redisdb from "./Redisdb";
import Memorydb from "./Memorydb";
import Leveldb from "./Leveldb";


let database: Redisdb | Memorydb | Leveldb;

if (process.env.USE_MEMORYDB || process.env.NODE_ENV === 'development') {
  database = new Memorydb(require('./developmentDB.json'))
} else {
  database = new Leveldb(process.env.DATABASE || './db')
}

export default database;
export const databaseGet = database.get as (key: string) => Promise<string>;
export const databaseSet = database.set as (key: string, value: string) => Promise<boolean>;
export const databaseDelete = database.delete as (key: string) => Promise<boolean>;
export const databaseExists = database.exists as (key: string) => Promise<boolean>;