import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = 'https://connections-api.herokuapp.com';



export const fetchContactsAsync = createAsyncThunk(
  'phonebook/fetchContacts',
  async () => {
    const response = await axios.get(`${API_BASE_URL}/contacts`);
    return response.data;
  }
);

export const addContactAsync = createAsyncThunk(
  'phonebook/addContact',
  async (contact) => {
    const response = await axios.post(`${API_BASE_URL}/contacts`, contact);
    return response.data;
  }
);

export const deleteContactAsync = createAsyncThunk(
  'phonebook/deleteContact',
  async (contactId) => {
    await axios.delete(`${API_BASE_URL}/contacts/${contactId}`);
    return contactId;
  }
);

const phonebookSlice = createSlice({
  name: 'phonebook',
  initialState: {
    contacts: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContactsAsync.fulfilled, (state, action) => {
        state.contacts = action.payload;
        state.status = 'succeeded';
      })
      .addCase(addContactAsync.fulfilled, (state, action) => {
        state.contacts.push(action.payload);
        state.status = 'succeeded';
      })
      .addCase(deleteContactAsync.fulfilled, (state, action) => {
        state.contacts = state.contacts.filter(
          (contact) => contact.id !== action.payload
        );
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

export const contactsSelector = (state) => state.contacts;

export default phonebookSlice.reducer;