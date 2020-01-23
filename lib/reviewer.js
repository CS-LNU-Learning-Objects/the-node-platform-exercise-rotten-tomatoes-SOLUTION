/**
 * The reviewer module.
 *
 * @module lib/reviewer
 * @author Mats Loock
 * @version 1.0.0
 */

'use strict'

const { readFile } = require('fs-extra')
const { Parser } = require('xml2js')

/**
 * Gets the movie rating average.
 *
 * @param {string} path - The file containing ratings.
 * @returns {Promise<number>} The rating average.
 */
const getMovieRatingAverage = async path => {
  const parser = new Parser({ explicitArray: false })
  const text = await readFile(path, 'utf8')
  const data = text.startsWith('<?xml')
    ? (await parser.parseStringPromise(text)).movies.movie
    : JSON.parse(text)

  return data
    .map(m => m.rating)
    .reduce((sum, rating) => sum + Number(rating), 0) / data.length
}

// Exports
module.exports.getMovieRatingAverage = getMovieRatingAverage
