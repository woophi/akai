import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CommentItem } from 'core/models';

const initialState: Record<string, CommentItem[]> = {};

type UpdateBlogs = { blogId: string; comments: CommentItem[] };

const blogsSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setComments: (state, a: PayloadAction<UpdateBlogs>) => {
      if (!state[a.payload.blogId]) {
        state[a.payload.blogId] = [];
      }
      state[a.payload.blogId] = a.payload.comments;
    },
  },
});

export const blogsActions = blogsSlice.actions;
export const blogsReducer = blogsSlice.reducer;

export type BlogsActions = PayloadAction<UpdateBlogs>;
