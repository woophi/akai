export enum HTTPStatus {
  OK = 200,
  Empty = 204,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  NotAllowed = 405,
  Conflict = 409,
  TooManyRequests = 429,
  ServerError = 500
}

export type HTTPMethod = 'get' | 'post' | 'put' | 'delete';

export type IDictionary<T> = {
  [key: string]: T
}

export enum LocalErros {
  CORS = 'Not allowed by CORS'
} 