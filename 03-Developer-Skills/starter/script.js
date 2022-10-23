// Remember, we're gonna use strict mode in all scripts now!
'use strict';

// const temperatures = [3, -2, -6, -1, 'error', 9, 13, 17, 15, 14, 9, 5];
// const temperatures2 = [3, -2, 6, -1, 'error', 9, 13, -37, 15, -14, 9, 5];

// const calcTempAmplitude = function (temps, temps2) {
//   const cleanArray = temps.filter(Number);
//   const cleanArray2 = temps2.filter(Number);
//   const mergedArray = [...cleanArray, ...cleanArray2];
//   console.log(mergedArray);
//   const max = Math.max(...mergedArray);
//   const min = Math.min(...mergedArray);
//   console.log(max, min);
//   console.log(max - min);
// };

// const result = calcTempAmplitude(temperatures, temperatures2);

// console.warn();
// console.error();
// console.table();

///////////////////////////////////////
// Coding Challenge #1

/*
Given an array of forecasted maximum temperatures, the thermometer displays a string with these temperatures.

Example: [17, 21, 23] will print "... 17ºC in 1 days ... 21ºC in 2 days ... 23ºC in 3 days ..."

Create a function 'printForecast' which takes in an array 'arr' and logs a string like the above to the console.

Use the problem-solving framework: Understand the problem and break it up into sub-problems!

TEST DATA 1: [17, 21, 23]
TEST DATA 2: [12, 5, -5, 0, 4]
*/

const data1 = [17, 21, 23];
const data2 = [12, 5, -5, 0, 4];

function printForecast(arr) {
  var print = '';
  for (var i = 0; i < arr.length; i++) {
    print += `... ${arr[i]}°C in ${i + 1} days`;
  }
  console.log(print);
}

printForecast(data1);
printForecast(data2);
