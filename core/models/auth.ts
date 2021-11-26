import { ROLES } from './admin/user';

export type AuthData = {
  token: string;
  roles: ROLES[];
  name: string;
  lastName: string;
  userId: string;
  email: string;
  fetching?: boolean;
};
