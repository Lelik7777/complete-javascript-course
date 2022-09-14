'use strict';
const $btnClosedModal = document.querySelector('.close-modal');
const $btnShowModal = document.querySelectorAll('.show-modal');
const $overlay = document.querySelector('.overlay');
const $modal = document.querySelector('.modal');

console.log($btnShowModal)

function showElement(token) {
    $modal.classList.remove(token);
    $overlay.classList.remove(token);
}

function closeElement(token) {
    $modal.classList.add(token);
    $overlay.classList.add(token);
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
    ev.target.classList.value==='show-modal'&& showElement('hidden');
    ev.target.classList.value==='close-modal'&&closeElement('hidden');
});
// $btnClosedModal.addEventListener('click', () => {
//     closeElement('hidden');
// });


