import * as models from 'core/models';

export const initialState = {
  youtube: {
    selectedVideoId: ''
  },
  token: ''
}

export const reducer = (state = initialState, dispatch: models.AppDispatch) => {
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

    default: {
      return state
    }
  }
}
