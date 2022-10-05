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
})