import { useEffect, useState } from "react";
import { fetchInfoActorsById } from "../../services/api.js";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader.jsx";
import s from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const data = await fetchInfoActorsById(movieId);
        setCast(data.cast);
      } catch {
        setError("Error fetching cast");
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [movieId]);

  if (loading) return <Loader />;

  return (
    <div className={s.container}>
      <ul>
        {cast.length > 0
          ? cast.map((actor) => (
              <li key={actor.id}>
                <img
                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                      : `https://dummyimage.com/500x300/008f91/fafafa.jpg&text=No+images+available`
                  }
                  alt={actor.name || "No image available"}
                  className={s.actorImage}
                />
                <p>{actor.name}</p>
                <p>
                  Character:{" "}
                  {actor.character ? actor.character : "No data available"}
                </p>
              </li>
            ))
          : !error && <p>No information about the cast</p>}
      </ul>
    </div>
  );
};

export default MovieCast;
