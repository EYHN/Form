import Keyv from 'keyv';

export class Database {
  url: string;
  options: Keyv.Options<any>;
  database: Keyv;
  constructor(url?: string, options?: Keyv.Options<any>) {
    this.url = url;
    this.options = options;
    this.database = new Keyv(url, options);
  }
  get = (key: string) => this.database.get(key);
  set = (key: string, value: string, ttl?: number) => this.database.set(key, value, ttl);
  delete = (key: string) => this.database.delete(key);
  namespace = (namespace: string) => new Database(this.url, {...this.options, namespace});
}

const db = new Database(process.env.DATABASE_URL);

export default db;