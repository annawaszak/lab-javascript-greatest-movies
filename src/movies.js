const data = require('./data');

// Iteration 1: All directors? - Get the array of all directors.
function getAllDirectors (arr) {
    return arr.map(film => {
        return film.director;
    })
};

// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors. How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectorsUnified (arr) {
    return arr.filter((director, i, arr) => arr.indexOf(director) === i);
}

// function getAllDirectorsUnified (arr) {
//   const unified = [];
//   for (let i = 0; i < arr.length; i++) {
//       if (!unified.includes(arr[i])) {
//           unified.push(arr[i]);
//       }
//   } 
//   return unified;
// }

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArr) {
  return moviesArr.filter(function (movie) {
    return movie.director === 'Steven Spielberg' && movie.genre.includes('Drama')
  }).length
}


// Iteration 3: All rates average - Get the average of all rates with 2 decimals
function ratesAverage (movies) {
    if (movies.length === 0) return 0;

    const ratesSum = movies.reduce((acc, movie) => {
        if ( !(movie.rate) ) return acc;
        return acc + movie.rate;
    }, 0)
    
    return Number((ratesSum / movies.length).toFixed(2));
};

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesRate (movies) {
    return ratesAverage(movies.filter(function(movie) { 
        return movie.genre.includes("Drama")
    }));
}

// const dramaMoviesRate = (movies) => {
//     let dramas = movies.filter(movie => {
//         return movie.genre.includes('Drama');
//     });

//     if (dramas.length === 0) {
//         return 0;
//     };

//     const dramaRatesSum = dramas.reduce((acc, drama) => {
//         if ( !(drama.rate) ) {
//             return acc;
//         }
//         return acc + drama.rate
//     }, 0);

//     let ratesAverage = Number((dramaRatesSum / dramas.length).toFixed(2))
//     return ratesAverage;
// };



// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(movies) {
    return [...movies].sort(function (a, b) {
      if (a.year == b.year) return a.title.localeCompare(b.title);
      return a.year - b.year;
    });
}

// const orderByYear = (arr) => {
//     const sorted = [...arr].sort((a, b) => {
//         if (a.title > b.title) {
//             return 1;
//         } else if (a.title < b.title) {
//             return -1;
//         } else if (a.year !== b.year) {
//             return a.year - b.year;
//         }
//     })
//     return sorted;
// };

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArr) {
    return moviesArr
    .map(movie => movie.title)
    .sort((name1, name2) => name1.localeCompare(name2))
    .slice(0, 20);
}

// const orderAlphabetically = (movies) => {
//     const alphabeticalTitlesOnly =[...movies].sort((a, b) => {
//         if (a.title > b.title) {
//             return 1;
//         } else if (a.title < b.title) {
//             return -1;
//         }
//     }).map(movie => movie.title)
//     return alphabeticalTitlesOnly.slice(0, 20);
// };

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes (movies) {
    const durationInMins = movies.map(movie => {
      let minutes;
      if (movie.duration.includes(' ')) {
        const split = movie.duration.split(' ').map(element => {
          return element.includes('h') ? Number(element.replace('h', '')) * 60 : Number(element.replace('min', ''));
        })
        minutes = split[0] + split[1]
      } else {
        minutes = ( movie.duration.includes('h') ? Number(movie.duration.replace('h', '')) * 60 : Number(movie.duration.replace('min', '')))
      }
      return movieCopy = {...movie, duration: minutes};
    })
    return durationInMins;
  };

  function turnHoursToMinutes(movies) {
    return movies.map(function (movie) {
      let convertedDuration = 0;
      if (movie.duration.includes('h')) {
          convertedDuration += Number(movie.duration.slice(0, movie.duration.indexOf('h'))) * 60;
      }
      if (movie.duration.includes('min')) {
          convertedDuration += Number(movie.duration.slice(movie.duration.indexOf(' ') + 1, movie.duration.indexOf('m')));
      }
      return { ...movie, duration: convertedDuration };
    });
  }

// BONUS - Iteration 8: Best yearly rate average - Best yearly rate average
function bestYearAvg (movies) {
    if (movies.length === 0) return null;

    let ratingsByYear = {};
  
    movies.forEach(movie => {
        const existingYear = ratingsByYear[movie.year];
        if (!existingYear) {
            ratingsByYear[movie.year] = [movie.rate]
        }
        else ratingsByYear[movie.year].push(movie.rate)
    })  
  
    for (let year in ratingsByYear) {
      ratingsByYear[year] = ratingsByYear[year].reduce((acc, rate) => acc + rate, 0 ) / ratingsByYear[year].length;
    }
      
    let highestRate = Math.max.apply(null, Object.keys(ratingsByYear).map(x => ratingsByYear[x]))
  
    let yearWithHighestRate = Object.keys(ratingsByYear).reduce((result, key) => { 
      if (ratingsByYear[key] === highestRate){ 
        result.push(key); 
      } 
      return result; 
    }, []);
  
    return `The best year was ${yearWithHighestRate} with an average rate of ${highestRate}`
  }

  const bestYearAvg = ar => {
    if (!ar.length) return null;
    const averageRatingsPerYear = [...new Set(ar.map(function (movie) {
        return movie.year
    }))].map(function (year) {
        return {
            year: year,
            rate: ratesAverage(ar.filter(function (movie) {
                return movie.year === year
            }))
        }
    });

    const best = averageRatingsPerYear.sort(function (a, b) {
        if (a.rate === b.rate) {
            return a.year - b.year
        }
        return b.rate - a.rate;
    })[0];
    return `The best year was ${best.year} with an average rate of ${best.rate}`;
} 