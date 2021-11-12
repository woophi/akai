import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AdminState, BlogPreviewItem, PhotoItem, SlideItem, YoutubeItem } from 'core/models';

const initialState: AdminState['lists'] = {
  blogs: [],
  photos: [],
  slides: [],
  youtubes: [],
};

const adminListsSlice = createSlice({
  name: 'admin_lists',
  initialState,
  reducers: {
    fetchBlogs: (state, a: PayloadAction<BlogPreviewItem[]>) => {
      state.blogs = a.payload;
    },
    fetchSlides: (state, a: PayloadAction<SlideItem[]>) => {
      state.slides = a.payload;
    },
    fetchPhotos: (state, a: PayloadAction<PhotoItem[]>) => {
      state.photos = a.payload;
    },
    fetchYoutubes: (state, a: PayloadAction<YoutubeItem[]>) => {
      state.youtubes = a.payload;
    },
  },
});

export const adminListsActions = adminListsSlice.actions;
export const adminListsReducer = adminListsSlice.reducer;
