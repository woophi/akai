import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AdminState, FileItem } from 'core/models';

const initialState: AdminState['files'] = {
  list: [],
  selectedFile: null,
  uploadingFile: false,
};

const adminFilesSlice = createSlice({
  name: 'admin_files',
  initialState,
  reducers: {
    fetchFiles: (state, a: PayloadAction<FileItem[]>) => {
      state.list = a.payload;
    },
    updateFiles: (state, a: PayloadAction<FileItem>) => {
      state.list = [a.payload, ...state.list];
    },
    selectFile: (state, a: PayloadAction<FileItem>) => {
      state.selectedFile = a.payload;
    },
    deselectFile: state => {
      state.selectedFile = null;
    },
    uploadingFile: (state, a: PayloadAction<boolean>) => {
      state.uploadingFile = a.payload;
    },
  },
});

export const adminFilesActions = adminFilesSlice.actions;
export const adminFilesReducer = adminFilesSlice.reducer;
