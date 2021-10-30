import { store } from 'core/store';
import { isUserAuthorized } from 'core/selectors';
import Router from 'next/router';
import { callApi, getWindow } from 'core/common';
import * as models from 'core/models';
import { connectAdminSocket } from 'core/socket/admin';
import { userActions } from 'core/reducers/user';

export const login = (email: string, password: string) =>
  callApi<{ token: string }>('post', 'api/app/user/login', { email, password });

export const logout = async () => {
  store.dispatch(userActions.setUserFetching(true));
  await callApi<void>('post', 'api/app/user/logout');
  store.dispatch(
    userActions.setUser({
      name: '',
      roles: [],
      token: '',
      userId: '',
    })
  );
  store.dispatch(userActions.setUserFetching(false));
  const w = getWindow();
  w ? w.location.reload() : await Router.reload();
};

export const checkAuth = async () => {
  store.dispatch(userActions.setUserFetching(true));
  const data = await callApi<models.AuthData>('post', 'api/app/user/check');
  if (!data || !data.token) {
    store.dispatch(userActions.setUserFetching(false));
    return;
  }
  store.dispatch(userActions.setUser(data));
  store.dispatch(userActions.setUserFetching(false));
};

export const ensureNotAuthorized = async () => {
  await checkAuth();
  const state = store.getState();
  if (!isUserAuthorized(state)) {
    Router.push('/login');
  } else {
    connectAdminSocket();
  }
};
export const ensureAuthorized = async () => {
  await checkAuth();
  const state = store.getState();
  if (isUserAuthorized(state)) {
    connectAdminSocket();
    Router.push('/admin');
  }
};
