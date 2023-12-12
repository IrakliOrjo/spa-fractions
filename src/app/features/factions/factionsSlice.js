import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const FACTIONS_URL = 'https://esi.evetech.net/legacy/universe/factions'
const SOLAR_SYSTEM_URL = 'https://esi.evetech.net/legacy/universe/systems'
const CORPORATION_NAME_URL = 'https://esi.evetech.net/legacy/corporations'


const initialState = {
    factions: [],
   
    solarName: null,
    corporationName: null,
    status: 'idle',
    error: null
}

export const fetchFactions = createAsyncThunk('factions/fetchFactions', async () => {
  return axios.get(FACTIONS_URL)
    .then(response => response.data)
    .catch(error => {
      throw error.message;
    });
});

export const fetchSolarSystem = createAsyncThunk('factions/fetchSolarSystem', async (factionId) => {
  const solarSystemResponse = await axios.get(`${SOLAR_SYSTEM_URL}/${factionId}`);
  return solarSystemResponse.data;
});

export const fetchCorporationName = createAsyncThunk('factions/fetchCorporationName', async (corporationId) => {
  const corporationNameResponse = await axios.get(`${CORPORATION_NAME_URL}/${corporationId}`);
  return corporationNameResponse.data;
});



const factionsSlice = createSlice({
    name: 'factions',
    initialState,
    reducers: {
     
    },
    extraReducers(builder) {
        //reducers for fetchin factions
        builder.addCase(fetchFactions.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(fetchFactions.fulfilled, (state,action) => {
            state.status = 'success'
            const loadedFactions = action.payload
            state.factions = state.factions.concat(loadedFactions)
        })
        .addCase(fetchFactions.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        })
        //Reducers for fetchin solar system name
        builder.addCase(fetchSolarSystem.pending, (state) => {
            state.status = 'loading';
    })
        .addCase(fetchSolarSystem.fulfilled, (state, action) => {
          state.status = 'success';
          state.solarName = action.payload.name;
        })
        .addCase(fetchSolarSystem.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
    });
        //reducers for fetchin corporation id name
        builder.addCase(fetchCorporationName.pending, (state) => {
            state.status = 'loading';
    })
        .addCase(fetchCorporationName.fulfilled, (state, action) => {
          state.status = 'success';
          state.corporationName = action.payload;
        })
        .addCase(fetchCorporationName.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
    });

    }
})

export const selectAllFactions = (state) => state.factions.factions


export const getFactionsStatus = (state) => state.factions.status
export const getFactionsError = (state) => state.factions.error
export const getSolarName = (state) => state.factions.solarName
export const getCorporationName = (state) => state.factions.corporationName

export default factionsSlice.reducer
