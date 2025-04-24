import React, { useEffect, useState } from 'react'
import Search from './Components/Search'
import Loading from './Components/Loading';
import MovieCard from './Components/MovieCard';
import { useDebounce } from 'react-use'
import { getTrendingMovies, updateSearchCount } from './appwrite';
import heroImg from "./assets/hero.png";

// import { updateSearchCount } from './firebaseUtils_TEMP';


const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_URL = 'https://api.themoviedb.org/3';

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}


const App = () => {
  const [search, setSearch] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const [movieList, setMovieList] = useState([])
  const [isloading, setIsLoading] = useState(false)
  const [debounce, setDebounce] = useState("")
  const [trendingMovies, setTrendingMovies] = useState([]);

  // Debounce the search term to prevent making too many API requests
  // by waiting for the user to stop typing for 500ms
  useDebounce(() => setDebounce(search), 500, [search])
  const fetchMovies = async (query = '') => {
    setIsLoading(true)
    setErrorMsg("")
    try {
      const actualUrl = query
        ? `${API_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(actualUrl, API_OPTIONS)

      if (!response.ok) {
        throw new Error("Error fetching Movies")
      }
      const data = await response.json()
      if (data.Response === false) {
        setErrorMsg(data.error || "failed to fetch movies")
        setMovieList([])
        return
      }
      setMovieList(data.results || [])
      // this 👇
      // if (query && data.results.length > 0) {
      //   updateSearchCount(query, data.results[0]);
      // }


      if (query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
      }
    } catch (error) {
      console.error(`Error fetching movies ${error}`);
      setErrorMsg("Error Fetching Movies Please Try again")
    } finally {
      setIsLoading(false)
    }
  }

  const fetchTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies()
      setTrendingMovies(movies)
    }
    catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchTrendingMovies()
  }, [])


  useEffect(() => {
    fetchMovies(debounce)
  }, [debounce])

  return (
    <main>
      <section className="main-con">
        <div className="con1">
          <img src={heroImg} alt="" />
          <h1>Find <span className='txt-span'>Movies</span> that You'll Enjoy without The Hustle</h1>
        </div>
      </section>
      <Search search={search} setSearch={setSearch} />

      {trendingMovies.length > 0 && (
        <section className="trending">
          <h2>Trending  <span className='txt-span'>Movies</span></h2>

          <ul>
            {trendingMovies.map((movie, index) => (
              <li key={movie.$id}>
                <p>{index + 1}</p>
                <img src={movie.poster_url} alt={movie.title} />
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className='movie-sec'>
        <h2>All <span className='txt-span'>Movies</span></h2>
        {isloading ? (
          <Loading />
        ) : errorMsg ? (
          <p>{errorMsg}</p>
        ) : (
          <ul>
            {movieList.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </ul>
        )}

      </section>




    </main >


  )
}

export default App
