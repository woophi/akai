import { store } from 'core/store';
import { isUserAutorized } from 'core/selectors';
import Router from 'next/router';
import { callApi, getWindow } from 'core/common';
import * as models from 'core/models';

export const login = async (email: string, password: string) => {
  return await callApi<{token: string}>('post', 'api/app/user/login', {email, password});
}

export const logout = async () => {
  store.dispatch({ type: 'SET_USER_FETCHING', payload: true });
  await callApi<void>('post', 'api/app/user/logout');
  store.dispatch({
    type: 'SET_USER',
    payload: {
      name: '',
      roles: null,
      token: '',
      userId: ''
    }
  });
  store.dispatch({ type: 'SET_USER_FETCHING', payload: false });
  const w = getWindow();
  w ? w.location.reload() : await Router.reload(Router.route);
}

export const checkAuth = async () => {
  store.dispatch({ type: 'SET_USER_FETCHING', payload: true });
  const data = await callApi<models.AuthData>('post', 'api/app/user/check');
  if (!data || !data.token) {
    store.dispatch({ type: 'SET_USER_FETCHING', payload: false });
    return;
  }
  store.dispatch({ type: 'SET_USER', payload: data });
  store.dispatch({ type: 'SET_USER_FETCHING', payload: false });
}

export const ensureNotAuthorized = async () => {
  await checkAuth();
  const state = store.getState();
  if (!isUserAutorized(state)) {
    Router.push('/login');
  }
};
export const ensureAuthorized = async () => {
  await checkAuth();
  const state = store.getState();
  if (isUserAutorized(state)) {
    Router.push('/admin');
  }
};
