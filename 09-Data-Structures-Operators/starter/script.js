'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery: function ({
    starterIndex = 1,
    mainIndex = 0,
    time = '20:00',
    adress,
  }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${adress} at ${time}`
    );
  },

  orderPasta: function (ing1, ing2, ing3) {
    console.log(`Here is your pasta with ${ing1}, ${ing2}, and ${ing3}`);
  },

  orderPizza: function (mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  },

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },

    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
};

restaurant.numGuests = 0;
const guests = restaurant.numGuests || 10;
console.log(guests);

// nullish: null and undefined (not 0 or '')
const guestCorrect = restaurant.numGuests ?? 10;

// Use any data type, return any data type, short-circuiting // && and || OPERATORS
  // ||
  // ShortCut when the first value is true
  .console
    .log(3 || 'guillaume');
console.log('' || 'guillaume');
console.log(true || 0);
console.log(undefined || null);

console.log(undefined || 0 || '' || 'hello' || 23 || null);

// restaurant.numGuests = 23;
const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1);

const guests2 = restaurant.numGuests || 10;
console.log(guests2);

// &&
// ShortCut when the first value is falsy (so lastOne if not)
console.log(3 && 'guillaume');
console.log('' && 'guillaume');
console.log(true && 0);
console.log(undefined && null);

console.log('hello' && 23 && null && 'guillaume' && 23);

// Pratical example
if (restaurant.orderPizza) {
  restaurant.orderPizza('mushrooms', 'spinach');
}
// equals to :
restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'spinach');

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
