import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const POST_URL = 'https://esi.evetech.net/legacy/universe/factions'

const initialState = {
    posts: [],
    status: 'idle',
    error: null
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  return axios.get(POST_URL)
    .then(response => response.data)
    .catch(error => {
      throw error.message;
    });
});

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action) {
                state.posts.push(action.payload)
            },
            prepare(title, content, userId) {
                return {
                    payload: {
                        
                    }
                }
            }
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchPosts.pending, (state,action) => {
            state.status = 'loading'
        })
        .addCase(fetchPosts.fulfilled, (state,action) => {
            state.status = 'success'
            const loadedPosts = action.payload
            state.posts = state.posts.concat(loadedPosts)
        })
        .addCase(fetchPosts.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        })

    }
})

export const selectAllPosts = (state) => state.posts.posts
export const getPostsStatus = (state) => state.posts.status
export const getPostsError = (state) => state.posts.error

export default postSlice.reducer