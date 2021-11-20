import { callUserApi } from 'core/common';
import { NewUser, UserModel, EditUser } from 'core/models';
import { adminUserActions } from 'core/reducers/admin';
import { store } from 'core/store';

export const createNewUser = (data: NewUser) => callUserApi<void>('post', 'api/admin/new/user', data);
export const editUser = (data: EditUser) => callUserApi<void>('put', 'api/admin/user', data);
export const getUsers = () => callUserApi<UserModel[]>('get', 'api/admin/users');

export const getUser = async (id: string) => {
  try {
    const data = await callUserApi<UserModel>('get', `api/admin/user/${id}`);
    store.dispatch(adminUserActions.fetchUser(data));
    return data;
  } catch (error) {
    console.error(error);
  }
};
