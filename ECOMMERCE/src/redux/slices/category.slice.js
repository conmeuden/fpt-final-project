import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CategoryService } from "../../services/category.service";

export const getAllCategories = createAsyncThunk(
  "category/getAllCategories",
  async ({ page, limit, keyword, status }, thunkAPI) => {
    try {
      const res = await CategoryService.getAllCategories({
        page,
        limit,
        keyword,
        status,
      });
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.loading = true;
        state.error = action.payload.message;
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.data = action.payload;
      });
  },
});

export default categorySlice.reducer;
