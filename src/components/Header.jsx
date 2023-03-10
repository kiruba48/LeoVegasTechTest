import { Link, NavLink, createSearchParams, useSearchParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { ENDPOINT_SEARCH, ENDPOINT_DISCOVER } from '../constants';
import { fetchMovies, searchMovies } from '../data/moviesSlice';


import '../styles/header.scss';

const Header = () => {
  
  const { starredMovies } = useSelector((state) => state.starred);

  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search');



  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getSearchResults = (query) => {
    if (query !== '') {
      dispatch(searchMovies({
        apiUrl: ENDPOINT_SEARCH,
        query,
    }));
      
      setSearchParams(createSearchParams({ search: query }))
    } else {
      dispatch(fetchMovies({apiUrl: ENDPOINT_DISCOVER}))
      setSearchParams()
    }
  }

  const handleSearch = (query) => {
    navigate('/');
    getSearchResults(query);
  }


  return (
    <header>
      <Link to="/" data-testid="home" onClick={() => handleSearch('')}>
        <i className="bi bi-film" />
      </Link>

      <nav>
        <NavLink to="/starred" data-testid="nav-starred" className="nav-starred">
          {starredMovies.length > 0 ? (
            <>
            <i className="bi bi-star-fill bi-star-fill-white" />
            <sup className="star-number">{starredMovies.length}</sup>
            </>
          ) : (
            <i className="bi bi-star" />
          )}
        </NavLink>
        <NavLink to="/watch-later" className="nav-fav">
          watch later
        </NavLink>
      </nav>

      <div className="input-group rounded">
        <Link to="/" className="search-link" >
          <input type="search" data-testid="search-movies"
            onKeyUp={(e) => handleSearch(e.target.value)} 
            className="form-control rounded" 
            placeholder="Search movies..." 
            aria-label="Search movies" 
            aria-describedby="search-addon" 
            />
        </Link>            
      </div>      
    </header>
  )
}

export default Header;
