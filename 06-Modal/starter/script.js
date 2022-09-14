'use strict';
//const $btnClosedModal = document.querySelector('.close-modal');
//const $btnShowModal = document.querySelectorAll('.show-modal');
const $overlay = document.querySelector('.overlay');
const $modal = document.querySelector('.modal');
const arrElements = [$modal, $overlay];

function showElement(arr, token) {
    arr.forEach(x => {
        x.classList.remove(token);
    })
}

function closeElement(arr, token) {
    arr.forEach(x => {
        x.classList.add(token);
    })
}

// for (const el of $btnShowModal) {
//     console.log(el)
//     el.addEventListener('click', () => {
//         showElement('hidden');
//
//     });
// }
//моя реализация всплытия события и его поимка на уровне body с проверкой
// имени класса элемента,где это событие возникло
document.body.addEventListener('click', (ev) => {
    ev.target.classList.value === 'show-modal' && showElement(arrElements, 'hidden');
    //use method .contains that more better for reading and understanding
    ev.target.classList.contains('close-modal') && closeElement(arrElements, 'hidden');
    //implement closing modal window when click outside the this one
    ev.target.classList.contains('overlay') && closeElement(arrElements, 'hidden');
});
// $btnClosedModal.addEventListener('click', () => {
//     closeElement('hidden');
// });
document.body.addEventListener('keydown', (ev) => {
    ev.code === 'Escape' && closeElement(arrElements, 'hidden');
});



