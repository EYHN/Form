export default class NetworkError extends Error {
  source: Error;
  constructor(err: Error) {
    super(err.message);
    this.name = 'NetworkError';
    this.source = err;
  }
}