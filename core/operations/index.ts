import { store } from 'core/store';
import { callApi } from 'core/common';
import Router from 'next/router';

export const login = async (email: string, password: string) => {
  const { token } = await callApi<{token: string}>('post', 'api/app/user/login', {email, password});
  store.dispatch({ type: 'SET_TOKEN', payload: token });
  return token;
}

export const createBlog = async (data: { body: string; title: string }) => {
  const token = store.getState().ui.token;
  const { id } = await callApi<{id: string}>('post', 'api/admin/new/blog', data, token);
  return id;
}

export const checkAuth = async () => {
  const data = await callApi<{token: string, redirect: boolean}>('post', 'api/app/user/check');
  if (!data || data.token) {
    return;
  }
  if (data.redirect) {
    Router.push('/login');
  }
  store.dispatch({ type: 'SET_TOKEN', payload: data.token });
}
