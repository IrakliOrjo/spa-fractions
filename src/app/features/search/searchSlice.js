import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const CHARACTER_URL = 'https://esi.evetech.net/latest/characters'
const ALLIANCES_URL = 'https://esi.evetech.net/latest/alliances'
const CONSELLATION_URL = 'https://esi.evetech.net/legacy/universe/constellations'



const initialState = {
    characterData: [],
    inventoryType: [],
    aliancesData: [],
    constellations: [],

    status: 'idle',
    error: null
    
}

export const fetchInventoryType = createAsyncThunk('search/fetchInventoryType', async (searchTerm) => {
  try {
    const response = await axios.post(
      'https://esi.evetech.net/latest/universe/ids/?datasource=tranquility&language=en',
      [searchTerm], 
      {
        headers: {
          'Content-Type': 'text/plain',
        },
      }
    );

    return response.data;
  } catch (error) {
  
    console.error('Error fetching data:', error.message);
    throw error;
  }
});


export const searchCharacter = createAsyncThunk('search/searchCharacter', async (id) => {
  return axios.get(`${CHARACTER_URL}/${id}`)
    .then(response => response.data)
    .catch(error => {
      throw error.message;
    });
});

export const searchAlliances = createAsyncThunk('search/searchAlliances', async (id) => {
  return axios.get(`${ALLIANCES_URL}/${id}`)
    .then(response => response.data)
    .catch(error => {
      throw error.message;
    });
});

export const searchConstellation = createAsyncThunk('search/searchConstellation', async (id) => {
  return axios.get(`${CONSELLATION_URL}/${id}`)
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
      .addCase(fetchInventoryType.pending, (state) => {
         state.status = 'loading'
      })
      
      .addCase(fetchInventoryType.fulfilled, (state, action) => {
        if (action.payload && Object.keys(action.payload).length === 0) {
          state.status = 'no data found';
        } else {
          state.status = 'success';
          state.inventoryType = state.inventoryType
            ? [...state.inventoryType, action.payload]
            : [action.payload];
          state.error = null;
        }
          
        
      })
      .addCase(fetchInventoryType.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      //search character
      .addCase(searchCharacter.pending, (state) => {
         state.status = 'loading'
      })
      
      .addCase(searchCharacter.fulfilled, (state, action) => {
        if (action.payload && Object.keys(action.payload).length === 0) {
          state.status = 'no data found';
        } else {
          state.status = 'success';
          state.characterData = state.characterData
            ? [...state.characterData, action.payload]
            : [action.payload];
          state.error = null;
        }
          
        
      })
      .addCase(searchCharacter.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      // SEARCH ALLIANCES
      .addCase(searchAlliances.pending, (state) => {
         state.status = 'loading'
      })
      
      .addCase(searchAlliances.fulfilled, (state, action) => {
        if (action.payload && Object.keys(action.payload).length === 0) {
          state.status = 'no data found';
        } else {
          state.status = 'success';
          state.aliancesData = state.aliancesData
            ? [...state.aliancesData, action.payload]
            : [action.payload];
          state.error = null;
        }
      })
      .addCase(searchAlliances.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      //SEARCH CONSTELLATIONS
      .addCase(searchConstellation.pending, (state) => {
         state.status = 'loading'
      })
      
      .addCase(searchConstellation.fulfilled, (state, action) => {
        if (action.payload && Object.keys(action.payload).length === 0) {
          state.status = 'no data found';
        } else {
          state.status = 'success';
          state.constellations = state.constellations
            ? [...state.constellations, action.payload]
            : [action.payload];
          state.error = null;
        }
      })
      .addCase(searchConstellation.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
});


export const charactersData = (state) => state.search.characterData
export const inventoryType = (state) => state.search.inventoryType
export const aliances = (state) => state.search.aliancesData
export const constellations = (state) => state.search.constellations

export const getSearchStatus = (state) => state.search.status
export const getSearchError = (state) => state.search.error



export default searchSlice.reducer