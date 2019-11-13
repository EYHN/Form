import levelup, { LevelUp } from 'levelup';
import leveldown from 'leveldown';

function exists(db: LevelUp, key: string) {
  if (typeof db == 'undefined') throw new Error('database required');
  if (typeof key == 'undefined') throw new Error('key required');

  return new Promise<boolean>((resolve, reject) => {
    db.createKeyStream({
      start: key,
      end: key
    })
    .on('data', function() {
      resolve(true);
    })
    .on('error', function(err) {
      reject(err);
    })
    .on('end', function() {
      resolve(false);
    });
  });
}

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
  exists = (key: string) => exists(this.database, key);
}
