import { CommentItem } from "./comment";

export type AppState = {
  ui: {
    youtube: {
      selectedVideoId: string
    },
    token: string,
    comments: CommentItem[]
  }
};

export type AppDispatch =
| { type: 'SET_VIDEO_ID'; payload: string }
| { type: 'SET_TOKEN'; payload: string }
| { type: 'UPDATE_COMMENTS', payload: CommentItem[] }
;
