export default class ApiError extends Error {
  status: number;
  constructor(
    public response: Response) {
    super(response.status + ' ' + response.statusText);
    this.name = 'ApiError';
    this.status = response.status;
  }
}