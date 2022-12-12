'use strict';

const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section 😃
  answers: new Array(4).fill(0),
};
///////////////////////////////////////
// Coding Challenge #1

/* 
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
  
  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1". 
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK 😀
*/

// The call and apply methods
const lufhtansa = {
  airline: 'lufthansa',
  iataCode: 'LH',
  bookings: [],
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

lufhtansa.book(59, 'Guillaume');
lufhtansa.book(73, 'Yves');
console.log(lufhtansa);

const euroWings = {
  airline: 'EuroWings',
  iataCode: 'EW',
  bookings: [],
};

const book = lufhtansa.book;

// Does not work
// book(23, 'luc');

// call method
book.call(euroWings, 23, 'Luc');
book.call(lufhtansa, 599, 'Pierre');

const swiss = {
  airline: 'SwissAirlines',
  iataCode: 'LX',
  bookings: [],
};
book.call(swiss, 13165, 'Yves');

//apply method
const flightData = [583, 'Greorges Cooper'];
book.apply(swiss, flightData);
// equals to :
book.call(swiss, ...flightData);

// Bind method
//book.call(euroWings, 23, 'Luc');
const bookEW = book.bind(euroWings);
const bookLH = book.bind(lufhtansa);
const bookLX = book.bind(swiss);
bookEW(1423, 'Steven');

// below we pre set the first parameter of the book function
const bookEW23 = book.bind(euroWings, 23);
bookEW23('Marc');
bookEW23('Jeanne');

// With eventListener
lufhtansa.planes = 300;
lufhtansa.buyPlane = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes);
};
document
  .querySelector('.buy')
  .addEventListener('click', lufhtansa.buyPlane.bind(lufhtansa));

//Partial application (le fait de preSet les paramètres)
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));
const addVAT = addTax.bind(null, 0.23);
//===> addVAT = value => value + value * 0.23;
console.log(addVAT(100));
console.log(addVAT(65));

//functions returning other functions
const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

const greeterHey = greet('hey');
console.log(greeterHey);
greeterHey('Guillaume');
greet('hello')('Pierre'); // ici une fonction qui en retourne une autre et ai directement appelée.

// Arrow function way
const greet2 = greeting => name => console.log(`${greeting} ${name}`);

// CallBack function
const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

// Higher-order function
const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);
  console.log(`Transformed by:${fn.name}`);
};

transformer('Javascript is the best', upperFirstWord);
transformer('Javascript is the best', oneWord);

const high5 = function () {
  console.log('Hi!');
};

// JS uses callBacks all the time
// document.body.addEventListener('click', high5);
// ['guillaume', 'Luc', 'Casper'].forEach(high5);

// Object in fucntion (consequences)
const flight = 'FR317';
const guillaume = {
  name: 'guillaume Breyer',
  passport: 3155954,
};

const checkIN = function (flightNum, passenger) {
  flightNum = 'BE516';
  passenger.name = 'Mr.' + passenger.name;

  if (passenger.passport === 3155954) {
    alert('checkIn');
  } else {
    alert('wrong passport');
  }
};

// checkIN(flight, guillaume);
// // is the same as doing...
// const flightNum = flight;
// const passenger = guillaume;

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 1000000000);
};

// newPassport(guillaume);
// checkIN(flight, guillaume);

// Default parameters in function
const bookings = [];

const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  //   ES5
  //   numPassengers = numPassengers || 1;
  //   price = price || 199;

  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};
createBooking('FR316', 2, 800);
createBooking('FR316', 5);
createBooking('FR316', 1);
createBooking('FR316', undefined, 400); // trick to skip a parameter
