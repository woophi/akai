import { configureStore } from '@reduxjs/toolkit';
import { reducer as uiReducer } from 'core/reducers';
import { createWrapper } from 'next-redux-wrapper';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
  },
  devTools: true,
});

const makeStore = () => store;

export type AppStore = ReturnType<typeof makeStore>;

export const wrapper = createWrapper<AppStore>(makeStore);
