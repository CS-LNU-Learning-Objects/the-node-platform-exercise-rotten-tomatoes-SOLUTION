"use strict";

const fs = require("fs-promise");
const co = require("co");
const xml2js = require("xml2js");

const parseData = (data, format) => {
    return new Promise((resolve, reject) => {
        if (format === "xml") {
            xml2js.parseString(data, (error, result) => {
                if (error) {
                    return reject(error);
                }

                resolve(result.movies.movie);
            });
        } else {
            resolve(JSON.parse(data));
        }
    });
};

const calculateAverage = (movies) => {
    let total = movies
        .map(movie => movie.rating)
        .reduce((sum, rating) => sum + parseFloat(rating), 0);

    return total / movies.length;
};

module.exports = {

    getAverageRating(name, format, file) {
        return co(function*() {
            let data = yield fs.readFile(file);
            let parsedData = yield parseData(data, format);

            let avg = calculateAverage(parsedData);

            console.log(`Average rating ${name}: ${avg}`);

        }).catch(error => console.log(`${name} failed with error: ${error}`));
    }

};