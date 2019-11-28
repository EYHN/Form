import levelup, { LevelUp } from 'levelup';
import leveldown from 'leveldown';

export default class Leveldb {
  database: LevelUp;
  constructor(dirname: string) {
    this.database = levelup(leveldown(dirname))
  }
  get = async (key: string) => {
    try {
      const buffer = await this.database.get(key);
      if (buffer instanceof Buffer) {
        return buffer.toString();
      }
      return buffer;
    } catch (err) {
      if (err instanceof Error && err.name === "NotFoundError") {
        return null;
      }
      throw err;
    }
    
  };
  set = (key: string, value: string) => this.database.put(key, value);
  delete = (key: string) => this.database.del(key);
}
