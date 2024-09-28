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

  if (loading) return <Loader />;
  if (error) return <h2>{error}</h2>;
  if (!movie) return <Loader />;

  if (!Array.isArray(genres) || genres.length === 0) {
    return <h2>No genres available.</h2>;
  }

  const movieGenres = movie.genres.map((genre) => genre.name).join(", ");

  return (
    <div>
      <Link to={linkGoBack}>Go back</Link>
      <div>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <h2>
          {movie.title} ({movie.release_date.split("-")[0]})
        </h2>
        <p>User score: {Math.round((movie.vote_average / 10) * 100)} %</p>
        <p>Overview: {movie.overview}</p>

        <p>Genres: {movieGenres}</p>
        <hr />
        <div>
          <h4>Additional information</h4>
          <NavLink to="cast">Cast</NavLink>
          <NavLink to="reviews">Reviews</NavLink>
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
