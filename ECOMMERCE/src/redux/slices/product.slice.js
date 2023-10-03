import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ProductService } from "../../services/product.service";

export const getAllProducts = createAsyncThunk(
  "product/getAllProducts",
  async (
    {
      page,
      limit,
      keyword,
      status,
      min_price,
      max_price,
      category_id,
      barcode,
    },
    thunkAPI
  ) => {
    try {
      const res = await ProductService.getAllProducts({
        page,
        limit,
        keyword,
        status,
        min_price,
        max_price,
        category_id,
        barcode,
      });
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.data = action.payload;
      });
  },
});

export default productSlice.reducer;
