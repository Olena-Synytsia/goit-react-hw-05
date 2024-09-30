import { useEffect, useState } from "react";
import { fetchReviewsById } from "../../services/api";
import { useParams } from "react-router-dom";
import s from "./MovieReviews.module.css";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchReviewsById(movieId);
        setReviews(data);
      } catch {
        setError("Error fetching reviews");
      }
    };
    getData();
  }, [movieId]);

  return (
    <div className={s.container}>
      <ul>
        {error && <p className={s.errorMessage}> {error}</p>}
        {reviews.length > 0
          ? reviews.map((review) => (
              <li key={review.id} className={s.reviews_li}>
                <h2 className={s.title}>Author: {review.author}</h2>
                <p>{review.content}</p>
              </li>
            ))
          : !error && (
              <p className={s.errorMessage}>
                We don{"'"}t have any reviews for this movie
              </p>
            )}
      </ul>
    </div>
  );
};

export default MovieReviews;
