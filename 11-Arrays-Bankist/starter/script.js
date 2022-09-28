'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
};

const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
};

const account3 = {
    owner: 'Steven Thomas Williams',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
};

const account4 = {
    owner: 'Sarah Smith',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');


//switch app
document.querySelector('.app').style.opacity = '100';
const displayMovements = (movements) => {
    //вначале обнуляем содержимое контейнера containerMovements
    containerMovements.innerHTML = '';
    movements.forEach((mov, i) => {
        const type = mov > 0 ? 'deposit' : 'withdrawal';
        //create html with data from array account.movements
        const html = `
    <div class="movements__row">
     <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
     <div class="movements__value">${mov}€</div>
    </div>`;
// add to beginning container element html
        containerMovements.insertAdjacentHTML('afterbegin', html);
    });

}
// [200, 450, -400, 3000, -650, -130, 70, 1300],
displayMovements(account1.movements);

const user = 'Steven Thomas Williams';

const convertUser = user => user.owner.split(' ').map(x => x[0].toLowerCase()).join('');
//принимаем массив объектов,пробегаемся по нему forEach и создаем новое свойстов каждому объекту и заполняем его
const createUserNames = (accs) => {
    accs.forEach(acc => {
        // acc.username=acc.owner.split(' ').map(x => x[0].toLowerCase()).join('');
        acc.username = convertUser(acc);
    })
}
console.log(createUserNames(accounts));
console.log(accounts);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
    ['USD', 'United States dollar'],
    ['EUR', 'Euro'],
    ['GBP', 'Pound sterling'],
]);
currencies.forEach((value, key, map) => {
    console.log(`${key}:${value}`);
})
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
//slice()
const arrayLetters = ['a', 'b', 'c', 'd', 'e', 'g', 'f'];
console.log(arrayLetters.slice(1, 3));
console.log(arrayLetters.slice(-2));
console.log(arrayLetters.slice(2, -2));

//splice
//delete last array element
//arrayLetters.splice(-1);
console.log(arrayLetters);

//.at() return string
//get last element
console.log(arrayLetters.at(-1));
console.log('hello'.at(-1));

// array.forEach()
const movements00 = [200, 450, -400, 3000, -650, -130, 70, 1300];

movements00.forEach((x, i, ar) => {
    ar[i] = x + 10;
    //console.log(i);
});
console.log(movements00);

// challenge #1
// TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
// TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]
const arrJul1 = [3, 5, 2, 12, 7];
const arrKate1 = [4, 1, 15, 8, 3];
const arrJul2 = [9, 16, 6, 8, 3];
const arrKate2 = [10, 5, 6, 1, 4];

const checkDogs = (arr1, arr2) => {
    const copy1 = [...arr1];
    copy1.splice(-2)
    copy1.splice(0, 1);
    const arrGen = [...copy1, ...arr2];
    arrGen.forEach((ageDog, i) => {
        console.log(`Dog number ${i + 1} is ${ageDog >= 3 ? `an adult,and is ${ageDog} years old` : `still a puppy 🐶`}`);
    })
}
checkDogs(arrJul1, arrKate1);
console.log('--------------------')
checkDogs(arrJul2, arrKate2);

// map
const movements11 = [200, 450, -400, 3000, -650, -130, 70, 1300];
const eurToUsd = movements11.map(x => `${Math.trunc(x * 1.1)}💲`);
console.log(eurToUsd);