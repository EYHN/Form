export default class Memorydb {
  constructor(public data: Record<string, string> = {}) {}
  get = async (key: string) => {
    return Reflect.get(this.data, key);
  }
  set = async (key: string, value: string) => {
    Reflect.set(this.data, key, value);
    console.log('[SET] ' + JSON.stringify(key) + ' : ' + JSON.stringify(value));
    return true
  }
  delete = async (key: string) => {
    return Reflect.deleteProperty(this.data, key);
  }
}
