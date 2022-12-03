'use strict';

// // Data needed for a later exercise
// const flights =
//   '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// const openingHours = {
//   thu: {
//     open: 12,
//     close: 22,
//   },
//   fri: {
//     open: 11,
//     close: 23,
//   },

//   sat: {
//     open: 0, // Open 24 hours
//     close: 24,
//   },
// };
// // Data needed for first part of the section
// const restaurant = {
//   name: 'Classico Italiano',
//   location: 'Via Angelo Tavanti 23, Firenze, Italy',
//   categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
//   starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
//   mainMenu: ['Pizza', 'Pasta', 'Risotto'],

//   //ES6 enhanced object literals
//   openingHours,
//   // (i/o > openingHours : openingHours)

//   order(starterIndex, mainIndex) {
//     return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
//   },

//   orderDelivery({ starterIndex = 1, mainIndex = 0, time = '20:00', adress }) {
//     console.log(
//       `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${adress} at ${time}`
//     );
//   },

//   orderPasta(ing1, ing2, ing3) {
//     console.log(`Here is your pasta with ${ing1}, ${ing2}, and ${ing3}`);
//   },

//   orderPizza(mainIngredient, ...otherIngredients) {
//     console.log(mainIngredient);
//     console.log(otherIngredients);
//   },
// };

// const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
// for (const [i, el] of menu.entries()) {
//   console.log(`${i + 1}: ${el}`);
// }

// const rest1 = {
//   name: 'Capri',
//   numGuests: 20,
// };

// const rest2 = {
//   name: 'La piazza',
//   owner: 'Rosy',
// };

// // OR assignement operator
// rest1.numGuests = rest1.numGuests || 10;
// rest2.numGuests = rest2.numGuests || 10;
// // equals to : (it assigns first condition if it's true. If not, the second one)
// rest1.numGuests ||= 10;
// rest2.numGuests ||= 10;
// // but be carefull because 0 is considered falsy
// // below solution with the NULLISH assignement operator : (null or undefined)
// rest1.numGuests ??= 10;
// rest2.numGuests ??= 10;

// // && assignement operator
// rest1.owner = rest1.owner && '<ANONYMOUS>'; // RETURN UNDEFINED
// rest2.owner = rest2.owner && '<ANONYMOUS>'; // RETURN <ANONYMOUS>
// // equals to :
// rest1.owner && '<ANONYMOUS>';
// rest2.owner && '<ANONYMOUS>';

// restaurant.numGuests = 0;
// const guests = restaurant.numGuests || 10;
// console.log(guests);

// // nullish: null and undefined (not 0 or '')
// const guestCorrect = restaurant.numGuests ?? 10;

// // Use any data type, return any data type, short-circuiting // && and || OPERATORS
// // ||
// // ShortCut when the first value is true
// console.log('' || 'guillaume');
// console.log(true || 0);
// console.log(undefined || null);

// console.log(undefined || 0 || '' || 'hello' || 23 || null);

// // restaurant.numGuests = 23;
// const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
// console.log(guests1);

// const guests2 = restaurant.numGuests || 10;
// console.log(guests2);

// // &&
// // ShortCut when the first value is falsy (so lastOne if not)
// console.log(3 && 'guillaume');
// console.log('' && 'guillaume');
// console.log(true && 0);
// console.log(undefined && null);

// console.log('hello' && 23 && null && 'guillaume' && 23);

// // Pratical example
// if (restaurant.orderPizza) {
//   restaurant.orderPizza('mushrooms', 'spinach');
// }
// // equals to :
// restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'spinach');

///////////////////////////////////////
// Rest pattern and rest parameters

// 1) DESTRUCTURING
// SPREAD, because on RIGHT side of =
// const arr = [1, 2, ...[3, 4]];

// // REST, because on LEFT side of =
// const [a, b, ...others] = [1, 2, 3, 4, 5];
// console.log(a, b, others);

// // (rest element must be the last element)
// const [pizza, , Risotto, ...otherFood] = [
//   ...restaurant.mainMenu,
//   ...restaurant.starterMenu,
// ];
// console.log(pizza, Risotto, otherFood);

// // OBJECTS
// const { sat, ...weekDays } = restaurant.openingHours;
// console.log(weekDays);

// // 2) FUNCTIONS
// const add = function (...numbers) {
//   let sum = 0;
//   for (let i = 0; i < numbers.length; i++) sum += numbers[i];
//   console.log(sum);
// };

// add(2, 3);
// add(2, 3, 5, 8, 7);
// add(2, 3, 65, 59, 13, 5);

// const x = [23, 5, 7];
// add(...x); // Here is spread

// restaurant.orderPizza('mushrooms', 'onions', 'olives', 'spinach');

///////////////////////////////////////
// The Spread Operator
// const arr = [7, 8, 9];
// const badNewArr = [1, 2, arr[0], arr[1], arr[2]];
// console.log(badNewArr);

// const newArr = [1, 2, ...arr];
// console.log(newArr); /// [1,2,7,8,9]

// console.log(...newArr); /// 1 2 7 8 9

// const newMenu = [...restaurant.mainMenu, 'Gnocci'];
// console.log(newMenu);

// // Copy Array
// const mainMenuCopy = [...restaurant.mainMenu];

// // Join 2 or more Arrays
// const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

// // iterables :arrays,strings, maps, sets. NOT objects
// const str = 'Jonas';
// const letters = [...str, '', 'S.'];
// console.log(letters);

// // real world example
// const ingredients = [
//   // prompt("Let's make pasta! Ingredient1 ?"),
//   // prompt("Let's make pasta! Ingredient2 ?"),
//   // prompt("Let's make pasta! Ingredient3 ?"),
// ];
// console.log(ingredients);

// restaurant.orderPasta(...ingredients);

// // objects
// const newRestaurant = { foundedIn: 1989, ...restaurant, founder: 'Guiseppe' };

// const restaurantCopy = { ...restaurant };
// restaurantCopy.name = 'Ristorante Roma';
// console.log(restaurant.name); // NAMES ARE DIFFERENTS BCS WE MADE A COPY
// console.log(restaurantCopy.name); // NAMES ARE DIFFERENTS

///////////////////////////////////////
// Destructuring Objects
// const { name, openingHours, categories } = restaurant;

// const {
//   name: restaurantName,
//   openingHours: hours,
//   categories: tags,
// } = restaurant;
// console.log(restaurantName, hours, tags);

// // default values
// const { menu = [], starterMenu: starters = [] } = restaurant;

// // mutating variables
// let a = 111;
// let b = 999;
// const obj = {
//   a: 23,
//   b: 7,
//   c: 14,
// };
// ({ a, b } = obj); //we use parantheses bcs we cannot start with {}
// console.log(a, b);

// // nested objects
// const {
//   fri: { open: o, close: c },
// } = openingHours;
// console.log(o, c);

// restaurant.orderDelivery({
//   time: '22:30',
//   adress: 'Via del sole, 21',
//   mainIndex: 2,
//   starterIndex: 2,
// });

// restaurant.orderDelivery({
//   adress: 'Via del sole, 21',
//   starterIndex: 1,
// });

///////////////////////////////////////
// Destructuring Arrays
// const arr = [2, 3, 4];
// const a = arr[0];
// const b = arr[1];
// const c = arr[2];

// const [x, y, z] = arr;
// console.log(x, y, z);

// let [main, , secondary] = restaurant.categories;
// console.log(main, secondary);

// // SWITCHING VARIABLES
// // const temp = main;
// // main = secondary;
// // secondary = temp;
// // console.log(main, secondary);

// [main, secondary] = [secondary, main];
// // console.log(main, secondary);

// // receive 2 return values from a function
// const [starter, mainCourse] = restaurant.order(2, 0);

// // nested destructuring
// const nested = [2, 4, [5, 6]];
// // const [i, , j] = nested;
// const [i, , [j, k]] = nested;

// // default values
// const [p = 1, q = 1, r = 1] = [8, 9];

// Coding Challenge #1

// We're building a football betting app (soccer for my American friends 😅)!

// Suppose we get data from a web service about a certain game (below). In this challenge we're gonna work with the data. So here are your tasks:

// TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored

// GOOD LUCK 😀

// // 1. Create one player array for each team (variables 'players1' and 'players2')
// const [players1, players2] = game.players;
// console.log(players1, players2);

// // 2. The first player in any player array is the goalkeeper
// // and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name,
// //  and one array ('fieldPlayers') with all the remaining 10 field players
// const [gk, ...fieldPlayers] = players1;

// // 3. Create an array 'allPlayers' containing all players of both teams (22 players)
// const allPlayers = [...players1, ...players2];
// console.log(allPlayers);

// // 4. During the game, Bayern Munich (team 1) used 3 substitute players.
// // So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
// const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
// console.log(players1Final);

// // 5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
// // const { team1, draw, team2 } = game.odds;
// const { team1: team1, x: draw, team2: team2 } = game.odds;
// console.log(team1);
// console.log(draw);
// console.log(team2);

// // 6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array)
// // and prints each of them to the console,
// // along with the number of goals that were scored in total (number of player names passed in)
// const printGoals = function (...players) {
//   console.log(players.length);
// };

// printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');
// printGoals('Lewandowski', 'Kimmich');

// 7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.

///////////////////////////////////////
// Coding Challenge #2

/* 
  Let's continue with our football betting app!
  
  
  
  
  
  
  
  BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
  {
    Gnarby: 1,
    Hummels: 1,
    Lewandowski: 2
  }
  
  GOOD LUCK 😀
  */

// const game = {
//   team1: 'Bayern Munich',
//   team2: 'Borrussia Dortmund',
//   players: [
//     [
//       'Neuer',
//       'Pavard',
//       'Martinez',
//       'Alaba',
//       'Davies',
//       'Kimmich',
//       'Goretzka',
//       'Coman',
//       'Muller',
//       'Gnarby',
//       'Lewandowski',
//     ],
//     [
//       'Burki',
//       'Schulz',
//       'Hummels',
//       'Akanji',
//       'Hakimi',
//       'Weigl',
//       'Witsel',
//       'Hazard',
//       'Brandt',
//       'Sancho',
//       'Gotze',
//     ],
//   ],
//   score: '4:0',
//   scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
//   date: 'Nov 9th, 2037',
//   odds: {
//     team1: 1.33,
//     x: 3.25,
//     team2: 6.5,
//   },
//   Gnarby: 1,
//   Hummels: 1,
//   Lewandowski: 2,
// };

// console.log(game.scored.entries()); // ARRAY ITERATOR (l'objet doit donc être le contenant d'un tableau)
// console.log(Object.entries(game.date)); // Créé un tableau de tableau(keys,values) de l'objet (tout type)
// // console.log(Object.entries(game.scored));
// // // 1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
// // for (const [key, goal] of Object.entries(game.scored)) {
// //   let goalNumber = parseInt(key);
// // //   console.log(`Goal ${goalNumber + 1}: ${goal}`);
// // // }

// // for (const [test, test2] of game.scored.entries()) {
// //   console.log(test);
// //   console.log(test2);
// // }

// // 2. Use a loop to calculate the average odd and log it to the console
// // (We already studied how to calculate averages, you can go check if you don't remember)
// // for (const match of Object.entries(game)) {
// //   console.log(match);
// // }

// // 3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
// // Odd of victory Bayern Munich: 1.33
// // Odd of draw: 3.25
// // Odd of victory Borrussia Dortmund: 6.5
// // // Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉
// // for (const [key, odd] of Object.entries(game.odds)) {
// //   const team = game[key] ?? 'odd';
// //   console.log(`Odd of victory ${team}: ${odd}`);
// // }

// ///////////////////////////////////////
// // Coding Challenge #3

// /*
// Let's continue with our football betting app! This time, we have a map with a log of the events that happened during the game. The values are the events themselves, and the keys are the minutes in which each event happened (a football game has 90 minutes plus some extra time).

// GOOD LUCK 😀
// */
// const gameEvents = new Map([
//   [17, '⚽️ GOAL'],
//   [36, '🔁 Substitution'],
//   [47, '⚽️ GOAL'],
//   [61, '🔁 Substitution'],
//   [64, '🔶 Yellow card'],
//   [69, '🔴 Red card'],
//   [70, '🔁 Substitution'],
//   [72, '🔁 Substitution'],
//   [76, '⚽️ GOAL'],
//   [80, '⚽️ GOAL'],
//   [92, '🔶 Yellow card'],
// ]);

// // 1. Create an array 'events' of the different game events that happened (no duplicates)
// const event = [...gameEvents.values()];
// console.log(event);
// // 2. After the game has finished, is was found that the yellow card from minute 64 was unfair.
// //  So remove this event from the game events log.
// gameEvents.delete(64);
// console.log(gameEvents);

// // 3. Print the following string to the console: "An event happened, on average, every 9 minutes"
// // //  (keep in mind that a game has 90 minutes)
// // const time = 90;
// // console.log(
// //   gameEvents.get(time > rest.get('open') && time < rest.get('close'))
// // );
// // 4. Loop over the events and log them to the console,
// // marking whether it's in the first half or second half (after 45 min) of the game, like this:
// // [FIRST HALF] 17: ⚽️ GOAL
// for (const [min, event] of gameEvents) {
//   let half = min < 45 ? '[FIRST HALF]' : '[SECOND HALF]';
//   console.log(`${half} ${min} ${event}`);
// }

///////////////////////////////////////
// Coding Challenge #4

/* 
// Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.

// The input will come from a textarea inserted into the DOM (see code below), and conversion will happen when the button is pressed.

// THIS TEST DATA (pasted to textarea)
underscore_case
 first_name
Some_Variable 
  calculate_AGE
delayed_departure

// SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
// underscoreCase      ✅
// firstName           ✅✅
// someVariable        ✅✅✅
// calculateAge        ✅✅✅✅
// delayedDeparture    ✅✅✅✅✅

// HINT 1: Remember which character defines a new line in the textarea 😉
// HINT 2: The solution only needs to work for a variable made out of 2 words, like a_b
// HINT 3: Start without worrying about the ✅. Tackle that only after you have the variable name conversion working 😉
// HINT 4: This challenge is difficult on purpose, so start watching the solution in case you're stuck. Then pause and continue!


/* Creating a textarea and a button. It is also adding an event listener to the button. */
document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

const text = document.querySelector('textarea').value;

document.querySelector('button').addEventListener('click', function () {
  const text = document.querySelector('textarea').value;
  const rows = text.split('\n');
  console.log(rows[0].replace('_', ' '));
  console.log(rows[1].replace('_', ' '));
  console.log(rows[2].replace('_', ' '));
  console.log(rows[3].replace('_', ' '));
  console.log(rows[4].replace('_', ' '));
});
