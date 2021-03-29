const data = require('./data');

// Iteration 1: All directors? - Get the array of all directors.
const getAllDirectors = (arr) => {
    const directors = arr.map(film => {
        return film.director;
    })
    return directors;
};

console.log(getAllDirectors(data));

// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors. How could you "clean" a bit this array and make it unified (without duplicates)?

const getAllDirectorsUnified = (arr) => {
    return arr.filter((director, i, arr) => arr.indexOf(director) === i);

    // ALTERNATIVE
    // const unified = [];
    // for (let i = 0; i < arr.length; i++) {
    //     if (!unified.includes(arr[i])) {
    //         unified.push(arr[i]);
    //     }
    // } 
    // return unified;
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?



// Iteration 3: All rates average - Get the average of all rates with 2 decimals
const ratesAverage = (movies) => {
    if (movies.length === 0) return 0;

    const ratesSum = movies.reduce((acc, movie) => {
        if ( !(movie.rate) ) return acc;
        return acc + movie.rate;
    }, 0)
    
    let ratesAverage = Number(ratesSum / movies.length).toFixed(2);
    return ratesAverage;
};


// Iteration 4: Drama movies - Get the average of Drama Movies

const dramaMoviesRate = (movies) => {
    return ratesAverage(moviesArr.filter(function(movie) { 
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
const orderByYear = (arr) => {
    const sorted = [...arr].sort((a, b) => {
        if (a.title > b.title) {
            return 1;
        } else if (a.title < b.title) {
            return -1;
        } else if (a.year !== b.year) {
            return a.year - b.year;
        }
    })
    return sorted;
};

function orderByYear(movies) {
    return [...movies].sort(function (a, b) {
      if (a.year == b.year) return a.title.localeCompare(b.title);
      return a.year - b.year;
    });
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles

function orderAlphabetically(moviesArr) {
    let listOfMoviesName = moviesArr.map(function(movie) { return movie.title });

    return listOfMoviesName.sort(function(name1, name2) {
        return name1.localeCompare(name2);
    }).slice(0, 20);
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

const turnHoursToMinutes = (movies) => {
    const moviesCopy = [...movies];
    const durationInMins = moviesCopy.map(movie => {
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

// BONUS - Iteration 8: Best yearly rate average - Best yearly rate average

const bestYearAvg = (movies) => {
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
  
    return `The best year was ${highestRate} with an average rate of ${yearWithHighestRate}`
  }

  