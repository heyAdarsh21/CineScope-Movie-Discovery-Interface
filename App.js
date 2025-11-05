import {useState, useEffect} from "react";
import './App.css'
import SearchIcon from './search.svg'
import MovieCard from "./MovieCard";

//4dace668

const API_URL = 'http://www.omdbapi.com?apikey=4dace668'

const movie1 = {
    "Title": "The Amazing Spiderman 2 Webb Cut",
    "Year": "2021",
    "imdbID": "tt18351128",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BNzI0MmQyMzYtZDAzNi00ZWZiLWFjMTgtNzQwOTRjYTFlM2Y3XkEyXkFqcGc@._V1_SX300.jpg"
}

const App = () => {
    const [movies, setMovies] = useState([])
    const [searchTerm, setsearchTerm] = useState('')
    const searchMovies = async(title) => {
        const response = await fetch(`${API_URL}&s=${title}`)
        const data = await response.json()

        setMovies(data.Search)
    }

    useEffect(() => {
        searchMovies('Spiderman')
    }, [])

    return (
        <div className="app">
            <h1>MovieLand</h1>

            <div className="search">
                <input
                    placeholder="Search for movies"
                    value= {searchTerm}
                    onChange={(e) => setsearchTerm(e.target.value)}
                />
                <img
                    src={SearchIcon}
                    alt="search"
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>

                {movies?.length > 0
                ? (
                    <div className="container">
                        {/* <MovieCard movie1={movies[0]} /> */}
                        {movies.map((movie) => (
                            <MovieCard key={movie.omdbID} movie={movie}/>
                        ))}
                    </div>
                ) : (
                    <div className="empty">
                        <h2>No movies found</h2>
                    </div>
                )}
            

            {/* <div className="container">
                {/* <div className="movie">
                    <div>
                        <p>{movie1.Year}</p>
                    </div>
                    <div>
                        <img src={movie1.Poster !== 'N/A' ? movie1.Poster : 'https://via.placeholder.com/400'} alt={movie1.Title} />
                    </div>
                    <div>
                        <span>{movie1.Type}</span>
                        <h3>{movie1.Title}</h3>
                    </div>
                </div> 
                <MovieCard movie1={movies[0]} />
            </div> */}
        </div>
    );
}

export default App