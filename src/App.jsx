// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import MoviesPage from "./components/MovieCast/MovieCast.jsx";
import MovieDetailsPage from "./pages/MovieDetailsPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import Navigation from "./components/Navigation/Navigation.jsx";

import "./App.css";

function App() {
  return (
    <div>
      <HomePage />
      <MoviesPage />
      <MovieDetailsPage />
      <NotFoundPage />
      <Navigation />
    </div>
  );
}

export default App;
