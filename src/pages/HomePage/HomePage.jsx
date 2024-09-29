import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { fetchTrendingMovies } from "../../services/api.js";
import s from "./HomePage.module.css";

const HomePage = () => {
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
      <h1>Trending movies today</h1>
      <MovieList movies={movies} customClass={s.customUl} />
    </div>
  );
};

export default HomePage;
