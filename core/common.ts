import axios, { AxiosRequestConfig } from 'axios';
import getConfig from 'next/config';

const {publicRuntimeConfig} = getConfig();
const {SITE_URL} = publicRuntimeConfig;

export type HTTPMethod = 'get' | 'post' | 'put' | 'delete';

export const callApi = <T>(method: HTTPMethod = 'post', url: string, data: any = null, auth?: string): Promise<T> => {
  const rc: AxiosRequestConfig = {
    url: SITE_URL + url,
    headers: {
      'Accept': 'application/json'
    },
    method
  };

  if (typeof data === 'string') {
    rc.data = data;
    rc.headers['Content-Type'] = 'application/octet-stream';
  } else if (data === null) {
    data = null;
  } else {
    rc.data = JSON.stringify(data);
    rc.headers['Content-Type'] = 'application/json; charset=UTF-8';
  }

  if (auth) {
    rc.headers.Authorization = `${auth}`;
  }

  return axios(rc)
    .then(r => r.status === 204 ? null : r.data as T, f => {
      const errorData = ((f && ('response' in f) && f.response) ? f.response['data'] as any : null) || {code: null, message: null};
      return Promise.reject(errorData) as any;
    });
}

export const uploadFiles = (files: File[]) => {
  const uploads = files.map(f => {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append(f.name, f);

      const url = `${SITE_URL}/storage/upload?blogId=5ccdc0783445783634f76611`;

      const request = new XMLHttpRequest();
      request.onload = () => {
        if (request.status < 400) {
          resolve();
        } else {
          reject();
        }
      };
      request.onerror = () => {
        reject();
      };
      request.open('POST', url);
      request.send(formData);
    });
  }).filter(pr => !!pr);
  return uploads.length > 0 ? Promise.all(uploads) : Promise.resolve();
}
