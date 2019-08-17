import { callAdminApi } from 'core/common';
import { NewUser } from 'core/models';

export const createNewUser = (data: NewUser) =>
  callAdminApi<void>('post', 'api/admin/new/user', data);
