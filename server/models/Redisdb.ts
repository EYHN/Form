import redis from 'redis';
import { promisify } from 'util';

export default class Redisdb {
  database: redis.RedisClient;
  constructor(unix_socket: string, options?: redis.ClientOpts) {
    this.database = redis.createClient(unix_socket, options);
  }
  get = promisify(this.database.get).bind(this.database)
  set = promisify(this.database.set).bind(this.database);
  delete = promisify(this.database.del).bind(this.database);
  exists = promisify(this.database.exists).bind(this.database);
}
