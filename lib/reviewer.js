/**
 * The reviewer module.
 *
 * @module ./lib/reviewer
 * @author Mats Loock
 * @version 1.1.0
 */

'use strict'

// const fs = require('./fs-promise')
const fs = require('fs-extra')
const xml2js = require('xml2js')

/**
 * Gets the movie rating average.
 *
 * @param {string} file The name of the file containing ratings.
 * @returns {Promise<number>} The rating average.
 */
const getMovieRatingAverage = async file => {
  const text = await fs.readFile(file, 'utf8')
  const data = text.startsWith('<?xml')
    ? (await parseXml(text)).movies.movie
    : JSON.parse(text)

  return data.map(m => m.rating).reduce((sum, rating) => sum + Number(rating), 0) / data.length
}

/**
 * Parses a XML string, constructing and returning the JavaScript value or object described by the string.
 *
 * @param {string} text
 * @param {object} options
 * @returns {Promise<object>} The Object corresponding to the given XML text.
 */
const parseXml = (text, options = { explicitArray: false }) => {
  return new Promise((resolve, reject) =>
    xml2js.parseString(text, options, (err, data) => err ? reject(err) : resolve(data))
  )
}

// Exports
module.exports.getMovieRatingAverage = getMovieRatingAverage
module.exports.parseXml = parseXml
