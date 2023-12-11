import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const CHARACTER_URL = 'https://esi.evetech.net/legacy/characters'
const RACES_URL = 'https://esi.evetech.net/legacy/universe/races'



const initialState = {
    character: [],
    race: null,
    status: 'idle',
    error: null
}

export const fetchCharacter = createAsyncThunk('character/fetchCharacter', async (ceoId) => {
  return axios.get(`${CHARACTER_URL}/${ceoId}`)
    .then(response => response.data)
    .catch(error => {
      throw error.message;
    });
});

export const fetchRace = createAsyncThunk('factions/fetchRace', async (factionId) => {
  const fetchRaceResponse = await axios.get(`${RACES_URL}`);
  return fetchRaceResponse.data;
});



const characterSlice = createSlice({
    name: 'character',
    initialState,
    reducers: {
    },
    extraReducers(builder) {
        //reducers for fetchin characters
        builder.addCase(fetchCharacter.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(fetchCharacter.fulfilled, (state,action) => {
            state.status = 'success'
            const loadedCharacter = action.payload
            state.character = loadedCharacter
        })
        .addCase(fetchCharacter.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        })
        //raducers for fetching races
        builder.addCase(fetchRace.pending, (state) => {
            
        })
        .addCase(fetchRace.fulfilled, (state,action) => {
            
            state.race = action.payload
            
        })
        .addCase(fetchRace.rejected, (state, action) => {
            state.race = 'Failed'
           
        })


    }
})

export const selectAllCharacter = (state) => state.character.character
export const selectRace = (state) => state.character.race
export const getCharacterStatus = (state) => state.character.status
export const getCharacterError = (state) => state.character.error



export default characterSlice.reducer
