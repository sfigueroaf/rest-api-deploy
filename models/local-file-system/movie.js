import { randomUUID } from "node:crypto";
// import { readJSON } from "../../utils.js";
import fs from "node:fs";
const movies = JSON.parse(fs.readFileSync("./models/movies.json", "utf-8"));

// const movies = readJSON("../movies.json");
// console.log("aaaa", movies);

export class MovieModel {
  static async getAll({ genre }) {
    if (genre) {
      return movies.filter((movie) =>
        movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
      );
    }
    return movies;
  }

  static async getById({ id }) {
    const movie = movies.find((movie) => movie.id === id);
    return movie;
  }

  static async create(input) {
    const newMovie = {
      id: randomUUID(), // uuid v4
      ...input,
    };

    movies.push(newMovie);

    return newMovie;
  }

  static async delete({ id }) {
    const movieIndex = movies.findIndex((movie) => movie.id === id);
    if (movieIndex === -1) return false;

    movies.splice(movieIndex, 1);
    return true;
  }

  static async update({ id, input }) {
    const movieIndex = movies.findIndex((movie) => movie.id === id);
    if (movieIndex === -1) return false;

    movies[movieIndex] = {
      ...movies[movieIndex],
      ...input,
    };

    return movies[movieIndex];
  }
}
