import { CommentItem } from './comment';
import { BlogStateModel } from './blog';
import { AuthData } from './auth';
import { AdminState } from './admin';

export type AppState = {
  ui: {
    youtube: {
      selectedVideoId: string;
    };
    user: AuthData;
    blogs: BlogStateModel[];
    admin: AdminState
  };
};

export type AppDispatch =
  | { type: 'SET_VIDEO_ID'; payload: string }
  | { type: 'SET_USER'; payload: AppState['ui']['user'] }
  | { type: 'SET_USER_TOKEN'; payload: AppState['ui']['user']['token'] }
  | { type: 'SET_USER_FETCHING'; payload: AppState['ui']['user']['fetching'] }
  | { type: 'UPDATE_COMMENTS'; payload: { blogId: string, comments: CommentItem[] } }
  | { type: 'SET_COMMENTS'; payload: { blogId: string, comments: CommentItem[] } }
;
