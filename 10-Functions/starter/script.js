'use strict';

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

book(23, 'luc');
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
document.body.addEventListener('click', high5);
['guillaume', 'Luc', 'Casper'].forEach(high5);

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
