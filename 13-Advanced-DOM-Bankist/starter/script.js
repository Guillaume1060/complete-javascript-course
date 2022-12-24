'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect(); // on récupére les coordonnées de la section

  // console.log('Current scroll(x/y)', window.pageXOffset, window.pageYOffset);
  // console.log(
  //   'height/width viewport',
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // );

  //scrolling (first old version)
  // window.scrollTo(s1coords.left, s1coords.top + window.pageYOffset); // on scroll auto au coordonnées souhaitées

  // (second old version)
  // window.scroll({
  //   left: s1coords.left,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  // (modern version)
  section1.scrollIntoView({ behavior: 'smooth' });
});

/// SELECTING ELEMENTS
// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

// const header = document.querySelector('.header');
// const allSections = document.querySelectorAll('.section'); // return nodeList (no refresh)

// document.getElementById('section--1'); // return HTML collections (refresh)
// const allButtons = document.getElementsByTagName('button');
// console.log(allButtons);

// document.getElementsByClassName('btn'); // return HTML collections (refresh)

// /// CREATING AND INSERTING HTML
// // element.insertAdjacentHTML(position, text); // voir cours

// const message = document.createElement('div');
// message.classList.add('cookie-message');
// // message.textContent =
// //   'we use cookies for improved functionnality and analytics';
// message.innerHTML =
//   'we use cookies for improved functionnality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

// header.prepend(message); // first child
// // header.append(message); // last child (cannot be in both places -> useful to move elt)
// // header.append(message.cloneNode(true)); // methode pour cloner

// // header.before(message); // before header
// // header.after(message); // after header

// // delete elements
// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', () => message.remove());

// /// STYLES
// message.style.backgroundColor = '#37383d'; // only for inline style (style created in html)
// message.style.width = '120%'; // only for inline style (style created in html)
// console.log(getComputedStyle(message).color); // access to all the styles (css &...)
// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

// // access to CSS variables
// document.documentElement.style.setProperty('--color-primary', 'orangered');

// /// ATTRIBUTES
// const logo = document.querySelector('.nav__logo');
// console.log(logo.src); //  access to standard attributes(only) (absolute version, ex:http://127...)
// logo.getAttribute('src'); // access to relative version (ex:img/logo.png)

// logo.alt = 'beautiful minimalist logo'; // we can change the attribute

// console.log(logo.getAttribute('designer')); // access to non-standard attributes
// logo.setAttribute('compagny', 'bankist'); // create attributes

// const link = document.querySelector('.twitter-link');
// console.log(link.href); // return standard attribute
// console.log(link.getAttribute('href')); // return relative attribute

// ///DATA ATTRIBUTES
// // [data-version-number="3.0" --> Add in on html attribute, starting with "data-"]
// console.log(logo.dataset.versionNumber); // return 3.0

// // CLASSES
// logo.classList.add('demo').remove('demo').toggle('demo').contains('demo');
// logo.className = 'demo'; // don't use (delete others classes)
