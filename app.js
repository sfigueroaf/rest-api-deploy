const express = require("express"); // require -->commonJS
const crypto = require("node:crypto");
const movies = require("./movies.json");
const { validateMovie, validatePartialMovie } = require("./schemas/movies.js");

const app = express();
app.use(express.json());
app.disable("x-powered-by"); // deshabilita el header x-powered-by de express

app.get("/", (req, res) => {
  res.json({ message: "Hola mundo" });
});

app.get("/movies/:id", (req, res) => {
  const { id } = req.params;
  const movie = movies.find((movie) => movie.id === id);
  if (movie) return res.json(movie);
  res.status(404).json({ message: "Movie not found" });
});

app.post("/movies", (req, res) => {
  const result = validateMovie(req.body);

  if (!result.success) {
    // 422 Unprocessable Entity
    return res.status(400).json({ error: JSON.parse(result.error.message) });
  }

  // en base de datos
  const newMovie = {
    id: crypto.randomUUID(), // uuid v4
    ...result.data,
  };

  // Esto no sería REST, porque estamos guardando
  // el estado de la aplicación en memoria
  movies.push(newMovie);

  res.status(201).json(newMovie);
});

app.patch("/movies/:id", (req, res) => {
  const result = validatePartialMovie(req.body);

  if (!result.success) {
    res.status(400).json({ error: JSON.parse(result.error.message) });
  }

  const { id } = req.params;
  const movieIndex = movies.findIndex((movie) => movie.id === id);

  if (movieIndex === -1) {
    return res.status(404).json({ message: "Movie not found" });
  }
  const updateMovie = {
    ...movies[movieIndex],
    ...result.data,
  };
  movies[movieIndex] = updateMovie;

  return res.json(updateMovie);
});

const ACCEPTED_ORIGINS = [
  "http://localhost:8080",
  "http://localhost:1234",
  "http://movies.com",
];

/* Ésto se considera un endpoint: un PATH en el que se tiene un recurso */
// Todos los recursos que sean MOVIES se identifica con /movies
app.get("/movies", (req, res) => {
  const origin = req.header("origin");
  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  const { genre } = req.query;
  if (genre) {
    const filterMovies = movies.filter((movie) =>
      movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
    );
    return res.json(filterMovies);
  }
  res.json(movies);
});

const PORT = process.env.PORT ?? 1234;

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`);
});
// node --watch ./app.js