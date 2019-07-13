import { CommentItem } from './comment';
import { BlogStateModel } from './blog';
import { AuthData } from './auth';

export type AppState = {
  ui: {
    youtube: {
      selectedVideoId: string;
    };
    user: AuthData;
    blogs: BlogStateModel[];
  };
};

export type AppDispatch =
  | { type: 'SET_VIDEO_ID'; payload: string }
  | { type: 'SET_USER'; payload: AppState['ui']['user'] }
  | { type: 'SET_USER_TOKEN'; payload: AppState['ui']['user']['token'] }
  | { type: 'UPDATE_COMMENTS'; payload: { blogId: string, comments: CommentItem[] } }
  | { type: 'SET_COMMENTS'; payload: { blogId: string, comments: CommentItem[] } }
;
