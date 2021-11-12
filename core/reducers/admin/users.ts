import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AdminState, UserModel } from 'core/models';

const initialState: AdminState['users'] = {
  list: [],
  selectedUser: {
    _id: '',
    createdAt: '',
    email: '',
    name: '',
    roles: [],
  },
};

const adminUserSlice = createSlice({
  name: 'admin_user',
  initialState,
  reducers: {
    fetchUser: (state, a: PayloadAction<UserModel>) => {
      state.selectedUser = a.payload;
    },
  },
});

export const adminUserActions = adminUserSlice.actions;
export const adminUserReducer = adminUserSlice.reducer;
