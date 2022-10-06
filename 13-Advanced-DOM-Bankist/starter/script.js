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

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal))

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});


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

//scrolling
const $btnScrollTo = document.querySelector('.btn--scroll-to');
const $section1 = document.querySelector('#section--1');
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
