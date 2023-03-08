import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchMovies = createAsyncThunk('fetch-movies', async ({apiUrl, pageNumber}) => {
    try {
        const response = await axios.get(apiUrl, {
            params: { page: pageNumber }
        });
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
            const tempMovies = [ ...state.movies, ...action.payload.results].filter((value, index, self) => {
                return index === self.findIndex(item => item.id === value.id);
            })
            state.movies = tempMovies;
            state.fetchStatus = 'success'
        }).addCase(fetchMovies.pending, (state) => {
            state.fetchStatus = 'loading'
        }).addCase(fetchMovies.rejected, (state) => {
            state.fetchStatus = 'error'
        })
    }
})

export default moviesSlice
