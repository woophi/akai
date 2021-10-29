import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: {
  selectedVideoId: string;
  chatId: string;
} = {
  selectedVideoId: '',
  chatId: '',
};

const youtubeSlice = createSlice({
  name: 'youtube',
  initialState,
  reducers: {
    setVideoId: (state, a: PayloadAction<string>) => {
      state.selectedVideoId = a.payload;
    },
    setChatId: (state, a: PayloadAction<string>) => {
      state.chatId = a.payload;
    },
  },
});

export const youtubeActions = youtubeSlice.actions;
export const youtubeReducer = youtubeSlice.reducer;

export type YoutubeActions = PayloadAction<string>;
