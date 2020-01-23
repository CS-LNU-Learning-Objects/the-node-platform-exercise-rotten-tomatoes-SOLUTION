/**
 * The fs-promise module.
 *
 * @module lib/fs-promise
 * @author Mats Loock
 * @version 1.0.0
 */

'use strict'

const fs = require('fs')

/**
 * Reads the entire contents of a file.
 *
 * @param {string} path - The file to read.
 * @param {string|object} options - Either the encoding for the result,
 * or an object that contains the encoding and an optional flag.
 * @param {string} [options.encoding=null] - The encoding.
 * @param {string} [options.flag=r] - The flag.
 * @returns {Promise<string|Buffer>} The content of the file.
 */
const readFile = (path, options) => {
  return new Promise((resolve, reject) =>
    fs.readFile(path, options, (err, data) => err
      ? reject(err)
      : resolve(data)
    )
  )
}

// Exports
module.exports.readFile = readFile
