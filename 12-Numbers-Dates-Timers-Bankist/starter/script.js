'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
    interestRate: 1.2, // %
    pin: 1111,

    movementsDates: [
        '2019-11-18T21:31:17.178Z',
        '2019-12-23T07:42:02.383Z',
        '2020-01-28T09:15:04.904Z',
        '2020-04-01T10:17:24.185Z',
        '2020-05-08T14:11:59.604Z',
        '2020-05-27T17:01:17.194Z',
        '2022-10-03T10:36:17.929Z',
        '2022-10-02T10:51:36.790Z',
    ],
    currency: 'EUR',
    locale: 'pt-PT', // de-DE
};

const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,

    movementsDates: [
        '2019-11-01T13:15:33.035Z',
        '2019-11-30T09:48:16.867Z',
        '2019-12-25T06:04:23.907Z',
        '2020-01-25T14:18:46.235Z',
        '2020-02-05T16:33:06.386Z',
        '2022-04-10T14:43:26.374Z',
        '2022-06-25T18:49:59.371Z',
        '2022-07-26T12:01:20.894Z',
    ],
    currency: 'USD',
    locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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

/////////////////////////////////////////////////
// Functions
// using constructor new Intl for create format for date to display
const formatDateAuto = (date, locale, movem = true) => {
    //?????????????????? ?????????????? ???????? ?????????? ?????????????? ?????????? ?? ?????????? ??????????????
    const daysRange = (date1, date2) => {
        //    debugger
        const range = date1 - date2;
        return Math.floor(Math.abs(range / (1000 * 60 * 60 * 24)));
    }
    const time = daysRange(new Date(), date);
    const options = {
        minute: 'numeric',
        hour: 'numeric',
        day: 'numeric',
        month: 'numeric',//can 'long'
        year: 'numeric',
        weekday: 'short'//can 'long' or 'numeric' or 'narrow'
    }
    //i can get local from browser
    //locale=navigator.language;

    //for display movements

    if (movem) {
        if (time === 0) return 'today';
        if (time === 1) return 'yesterday';
        if (time <= 7) return `${time} days ago`;
        return new Intl.DateTimeFormat(locale, options).format(date)
//for display date current balance
    } else {
        return new Intl.DateTimeFormat(locale, options).format(date);
    }

}
// function for formatting currency
const formatCurrency = (value, locale, currency) => {
    const options = {
        style: 'currency',
        currency
    };
    return new Intl.NumberFormat(locale, options).format(value)
}

//manually create format for date
function formatDate(date, move = true) {
    const daysRange = (date1, date2) => {
        //    debugger
        const range = date1 - date2;
        return Math.floor(Math.abs(range / (1000 * 60 * 60 * 24)));
    }
    const time = daysRange(new Date(), date);
    console.log(time)
    const addZero = value => String(value).padStart(2, 0);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    if (move) {
        if (time === 0) return 'today';
        if (time === 1) return 'yesterday';
        if (time <= 7) return `${time} days ago`;
        return `${addZero(day)}/${addZero(month)}/${year} ${addZero(hour)}:${addZero(minute)}`;

    } else {
        return `${addZero(day)}/${addZero(month)}/${year} ${addZero(hour)}:${addZero(minute)}`;
    }

}

const displayMovements = function (acc, sort = false) {
    containerMovements.innerHTML = '';
    const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;

    movs.forEach(function (mov, i) {
        const type = mov > 0 ? 'deposit' : 'withdrawal';
        const dateMove = formatDateAuto(new Date(acc.movementsDates[i]), acc.locale);
        const html = `
      <div class="movements__row">
      
        <div class="movements__type movements__type--${type}">${
            i + 1
        } ${type}</div>
        <div class="movements__date">${dateMove}</div>
        <div class="movements__value">${formatCurrency(mov, acc.locale, acc.currency)}</div>
      </div>
    `;

        containerMovements.insertAdjacentHTML('afterbegin', html);
    });
};

const calcDisplayBalance = function (acc) {
    acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
    labelBalance.textContent = formatCurrency(acc.balance, acc.locale, acc.currency);
};

const calcDisplaySummary = function (acc) {
    const incomes = acc.movements
        .filter(mov => mov > 0)
        .reduce((acc, mov) => acc + mov, 0);
    labelSumIn.textContent = formatCurrency(incomes, acc.locale, acc.currency);

    const out = acc.movements
        .filter(mov => mov < 0)
        .reduce((acc, mov) => acc + mov, 0);
    labelSumOut.textContent = formatCurrency(Math.abs(out), acc.locale, acc.currency);

    const interest = acc.movements
        .filter(mov => mov > 0)
        .map(deposit => (deposit * acc.interestRate) / 100)
        .filter((int, i, arr) => {
            // console.log(arr);
            return int >= 1;
        })
        .reduce((acc, int) => acc + int, 0);
    labelSumInterest.textContent = formatCurrency(interest, acc.locale, acc.currency);
};

const createUsernames = function (accs) {
    accs.forEach(function (acc) {
        acc.username = acc.owner
            .toLowerCase()
            .split(' ')
            .map(name => name[0])
            .join('');
    });
};
createUsernames(accounts);

const updateUI = function (acc) {
    // Display movements
    displayMovements(acc);

    // Display balance
    calcDisplayBalance(acc);

    // Display summary
    calcDisplaySummary(acc);
};

const setLogOut = () => {
    //set time
    let time = 120;
    //get minutes and seconds in needed format

    timer = setInterval(() => {
        let minute = String(Math.trunc(time / 60)).padStart(2, 0);
        let second = String(time % 60).padStart(2, 0);
        //pass into app
        labelTimer.textContent = `${minute}:${second}`;

        if (time <= 0)
        {
            clearInterval(timer)
            containerApp.style.opacity = '0';
            labelWelcome.textContent = 'Log in to get started';
        }
        time--;
    }, 1000);

    return timer;
}
///////////////////////////////////////
// Event handlers
//Fake always logged in
let currentAccount, timer;


btnLogin.addEventListener('click', function (e) {
    // Prevent form from submitting
    e.preventDefault();

    currentAccount = accounts.find(
        acc => acc.username === inputLoginUsername.value
    );
    console.log(currentAccount);

    if (currentAccount?.pin === Number(inputLoginPin.value)) {
        // Display UI and message
        labelWelcome.textContent = `Welcome back, ${
            currentAccount.owner.split(' ')[0]
        }`;
        containerApp.style.opacity = 100;

        // Clear input fields
        inputLoginUsername.value = inputLoginPin.value = '';
        inputLoginPin.blur();

        //add date under current balance
        const date = new Date();
        labelDate.textContent = formatDateAuto(date, currentAccount.locale, false);
        // Update UI
        updateUI(currentAccount);

    //???????????????? ???? ?????????????????????????? setInterval ?? ???????? ???? ????????,???? ?????? ????????????????
        if (timer) clearInterval(timer);
        // setLogOut();
        timer = setLogOut();

    }
});

btnTransfer.addEventListener('click', function (e) {
    e.preventDefault();
    const amount = Number(inputTransferAmount.value);
    const receiverAcc = accounts.find(
        acc => acc.username === inputTransferTo.value
    );
    inputTransferAmount.value = inputTransferTo.value = '';

    if (
        amount > 0 &&
        receiverAcc &&
        currentAccount.balance >= amount &&
        receiverAcc?.username !== currentAccount.username
    ) {
        // Doing the transfer
        currentAccount.movements.push(-amount);
        receiverAcc.movements.push(amount);
        //add date
        currentAccount.movementsDates.push(new Date().toISOString());
        receiverAcc.movementsDates.push(new Date().toISOString());

        // Update UI
        updateUI(currentAccount);
    }
    //reset timer
    clearInterval(timer);
    timer=setLogOut();
});

btnLoan.addEventListener('click', function (e) {
    e.preventDefault();

    const amount = Math.floor(inputLoanAmount.value);

    if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {

        //add setTimeout for delay on 3 second
        setTimeout(() => {
            // Add movement

            currentAccount.movements.push(amount);

            // add date
            currentAccount.movementsDates.push(new Date().toISOString());
            // Update UI
            updateUI(currentAccount);
        }, 3000)

    }
    inputLoanAmount.value = '';
    //reset timer
    clearInterval(timer);
    timer=setLogOut();
});

btnClose.addEventListener('click', function (e) {
    e.preventDefault();

    if (
        inputCloseUsername.value === currentAccount.username &&
        Number(inputClosePin.value) === currentAccount.pin
    ) {
        const index = accounts.findIndex(
            acc => acc.username === currentAccount.username
        );
        console.log(index);
        // .indexOf(23)

        // Delete account
        accounts.splice(index, 1);

        // Hide UI
        containerApp.style.opacity = 0;
    }

    inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
    e.preventDefault();
    displayMovements(currentAccount, !sorted);
    sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
//
console.log(34 === 34.000);//true
console.log(Number.parseInt('100px'));
console.log(Number.isNaN('hh'));
console.log(isNaN('hh'));
console.log(isNaN('33'));//false
console.log(Number.isNaN('33'));
console.log(Number.isNaN('33' / '3n'));
console.log(Number.isNaN(3 / 0));
console.log('-------------------------------------');
console.log(Number.isFinite(3 / 3));
// Checking if value is number
console.log(Number.isFinite(20));
console.log(Number.isFinite('20'));
console.log(Number.isFinite(+'20X'));
console.log(Number.isFinite(23 / 0));
console.log('-------------------------------------');

console.log(8 ** (1 / 3));

console.log(Math.floor(-23.4));//-23
console.log(Math.trunc(-23.4));//-24
console.log(Math.floor(-5.05));

//function for getting random number in range from to
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getRand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
//for (let i = 0; i < 20; i++) console.log(getRandom(3, 10));

console.log((3.4).toFixed());

console.log(Math.round(23.3));
console.log(Math.round(23.9));

console.log(Math.ceil(23.3));
console.log(Math.ceil(23.9));

console.log(Math.floor(23.3));
console.log(Math.floor('23.9'));

console.log(Math.trunc(23.3));

console.log(Math.trunc(-23.3));
console.log(Math.floor(-23.3));

//
console.log((344).toFixed(2))

//get even or odd numbers
const arrNumber00 = [3, 4, 5, 6, 7, 323, 22, 11, 45];
const getEvenOrOdd = (arr, even = true) => {
    return even ? arr.filter(x => x % 2 === 0) : arr.filter(x => x % 2 !== 0);
}
console.log(getEvenOrOdd(arrNumber00, false));

// numeric separator
console.log(30_000);
const priceCents = 345_45;
console.log(priceCents);

console.log(Number('230_000'));
console.log(parseInt('230_000'));

console.log(2 ** 52);
console.log(2 ** 52 - 1);
console.log(BigInt(3453453));

console.log(12n + BigInt(10));

//create date
const now = new Date();
console.log(now);

console.log(account1.movementsDates[0]);
console.log(new Date(2022, 11, 25, 4, 5, 5));
console.log(account1.movementsDates[0]);
console.log(new Date(account1.movementsDates[0]));
console.log(new Date(account1.movementsDates[0]).toISOString())
const arrDates = [];
for (let i = 0; i < 5; i++) {
    arrDates.push(new Date().toISOString());
}
console.log(new Date(arrDates[0]).getFullYear());
//get timestamp
const timestamp = new Date().getTime();
console.log(timestamp);
//use this timestamp that get a date object from new Date(timestamp)
const date1 = new Date(timestamp);
console.log(date1);//Tue Oct 04 2022 22:13:14 GMT+0300 (Moscow Standard Time)
//?? ???????? ?????????? ???????????? ???????????????????? ?? ?????????? ?????????? + or Number()
console.log(+date1);//1664910812319
console.log(Number(date1));//1664910812319
//??-?????? ???????????????????????? ?????????????? ?? ???????? ?????????? ?????????? ????????????
const daysRange = (date1, date2) => {
    const range = date1 - date2;
    console.log(range)
    return Math.floor(range / (1000 * 60 * 60 * 24));
}
console.log(daysRange(new Date(), new Date(2022, 9, 1)));
console.log(new Date() - new Date(account1.movementsDates[7]))

const timeNow = new Date();
const timeAcc1 = new Date(account1.movementsDates[7]);
console.log(timeNow);
console.log(timeAcc1);
console.log(timeNow - timeAcc1);
console.log(Math.floor((timeNow - timeAcc1) / (1000 * 60 * 60 * 24)));
console.log(daysRange(timeNow, timeAcc1));

const num = 3884764.23;

const options = {
    style: 'currency',
    unit: 'celsius',
    currency: 'EUR',
    // useGrouping: false,
};

console.log('US:      ', new Intl.NumberFormat('en-US', options).format(num));
console.log('Germany: ', new Intl.NumberFormat('de-DE', options).format(num));
console.log('Syria:   ', new Intl.NumberFormat('ar-SY', options).format(num));
console.log(
    navigator.language,
    new Intl.NumberFormat(navigator.language, options).format(num)
);
//using constructor  new Intl
const count = 26254.39;
const date = new Date("2012-05-24");

function log(locale) {
    console.log(
        `${new Intl.DateTimeFormat(locale).format(date)} ${new Intl.NumberFormat(locale).format(count)}`
    );
}

log("en-US");
// expected output: 5/24/2012 26,254.39

log("de-DE");

const number = 344242;
console.log(new Intl.NumberFormat(account2.locale, {style: 'currency', currency: account2.currency}).format(number));

//setTimeout

const int = setInterval(() => {
    const date = new Date();
    const time = new Intl.DateTimeFormat(navigator.language, {
        minute: 'numeric',
        hour: 'numeric',
        second: 'numeric'
    }).format(date);
}, 1000);
clearInterval(int);