import { Session } from 'express-session';
import { User } from 'server/models/types';

export interface SessionData extends Session {
  user: User;
  userId: string;
  accessToken: string;
}
