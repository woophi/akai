import { Session } from 'express-session';
import { User } from 'server/models/types';

export interface SessionData extends Session {
  user: User;
  userId: string;
  accessToken: string;
}

export const getSessionData = <T>(session: T) => session as unknown as SessionData;
