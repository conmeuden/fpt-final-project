/** @format */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import IndustriesService from "./../../services/industries.service";

export const getAllIndustries = createAsyncThunk(
  "industries/getAllIndustries",
  async (thunkAPI) => {
    try {
      const data = await IndustriesService.getAll();
      //   console.log("Industry Slice: ", data);
      return data.industries.rows;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getIndustryById = createAsyncThunk(
  "industries/getById",
  async (id, thunkAPI) => {
    try {
      const data = await IndustriesService.getById(id);
      console.log("by ID >> ", data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createIndustry = createAsyncThunk(
  "industries/createIndustry",
  async (industryData, thunkAPI) => {
    try {
      const data = await IndustriesService.create(industryData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateIndustry = createAsyncThunk(
  "industries/updateIndustry",
  async ({ id, industryData }, thunkAPI) => {
    try {
      const data = await IndustriesService.update(id, industryData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteIndustry = createAsyncThunk(
  "industries/deleteIndustry",
  async (id, thunkAPI) => {
    try {
      const data = await IndustriesService.delete(id);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const IndustriesSlice = createSlice({
  name: "industry",
  initialState: {
    data: [],
    loading: true,
    error: false,
    currentIndustry: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // getAll
      .addCase(getAllIndustries.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getAllIndustries.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = false;
      })
      .addCase(getAllIndustries.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })

      // getById
      .addCase(getIndustryById.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getIndustryById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.currentIndustry = action.payload;
      })
      .addCase(getIndustryById.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })

      // create
      .addCase(createIndustry.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(createIndustry.fulfilled, (state, action) => {
        console.log("Industry created:", action.payload);
        state.loading = false;
        state.error = false;
        if (state.data) {
          state.data.unshift(action.payload);
        } else {
          state.data = [{ ...action.payload }];
        }
      })
      .addCase(createIndustry.rejected, (state, action) => {
        console.error("Error creating industry:", action.error);
        state.loading = false;
        state.error = true;
      })
      // update
      .addCase(updateIndustry.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(updateIndustry.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        const industry = action.payload;
        const index = state.data.findIndex((item) => item._id === industry._id);
        if (index !== -1) {
          state.data[index] = { ...state.data[index], ...industry };
        } else {
          state.data.push(industry);
        }
      })
      .addCase(updateIndustry.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      // delete
      .addCase(deleteIndustry.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(deleteIndustry.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        const index = state.data.findIndex(
          (item) => item._id === action.payload
        );
        if (index !== -1) {
          state.data.splice(index, 1);
        }
      })
      .addCase(deleteIndustry.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default IndustriesSlice.reducer;
