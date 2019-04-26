import * as models from 'core/models';

export const initialState = {
  lastUpdate: 0,
  light: false,
  count: 0
}

export const reducer = (state = initialState, dispatch: models.AppDispatch) => {
  switch (dispatch.type) {
    case 'TICK': {
      return {
        ...state,
        lastUpdate: dispatch.payload
      };
    }

    case 'ADD': {
      return {
        ...state,
        count: state.count + 1
      };
    }

    default: {
      return state
    }
  }
}