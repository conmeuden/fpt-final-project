import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import PackageService from "../../services/packages.service";

// Get All Packages
export const getAllPackages = createAsyncThunk("packages/getAll", async ({ page, limit, keyword }, thunkAPI) => {
  try {
    const data = await PackageService.getAllPackages({ page, limit, keyword });
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});


// chỉ cần hàm getALl trong slice là đủ
export const getPackageById = createAsyncThunk("packages/getById", async (packageId, thunkAPI) => {
  try {
    const data = await PackageService.getPackageById(packageId);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const createPackage = createAsyncThunk("packages/create", async (pkg, thunkAPI) => {
  try {
    const data = await PackageService.createPackage(pkg);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const updatePackage = createAsyncThunk("packages/update", async ({ id, pkg }, thunkAPI) => {
  try {
    const data = await PackageService.updatePackage({ id, pkg });
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const deletePackage = createAsyncThunk("packages/delete", async (packageId, thunkAPI) => {
  try {
    await PackageService.removePackage(packageId);
    return packageId; // Returning the deleted package ID for use in the reducer
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const packageSlice = createSlice({
  name: "packages",
  initialState: {
    data: null,
    currentPackage: null,
    loading: false,
    error: null,
    
  },
  extraReducers: (builder) => {
    builder

      .addCase(getAllPackages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllPackages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(getAllPackages.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
        state.createSuccess = false;
      })

      .addCase(getPackageById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPackageById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(getPackageById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPackage = action.payload;
        state.error = null;
      })

      // Handle updatePackage
      .addCase(updatePackage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePackage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(updatePackage.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.data.findIndex((pkg) => pkg.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
        state.error = null;
      })

      
  },
});

export default packageSlice.reducer;
