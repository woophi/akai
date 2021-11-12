import { combineReducers } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { adminBioReducer } from './admin/bio';
import { adminFilesReducer } from './admin/files';
import { adminListsReducer } from './admin/lists';
import { adminUserReducer } from './admin/users';
import { BlogsActions, blogsReducer } from './blogs';
import { UserActions, userReducer } from './user';
import { YoutubeActions, youtubeReducer } from './youtube';

const uiReducer = combineReducers({
  youtube: youtubeReducer,
  blogs: blogsReducer,
  user: userReducer,
  admin: combineReducers({
    user: adminUserReducer,
    bio: adminBioReducer,
    files: adminFilesReducer,
    lists: adminListsReducer,
  }),
});

export const rootReducer = combineReducers({
  ui: uiReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
export type AllActions = YoutubeActions | BlogsActions | UserActions;

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
