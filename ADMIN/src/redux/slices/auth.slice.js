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
      console.log(data);
      localStorage.setItem("access_token", data.access_token);

      navigate("/dashboard");
      return data;
    } catch (error) {
      navigate("/login");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "authentication",
  initialState: {
    isAuthentication: false,
    user: null,
    loading: false,
    error: false,
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(login.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
      state.isAuthentication = true;
      state.user = action.payload;
    });
    builder.addCase(refresh.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(refresh.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
    builder.addCase(refresh.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
      state.isAuthentication = true;
      state.user = action.payload;
    });
  },
});

export default authSlice.reducer;
