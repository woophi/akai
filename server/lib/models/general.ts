export const enum HTTPStatus {
  OK = 200,
  Empty = 204,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  TooManyRequests = 429,
  ServerError = 500
}

export type HTTPMethod = 'get' | 'post' | 'put' | 'delete';

export type IDictionary<T> = {
  [key: string]: T
}
