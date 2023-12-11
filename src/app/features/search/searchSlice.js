import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const CHARACTER_URL = 'https://esi.evetech.net/latest/characters'



const initialState = {
    search: null,

    status: 'idle',
    error: null
    
}

export const fetchData = createAsyncThunk('search/fetchData', async (searchTerm) => {
  try {
    const response = await axios.post(
      'https://esi.evetech.net/latest/universe/ids/?datasource=tranquility&language=en',
      [searchTerm], // Assuming searchTerm is a string
      {
        headers: {
          'Content-Type': 'text/plain',
        },
      }
    );

    // Assuming the response has a 'data' property, modify it accordingly
    return response.data;
  } catch (error) {
    // Handle errors as needed
    console.error('Error fetching data:', error.message);
    throw error;
  }
});

//search characters
export const searchCharacter = createAsyncThunk('search/searchCharacter', async (id) => {
  return axios.get(`${CHARACTER_URL}/${id}`)
    .then(response => response.data)
    .catch(error => {
      throw error.message;
    });
});







const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    // Additional reducers can go here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
         state.status = 'loading'
      })
      
      .addCase(fetchData.fulfilled, (state, action) => {
        if (action.payload && Object.keys(action.payload).length === 0) {
          // If the response data is an empty object, update status to 'no data found'
          state.status = 'no data found';
          
        } else{
          state.status = 'succeeded';
          
          state.search = state.search ? [...state.search, action.payload] : [action.payload];
        }
          
        
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(searchCharacter.pending, (state) => {
         state.status = 'loading'
      })
      
      .addCase(searchCharacter.fulfilled, (state, action) => {
        if (action.payload && Object.keys(action.payload).length === 0) {
          // If the response data is an empty object, update status to 'no data found'
          state.status = 'no data found';
          
        } else{
          state.status = 'success';
          
          state.search = state.search ? [...state.search, action.payload] : [action.payload];
          state.error = null
        }
          
        
      })
      .addCase(searchCharacter.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      });
      
      
  },
});


export const selectSearchData = (state) => state.search.search

export const getSearchStatus = (state) => state.search.status
export const getSearchError = (state) => state.search.error



export default searchSlice.reducer
