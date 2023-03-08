import { useEffect, useCallback, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Movie from './Movie';
import '../styles/movies.scss';
import { ENDPOINT_DISCOVER } from '../constants';
import { fetchMovies } from '../data/moviesSlice';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const Movies = ({ viewTrailer, closeCard }) => {

    const movies = useSelector((state) => state.movies);
    const { movies: allMovies, fetchStatus } = movies;
    const dispatch = useDispatch();

    const [pageNumber, setPageNumber] = useState(1);
    const { createInfiniteScroll, converge, setConverge } = useIntersectionObserver();

    const observer = useRef(null);

    const lastMovieCard = useCallback((card) => {
        createInfiniteScroll(card, observer.current, fetchStatus);
    }, [fetchStatus, createInfiniteScroll]);


    useEffect(() => {
        dispatch(fetchMovies({
            apiUrl: ENDPOINT_DISCOVER,
            pageNumber,
        }));
    }, [dispatch, pageNumber])

    useEffect(() => {
        if(converge) {
            setPageNumber(prevPageNumber => prevPageNumber + 1);
            setConverge(false);
        }
    },[converge, setConverge])


    return (
        <div data-testid="movies" className='section__movies'>
            {
                fetchStatus === 'loading' ? (
                    <div style={{padding: "30px"}}>
                        <h6>Loading...</h6>
                    </div>
                ) : null
            }
            {
                fetchStatus === 'error' ? (
                    <div style={{padding: "30px"}}>
                        <h6>Error Loading Movies</h6>
                    </div>
                ) : null
            }
            { fetchStatus === 'success' ? allMovies.map((movie, index) => {
                if(allMovies.length === index + 1) {
                    return (
                        <Movie 
                            movie={movie} 
                            key={movie.id}
                            viewTrailer={viewTrailer}
                            closeCard={closeCard}
                            reference={lastMovieCard}
                        />
                )
                }
                return (
                    <Movie 
                        movie={movie} 
                        key={movie.id}
                        viewTrailer={viewTrailer}
                        closeCard={closeCard}
                        reference={null}
                    />
                )
            }) : null }
        </div>
    )
}

export default Movies;
