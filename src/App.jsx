import { useCallback, useEffect, useState, useRef } from 'react'
import { Routes, Route, createSearchParams, useSearchParams, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import 'reactjs-popup/dist/index.css'
import { fetchMovies } from './data/moviesSlice'
import { ENDPOINT_SEARCH, ENDPOINT_DISCOVER, ENDPOINT, API_KEY } from './constants'
import Header from './components/Header'
import Movies from './components/Movies'
import Starred from './components/Starred'
import WatchLater from './components/WatchLater'
import Modal from './components/Modal';
import './app.scss'


const App = () => {

  // const state = useSelector((state) => state)
  // const { movies } = state  
  // const dispatch = useDispatch()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const searchQuery = searchParams.get('search')
  const [videoKey, setVideoKey] = useState()
  const [isOpen, setOpen] = useState(false)
  const [isLoading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const closeVideo = () => {
    setVideoKey(null);
  }

  const closeCard = () => {}

  // const getSearchResults = (query) => {
  //   if (query !== '') {
  //     // dispatch(fetchMovies(`${ENDPOINT_SEARCH}&query=`+query))
  //     dispatch(fetchMovies(ENDPOINT_SEARCH, query));
      
  //     setSearchParams(createSearchParams({ search: query }))
  //   } else {
  //     dispatch(fetchMovies(ENDPOINT_DISCOVER))
  //     setSearchParams()
  //   }
  // }

  // const searchMovies = (query) => {
  //   navigate('/')
  //   getSearchResults(query)
  // }

  // const getMovies = useCallback(() => {
  //   if (searchQuery) {
  //       // dispatch(fetchMovies(`${ENDPOINT_SEARCH}&query=`+searchQuery))
  //       dispatch(fetchMovies(ENDPOINT_SEARCH, searchQuery));
  //   } else {
  //       dispatch(fetchMovies(ENDPOINT_DISCOVER, pageNumber))
  //   }
  // }, [searchQuery, pageNumber, dispatch])


  const getMovie = async (id) => {
    const URL = `${ENDPOINT}/movie/${id}?api_key=${API_KEY}&append_to_response=videos`

    try {
      return (await fetch(URL)).json();
    } catch (error) {
      console.log(error);
    }
  }

  const getTrailer = (videoData) => {
    if (videoData.videos && videoData.videos.results.length) {
      const trailer = videoData.videos.results.find(vid => vid.type === 'Trailer')
      setVideoKey(trailer ? trailer.key : videoData.videos.results[0].key);
      openModal();
      setLoading(false);
    }
  }

  const viewTrailer = async (movie) => {
    setLoading(true);
    const movieToPlay = await getMovie(movie.id);
    await getTrailer(movieToPlay);
  }

  // useEffect(() => {
  //   // getMovies()
  // }, [getMovies])


  return (
    <div className="App">
      {/* <Header searchMovies={searchMovies} searchParams={searchParams} setSearchParams={setSearchParams} /> */}

      <div className="container">
        <Modal
            videoKey={videoKey}
            show={isOpen}
            closeModal={closeModal}
            closeVideo={closeVideo}
            loading={isLoading}
      />

        <Routes>
          <Route path="/" element={<Movies viewTrailer={viewTrailer} closeCard={closeCard} />} />
          {/* <Route path="/" element={<Movies movies={movies} viewTrailer={viewTrailer} closeCard={closeCard} />} /> */}
          {/* <Route path="/starred" element={<Starred viewTrailer={viewTrailer} />} />
          <Route path="/watch-later" element={<WatchLater viewTrailer={viewTrailer} />} />
          <Route path="*" element={<h1 className="not-found">Page Not Found</h1>} /> */}
        </Routes>
      </div>
    </div>
  )
}

export default App
