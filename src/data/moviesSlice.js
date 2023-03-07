import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// export const fetchMovies = createAsyncThunk('fetch-movies', async (apiUrl) => {
//     const response = await fetch(apiUrl)
//     return response.json()
// })

export const fetchMovies = createAsyncThunk('fetch-movies', async (apiUrl, query='', pageNumber = 1) => {
    try {
        const response = await axios({
            method: 'get',
            url: apiUrl,
            params: {q: query, page: pageNumber}
        })
        return response.data;
    } catch (error) {
        console.log(error);
    }
})

const moviesSlice = createSlice({
    name: 'movies',
    initialState: { 
        movies: [],
        fetchStatus: '',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchMovies.fulfilled, (state, action) => {
            state.movies = action.payload.results;
            // state.movies = [...action.payload.results, ...state.movies];
            state.fetchStatus = 'success'
        }).addCase(fetchMovies.pending, (state) => {
            state.fetchStatus = 'loading'
        }).addCase(fetchMovies.rejected, (state) => {
            state.fetchStatus = 'error'
        })
    }
})

export default moviesSlice
