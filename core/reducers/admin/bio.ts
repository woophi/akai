import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AdminState, BioData } from 'core/models';

const initialState: AdminState['bio'] = { bioCs: '', bioEn: '', bioRu: '', id: '', photoId: '' };

const adminBioSlice = createSlice({
  name: 'admin_bio',
  initialState,
  reducers: {
    fetchBio: (state, a: PayloadAction<BioData>) => {
      return a.payload;
    },
  },
});

export const adminBioActions = adminBioSlice.actions;
export const adminBioReducer = adminBioSlice.reducer;
