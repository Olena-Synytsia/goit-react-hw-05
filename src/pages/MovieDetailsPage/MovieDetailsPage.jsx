// import { useParams } from "react-router-dom";
// import { useState, useEffect } from "react";
// import {api} from '../services/api.js'

import MovieCast from "../../components/MovieCast/MovieCast.jsx";
import MovieReviews from "../../components/MovieReviews/MovieReviews.jsx";

const MovieDetailsPage = () => {
  return (
    <div>
      <MovieCast />
      <MovieReviews />
      MovieDetailsPage
    </div>
  );
};

export default MovieDetailsPage;
