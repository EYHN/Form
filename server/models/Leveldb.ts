import levelup, { LevelUp } from 'levelup';
import leveldown from 'leveldown';

export default class Leveldb {
  database: LevelUp;
  constructor(dirname: string) {
    this.database = levelup(leveldown(dirname))
  }
  get = async (key: string) => {
    const buffer = await this.database.get(key);
    if (buffer instanceof Buffer) {
      return buffer.toString();
    }
    return buffer;
  };
  set = (key: string, value: string) => this.database.put(key, value);
  delete = (key: string) => this.database.del(key);
}
