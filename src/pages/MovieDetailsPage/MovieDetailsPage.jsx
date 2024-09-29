import { useEffect, useState, useRef, Suspense } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import { fetchGenres, fetchTrendingMovieById } from "../../services/api";
import Loader from "../../components/Loader/Loader.jsx";
import clsx from "clsx";
import s from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const stateRef = useRef(location.state);
  const linkGoBack = stateRef.current ?? "/movies";

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchTrendingMovieById(movieId);
        setMovie(data);
      } catch {
        setError("Failed to fetch movie.");
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [movieId]);

  useEffect(() => {
    const getGenres = async () => {
      try {
        const addGenres = await fetchGenres();
        setGenres(addGenres);
      } catch {
        setError("Failed to fetch genres.");
      }
    };
    getGenres();
  }, []);

  const buildLinkClass = ({ isActive }) => {
    return clsx(s.link, isActive && s.activeLink);
  };

  if (loading) return <Loader />;
  if (error) return <h2>{error}</h2>;
  if (!movie) return <Loader />;

  if (!Array.isArray(genres) || genres.length === 0) {
    return <h2>No genres available.</h2>;
  }

  const movieGenres = movie.genres.map((genre) => genre.name).join(", ");

  return (
    <div className={s.container}>
      <Link to={linkGoBack} className={s.link_back}>
        Go back
      </Link>
      <div className={s.card}>
        <div className={s.context}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
          <div className={s.context_item}>
            <h2 className={s.title}>
              {movie.title} ({movie.release_date.split("-")[0]})
            </h2>
            <p className={s.text}>
              User score: {Math.round((movie.vote_average / 10) * 100)} %
            </p>
            <p className={s.text}>Overview: {movie.overview}</p>

            <p className={s.text}>Genres: {movieGenres}</p>
          </div>
        </div>
        <hr />
        <div>
          <h3 className={s.title_info}>Additional information</h3>
          <div className={s.nav}>
            <NavLink className={buildLinkClass} to="cast">
              Cast
            </NavLink>
            <NavLink className={buildLinkClass} to="reviews">
              Reviews
            </NavLink>
          </div>
        </div>
        <div>
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
