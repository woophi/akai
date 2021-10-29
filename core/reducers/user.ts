import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { updateProps } from 'core/lib';
import { AuthData } from 'core/models';

const initialState: AuthData = {
  name: '',
  roles: [],
  token: '',
  userId: '',
  fetching: true,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, a: PayloadAction<AuthData>) => {
      updateProps(state, a.payload);
    },
    setUserToken: (state, a: PayloadAction<string>) => {
      state.token = a.payload;
    },
    setUserFetching: (state, a: PayloadAction<boolean>) => {
      state.fetching = a.payload;
    },
  },
});

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;

export type UserActions = PayloadAction<string> | PayloadAction<boolean> | PayloadAction<AuthData>;
