'use strict';
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
///////////////////////////////////////
// Modal window

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

//BTN SCROLL
btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect(); // on récupére les coordonnées de la section

  console.log('Current scroll(x/y)', window.pageXOffset, window.pageYOffset);
  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

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

// PAGE NAVIGATION

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// 1. Add event listener to common parent element
// 2. Determine what element originated the event
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  // matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// Tabbed component
tabsContainer.addEventListener('click', function (e) {
  e.preventDefault();
  // matching strategy
  const clicked = e.target.closest('.operations__tab');

  // Guard clause
  if (!clicked) return;

  // Remove actives classes
  tabs.forEach(el => el.classList.remove('operations__tab--active'));
  tabsContent.forEach(el => el.classList.remove('operations__content--active'));
  // Active tab
  clicked.classList.add('operations__tab--active');
  // Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// Menu fade animation
const handleOver = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
      logo.style.opacity = this;
    });
  }
};
// Passing "argument" into handler
nav.addEventListener('mouseover', handleOver.bind(0.5));
nav.addEventListener('mouseout', handleOver.bind(1));

// Sticky navigation
// 1. bad technics :
// const initialCoords = section1.getBoundingClientRect();
// window.addEventListener('scroll', function () {
//   if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });
// 2. good technics :
// Sticky navigation: intersection Obsrerver API
// const obsCallback = function (entries, observer) {
//   // called each time the targetElment (here section1) is intersecting the root element at the treshold defined.
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };
// const obsOptions = {
//   root: null, // the element that the target is intersecting (if null>intersecting entire viewport)
//   treshold: [0, 0.2], // treshold =seuil, plafond when the callBack is called
// };
// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1); // section1 is the target here

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height; // dynamic mesure
const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: [],
  rootMargin: `-${navHeight}px`, // only px so we muste dynamically calculate the height
});
headerObserver.observe(header);

// Reveal sections
const allSections = document.querySelectorAll('section');
const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  console.log(observer);
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
});

// Lazy loading images
const imageTargets = document.querySelectorAll('img[data-src]');
const loadImg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  // replace src with data-src
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};
const imageObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});
imageTargets.forEach(function (image) {
  imageObserver.observe(image);
});

//SLider
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let currentSlide = 0;
  const maxSlide = slides.length;

  // functions
  const createDots = function () {
    slides.forEach((_, i) =>
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      )
    );
  };
  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('.dots__dot--active'));
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('.dots__dot--active');
  };
  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };
  // next slide
  const nextSlide = function () {
    // ici on check si on repasse au slide 1.
    if (currentSlide === maxSlide - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    goToSlide(currentSlide);
    activateDot(currentSlide);
  };
  // prev slide
  const prevSlide = function () {
    // ici on check si on repasse au slide 1.
    if (currentSlide === 0) {
      currentSlide = maxSlide - 1;
    } else {
      currentSlide--;
    }
    goToSlide(currentSlide);
    activateDot(currentSlide);
  };
  const init = function () {
    // initialise au premier slide :
    goToSlide(0);
    createDots();
    activateDot(0);
  };

  init();

  // Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();

// HTML and JS loaded (no images etc..)
document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML Parsed and DOM tree built!', e);
});
// Page totally loaded (images etc..)
document.addEventListener('load', function (e) {
  console.log('Page fully Loaded!', e);
});
// Event before the user quit the page (ex:cross button)
document.addEventListener('beforeunload ', function (e) {
  console.log(e);
  e.returnValue = '';
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

// const h1 = document.querySelector('h1');
// const alert1h = function (e) {
//   alert('addeventlistener: you are reading the heading');
// };
// h1.addEventListener('mouseenter', alert1h);

// setTimeout(() => {
//   h1.removeEventListener('mouseenter', alert1h);
// }, 1000);
// // h1.onmouseenter(function (e) {});

// // rgb (255,255,255)
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);
// const randomColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('LINK', e.target, e.currentTarget);
//   console.log(e.currentTarget === this);

//   //stop propagation
//   e.stopPropagation();
// });
// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('LINK', e.target, e.currentTarget);
// });

// document.querySelector('.nav').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('LINK', e.target, e.currentTarget), true;
//   // here third parameter to cactch the event during the catching (so down) - it's "false" per default
// });

// const h1 = document.querySelector('h1');
// // Going downwards: child
// console.log(h1.querySelectorAll('.highlight')); // All childrens of H1 (all degrees)
// console.log(h1.childNodes); // give nodeList
// console.log(h1.children); // only direct children (first degree) -html collections
// h1.firstElementChild.style.color = 'white'; // première enfant
// h1.lastElementChild.style.color = 'white'; // dernière enfant

// // Going upwards: parents
// console.log(h1.parentNode);
// console.log(h1.parentElement);
// h1.closest('.header').style.background = 'var(--gradient-secondary)';

// // Goind sideways: siblings(fratrie)
// console.log(h1.previousElementSibling); // grand frère précédent
// console.log(h1.nextElementSibling); // frère suivant
// // h1.previousSibling;
// // h1.nextSibling;
// console.log(h1.parentElement.children);
// [...h1.parentElement.children].forEach(function (el) {
//   if (el !== h1) el.style.transform = 'scale(0.5)';
// });
