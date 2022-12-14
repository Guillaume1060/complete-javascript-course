'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// SLICE Method
// // New array, no mutation
// let arr = ['a', 'b', 'c', 'd', 'e'];
// console.log(arr.slice(2)); // c,d,e
// console.log(arr.slice(2, 4)); // c,d
// console.log(arr.slice(-2)); // d,e
// console.log(arr.slice(-1)); // e
// console.log(arr.slice(1, -2)); // b,c
// console.log(arr.slice()); // shadow copy
// console.log(...arr); // shadow copy

// // SPLICE METHOD
// // Mutate the original array
// console.log(arr.splice(2)); // c,d,e
// console.log(arr); // a,b
// arr.splice(-1); // permet de supprimet le dernier élément
// arr = ['a', 'b', 'c', 'd', 'e'];
// arr.splice(1, 2); // a,d,e (position,numberOfDeletedElement)

// // REVERSE METHOD
// // Mutate the original array
// arr = ['a', 'b', 'c', 'd', 'e'];
// const arr2 = ['j', 'i', 'h', 'g', 'f'];
// arr2.reverse(); // f,g,h,i,j

// // CONCAT METHOD
// // no mutation
// const letters = arr.concat(arr2); // a,b,c,...i,j
// const lettersBis = [...arr, ...arr2]; // same result

// // JOIN METHOD
// console.log(letters.join(' - ')); // a - b - c -... - j

// // AT METHOD
// arr = [23, 11, 64];
// console.log(arr[0]); // 23
// console.log(arr.at(0)); // 23
// console.log(arr[arr.length - 1]); // 64 (last element)
// console.log(arr.slice(-1)[0]); // 64 (last element)
// console.log(arr.at(-1)); // 64 (last element)
// console.log('Guy'.at(0)); // G (fonctionne également sur les strings)

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// FOR OF LOOP
// for (const movement of movements) {
// for (const [i, movement] of movements.entries()) {
//   if (movement > 0) console.log(`Movement:${i + 1}, You deposited ${movement}`);
//   if (movement < 0)
//     console.log(`Movement:${i + 1}, You withdrew ${Math.abs(movement)}`);
// }

// // FOR EACH LOOP (uses callBack functions) + can access easely to index, array
// movements.forEach(function (mov, i, arr) {
//   if (mov > 0) console.log(`movement:${i + 1}, You deposited ${mov}`);
//   if (mov < 0) console.log(`movement:${i + 1}, You withdrew ${Math.abs(mov)}`);
// });
// 0: function(200)
// 1: function(450)
// etc...

// MAP
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

// SET
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);
currenciesUnique.forEach(function (value, _, map) {
  console.log(`${value}: ${value}`);
});
