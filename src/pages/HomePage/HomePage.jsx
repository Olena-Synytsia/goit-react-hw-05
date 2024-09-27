import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { fetchTrendingMovies } from "../../services/api.js";

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
    <div>
      <h1>Trending Movies Today</h1>
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
