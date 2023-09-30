import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// export const login = createAsyncThunk(
//   "auth/login",
//   async ( thunkAPI) => {
//     try {

//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

const productSlice = createSlice({
  name: "product",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {},
});

export default productSlice.reducer;
