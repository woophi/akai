import { store } from 'core/store';
import { callApi } from 'core/common';
import Router from 'next/router';
import * as models from 'core/models';

export const login = async (email: string, password: string) => {
  const { token } = await callApi<{token: string}>('post', 'api/app/user/login', {email, password});
  store.dispatch({ type: 'SET_TOKEN', payload: token });
  return token;
}

export const logout = async () => {
  await callApi<void>('post', 'api/app/user/logout');
}

export const checkAuth = async () => {
  const data = await callApi<{token: string, redirect: boolean}>('post', 'api/app/user/check');
  if (!data || (!data.token && !data.redirect)) {
    return;
  }
  if (data.redirect) {
    Router.push('/login');
  }
  store.dispatch({ type: 'SET_TOKEN', payload: data.token });
}

export const subscribe = (email: string) =>
  callApi<models.ResultSubscribe>('post', 'api/guest/subscribe', { email });

export const saveBio = (data: models.SaveBioModel) =>
  callApi<void>('post', 'api/admin/save/biography', data, store.getState().ui.token);
export const getBio = (localeId: models.LocaleIds) =>
  callApi<models.BioModel>('get', `api/guest/biography?localeId=${localeId}`);

export const sendMessage = (data: models.MessageModel) =>
  callApi<void>('post', `api/guest/send/message`, data);

export const getYoutubes = () =>
  callApi<models.YoutubeItem[]>('get', `api/guest/youtubes`);
export const getPhotos = () =>
  callApi<models.PhotoData[]>('get', `api/guest/photos`);
export const getAllAlbums = (localeId: models.LocaleIds) =>
  callApi<models.AlbumModel[]>('get', `api/guest/albums?localeId=${localeId}`);

export const getAlbumData = (albumId: string, localeId: models.LocaleIds) =>
  callApi<models.BlogsModel>('get', `api/guest/album?id=${albumId}&localeId=${localeId}`);

export const getBlogData = (blogId: string, localeId: models.LocaleIds) =>
  callApi<models.BlogModel>('get', `api/guest/blog?id=${blogId}&localeId=${localeId}`);
