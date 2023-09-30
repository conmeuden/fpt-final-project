

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import BlogService from "../../services/blog.service";


export const getAllBlogs = createAsyncThunk(
  "blog/getAll",
  async ({ page, limit, keyword }, thunkAPI) => {
    try {
      const data = await BlogService.getAllBlogs({
        page,
        limit,
        keyword
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(getAllBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(getAllBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.data = action.payload;
      })
  },
});

export default blogSlice.reducer;
