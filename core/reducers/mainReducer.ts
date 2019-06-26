import * as models from 'core/models';

export const initialState: models.AppState['ui'] = {
  youtube: {
    selectedVideoId: ''
  },
  token: '',
  blogs: []
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
    case 'SET_COMMENTS': {
      return {
        ...state,
        blogs: [...state.blogs, {
          comments: dispatch.payload.comments,
          id: dispatch.payload.blogId
        } ]
      };
    }
    case 'UPDATE_COMMENTS': {
      const blogs = state.blogs.map(b => b.id === dispatch.payload.blogId ? ({
        ...b,
        comments: dispatch.payload.comments
      }) : b);
      return {
        ...state,
        blogs
      };
    }

    default: {
      return state
    }
  }
}
