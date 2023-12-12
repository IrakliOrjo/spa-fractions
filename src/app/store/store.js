import { configureStore } from '@reduxjs/toolkit'


import factionsReducer from '../features/factions/factionsSlice'
import characterReducer from '../features/characters/characterSlice'
import searchReducer from '../features/search/searchSlice'

export const store = configureStore({
  reducer: {

    factions: factionsReducer,
    character: characterReducer,
    search: searchReducer
   },
})