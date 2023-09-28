/** @format */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AuthService } from "../../services/auth.service";

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password, navigate }, thunkAPI) => {
    try {
      const data = await AuthService.login(email, password);
      localStorage.setItem("access_token", data.access_token);
      navigate("/dashboard");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const refresh = createAsyncThunk(
  "auth/refresh",
  async ({ navigate }, thunkAPI) => {
    try {
      const data = await AuthService.refresh();

      localStorage.setItem("access_token", data.access_token);

      navigate(window.location.pathname);
      return data;
    } catch (error) {
      navigate("/login");
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: "authentication",
  initialState: {
    isAuthentication: false,
    user: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.isAuthentication = true;
      state.user = action.payload;
    });
    builder.addCase(refresh.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(refresh.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    builder.addCase(refresh.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.isAuthentication = true;
      state.user = action.payload;
    });
  },
});

export default authSlice.reducer;
