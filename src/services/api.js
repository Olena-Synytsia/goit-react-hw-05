import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMjUxMTc0N2JkMzk3YzA4OGQxZGEzMmUyN2Y5ZDRmZCIsIm5iZiI6MTcyNzI4MjA2NC4xNDA2ODIsInN1YiI6IjY2ZjQzNmY5M2E5NWE1YmNkYTIzMGMzYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pekQAGxQimfS2H6IH_65XjnlLhvFWodKYsR9djfA37U",
  },
});

export const fetchTrendingMovies = async () => {
  const { data } = await api.get(`/trending/movie/day?language=en-US`);
  return data.results;
};

export const fetchTrendingMovieById = async (movieId) => {
  const { data } = await api.get(`/movie/${movieId}?language=en-US`);
  return data;
};

export const fetchTrendingMovieByIdImg = async (movieId) => {
  const { data } = await api.get(`/movie/${movieId}?backdrop_path`);
  return data;
};

export const fetchGenres = async () => {
  const { data } = await api.get("/genre/movie/list?language=en-US");
  return data.genres;
};

export const fetchInfoActorsById = async (movieId) => {
  const { data } = await api.get(`/movie/${movieId}/credits?language=en-US`);
  return data;
};

export const fetchReviewsById = async (movieId) => {
  const { data } = await api.get(
    `/movie/${movieId}/reviews?language=en-US&page=1`
  );
  return data.results;
};

export const searchMovieByKeyword = async (query) => {
  const { data } = await api.get(
    `/search/movie?include_adult=false&language=en-US&page=1&query=${query}`
  );
  console.log(data);
  return data.results;
};
