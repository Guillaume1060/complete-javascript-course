'use strict';
///// How it is created (why we use this.etc...):
// 1. New empty object{} is created
// 2. function is called, this = {}
// 3. {} linked to prototype
// 4. function automatically retur {}

const Person = function (firstName, birthYear) {
  // Instance properties :
  (this.firstName = firstName),
    (this.birthYear = birthYear),
    // Never do this bcse it creates the method for each instances :
    (this.calcAge = function () {
      console.log(2023 - this.birthYear);
    });
};

const jonas = new Person('Jonas', 1991);
const guillaume = new Person('guillaume', 1980);
console.log(guillaume instanceof Person); // True

Person.hey = function () {
  console.log('Hey there 🫥');
};
Person.hey();

///// Prototypes
// ci dessous on ajoute le protoype à Person (et non à l'instance)
Person.prototype.calcAge = function () {
  console.log(2023 - this.birthYear);
};
guillaume.calcAge();
console.log(guillaume.__proto__); // accès à ses prototypes (ici provenant de Person)
console.log(guillaume.__proto__ === Person.prototype); // True
console.log(Person.prototype.isPrototypeOf(guillaume)); // True
console.log(Person.prototype.isPrototypeOf(Person)); // False (BE CAREFULL).
// It could have been called .prototypeOfLinkedObjects

Person.prototype.species = 'Homo Sapiens';
console.log(guillaume.species); // Homo Sapiens (in Person prototypes)
console.log(guillaume.hasOwnProperty('species')); // False (but in Person prototype)

console.log(guillaume.__proto__); // accès à ses prototypes (ici provenant de Person)
// object.prototype (top of prototype chain) :
console.log(guillaume.__proto__.__proto__); // accès au proto de l'objet
console.log(guillaume.__proto__.__proto__.__proto__); // Null

console.dir(Person.prototype.constructor);

const arr = [3, 5, 8, 7, 7, 7, 9, 3]; // new Array === []
console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype); // true
console.log(arr.__proto__.__proto__); // object.prototype
Array.prototype.unique = function () {
  return [...new Set(this)];
};
console.log(arr.unique());

const h1 = document.querySelector('h1');
console.dir(x => x + 1);

///////////////////////////////////////
// Coding Challenge #1

/* 
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h

GOOD LUCK 😀
*/

// const Car = function (make, speed) {
//   (this.make = make), (this.speed = speed);
// };

// Car.prototype.accelerate = function () {
//   this.speed += 10;
//   console.log(`${this.make} going at ${this.speed}`);
// };
// Car.prototype.brake = function () {
//   console.log(`${this.make} going at ${this.speed - 5}`);
// };

// const car1 = new Car('BMW', 120);
// const car2 = new Car('Mercedes', 95);

// console.log(car1);
// car1.accelerate();
// car1.accelerate();
// car1.accelerate();
// car1.brake();
// console.log(car2);
// car2.accelerate();
// car2.brake();

/// ES6 CLASSES

// 1. Classes are NOT hoisted (can't be used before they are declared)
// 2. Class are first-class citizes (can passed them into functions and return them from functions) AS functions.
// 3. Classes are executed in strict mode
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }
  // Methods will be added to .prototype property
  calcAge() {
    console.log(2037 - this.birthYear);
  }
  greet = function () {
    console.log(`Hey ${this.firstName}`);
  };
  get fullName() {
    return this._fullName;
  }
  // set a property that already exists
  set fullName(name) {
    console.log(name);
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name`);
  }

  // static method
  static hey() {
    console.log('Hey there 🫥');
  }
}
const jessica = new PersonCl('Jessica Breyer', 1980);
jessica.calcAge();
console.log(jessica.age);
// PersonCl.prototype.greet = function () {
//   console.log(`Hey ${this.firstName}`);
// };
jessica.greet();

const walter = new PersonCl('walter white', 71);

/// Getters & Setters (are not functions/methods but properties)
const account = {
  owner: 'Guillaume',
  movements: [120, 30, 90, 65],
  get latest() {
    return this.movements.slice(-1).pop();
  },
  set latest(mov) {
    this.movements.push(mov);
  },
};
console.log(account.latest); // without ()
account.latest = 50;
console.log(account.latest);

// //// Static Methods
// // Functions attached to constructor (it is not in the prototype)
// Array.from(); // the function from array's constructor
// // [1,2,3].from() // not possible (it is not a method)
// Number.parseFloat(); // Other exmaple
// //

// Object.create()
const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(name, birthYear) {
    (this.name = name), (this.birthYear = birthYear);
  },
};
// PersoneProto becomes the prototype of the new object
const steven = Object.create(PersonProto);
steven.name = 'Steven';
steven.birthYear = '1976';
steven.calcAge(); // 61

const sarah = Object.create(PersonProto);
sarah.init('Sarah', 1910);
sarah.calcAge();

// Coding Challenge #2

/* 
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h 
(but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h

GOOD LUCK 😀
*/

// class Car2 {
//   constructor(brand, speed) {
//     (this.brand = brand), (this.speed = speed);
//   }

//   accelerate() {
//     this.speed += 10;
//     console.log(`${this.brand} going at ${this.speed}`);
//   }
//   brake() {
//     console.log(`${this.brand} going at ${this.speed - 5}`);
//   }
//   get speedUS() {
//     return this.speed / 1.6;
//   }
//   set speedUS(speed) {
//     this.speed = speed * 1.6;
//   }
// }

// const ford = new Car2('ford', 120);
// console.log(ford);
// console.log(ford.speedUS);
// ford.speedUS = 50;
// console.log(ford);

//// Inheritance between classes
const Person3 = function (firstName, birthYear) {
  (this.firstName = firstName), (this.birthYear = birthYear);
};
Person3.prototype.calcAge = function () {
  console.log(2031 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
  Person.call(this, firstName, birthYear);
  this.course = course;
};

// Linking prototypes
Student.prototype = Object.create(Person3.prototype);

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and i study ${this.course}`);
};

const mike = new Student('Mike', 2010, 'Computer Science');
mike.introduce();
mike.calcAge();

Student.prototype.constructor = Student;

// Coding Challenge #3

/* 
1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. 
Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. 
Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';

DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/
// const Car = function (make, speed) {
//   this.make = make;
//   this.speed = speed;
// };

// Car.prototype.accelerate = function () {
//   this.speed += 10;
//   console.log(`${this.make} is going at ${this.speed} km/h`);
// };

// Car.prototype.brake = function () {
//   this.speed -= 5;
//   console.log(`${this.make} is going at ${this.speed} km/h`);
// };

// const Ev = function (make, speed, charge) {
//   Car.call(this, make, speed);
//   this.charge = charge;
// };

// Ev.prototype = Object.create(Car.prototype);

// Ev.prototype.chargeBattery = function (chargeTo) {
//   this.charge = chargeTo;
// };
// Ev.prototype.accelerate = function () {
//   this.speed += 20;
//   this.charge -= 1;
//   console.log(
//     `${this.make} going at ${this.speed} km/h, with a charge of ${this.charge}%`
//   );
// };

// 4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%).
// Notice what happens when you 'accelerate'! HINT: Review the definiton of polymorphism 😉
// const teslab = new Ev('Teslab', 120, 23);

// teslab.accelerate();
// teslab.brake();
// teslab.chargeBattery(90);

// const bmw = new Car('BMW', 120);
// const mercedes = new Car('Mercedes', 95);

// bmw.accelerate();
// bmw.accelerate();
// bmw.brake();
// bmw.accelerate();

/// Inheritance with ES6 Classes

class PersonCl1 {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }
  calcAge() {
    console.log(2037 - this.birthYear);
  }
  get age() {
    return 2037 - this.birthYear;
  }
  greet = function () {
    console.log(`Hey ${this.firstName}`);
  };
  get fullName() {
    return this._fullName;
  }
  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name`);
  }
  static hey() {
    console.log('Hey there 🫥');
  }
}
class StudentCl1 extends PersonCl1 {
  constructor(fullName, birthYear, course) {
    // Super Always need to append first! (create the this)
    super(fullName, birthYear);
    this.course = course;
  }
  introduce() {
    console.log(`My name is ${this.fullName} and i study ${this.course}`);
  }
  calcAge() {
    console.log(`I am ${2031 - this.birthYear} years old, but still studying`);
  }
}
const martha = new StudentCl1('Martha Black', 2012, 'Computer science');
martha.introduce();
martha.calcAge();

// Object.create()
const PersonProto2 = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(name, birthYear) {
    (this.name = name), (this.birthYear = birthYear);
  },
};
const StudentProto = Object.create(PersonProto2);
StudentProto.init = function (name, birthYear, course) {
  PersonProto2.init.call(this, name, birthYear);
  this.course = course;
};

StudentProto.introduce = function () {
  console.log(`My name is ${this.name} and i study ${this.course}`);
};

const jay = Object.create(StudentProto);
jay.init('Jay', 2010, 'Computer science');
jay.introduce();
jay.calcAge();

///

// 1) Public fields
// 2) Private fields
// 3) Public methods
// 4) Private methods
// (there is also the static version of each)
class Account {
  // 1) Public fields (instances)
  locale = navigator.language;

  // 2) Private fields (instances)
  #movements = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin;
    // this._movements = [];
    // this.locale = navigator.language;

    console.log(`Thanks for opening an account, ${owner}`);
  }
  // 3) Public methods (no changes)
  // Public interface
  getMovements() {
    return this.#movements;
  }

  deposit(value) {
    this.#movements.push(value);
    return this;
  }
  withdraw(value) {
    this.deposit(-value);
    return this;
  }
  requestLoan(value) {
    if (this._approveLoan(value)) {
      this.deposit(value);
      console.log(`Loan approved `);
      return this;
    }
  }
  // 4) Private methods (# not yet functionnal -> browser sees it as property)
  //  #approveLoan(value) {
  _approveLoan(value) {
    return true;
  }
}
const acc1 = new Account('Jonas', 'EUR', 1111);
acc1.deposit(250);
acc1.withdraw(190);
console.log(acc1);

// Chaining
acc1.deposit(300).deposit(500).withdraw(55).requestLoan(200).withdraw(300);

// Coding Challenge #4

/* 
1. Re-create challenge #3, but this time using ES6 classes: create an 'EVCl' child class of the 'CarCl' class
2. Make the 'charge' property private;
3. Implement the ability to chain the 'accelerate' and 'chargeBattery' methods of this class, 
and also update the 'brake' method in the 'CarCl' class. They experiment with chining!


GOOD LUCK 😀
*/
class Car {
  constructor(brand, speed) {
    this.brand = brand;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.brand} going at ${this.speed}`);
    return this;
  }
  brake() {
    this.speed -= 5;
    console.log(`${this.brand} going at ${this.speed}`);
    return this;
  }
  get speedUS() {
    return this.speed / 1.6;
  }
  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

class EV extends Car {
  #charge;
  constructor(brand, speed, charge) {
    super(brand, speed);
    this.#charge = charge;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }
  accelerate() {
    this.speed += 20;
    this.#charge -= 1;
    console.log(
      `${this.brand} going at ${this.speed} km/h, with a charge of ${
        this.#charge
      }%`
    );
    return this;
  }
}

// DATA CAR 1: 'Rivian' going at 120 km/h, with a charge of 23%
const rivian = new EV('Rivian', 120, 23);
console.log(rivian);
rivian
  .accelerate()
  .accelerate()
  .accelerate()
  .brake()
  .chargeBattery(50)
  .accelerate();
console.log(rivian);
