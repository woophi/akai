import thunk from 'redux-thunk';
import {
  applyMiddleware,
  combineReducers,
  createStore,
  Reducer,
  ReducersMapObject,
  Store
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { initialState, reducer as count } from 'core/reducers';
import { AppState, AppDispatch } from 'core/models';

const middleware = applyMiddleware(thunk);

const rootReducerMap: ReducersMapObject<AppState, AppDispatch> = {
  ui: count
};

let asyncReducers: any = {};

function updateRootReducer() {
  store.replaceReducer(
    combineReducers({
      ...rootReducerMap,
      ...asyncReducers
    })
  );
}

export function injectReducer<T>(name: string, reducer: Reducer<T>) {
  asyncReducers[name] = reducer;
  updateRootReducer();
  return store;
}

export function injectReducers(reducers: ReducersMapObject) {
  asyncReducers = {
    ...asyncReducers,
    ...reducers
  };
  updateRootReducer();
  return store;
}

export let store: Store<AppState, AppDispatch> = createStore(
  combineReducers(rootReducerMap),
  composeWithDevTools(middleware)
);

export const initStore = (
  initState = { ui: initialState }
): Store<AppState, AppDispatch> => {
  return (store = createStore(
    combineReducers(rootReducerMap),
    initState,
    composeWithDevTools(middleware)
  ));
};
