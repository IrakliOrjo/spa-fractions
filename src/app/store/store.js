import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import postsReducer from '../features/posts/postsSlice'
import factionsReducer from '../features/factions/factionsSlice'
import characterReducer from '../features/characters/characterSlice'
import searchReducer from '../features/search/searchSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    posts: postsReducer,
    factions: factionsReducer,
    character: characterReducer,
    search: searchReducer
   },
})