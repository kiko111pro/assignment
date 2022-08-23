import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getDataService } from './data.service';

const initialState = {
  data: [],

  modal: {},
  loading: false,
  isError: false,
  error: null,
};

export const getData = createAsyncThunk(
  'GET_DATA',
  async (payload, thunkAPI) => {
    const res = await getDataService();
    if (res.isSuccess) return res.result;
    thunkAPI.rejectWithValue(res.result || 'Unexpected Error');
  },
);

const getDataSlice = createSlice({
  name: 'GET_DATA',
  initialState,
  reducers: {
    editData: (state, action) => {
      const index = state.data.findIndex(ele => ele.id === action.payload.id);
      state.data[index] = action.payload;
    },
    deleteData: (state, action) => {
      const index = state.data.findIndex(ele => ele.id === action.payload);
      state.data.splice(index, 1);
    },
    deleteSelected: (state, action) => {
      state.data = state.data.filter(item => !item.checked);
    },
    selectItem: (state, action) => {
      const id = action.payload;
      const index = state.data.findIndex(ele => ele.id === id);
      state.data[index].checked = !state.data[index].checked;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getData.pending, (state, _) => {
        state.loading = true;
      })
      .addCase(getData.fulfilled, (state, action) => {
        state.loading = false;
        state.isError = false;
        state.data = action.payload.map(item => ({ ...item, checked: false }));
      })
      .addCase(getData.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.error = action.payload;
      });
  },
});

export default getDataSlice.reducer;
export const { editData, deleteData, selectItem, deleteSelected } =
  getDataSlice.actions;
