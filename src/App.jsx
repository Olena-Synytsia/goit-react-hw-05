import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";
import MoviesPage from "./pages/MoviesPage/MoviesPage.jsx";
import MovieDetailsPage from "./pages/MovieDetailsPage/MovieDetailsPage.jsx";
import MovieCast from "./components/MovieCast/MovieCast.jsx";
import MovieReviews from "./components/MovieReviews/MovieReviews.jsx";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage.jsx";
import ScrollUp from "./components/ScrollUp/ScrollUp.jsx";
import "./App.css";

function App() {
  return (
    <div>
      <Navigation />
      <hr />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
          <Route path="cast" element={<MovieCast />} />
          <Route path="reviews" element={<MovieReviews />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <ScrollUp />
    </div>
  );
}

export default App;
