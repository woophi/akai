import { Model } from './mongoModel';
import { ROLES } from '../../identity/access/constants';

export type UserModel = {
  email: string;
  roles: ROLES[];
  password: string;
  name?: string;
  avatarUrl?: string;
  refreshToken?: string;
  resetId?: string | null;
};

export type User = Model<UserModel>;
