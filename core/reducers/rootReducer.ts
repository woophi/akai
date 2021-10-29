import { combineReducers } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { AdminActions, adminReducer } from './admin';
import { BlogsActions, blogsReducer } from './blogs';
import { UserActions, userReducer } from './user';
import { YoutubeActions, youtubeReducer } from './youtube';

const uiReducer = combineReducers({
  youtube: youtubeReducer,
  blogs: blogsReducer,
  user: userReducer,
  admin: adminReducer,
});

export const rootReducer = combineReducers({
  ui: uiReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
export type AllActions = YoutubeActions | BlogsActions | UserActions | AdminActions;

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
