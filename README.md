# Rotten Tomatoes

[Explanation](#explanation)

In this exercise, you will get started with a simple node application. The application will read from two files, one JSON file, and one XML file.

The files contain famous movie titles and some metadata about those movies. You are supposed to write an application that reads the data from the files and calculates the average rating of the movies. The data in the JSON file stems from [IMDB](http://www.imdb.com/), whereas the XML file stems from [Rotten Tomatoes](http://www.rottentomatoes.com/). One average is calculated for the IMDB data and one average for the Rotten Tomatoes data. (The focus of this exercise is promises and callbacks, not calculating stuff.)

### Example use and output

```shell
$ npm start

Average rating
IMDB: 9.08
Rotten Tomatoes: 94.8 %
```

Let's get started!

## <a name="explaination"></a> Explaination
### app.js
```js
const imdbPath = resolve(__dirname, 'lib', 'movies', 'movies.json')
const rottenTomatoesPath = resolve(__dirname, 'lib', 'movies', 'movies.xml')
```
The `path` module's `resolve` is used to create an absolute path to the movie files.

```js
const imdbPromise = getMovieRatingAverage(imdbPath)
const rottenTomatoPromise = getMovieRatingAverage(rottenTomatoesPath)
```
These paths are then used as arguments to `getMovieRatingAverage` which returns the movie average as a promise.

```js
const [imdb, rottenTomato] = await Promise.all([imdbPromise, rottenTomatoPromise])
```
`Promise.all` allow you to `await` both promises in parallel. This is a good idea to do if the next request doesn't depend on the result of the previous promise. `Promise.all` returns an array of the resolved promises in the order that they were. In other words, we know that the first item in the array is the average of IMDB, and the second is the average of Rotten Tomatoes.
With that in mind, we can use deconstructing to name the values instead of using the index in the array as an identifier. `imdb` is arguably easier to understand than `average[0]`.

## fs-promise.js
This module wraps the `fs.readFile` function in a promise. This allows you to use `async/await` instead of having to use [callbacks](https://codeburst.io/javascript-what-the-heck-is-a-callback-aba4da2deced).

## reviewer.js
```js
const parser = new Parser({ explicitArray: false })
```
Creating an `xml2js` parser.

```js
const text = await readFile(path, 'utf8')
```
We are using our own `readFile` to read the file that was provided as an argument. In this case, it will be a `String`.

```js
const data = text.startsWith('<?xml')
    ? (await parser.parseStringPromise(text)).movies.movie
    : JSON.parse(text)
```
`String` has a method called `startsWith`; this allows you to check if the string starts with a specific text. In this case, we check if the text starts with `<?xml`. If it does, we know it is XML. Then we can use the parser to parse the XML string to an object that has an array in `.movies.movie`. If it isn't an XML, we know that the text is JSON, and we can use `JSON.parse` to get an array with movies. Either way, the array of movies will be stored as `data`.

```js
return data
    .map(m => m.rating)
    .reduce((sum, rating) => sum + Number(rating), 0) / data.length
```
The movie objects contains a property called `rating`. This is the one we are interested in. `data.map(m => m.rating)` will pick the value from the ratings and return a new array of numbers. In other words, we will turn the array of `MovieObject` to an array of `Number`. `[MovieObject] -> [Number]`

The reduce method will sum the ratings starting at `0`. `Number(rating)` is used to turn eventual number-like strings to numbers. This will result in the sum of all ratings. To get the number of ratings, we use `data.length`. In pseudo-code this is `totalRating / numberOfRatings`.
