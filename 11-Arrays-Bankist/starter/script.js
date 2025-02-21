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

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div> 
      <div class="movements__value">${mov} €</div>
    </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance} €`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes} €`;

  const outcomes = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(outcomes)} €`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((acc, int) => acc + int, 0);

  labelSumInterest.textContent = `${interest} €`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);
  // Display balance
  calcDisplayBalance(acc);
  // Display summary
  calcDisplaySummary(acc);
};

// Event handler
let currentAccount;
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and welcome message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // clearInputFields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';
  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // add movement
    currentAccount.movements.push(amount);
    // update ui
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    accounts.splice(index, 1);

    // Clean
    inputCloseUsername.value = inputClosePin.value = '';
    // Hide UI
    containerApp.style.opacity = 0;
  }
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// Empty Arrays + Fill method
const x = new Array(7); // create an array length(7) empty
x.fill(1); // we fill it [1,1,1,1,1,1]
x.fill(2, 3, 5); // we fill with 1 from index 3 to 5 // [1,1,1,2,2,1,1]

// Array.from method
const y = Array.from({ length: 7 }, (_, i) => i + 1); // [1,2,3,4,5,6,7]
console.log(y);

labelBalance.addEventListener('click', function (e) {
  e.preventDefault();
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace(' €', ''))
  );

  // ci dessous une technique différente pour transformer une nodeList en tableau
  const movementsUI2 = [...document.querySelectorAll('.movements__value')];
  console.log(movementsUI);
});
// includes -> equality
console.log(movements.includes(-130)); // return true/false
// SOME method -> condition if one mov is > 0
const anyDeposit = movements.some(mov => mov > 0); // return true/false
// EVERY method -> condition if all mov are > 0
const allDesposit = movements.every(mov => mov > 0); // return true/false
// separate callBack
const deposit = mov => mov > 0;
movements.some(deposit);
movements.every(deposit);
movements.filter(deposit);
movements.some(deposit);

// the FLAT method
const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat()); // [1,2,3...,7,8] -> one level deep (by default)
const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat(2)); // [1,2,3...,7,8] -> two(as parameter) level deep

// flat
const overalBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);

// flatMap
// const overalBalance2 = accounts
//   .flatmap(acc => acc.movements)
//   .reduce((acc, mov) => acc + mov, 0);

// SORTING
// 1. strings
const owners = ['jonas', 'zack', 'adam', 'martha'];
console.log(owners.sort()); // mutation, no new array

// 2. numbers
// return < 0, A,B (keep order)
// return > 0, B,A (switch order)
movements.sort((a, b) => a - b);
// same as :
// if (a > b) return 1;
// if (a < b) return -1;
console.log(movements);
// The find Method
const firtWithdrawal = movements.find(mov => mov < 0);
console.log(firtWithdrawal);

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);
/// REDUCE METHOD
//
// accumulateur -> SNOWBALL
const balance = movements.reduce(function (acc, cur, i, arr) {
  return acc + cur;
}, 0);
// below same in arrow function :
const balance2 = movements.reduce((acc, cur) => acc + cur, 0);

// Maximum value
const max = movements.reduce(
  (acc, mov) => (acc > mov ? acc : mov),
  movements[0]
);
console.log(max);
// MAP METHOD

// const eurToUsd = 1.1;
// const movementsUSD = movements.map(mov => mov * eurToUsd);

// const movementsUSDfor = [];
// for (const mov of movements) {
//   movementsUSDfor.push(mov * eurToUsd);
// }

// const movementsDescriptions = movements.map(
//   (mov, i, arr) =>
//     `movement:${i + 1}, You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
//       mov
//     )}`
// );

// console.log(movementsDescriptions);

/// FILTER METHOD
// const deposits = movements.filter(function (mov) {
//   return mov > 0;
// });

// console.log(deposits);

// const withdrawals = movements.filter(mov => mov < 0);
// console.log(withdrawals);

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
// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// currencies.forEach(function (value, key, map) {
//   console.log(`${key}: ${value}`);
// });

// // SET
// const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
// console.log(currenciesUnique);
// currenciesUnique.forEach(function (value, _, map) {
//   console.log(`${value}: ${value}`);
// });

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age,
 and stored the data into an array (one array for each). 
 For now, they are just interested in knowing whether a dog is an adult or a puppy. 
 A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'),
 and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs!
 So create a shallow copy of Julia's array, and remove the cat ages from that copied array 
 (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old")
 or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
// */

// function checkDogs(array1, array2) {
//   let correctedArray = array1.slice(1, -2);
//   console.log(correctedArray);
//   let completeArray = [...correctedArray, ...array2];
//   console.log(completeArray);

//   completeArray.forEach(function (AgeDog, i) {
//     if (AgeDog >= 3) {
//       console.log(
//         `Dog number ${i + 1} is an adult, and is ${AgeDog} years old`
//       );
//     } else {
//       console.log(`Dog number ${i + 1} is still a puppy 🐶`);
//     }
//   });
// }

// // function calcAverageHumanAge (ages) {

// // }

// const juliaArray = [3, 5, 2, 12, 7];
// const kateArray = [4, 1, 15, 8, 3];

// // // TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

// checkDogs(juliaArray, kateArray);

// // Coding Challenge #2
// /*
// Let's go back to Julia and Kate's study about dogs. This time,
// they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

// Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'),
// and does the following things in order:

// 1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge.
// If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
// 2. Exclude all dogs that are less than 18 human years old
// (which is the same as keeping dogs that are at least 18 years old)
// 3. Calculate the average human age of all adult dogs
// (you should already know from other challenges how we calculate averages 😉)
// 4. Run the function for both test datasets

// TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
// TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

// GOOD LUCK 😀

// */

// // Array methods practice
// //1.
// const bankDepositSum = accounts
//   .map(acc => acc.movements)
//   .flat()
//   .filter(mov => mov > 0)
//   .reduce((acc, cur) => acc + cur, 0);

// console.log(bankDepositSum);

// //2.
// // const numDeposits1000 = accounts
// //   .map(acc => acc.movements)
// //   .flat()
// //   .filter(mov => mov > 1000).length;

// const numDeposits1000 = accounts
//   .map(acc => acc.movements)
//   .flat()
//   .reduce((count, cur) => (cur >= 1000 ? ++count : count), 0);

// console.log(numDeposits1000);

// // prefixed operator ++
// let a = 10;
// console.log(a++); // 10
// console.log(a); // 11
// let b = 10;
// console.log(++b); // 11

// //3.
// const { deposits, withdrawals } = accounts
//   .map(acc => acc.movements)
//   .flat()
//   .reduce(
//     (sums, cur) => {
//       // cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur);
//       sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur;
//       return sums;
//     },
//     { deposits: 0, withdrawals: 0 }
//   );
// console.log(deposits, withdrawals);

// //4.
// // this is a nice title -> This Is a Nice Title
// const convertTitleCase = function (title) {
//   const capitzalize = str => str[0].toUpperCase() + str.slice(1);
//   const exceptions = ['a', 'the', 'an', 'but', 'or', 'in', 'with'];
//   const titleCase = title
//     .toLowerCase()
//     .split(' ')
//     .map(word => (exceptions.includes(word) ? word : capitzalize(word)))
//     .join(' ');
//   return capitzalize(titleCase);
// };
// console.log(convertTitleCase('this is a nice title'));
// console.log(convertTitleCase('this is a LONG title but not too long'));
// console.log(convertTitleCase('and here is another title with an EXMAPLE'));
// ///////////////////////////////////////
// Coding Challenge #4

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger 
than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within 
a range 10% above and 10% below the recommended portion (see hint).



HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

// TEST DATA:
// */
// const dogs = [
//   { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
//   { weight: 8, curFood: 200, owners: ['Matilda'] },
//   { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
//   { weight: 32, curFood: 340, owners: ['Michael'] },
// ];

// const eating = dog => {
//   if (dog.curFood > dog.recommendedFood * 1.1) {
//     console.log(
//       `The dog of ${dog.owners[0]} & ${dog.owners[1]} eats too much (${dog.curFood}g i/o ${dog.recommendedFood}g)`
//     );
//     dog.isEatingTooMuch = true;
//     dog.isEatingNotEnough = false;
//   } else if (dog.curFood < dog.recommendedFood * 0.9) {
//     console.log(`The dog of ${dog.owners[0]} eats not enough`);
//     dog.isEatingTooMuch = false;
//     dog.isEatingNotEnough = true;
//   } else {
//     console.log(`The dog of eats well`);
//     dog.isEatingTooMuch = false;
//     dog.isEatingNotEnough = false;
//   }
// };
// // 1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion
// // and add it to the object as a new property. Do NOT create a new array, simply loop over the array.
// // Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
// let ownersOfDogs = [];
// dogs.forEach(function (dog, i, arr) {
//   dog.recommendedFood = Math.trunc(dog.weight ** 0.75 * 28);
//   ownersOfDogs.push(dog.owners);
//   eating(dog);
// });
// ownersOfDogs = ownersOfDogs.flat();

// // 2. Find Sarah's dog and log to the console whether it's eating too much or too little.
// // HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array,
// // and so this one is a bit tricky (on purpose) 🤓
// const dogSarah = dogs.find(
//   acc => acc.owners[0] === 'Sarah' || acc.owners[1] === 'Sarah'
// );
// eating(dogSarah);

// // 3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch')
// //  and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
// const ownersEatTooMuch = dogs
//   .filter(dog => dog.curFood > dog.recommendedFood)
//   .map(dog => dog.owners)
//   .flat();
// const ownersEatTooLittle = dogs
//   .filter(dog => dog.curFood < dog.recommendedFood)
//   .map(dog => dog.owners)
//   .flat();

// console.log(ownersEatTooMuch);
// console.log(ownersEatTooLittle);

// // 4. Log a string to the console for each array created in 3.,
// // like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
// console.log(
//   `${ownersEatTooMuch[0]} and ${ownersEatTooMuch[1]} and ${ownersEatTooMuch[2]}'s dogs eat too much!`
// );
// console.log(
//   `${ownersEatTooLittle[0]} and ${ownersEatTooLittle[1]} and ${ownersEatTooLittle[2]}'s dogs eat too little!`
// );

// // 5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended
// //  (just true or false)
// const anyPerfectDog = dogs.some(dog => dog.curFood === dog.recommendedFood);
// console.log(anyPerfectDog);

// // 6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
// const anyOkayDog = dogs.some(
//   dog => !dog.isEatingNotEnough && !dog.isEatingTooMuch
// );
// console.log(anyOkayDog);

// // 7. Create an array containing the dogs that are eating an OKAY amount of food
// // (try to reuse the condition used in 6.)
// const ArrayOfOkDogs = dogs.filter(
//   dog => !dog.isEatingNotEnough && !dog.isEatingTooMuch
// );
// console.log(ArrayOfOkDogs);

// // 8. Create a shallow copy of the dogs array
// // and sort it by recommended food portion in an ascending order
// // (keep in mind that the portions are inside the array's objects)
// console.log(dogs);
// const shadowArray = dogs
//   .slice()
//   .sort((a, b) => a.recommendedFood - b.recommendedFood);
// console.log(shadowArray);
