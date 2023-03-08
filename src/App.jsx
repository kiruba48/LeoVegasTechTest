import { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import { useSelector } from 'react-redux';
import 'reactjs-popup/dist/index.css';
import { ENDPOINT, API_KEY } from './constants';
import Header from './components/Header';
import Movies from './components/Movies';
import Starred from './components/Starred';
import WatchLater from './components/WatchLater';
import Modal from './components/Modal';
import './app.scss';


const App = () => {

  const { fetchStatus } = useSelector((state) => state.movies);
  const [videoKey, setVideoKey] = useState()
  const [isOpen, setOpen] = useState(false)
  
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const closeVideo = () => {
    setVideoKey(null);
  }

  const closeCard = () => {}

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
      const trailer = videoData.videos.results.find(vid => vid.type === 'Trailer');
      setVideoKey(trailer ? trailer.key : videoData.videos.results[0].key);
      openModal();
    }
  }

  const viewTrailer = async (movie) => {
    const movieToPlay = await getMovie(movie.id);
    await getTrailer(movieToPlay);
  }


  return (
    <div className="App">
      {/* <Header searchMovies={searchMovies} searchParams={searchParams} setSearchParams={setSearchParams} /> */}
      <Header />

      <div className="container">
        <Modal
            videoKey={videoKey}
            show={isOpen}
            closeModal={closeModal}
            closeVideo={closeVideo}
            status={fetchStatus}
      />

        <Routes>
          <Route path="/" element={<Movies viewTrailer={viewTrailer} closeCard={closeCard} />} />
          {/* <Route path="/" element={<Movies movies={movies} viewTrailer={viewTrailer} closeCard={closeCard} />} /> */}
          <Route path="/starred" element={<Starred viewTrailer={viewTrailer} />} />
          <Route path="/watch-later" element={<WatchLater viewTrailer={viewTrailer} />} />
          <Route path="*" element={<h1 className="not-found">Page Not Found</h1>} />
        </Routes>
      </div>
    </div>
  )
}

export default App;
