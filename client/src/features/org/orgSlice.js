import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/organizations/';

// Get current user's organization profile
export const getMyOrg = createAsyncThunk('org/getMyOrg', async (_, thunkAPI) => {
  try {
    const response = await axios.get(API_URL + 'my-organization', {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Create organization profile
export const createOrg = createAsyncThunk('org/createOrg', async (orgData, thunkAPI) => {
  try {
    const response = await axios.post(API_URL, orgData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Update organization profile
export const updateMyOrg = createAsyncThunk('org/updateMyOrg', async (orgData, thunkAPI) => {
  try {
    const response = await axios.put(API_URL + 'my-organization', orgData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const initialState = {
  org: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const orgSlice = createSlice({
  name: 'org',
  initialState,
  reducers: {
    resetOrgState: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    },
    clearOrg: (state) => {
      state.org = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMyOrg.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMyOrg.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.org = action.payload;
      })
      .addCase(getMyOrg.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.org = null;
      })
      .addCase(createOrg.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrg.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.org = action.payload;
      })
      .addCase(createOrg.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateMyOrg.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateMyOrg.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.org = action.payload;
      })
      .addCase(updateMyOrg.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetOrgState, clearOrg } = orgSlice.actions;
export default orgSlice.reducer;
