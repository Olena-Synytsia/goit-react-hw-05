import { Link, useLocation } from "react-router-dom";
import s from "./MovieList.module.css";

const MovieList = ({ movies = [], customClass }) => {
  const location = useLocation();
  console.log(movies);
  return (
    <div className={s.container}>
      <ul className={customClass}>
        {movies.map((movie) => (
          <li key={movie.id}>
            <Link
              to={`/movies/${movie.id}`}
              state={location}
              className={s.link}
            >
              {movie.title}{" "}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
