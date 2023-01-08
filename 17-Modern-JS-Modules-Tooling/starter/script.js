// // Importing modules
// import { addToCart, totalPrice as price, qt } from './shoppingCart.js';
// addToCart('bread', 5);
// console.log(price, qt);
// console.log('importing module');
// console.log(shippingCost);

// // ici on créé un objet avec tous les imports
// import * as ShoppingCart from './shoppingCart.js';
// console.log(ShoppingCart);
// ShoppingCart.addToCart('bread', 5);

// // import from default export (we can name it as we want)
// import add from './shoppingCart.js';
// add('bread', 5);

// const res = await fetch('https://jsonplaceholder.typicode.com/posts');
// const data = await res.json();
// console.log(data);
// console.log('something');
const getLastPost = async function () {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await res.json();
  return { title: data.at(-1).title, text: data.at(-1).body };
};

// Not very clean
// const lastPost = getLastPost().then(last => console.log(last));

// Bette with top Level Await (no need to use then)
// const lastPost2 = await getLastPost();
// console.log(lastPost2);

const shoppingCart2 = (function () {
  const cart = [];
  const shippingCost = 10;
  const totalPrice = 237;
  const totalQuantity = 23;

  const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} added to the cart`);
  };

  const orderStock = function (product, quantity) {
    console.log(`${quantity} ${product} ordered from supplier`);
  };

  return {
    addToCart,
    cart,
    totalPrice,
    totalQuantity,
  };
})();

shoppingCart2.addToCart('bread', 5);
shoppingCart2.addToCart('pizzas', 2);
console.log(shoppingCart2); // No acces

///////////////////////////////////////
// Introduction to NPM
// import cloneDeep from './node_modules/lodash-es/cloneDeep.js';
import cloneDeep from 'lodash-es';
console.log('coucou2');

// Parcel
if (module.hot) {
  module.hot.accept();
}
