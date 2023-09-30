import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ShopsService from "../../services/shops.service";

// Async thunk để lấy danh sách cửa hàng
export const getAllShops = createAsyncThunk(
  "shops/getAll",
  async ({ page, limit, keyword, status }, thunkAPI) => {
    try {
      const data = await ShopsService.getAllShops({
        page,
        limit,
        keyword,
        status,
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Async thunk để lấy thông tin cửa hàng theo ID
export const getShopById = createAsyncThunk(
  "shops/getById",
  async (id, thunkAPI) => {
    try {
      const data = await ShopsService.getShopById(id);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Async thunk để tạo cửa hàng mới
export const createShop = createAsyncThunk(
  "shops/create",
  async (shop, thunkAPI) => {
    try {
      const data = await ShopsService.createShop(shop);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Async thunk để cập nhật cửa hàng
export const updateShop = createAsyncThunk(
  "shops/update",
  async ({ id, shop }, thunkAPI) => {
    try {
      const data = await ShopsService.updateShop({ id, shop });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Async thunk để xóa cửa hàng
export const removeShop = createAsyncThunk(
  "shops/remove",
  async (id, thunkAPI) => {
    try {
      await ShopsService.removeShop(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const shopsSlice = createSlice({
  name: "shops",
  initialState: {
    data: null,
    loading: false,
    error: null,
    currentShop: null,
    searchData: [],
  },
  reducers: {
    searchShop: (state, action) => {
      state.searchData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // getAllShops
      .addCase(getAllShops.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllShops.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(getAllShops.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.data = action.payload;
      })

      // getShopById
      .addCase(getShopById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getShopById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(getShopById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.data = action.payload;
      })

      // createShop
      .addCase(createShop.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createShop.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(createShop.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.data.push(action.payload);
      })

      //updateShop
      .addCase(updateShop.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateShop.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(updateShop.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.data = state.data.map((shop) =>
          shop.id === action.payload.id ? action.payload : shop
        );
      })

      //removeShop
      .addCase(removeShop.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeShop.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(removeShop.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const { id } = action.payload;
        if (id) {
          state.data = state.data.filter((shop) => shop.id !== id);
        }
      });
  },
});

export const { searchShop } = shopsSlice.actions;
export default shopsSlice.reducer;
