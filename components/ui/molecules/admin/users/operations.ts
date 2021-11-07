import { callAdminApi } from 'core/common';
import { NewUser, UserModel, EditUser } from 'core/models';
import { adminActions } from 'core/reducers/admin';
import { store } from 'core/store';

export const createNewUser = (data: NewUser) => callAdminApi<void>('post', 'api/admin/new/user', data);
export const editUser = (data: EditUser) => callAdminApi<void>('put', 'api/admin/user', data);
export const getUsers = () => callAdminApi<UserModel[]>('get', 'api/admin/users');

export const getUser = async (id: string) => {
  try {
    const data = await callAdminApi<UserModel>('get', `api/admin/user/${id}`);
    store.dispatch(adminActions.fetchUser(data));
    return data;
  } catch (error) {
    console.error(error);
  }
};
