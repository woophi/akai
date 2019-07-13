import { ROLES } from 'server/identity';

export type AuthData = {
  token: string;
  roles: ROLES;
  name: string;
  userId: string;
};
