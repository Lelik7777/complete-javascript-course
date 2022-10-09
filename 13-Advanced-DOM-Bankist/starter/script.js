'use strict';

///////////////////////////////////////
// Modal window
////////////////////////////////////////////////////////////////
//variables
//for modal
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
//for tabbed component
const $tabContainer = document.querySelector('.operations__tab-container');
const $operationsTab = document.querySelectorAll('.operations__tab');
const $operationsContent = document.querySelectorAll('.operations__content');
// navigation
const $nav = document.querySelector('.nav');
//for scrolling
const $btnScrollTo = document.querySelector('.btn--scroll-to');
const $section1 = document.querySelector('#section--1');
//for sticky navigation
const $header = document.querySelector('.header');
//reveal sections
const $sections = document.querySelectorAll('.section');
//lazy loading images
const $lazyImages = document.querySelectorAll('img[data-src]');


/////////////////////////////////////////////////////////////////
//functions modal
const openModal = function (e) {
    e.preventDefault();
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal))

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});
//////////////////////////////////////////////////////////////////
//building tabbed component

$tabContainer.addEventListener('click', function (e) {
    const click = e.target.closest('.operations__tab');
    // guard   clause
    if (!click) return;

    //remove activity for tab and content
    $operationsTab
        .forEach(t => t.classList.remove('operations__tab--active'));
    $operationsContent
        .forEach(c => c.classList.remove('operations__content--active'));

    //add activity
    click.classList.add('operations__tab--active');
    document
        .querySelector(`.operations__content--${click.dataset.tab}`)
        .classList.add('operations__content--active');
});

/////////////////////////////////////////////////////////////////

//change opacity on links for navigation
const navCl = '.nav';
const navLinkCl = '.nav__link';

function handleForOpacity(e) {
    //проверка нажали ли на ссылку или нет
    if (e.target.classList.contains('nav__link')) {
        const link = e.target;
        const siblings = link.closest(navCl).querySelectorAll(navLinkCl);
        const logo = link.closest(navCl).querySelector('img');
        siblings.forEach(sib => {
            if (sib !== link) {
                //this здесь это то,что принимает в качестве одного лишь "аргумента" bind()
                sib.style.opacity = this;
            }
            logo.style.opacity = this;
        })
    }
}

$nav.addEventListener('mouseover', handleForOpacity.bind(0.5));
$nav.addEventListener('mouseout', handleForOpacity.bind(1));

/////////////////////////////////////////////////

//to set up sticky navigation by scrolling
//1. bad effect on performance
// const topSec1 = $section1.getBoundingClientRect().top;
// window.addEventListener('scroll', function () {
//     if (window.pageYOffset>topSec1) $nav.classList.add('sticky');
//     else $nav.classList.remove('sticky');
// })

//2.  more effective method- using intersection Observer API

//example how work observer
// const observer = new IntersectionObserver((entries, observer) => {
//     entries.forEach(entry => console.log(entry));
// }, {root: null, threshold: [0, .2]});
// observer.observe($section1);

//make sticky nav
//in array entries залетает все значения из threshold
const stickyNav = (entries) => {
    const [entry] = entries;

    if (!entry.isIntersecting) $nav.classList.add('sticky')
    else $nav.classList.remove('sticky');
    // console.log(entry);

}
const observer = new IntersectionObserver(stickyNav, {
    root: null,
    threshold: 0,
    rootMargin: `-${$nav.getBoundingClientRect().height}px`
});
observer.observe($header);

// reveal sections
const revealSection = (entries, observer) => {
    const [entry] = entries;
    //console.log(entry)
    if (!entry.isIntersecting) return;
    entry.target.classList.remove('section--hidden');
    //получается, что нам нужно лишь один раз осуществить наблюдение за элементом и после мы можем удалить наблюдателя,чтобы улучшить производительность
    observer.unobserve(entry.target);
}
const observerSec = new IntersectionObserver(revealSection, {
    root: null,
    threshold: .14,
});
$sections.forEach(section => {
    observerSec.observe(section);
    section.classList.add('section--hidden');
});

//lazy loading images
const toLazyImage = (entries, observer) => {
    const [entry] = entries;
    //guard clause
    if (!entry.isIntersecting) return;
    entry.target.src = entry.target.dataset.src;
    //чтобы эффект замены картинок с плохим качеством на картинки с хорошим не был заметен, то снимаем размытость только после загрузки картинки с хорошим качеством!
    entry.target.addEventListener('load',()=>entry.target.classList.remove('lazy-img'));
    //remove observer
    observer.unobserve(entry.target);
}
const observerLazyImg = new IntersectionObserver(toLazyImage, {
    root: null,
    threshold: 0,
    //чтобы ускорить немного загрузку картинок с хорошим качеством
    rootMargin:`200px`,
});
$lazyImages.forEach(img => observerLazyImg.observe(img));

//////////////////////////////////////////////////////////////////
//learning

//
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);
//create,append and remove element message

const message = document.createElement('div');
message.innerHTML = `We use cookie for more functionality <button class="btn btn--close--cookie">Got it</button>`;
message.classList.add('cookie-message');
document.querySelector('.header').append(message);
document.querySelector('.btn--close--cookie').addEventListener('click', () => {
    message.remove();
});

//
console.log(getComputedStyle(message).height);
console.log(getComputedStyle(message).width);
console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).background);
///////////////////////

//scrolling

$btnScrollTo.addEventListener('click', function () {
    const s1coord = $section1.getBoundingClientRect();
    // top section1 - это расстояние от верхнего края view port до элемента
    console.log('top section1', s1coord.top);
    // это текущее значение скрола
    console.log('current position pageYOffset', window.pageYOffset);
// поскольку возможен скрол страницы,то top section1 может изменяться,поэтому необходимо использовать выражение,где суммируем top section1 и текущее положение скрола (это нужно делать как по горизонтали,так и по вертикали)
    console.log('real position element on page', s1coord.top + window.pageYOffset);
//old school method
//     window.scrollTo({
//         left:s1coord.left+window.pageXOffset,
//         top:s1coord.top+window.pageYOffset,
//         behavior:'smooth',
//     });
    //modern method
    $section1.scrollIntoView({behavior: 'smooth'})
});

// listen event
//modern and using
const $h1 = document.querySelector('h1');
$h1.addEventListener('click', function () {
    console.log('you press on h1 ')
});
//old method
$h1.onclick = function () {
    console.log('you click on h1 by second method');
};
//////////////////////
// event propagation

const randomColor = function (min, max) {
    const random = Math.floor(Math.random() * (max - min) + 1) + min;
    return `rgb(${random},${random},${random})`
}
//слушаем элемент,где создаем клик
document.querySelector('.nav__link').addEventListener('click', function (e) {
    console.log('link ', e.target, e.currentTarget);
    console.log(this === e.currentTarget);

});
//слушаем родительский элемент
document.querySelector('.nav__links').addEventListener('click', function (e) {
    console.log('links ', e.target, e.currentTarget);

})
//слушаем следующий родительский элемент
document.querySelector('.nav').addEventListener('click', function (e) {
    console.log('nav ', e.target, e.currentTarget);
    // e.stopPropagation();
    ///this.style.backgroundColor = randomColor(0, 255);
    // const id=e.target.getAttribute('href');
    // console.log(e.target.href)
    // document.querySelector(id).scrollIntoView({behavior:'smooth'});
    // e.preventDefault();

}, false);

//event delegation
//get parent element and add event handler
document.querySelector('.nav__links').addEventListener('click', function (e) {
    e.preventDefault();
    if (e.target.classList.contains('nav__link')) {
        const id = e.target.getAttribute('href');
        document.querySelector(id).scrollIntoView({behavior: 'smooth'});
    }
})

////////////////////
//  DOM Traversing
let h1 = document.querySelector('h1');
//
// // Going downwards: child
// console.log(h1.querySelectorAll('.highlight'));//!!!!!!
// h1.querySelectorAll('.highlight').forEach(x => console.log(x));
// console.log(h1.childNodes);
// console.log(h1.children);//!!!!!!!
// console.log([...h1.children]);
// h1.firstElementChild.style.color = 'white';//!!!!!!!
// h1.lastElementChild.style.color = 'orangered';//!!!!!!!
//
// // Going upwards: parents
// console.log(h1.parentNode);
// console.log(h1.parentElement);//!!!!!!!!!
//
// h1.closest('.header').style.background = 'var(--gradient-secondary)';
// //!!!!!!!!!
// h1.closest('h1').style.background = 'var(--gradient-primary)';
//
// // Going sideways: siblings
// console.log(h1.previousElementSibling);//!!!!!!!
// console.log(h1.nextElementSibling);//!!!!!!!!!!!!!
//
// console.log(h1.previousSibling);
// console.log(h1.nextSibling);
//
// //life hack
// console.log(typeof h1.parentElement.children);
// [...h1.parentElement.children].forEach(function (el) {
//     if (el !== h1) el.style.transform = 'scale(0.5)';
// });
// //show all siblings after h1
// while (h1) {
//     console.log(h1.nextElementSibling ?? 'that`s all');
//     h1 = h1.nextElementSibling;
// }

//passing 'argument' into handler
function f(e) {
    console.log('this', this);
    console.log('e', e.target)
    //e.target.style.color=this[0];
    //e.target.style.backgroundColor=this[1];
}

h1.addEventListener('click', f.bind(['red', 'yellow']));