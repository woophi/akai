import * as models from 'core/models';

export const initialState: models.AppState['ui'] = {
  youtube: {
    selectedVideoId: ''
  },
  blogs: [],
  user: {
    name: '',
    roles: [],
    token: '',
    userId: '',
    fetching: true
  },
  admin: {
    section: models.Section.Albums,
    files: [],
    selectedFile: null,
    uploadingFile: false
  }
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
    case 'SET_USER': {
      return {
        ...state,
        user: dispatch.payload
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

    case 'SET_USER_TOKEN': {
      return {
        ...state,
        user: {
          ...state.user,
          token: dispatch.payload
        }
      };
    }
    case 'SET_USER_FETCHING': {
      return {
        ...state,
        user: {
          ...state.user,
          fetching: dispatch.payload
        }
      };
    }
    case 'FETCH_FILES': {
      return {
        ...state,
        admin: {
          ...state.admin,
          files: dispatch.payload
        }
      };
    }
    case 'UPDATE_FILES': {
      return {
        ...state,
        admin: {
          ...state.admin,
          files: [ dispatch.payload, ...state.admin.files ]
        }
      };
    }
    case 'SELECT_FILE': {
      return {
        ...state,
        admin: {
          ...state.admin,
          selectedFile: dispatch.payload
        }
      };
    }
    case 'UPLOADING_FILE': {
      return {
        ...state,
        admin: {
          ...state.admin,
          uploadingFile: dispatch.payload
        }
      };
    }

    default: {
      return state
    }
  }
}
