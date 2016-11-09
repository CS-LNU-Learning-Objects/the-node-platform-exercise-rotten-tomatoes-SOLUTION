"use strict";

const movieParser = require("./lib/movieParser");

Promise.all([
    movieParser.getAverageRating("IMDB", "json", "./lib/movies/movies.json"),
    movieParser.getAverageRating("Rotten tomatoes", "xml", "./lib/movies/movies.xml")

]);