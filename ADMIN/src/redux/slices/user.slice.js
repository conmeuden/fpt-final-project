import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import UserService from "./../../services/users.service";

export const getAllUsers = createAsyncThunk(
  "user/getAll",
  async ({ page, limit, keyword }, thunkAPI) => {
    try {
      const data = await UserService.getAllUsers({ page, limit, keyword });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.data = action.payload;
      });
  },
});

export default userSlice.reducer;
