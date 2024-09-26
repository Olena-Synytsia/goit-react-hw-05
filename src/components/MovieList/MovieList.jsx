import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../../services/api.js";
import { Link } from "react-router-dom";
import s from "./MovieList.module.css";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const getAllMovies = async () => {
      const data = await fetchTrendingMovies();
      setMovies(data);
    };
    getAllMovies();
  }, []);
  return (
    <div className={s.container}>
      <h2>Trending movies to day</h2>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`}></Link>
            <Link to={`/movies/${movie.id.toString()}`}>
              <p>{movie.title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
