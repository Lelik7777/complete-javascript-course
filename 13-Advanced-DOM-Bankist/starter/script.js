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
    console.log('top section1',s1coord.top);
    // это текущее значение скрола
    console.log('current position pageYOffset',window.pageYOffset);
// поскольку возможен скрол страницы,то top section1 может изменяться,поэтому необходимо использовать выражение,где суммируем top section1 и текущее положение скрола (это нужно делать как по горизонтали,так и по вертикали)
    console.log('real position element on page',s1coord.top+window.pageYOffset);
//old school method
//     window.scrollTo({
//         left:s1coord.left+window.pageXOffset,
//         top:s1coord.top+window.pageYOffset,
//         behavior:'smooth',
//     });
    //modern method
$section1.scrollIntoView({behavior:'smooth'})
});
