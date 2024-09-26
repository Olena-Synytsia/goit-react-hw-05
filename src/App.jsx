import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";
import MovieList from "./components/MovieList/MovieList.jsx";
import MovieDetailsPage from "./pages/MovieDetailsPage/MovieDetailsPage.jsx";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage.jsx";
import "./App.css";

function App() {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MovieList />} />
        <Route path="/movies/:movieId" element={<MovieDetailsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
