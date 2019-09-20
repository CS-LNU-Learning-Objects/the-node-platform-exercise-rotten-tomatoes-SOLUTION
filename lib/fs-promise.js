/**
 * The fs-promise module.
 *
 * @module ./lib/fs-promise
 * @author Mats Loock
 * @version 1.1.0
 */

'use strict'

const fs = require('fs')

/**
 * Reads the entire contents of a file.
 *
 * @param {string} path
 * @param {Object|string} options
 * @returns {Promise<string|Buffer>} The content of the file.
 */
const readFile = (path, options) => {
  return new Promise((resolve, reject) =>
    fs.readFile(path, options, (err, data) => err ? reject(err) : resolve(data))
  )
}

// Exports
module.exports.readFile = readFile
