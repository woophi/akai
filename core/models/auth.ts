import { ROLES } from './admin/user';

export type AuthData = {
  token: string;
  roles: ROLES[];
  name: string;
  userId: string;
  email: string;
  fetching?: boolean;
};
