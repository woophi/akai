import * as models from 'core/models';

export const initialState: models.AppState['ui'] = {
  youtube: {
    selectedVideoId: ''
  },
  token: '',
  comments: []
}

export const reducer = (state = initialState, dispatch: models.AppDispatch): models.AppState['ui'] => {
  switch (dispatch.type) {
    case 'SET_VIDEO_ID': {
      return {
        ...state,
        youtube: {
          selectedVideoId: dispatch.payload
        }
      };
    }
    case 'SET_TOKEN': {
      return {
        ...state,
        token: dispatch.payload
      };
    }
    case 'UPDATE_COMMENTS': {
      return {
        ...state,
        comments: dispatch.payload
      };
    }

    default: {
      return state
    }
  }
}
