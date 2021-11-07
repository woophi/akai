import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  AdminState,
  BioData,
  BlogPreviewItem,
  FileItem,
  PhotoItem,
  Section,
  SlideItem,
  UserModel,
  YoutubeItem,
} from 'core/models';

const initialState: AdminState = {
  section: Section.Albums,
  files: [],
  selectedFile: null,
  uploadingFile: false,
  blogs: [],
  slides: [],
  bio: {
    bioCs: '',
    bioEn: '',
    bioRu: '',
    id: '',
    photoId: '',
  },
  photos: [],
  youtubes: [],
  facebookActive: false,
  users: {
    list: [],
    selectedUser: {
      _id: '',
      createdAt: '',
      email: '',
      name: '',
      roles: [],
    },
  },
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    fetchFiles: (state, a: PayloadAction<FileItem[]>) => {
      state.files = a.payload;
    },
    updateFiles: (state, a: PayloadAction<FileItem>) => {
      state.files = [a.payload, ...state.files];
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
    fetchBlogs: (state, a: PayloadAction<BlogPreviewItem[]>) => {
      state.blogs = a.payload;
    },
    fetchSlides: (state, a: PayloadAction<SlideItem[]>) => {
      state.slides = a.payload;
    },
    fetchBio: (state, a: PayloadAction<BioData>) => {
      state.bio = a.payload;
    },
    fetchPhotos: (state, a: PayloadAction<PhotoItem[]>) => {
      state.photos = a.payload;
    },
    fetchYoutubes: (state, a: PayloadAction<YoutubeItem[]>) => {
      state.youtubes = a.payload;
    },
    fetchUser: (state, a: PayloadAction<UserModel>) => {
      state.users.selectedUser = a.payload;
    },
  },
});

export const adminActions = adminSlice.actions;
export const adminReducer = adminSlice.reducer;

export type AdminActions = PayloadAction<boolean> | PayloadAction<FileItem>;
