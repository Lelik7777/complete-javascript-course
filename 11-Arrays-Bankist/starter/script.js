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

//добавляем по новому свойству username в каждый из объектов account
//принимаем массив объектов,пробегаемся по нему forEach и создаем новое свойстов каждому объекту и заполняем его
const createUserNames = (accs) => {
    const convertUser = user => user.owner.split(' ').map(x => x[0].toLowerCase()).join('');
    accs.forEach(acc => {
        acc.username = convertUser(acc);
    })
}
createUserNames(accounts);

//switch app
//document.querySelector('.app').style.opacity = '100';

//заполняем данные в блоке balance
const calcPrintBalance = (acc) => {
    //create new property balance and set value in one
    acc.balance = acc.movements.reduce((acc, cur) => acc + cur, 0);
    labelBalance.textContent = `${acc.balance}€`;
}

//заполняем данные в блоке summery
const calcDisplaySummery = (acc) => {

    const getInOrOut = (arr, on = true) => {
        return Math.abs(arr.filter(x => on ? x > 0 : x < 0).reduce((acc, cur) => acc + cur));
    }

    const res = value => `${value}€`;

    const incomes = getInOrOut(acc.movements);
    const outs = getInOrOut(acc.movements, false);
    const interest = getInOrOut(acc.movements) * acc.interestRate / 100;
    labelSumIn.textContent = res(incomes);
    labelSumOut.textContent = res(outs);
    labelSumInterest.textContent = res(interest);
}

//заполняем блок movements
const displayMovements = (movements, sort = false) => {
    //вначале обнуляем содержимое контейнера containerMovements
    containerMovements.innerHTML = '';
    //сортируем массив по возрастанию, если второй параметр true
    (sort ? movements.slice().sort((a, b) => a - b)
        : movements).forEach((mov, i) => {
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
const updateUI = (acc) => {
//display balance
    calcPrintBalance(acc);
    //display summary
    calcDisplaySummery(acc);
    //display movements
    displayMovements(acc.movements);
}
//work with navigation - логинизация
let currAcc;
btnLogin.addEventListener('click', function (e) {
    //prevent overload page pressing submit button
    e.preventDefault();
    // get current account according value from user input
    //only if correct value  else now don`t observe
    currAcc = accounts.find(acc => acc.username === inputLoginUsername.value);
    if (currAcc?.pin === +inputLoginPin.value) {
        //display UI
        containerApp.style.opacity = '100';
// display message
        labelWelcome.textContent = `Welcome back, ${currAcc.owner.split(' ')[0]}`;

        //update balance,movements,summery
        updateUI(currAcc);
    }

//delete focus from input and delete value in inputs
    inputLoginPin.value = inputLoginUsername.value = '';
    inputLoginPin.blur();
});

//work with loan
btnLoan.addEventListener('click', function (e) {
    e.preventDefault();
    const amount = +inputLoanAmount.value;
    if (amount > 0 && currAcc.movements.some(mov => mov >= amount / 10)) {
        currAcc.movements.push(amount);
        updateUI(currAcc);
    }
    inputLoanAmount.value = '';
})

// manipulation with transfer
btnTransfer.addEventListener('click', function (e) {
    e.preventDefault();
    //get account from input transfer to
    const transTo = accounts.find(acc => acc.username === inputTransferTo.value);
    //get number for transfer
    const amount = +inputTransferAmount.value;
    if (transTo && transTo.username != currAcc.username
        && amount > 0 && amount <= currAcc.balance) {
        // снятие суммы с текущего счета и зачисление суммы адресату
        currAcc.movements.push(-amount);
        transTo.movements.push(amount);
        updateUI(currAcc);
    }
    //clear value after transferring
    inputTransferAmount.value = inputTransferTo.value = '';
    inputTransferAmount.blur();
});

btnClose.addEventListener('click', function (e) {
    e.preventDefault();

    if (currAcc.username === inputCloseUsername.value
        && currAcc.pin === +inputClosePin.value) {
        const index = accounts.findIndex(acc => acc.username === currAcc.username);
        accounts.splice(index, 1);
        console.log(accounts);
    }
    inputClosePin.value = inputCloseUsername.value = '';
    inputClosePin.blur();
    containerApp.style.opacity = 0;
});
// button sort
let sorting = false;
btnSort.addEventListener('click', function (e) {
    e.preventDefault();
    displayMovements(currAcc.movements, !sorting);
    sorting = !sorting;
})
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

// using map()
const user = 'Steven Thomas Williams';

//filter()
console.log(movements)
const deposits = movements.filter(x => x > 0);
console.log(deposits);

//reduce()
console.log(movements);
const totalSum = movements.reduce((acc, cur) => acc + cur);
console.log(totalSum);
for (var i = 0, sum = 0; i < movements.length; i++) sum += movements[i];
console.log(sum);

//find max value
const max = movements.reduce((acc, cur) => acc > cur ? acc : cur, 0);
movements.reduce(function (acc, cur) {
    console.log(acc);
    return acc > cur ? acc : cur;
}, 0)
console.log(max);

//challenge #2

// TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
// TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]
const calcAverageHumanAge = (ages) => {
    const toHumanAge = ages.map(age => age <= 2 ? age * 2 : age * 4 + 16);
    console.log(toHumanAge);
    const oldDogs = toHumanAge.filter(age => age >= 18);
    console.log(oldDogs);
    const averageAge = oldDogs.reduce((acc, cur) => acc + cur) / oldDogs.length;
    console.log(averageAge);
}
calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);

//chain methods with checking results
const log = (i, arr) => i == arr.length - 1 && console.log(arr);
const totalDepositsInUSD = movements
    .filter((x, i, arr) => {
        log(i, arr);
        return x > 0;
    })
    .map((x, i, arr) => {
        log(i, arr);
        return Math.trunc(x * 1.1);
    })
    .reduce((acc, cur, i, arr) => {
        log(i, arr);
        return acc + cur;
    });
console.log(totalDepositsInUSD);

//challenge #3
// const calcAverageHumanAge = (ages) => {
//     const toHumanAge = ages.map(age => age <= 2 ? age * 2 : age * 4 + 16);
//     console.log(toHumanAge);
//     const oldDogs = toHumanAge.filter(age => age >= 18);
//     console.log(oldDogs);
//     const averageAge = oldDogs.reduce((acc, cur) => acc + cur) / oldDogs.length;
//     console.log(averageAge);
// }
// calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
// calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
const calcAverageHumanAgeArrow = ages => ages
    .map(age => age <= 2 ? age * 2 : age * 4 + 16)
    .filter(age => age > 18)
    .reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

console.log(calcAverageHumanAgeArrow([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumanAgeArrow([16, 6, 10, 5, 6, 1, 4]));
//find()
const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);
let accountJes;
for (const acc of accounts) {
    if (acc.owner === 'Jessica Davis') accountJes = acc;
}
console.log(accountJes);


// .sort()
//a - current value and b - next value
const copy = [...movements];
copy.sort((a, b) => {

});

// способы автоматического заполнения массива
//create empty array which has length 7
const arr = new Array(5);
// exist only one method to fill elements in this array
arr.fill(1);
console.log(arr);//[1,1,1,1,1];
// .fill() get some parameters
//first variant automatically fills an array
arr.fill(0, 1, 3);
console.log(arr);//[1, 0, 0, 1, 1]

//second variant
//Array.from() - it`s a function Array  and then on this function object we call the from() method

//here we create array which fills 1
const arr2 = Array.from({length: 4}, () => 1);
console.log(arr2);//[1, 1, 1, 1]

//create array are filled ascending values

const arr3 = Array.from({length: 4}, (_, i) => i === 0 ? _ = i + 1 : i + 1);
console.log(arr3);//[1, 2, 3, 4]

//create array with random values number by 10

const randomValue = () => Math.trunc(Math.random() * 10) + 1;//return from 1 to 10;
const getArrayRandomValues = numValues => Array.from(new Set(Array.from({length: numValues}, () => randomValue())));
console.log(getArrayRandomValues(10));

//я могу получить через querySelectedAll() get NodeList and transfer it into array

labelBalance.addEventListener('click', () => {
    const movementsFromIU = document.querySelectorAll('.movements__value');
    // transfer to array and by map get values
    console.log(Array.from(movementsFromIU).map(el => +el.textContent.replace('€', '')));
    // the same
    console.log(Array.from(movementsFromIU, (_, i) => +_.textContent.replace('€', '')));
});
//1 из массива с объектами выделяем массивы,которые сливаем в один общий массив,фильтруем его, а затем суммируем содержимое
const bankDepositSum = accounts.map((acc, i, arr) => {

    i === arr.length - 1 && console.log(arr);
    return acc.movements;
}).flat().filter(val => val > 0).reduce((acc, cur) => acc + cur);
console.log(bankDepositSum);
//2.снова получаем общий массив,который фильтруем и получаем количество нужных элементов
const depositMore1000 = accounts.map(acc => acc.movements).flat()
    .filter(x => x >= 1000).length;
const depositMore1000Red = accounts.map(acc => acc.movements).flat().reduce((acc, cur, i) => {
    if (cur >= 1000) acc.push(cur);
    return acc;
}, []).length;
const depositMore1000Red2 = accounts.map(acc => acc.movements).flat()
    .reduce((count, cur) => cur >= 1000 ? ++count : count, 0);
console.log(depositMore1000);
console.log(depositMore1000Red);
console.log(depositMore1000Red2);

//3.  get object which properties as arrays contains deposits and withdrawals

const objectDepAndWithdraw = accounts.map(acc => acc.movements).flat().reduce((acc, cur, i, arr) => {
    cur > 0 ? acc.deposits.push(cur) : acc.withdrawals.push(cur);
    return acc;
}, {deposits: [], withdrawals: []});
console.log(objectDepAndWithdraw);
//get object with sums of deposits and withdrawals
//use flatMap and  just destructuring getting object
const {deposits: deposits0, withdrawals} = accounts.flatMap(acc => acc.movements)
    .reduce((sum, cur) => {
        //cur > 0 ? sum.deposits += cur : sum.withdrawals += cur;
        sum[cur > 0 ? 'deposits' : 'withdrawals'] += cur;
        return sum;
    }, {deposits: 0, withdrawals: 0})

console.log('deposits =', deposits0, ' ', 'withdrawals=', withdrawals);
//use only reduce();
console.log(accounts)
const sum2 = accounts.reduce((acc, cur) => {
    cur.movements.forEach(mov => {
        acc[mov > 0 ? 'deposits' : 'withdrawals'] += mov;
    });
    return acc;
}, {deposits: 0, withdrawals: 0});
console.log(sum2)
//get average value
const values = [3, 6, 42];
console.log(values.reduce((sum, cur, i, arr) => {
    sum += cur;
    if (i === arr.length - 1) return sum / arr.length;
    else return sum;
}));

//4 get string and return a title case
const toTitleCase = (str) => {
    const exceptions = ['a', 'an', 'but', 'with', 'or', 'and', 'in'];
    // если слово начинается на исключение,то его нужно писать с большой буквы,поэтому отдельно нужно создать ф-цию для капитализации
    const capitalize = (word) => word.replace(word[0], word[0].toUpperCase());

    const titleCase = str.toLowerCase().split(' ')
        .map(word => exceptions
            .includes(word) ? word : capitalize(word))
        .join(' ');
    return capitalize(titleCase);
}
console.log(toTitleCase('this is a nice title'));
console.log(toTitleCase('this is a nice title but is not too long'))
console.log(toTitleCase('and here is another STring and we see it'));

// challenge #4
// 1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
// 2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
// 3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
// 4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
// 5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
// 6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
// 7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
// 8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)
const dogs = [
    {weight: 22, curFood: 250, owners: ['Alice', 'Bob']},
    {weight: 8, curFood: 200, owners: ['Matilda']},
    {weight: 13, curFood: 275, owners: ['Sarah', 'John']},
    {weight: 32, curFood: 340, owners: ['Michael']}
];
//1 create new property in object dog
dogs.forEach((dog, i, dogs) => {
    dog.recFood = Math.trunc(dog.weight ** .75 * 28);
})
console.log(dogs);
//2 find Sarah`s dog
const dogOfSara = dogs.find(dog => dog.owners.includes('Sarah'));
console.log(dogOfSara);
//normal=curr<recommended*1.1&&curr>recommended*.9
const much = 'too much';
const little = 'too little';
const normalStr = 'normal portion';
const mealsDog = (currFood, recFood) => {
    if (currFood < recFood * 1.1 && currFood > recFood * .9) return normalStr;
    if (currFood > recFood * 1.1) return much;
    if (currFood < recFood * 0.9) return little;

}
console.log(`Sarah's dog eat ${mealsDog(dogOfSara.curFood, dogOfSara.recFood)}`);
//3
const ownersEatTooMuch = dogs.filter(dog => dog.curFood > dog.recFood).flatMap(dog => dog.owners);
console.log(ownersEatTooMuch);
const ownersEatTooLittle = dogs.filter(dog => dog.curFood < dog.recFood).flatMap(dog => dog.owners);
console.log(ownersEatTooLittle);
//4
console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much!  ${ownersEatTooLittle.join(' and ')}'s dogs eat too little!`);
//5
console.log('there is any dog eating EXACTLY the amount of food that is recommended:', dogs.some(dog => dog.curFood === dog.recFood))
//6
const normal = dog => dog.curFood < dog.recFood * 1.1 && dog.curFood > dog.recFood * .9;
console.log(' there is any dog eating an OKAY amount of food :', dogs.some(dog => normal(dog)));

//7
const normalDogs = dogs.filter(dog => normal(dog));
console.log(normalDogs);

//8
// const copyDogs = [...dogs].sort((a, b) => {
//     if (a.recFood > b.recFood) return 1;
//     if (a.recFood < b.recFood) return -1;
// })
const dogsCopy = dogs.slice().sort((a, b) => a.recFood - b.recFood);
console.log(dogsCopy);