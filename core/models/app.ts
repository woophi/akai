import { CommentItem } from './comment';
import { BlogStateModel } from './blog';

export type AppState = {
  ui: {
    youtube: {
      selectedVideoId: string;
    };
    token: string;
    blogs: BlogStateModel[];
  };
};

export type AppDispatch =
  | { type: 'SET_VIDEO_ID'; payload: string }
  | { type: 'SET_TOKEN'; payload: string }
  | { type: 'UPDATE_COMMENTS'; payload: { blogId: string, comments: CommentItem[] } }
  | { type: 'SET_COMMENTS'; payload: { blogId: string, comments: CommentItem[] } }
;
