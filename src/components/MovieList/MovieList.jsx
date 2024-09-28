import { Link } from "react-router-dom";
import s from "./MovieList.module.css";

const MovieList = ({ movies = [] }) => {
  console.log(movies);
  return (
    <div className={s.container}>
      <ul>
        {movies.length > 0 ? (
          movies.map((movie) => (
            <li key={movie.id}>
              <Link to={`/movies/${movie.id.toString()}`}>
                <p>{movie.title}</p>
              </Link>
            </li>
          ))
        ) : (
          <p>No movies found</p>
        )}
      </ul>
    </div>
  );
};

export default MovieList;
