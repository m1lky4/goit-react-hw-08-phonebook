import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = 'https://connections-api.herokuapp.com';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};
export const registerUserAsync = createAsyncThunk(
  'auth/registerUser',
  async (user) => {
      const { data } = await axios.post('/users/signup', user);
      token.set(data.token);
      return data;
  }
);

export const loginUserAsync = createAsyncThunk(
  'auth/loginUser',
  async (credentials) => {
    const { data } = await axios.post('/users/login', credentials);
      token.set(data.token);

      return data;
  }
);

export const logoutUserAsync = createAsyncThunk('auth/logoutUser', async () => {
  await axios.post(`${API_BASE_URL}/users/logout`);
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUserAsync.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.data.token;
        state.status = 'succeeded';
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.status = 'succeeded';
      })
      .addCase(logoutUserAsync.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.status = 'succeeded';
      })
      .addMatcher(
        (action) =>
          action.type.endsWith('/pending') ||
          action.type.endsWith('/fulfilled') ||
          action.type.endsWith('/rejected'),
        (state, action) => {
          state.status = action.meta.requestStatus;
          state.error = action.error ? action.payload.message : null;
        }
      );
  },
});

export const authSelector = (state) => state.auth;

export default authSlice.reducer;
