import { store } from 'core/store';
import { callApi } from 'core/common';

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
