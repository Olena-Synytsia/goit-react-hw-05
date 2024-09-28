import { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import { searchMovieByKeyword } from "../../services/api";
import { useSearchParams } from "react-router-dom";
import MovieList from "../../components/MovieList/MovieList.jsx";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const newQuery = searchParams.get("query") || "";
  const [query, setQuery] = useState(newQuery);

  const initialValues = {
    query: newQuery,
  };

  const handleSubmit = (values) => {
    console.log(loading);
    console.log(error);
    console.log(values.query);
    setQuery(values.query);
    searchParams.set("query", values.query);
    setSearchParams(searchParams);
  };

  useEffect(() => {
    if (query !== "") {
      const getData = async () => {
        setLoading(true);
        setError(null);
        try {
          const data = await searchMovieByKeyword(query);
          setMovies(data);
        } catch {
          setError("Failed to fetch movie.");
        } finally {
          setLoading(false);
        }
      };

      getData();
    }
  }, [query]);

  return (
    <div>
      <h2>Поиск фильмов</h2>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form>
          <Field name="query" />
          <button type="submit">Search</button>
        </Form>
      </Formik>
      {query.length > 0 ? (
        <MovieList movies={movies} />
      ) : (
        <p>Введіть запит для пошуку фільмів</p>
      )}
    </div>
  );
};

export default MoviesPage;
