import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CouponService from "../../services/coupon.service";

export const getAllCoupons = createAsyncThunk(
  "coupon/getAllCoupons",
  async ({ page, limit, keyword, status }, thunkAPI) => {
    try {
      const res = await CouponService.getAllCoupons({
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

const couponSlice = createSlice({
  name: "coupon",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCoupons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCoupons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllCoupons.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.data = action.payload;
      });
  },
});

export default couponSlice.reducer;
