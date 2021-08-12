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
  const moviesOrdered = [...movies].sort((a, b) => { // spread-syntax of the original array to avoid mutating
    return a.title.localeCompare(b.title);
  });
  const top20Aplha = []; // new empty array, for storing only the top 20 titles by Alphabetic Order
  moviesOrdered.map((element, index) => { // mapping the newly ordered complet array
    if (index < 20) { // 20 for the 0-19's elements, thus max 20.
      top20Aplha.push(element.title);
     }
  });
  return top20Aplha;
}


// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(movies) {
  /* The commented section below was trying once again to fix the test 'should return a new array, 
    not update the original one'. */
    
  // const convertedMovies = [...movies];
  // convertedMovies.map(element => {
  //   // Series of 'if statements' verifying the length of the duration string
  //   if (element.duration.length > 7){  // Treating the case formatted with 'Xh XX min'
  //     let hours = parseInt(element.duration.split('h ')[0]); // obtaining the amount of hours
  //     let minutes = parseInt(element.duration.split('h ')[1].split('min')[0]); // obtaining the amount of minutes
  //     element.duration = (hours * 60 + minutes);
  //   } else if (element.duration.length === 2) { // Treating the case formatted with 'Xh'
  //     let hours = parseInt(element.duration.split('h ')[0]); // obtaining the amount of hours
  //     element.duration = (hours * 60);
  //   } else { // Treating the case with no duration assigned
  //     element.duration = 0;
  //   }
  // });
  // return convertedMovies;

  
  // Actual solution (pass all tests)
  let convertedMovies = [];
  for (let i = 0; i < movies.length; i++) {
    // The i'th element of the convertedMovies reciving the i'th element from movie. Before editing
    convertedMovies[i] = {
      title: movies[i].title,
      year: movies[i].year,
      director: movies[i].director,
      duration: movies[i].duration,
      genre: movies[i].genre,
      score: movies[i].score
    }
    // Series of 'if statements' verifying the length of the duration string
    if (convertedMovies[i].duration.length > 7){  // Treating the case formatted with 'Xh XX min'
      let hours = parseInt(convertedMovies[i].duration.split('h ')[0]); // obtaining the amount of hours
      let minutes = parseInt(convertedMovies[i].duration.split('h ')[1].split('min')[0]); // obtaining the amount of minutes
      convertedMovies[i].duration = (hours * 60 + minutes);
    } else if (convertedMovies[i].duration.length === 2) { // Treating the case formatted with 'Xh'
      let hours = parseInt(convertedMovies[i].duration.split('h ')[0]); // obtaining the amount of hours
      convertedMovies[i].duration = (hours * 60);
    } else { // Treating the case with no duration assigned
      convertedMovies[i].duration = 0;
    }
  }
  return convertedMovies;
}


// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(movies) {
  if (movies.length === 0) return null; // checking if the array is empty. If it is, returns null.
  let obj = { // object to help treat the data
    year: [], // array with all years in number format
    sumScores: [], // sum of scores in that year
    count: [] // array with the count of movies in a given year
  };
  // Maping the whole movies array to an object of arrays
  movies.map(element => {
    if (obj.year.indexOf(element.year) === -1) { // in case the year wasnt add yet
      obj.year.push(element.year);
      obj.sumScores.push(element.score);
      obj.count.push(1);
    } else { // when the current element's year was previously added
      curentObjIndex = obj.year.indexOf(element.year);
      obj.sumScores[curentObjIndex] += element.score;
      obj.count[curentObjIndex]++;
    }
  });
  // Evaluating the final results of the obj
  let topYear = 0;
  let topAvgScore = 0;
  obj.year.map((element, index) => {
    if ((obj.sumScores[index] / obj.count[index]) > topAvgScore) {
        topYear = element;
        topAvgScore = (obj.sumScores[index] / obj.count[index]);
    } else if ((obj.sumScores[index] / obj.count[index]) === topAvgScore) { // in case of a tie
      if (topYear > element) topYear = element; // the topYear will only be updated for the older one
    }
  });
  return `The best year was ${topYear} with an average score of ${topAvgScore}`;
}



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
