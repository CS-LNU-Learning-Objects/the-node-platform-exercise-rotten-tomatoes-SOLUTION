/**
 * The starting point of the application.
 *
 * @author Mats Loock
 * @version 1.1.0
 */

'use strict'

const { resolve } = require('path')
const reviewer = require('./lib/reviewer')

;(async () => {
  try {
    const imdbPath = resolve('movies.json')
    const rottenTomatoesPath = resolve('movies.xml')

    const imdbPromise = reviewer.getMovieRatingAverage(imdbPath)
    const rottenTomatoPromise = reviewer.getMovieRatingAverage(rottenTomatoesPath)

    const [imdb, rottenTomato] = await Promise.all([imdbPromise, rottenTomatoPromise])

    console.log('Average rating')
    console.log(`IMDB: ${imdb}`)
    console.log(`Rotten Tomatoes: ${rottenTomato}%`)
  } catch (error) {
    console.error(error)
  }
})()

// const imdbPath = resolve('movies.json')
// const rottenTomatoesPath = resolve('movies.xml')

// const imdbPromise = reviewer.getMovieRatingAverage(imdbPath)
// const rottenTomatoPromise = reviewer.getMovieRatingAverage(rottenTomatoesPath)

// Promise.all([imdbPromise, rottenTomatoPromise])
//   .then(values => {
//     console.log('Average rating')
//     console.log(`IMDB: ${values[0]}`)
//     console.log(`Rotten Tomatoes: ${values[1]}%`)
//   })
//   .catch(error => console.error(error))
