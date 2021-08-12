// WEEK 1 - DAY 3: LAB | Greatest Movies of All Time [MFAP-1]

const movies = require("./data");

// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(movies) {
  let filteredArr = [];
  movies.map(element => {
    if (filteredArr.indexOf(element.director) === -1) { // this 'if statement' solves what is asked in the bonus
      filteredArr.push(element.director);
    }
  });
  return filteredArr;
}


// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(movies) {
  const filteredArr = movies.filter(element => {
    return (element.director === 'Steven Spielberg' && element.genre.includes('Drama'));
  });
  return filteredArr.length; 
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(movies) {
    if (movies.length === 0) return 0; // checking if the array is empty. If it is, returns 0.
    const sum = movies.reduce((accumulator, element) => {
          if (typeof element.score === 'number') return accumulator += element.score;
          else return accumulator; // we need to return the same accumulator when nothing is to be summed.
    }, 0); // accumulator starting in 0
    return parseFloat((sum / movies.length).toFixed(2)); //rounded to 2 decimals places 
}


// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(movies) {
  let dramaCount = 0; // variable to keep track of the total number of drama movies
  const sum = movies.reduce((accumulator, element) => {
    if (element.genre.includes('Drama')) {
      dramaCount++;
      return accumulator += element.score;
    } else return accumulator; // we need to return the same accumulator when nothing is to be summed.
  }, 0); // accumulator starting in 0
  if (sum === 0) return 0; // Returning 0 if there is no Drama movie
  return parseFloat((sum / dramaCount).toFixed(2)); //rounded to 2 decimals places
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(movies) {
  if (movies.length === 0) return []; // checking if the array is empty. If it is, returns [].
  return movies.sort((a, b) => {
    if (a.year === b.year) return a.title.localeCompare(b.title);
    else return a.year - b.year;
  });
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(movies) {
  //if (movies.length === 0) return []; // checking if the array is empty. If it is, returns [].
  const backup = movies;
  const moviesOrdered = backup.sort((a, b) => {
    return a.title.localeCompare(b.title);
  });
  const top20Aplha = []; // new empty array, for storing only the top 20 titles by Alphabetic Order
  moviesOrdered.map((element, index) => {
    if (index < 20) { // 20 for the 0-19's elements, thus max 20.
      top20Aplha.push(element.title);
     }
  });
  return top20Aplha;
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes() {}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg() {}





// The following is required to make unit tests work.
/* Environment setup. Do not modify the below code. */
if (typeof module !== 'undefined') {
  module.exports = {
    getAllDirectors,
    howManyMovies,
    scoresAverage,
    dramaMoviesScore,
    orderByYear,
    orderAlphabetically,
    turnHoursToMinutes,
    bestYearAvg,
  };
}
