import { useEffect, useCallback, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import Movie from './Movie'
import '../styles/movies.scss'
import { ENDPOINT_DISCOVER } from '../constants';
import { fetchMovies } from '../data/moviesSlice';

const Movies = ({ viewTrailer, closeCard }) => {

    const movies = useSelector((state) => state.movies);
    const { movies: allMovies, fetchStatus } = movies;
    const dispatch = useDispatch();

    const [pageNumber, setPageNumber] = useState(1);

    const observer = useRef(null);
    const lastMovieCard = useCallback((card) => {
        if(fetchStatus === 'loading') return;
        if(observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver((entries) => {
            if(entries[0].isIntersecting) {
                setPageNumber(prevPageNumber => prevPageNumber + 1);
            }
        }, {
            threshold: 0,
            root:null,
          });
        if(card) observer.current.observe(card);
    }, [fetchStatus])


    useEffect(() => {
        dispatch(fetchMovies({
            apiUrl: ENDPOINT_DISCOVER,
            pageNumber,
        }));
    }, [dispatch, pageNumber])


    return (
        <div data-testid="movies" className='section__movies'>
            {
                fetchStatus === 'loading' ? (
                    <div style={{padding: "30px"}}>
                        <h6>Loading...</h6>
                    </div>
                ) : null
            }
            {allMovies.map((movie, index) => {
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
                    />
                )
            })}
        </div>
    )
}

export default Movies
