export type AppState = {
  ui: {
    youtube: {
      selectedVideoId: string
    },
    token: string
  }
};

export type AppDispatch =
| { type: 'SET_VIDEO_ID'; payload: string }
| { type: 'SET_TOKEN'; payload: string }
;
