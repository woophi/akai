export type HTTPMethod = 'get' | 'post' | 'put' | 'delete';

export type IDictionary<T> = {
  [key: string]: T
}

export const enum HTTPStatus {
  OK = 200,
  BadRequest = 400,
  ServerError = 500
}

export type Page = {
  id: number;
  name: string;
  accessToken: string;
}
