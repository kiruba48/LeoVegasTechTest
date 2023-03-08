import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchMovies = createAsyncThunk('fetch-movies', async ({apiUrl, pageNumber=1}) => {
    try {
        const params = {
            page: pageNumber,
        }

        const response = await axios.get(apiUrl, {
           params
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
})

export const searchMovies = createAsyncThunk('search-movies', async ({apiUrl, pageNumber=1, query=''}) => {
    try {
        const params = {
            page: pageNumber,
        }
        if(query !== '') params.query = query;

        const response = await axios.get(apiUrl, {
           params
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
            state.fetchStatus = 'success';
        }).addCase(fetchMovies.pending, (state) => {
            state.fetchStatus = 'loading'
        }).addCase(fetchMovies.rejected, (state) => {
            state.fetchStatus = 'error'
        }).addCase(searchMovies.fulfilled, (state, action) => {
            const tempMovies = action.payload.results;
            state.movies = tempMovies;
            state.fetchStatus ='success';
        }).addCase(searchMovies.pending, (state) => {
            state.fetchStatus = 'loading';
        }).addCase(searchMovies.rejected, (state) => {
            state.fetchStatus = 'error';
        })
    }
})



export default moviesSlice;
