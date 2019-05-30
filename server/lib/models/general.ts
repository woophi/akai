export const enum HTTPStatus {
  OK = 200,
  BadRequest = 400,
  ServerError = 500,
  TooManyRequests = 429
}

export type HTTPMethod = 'get' | 'post' | 'put' | 'delete';

export type IDictionary<T> = {
  [key: string]: T
}
