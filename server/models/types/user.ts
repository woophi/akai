import { Model } from './mongoModel';
import { ROLES } from '../../identity/access/constants';

export type User = Model<{
  email: string;
  name: string;
  avatarUrl: string;
  roles: ROLES[];
  password: string;
  refershToken: string;
  accessToken: string;
}>;
