import { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import { searchMovieByKeyword } from "../../services/api";
import { useSearchParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../../components/Loader/Loader.jsx";
import MovieList from "../../components/MovieList/MovieList.jsx";
import s from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const newQuery = searchParams.get("query") || "";
  const [query, setQuery] = useState(newQuery);

  const initialValues = {
    query: newQuery,
  };

  const handleSubmit = (values) => {
    if (values.query.trim() === "") {
      toast.error("Enter your query");
      return;
    }
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
          if (!data || data.length === 0) {
            toast.error("No movies found");
          } else {
            setMovies(data);
          }
        } catch {
          toast.error("Failed to fetch movie");
        } finally {
          setLoading(false);
        }
      };

      getData();
    }
  }, [query]);

  if (loading) return <Loader />;
  if (error) return <h2>{error}</h2>;

  return (
    <div className={s.container}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form className={s.form}>
          <Field
            className={s.input}
            name="query"
            placeholder="Enter your query"
          />
          <button className={s.btn} type="submit">
            Search
          </button>
        </Form>
      </Formik>
      <MovieList movies={movies} customClass={s.customUl} />
      <Toaster position="top-right" />
    </div>
  );
};

export default MoviesPage;
