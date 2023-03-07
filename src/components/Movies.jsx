import { useDispatch, useSelector } from 'react-redux'

import Movie from './Movie'
import '../styles/movies.scss'
import { useEffect, useCallback } from 'react';

import { ENDPOINT_SEARCH, ENDPOINT_DISCOVER, ENDPOINT, API_KEY } from '../constants';
import { fetchMovies } from '../data/moviesSlice';

const Movies = ({ viewTrailer, closeCard }) => {

    const movies = useSelector((state) => state.movies);
    const { movies: allMovies } = movies;
    console.log(movies);
    console.log(allMovies);
    const dispatch = useDispatch();

    // const getMovies = useCallback(() => {
    //     dispatch(fetchMovies(ENDPOINT_DISCOVER));
    //   }, [dispatch])

    const loadMoreMovies = () => {

    }

    useEffect(() => {
        console.log('from movies useEffect');
        dispatch(fetchMovies(ENDPOINT_DISCOVER));
    }, [dispatch])


    return (
        <div data-testid="movies" className='section__movies'>

            {allMovies.map((movie) => {
                return (
                    <Movie 
                        movie={movie} 
                        key={movie.id}
                        viewTrailer={viewTrailer}
                        closeCard={closeCard}
                    />
                )
            })}
        </div>
    )
}

export default Movies
