/**
 * The starting point of the application.
 *
 * @author Mats Loock
 * @version 1.0.0
 */

'use strict'

const { resolve } = require('path')
const { getMovieRatingAverage } = require('./lib/reviewer')

;(async () => {
  try {
    const imdbPath = resolve(__dirname, 'lib', 'movies', 'movies.json')
    const rottenTomatoesPath = resolve(__dirname, 'lib', 'movies', 'movies.xml')

    const imdbPromise = getMovieRatingAverage(imdbPath)
    const rottenTomatoPromise = getMovieRatingAverage(rottenTomatoesPath)

    const [imdb, rottenTomato] = await Promise.all([imdbPromise, rottenTomatoPromise])

    console.log('Average rating')
    console.log(`IMDB: ${imdb}`)
    console.log(`Rotten Tomatoes: ${rottenTomato}%`)
  } catch (error) {
    console.error(error)
  }
})()

// // ALTERNATIVE SOLUTION
// const imdbPath = path.resolve(__dirname, 'lib', 'movies', 'movies.json')
// const rottenTomatoesPath = path.resolve(__dirname, 'lib', 'movies', 'movies.xml')
//
// const imdbPromise = reviewer.getMovieRatingAverage(imdbPath)
// const rottenTomatoPromise = reviewer.getMovieRatingAverage(rottenTomatoesPath)
//
// Promise.all([imdbPromise, rottenTomatoPromise])
//   .then(values => {
//     console.log('Average rating')
//     console.log(`IMDB: ${values[0]}`)
//     console.log(`Rotten Tomatoes: ${values[1]}%`)
//   })
//   .catch(error => console.error(error))
