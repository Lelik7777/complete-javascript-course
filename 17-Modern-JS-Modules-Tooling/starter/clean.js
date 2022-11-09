let budget = Object.freeze([
    {value: 250, description: 'Sold old TV 📺', user: 'jonas'},
    {value: -45, description: 'Groceries 🥑', user: 'jonas'},
    {value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas'},
    {value: 300, description: 'Freelancing 👩‍💻', user: 'jonas'},
    {value: -1100, description: 'New iPhone 📱', user: 'jonas'},
    {value: -20, description: 'Candy 🍭', user: 'matilda'},
    {value: -125, description: 'Toys 🚂', user: 'matilda'},
    {value: -1800, description: 'New Laptop 💻', user: 'jonas'},
]);

const spendingLimits = Object.freeze({
    jonas: 1500,
    matilda: 100,
});
const getLimit = user => spendingLimits?.[user] ?? 0;
const addExpense = function (state, limit, value, description, user = 'jonas') {
    //using parameter by default
    //if (!user) user = 'jonas';
    const cleanUser = user.toLowerCase();

    // let lim;
    // if (limits[user]) {
    //   lim = limits[user];
    // } else {
    //   lim = 0;
    // }
    //const limit = spendingLimits?.[user] ?? 0;

    // value <= getLimit(cleanUser) && budget.push({value: -value, description, user:cleanUser});
    //здесь мы реализуем принцип чистой ф-ции,которая не мутирует внешние данные,а работает с их копиями
    //если условие неверно,то возвращаем старый state
    return value <= getLimit(cleanUser) ? [...state, {value: -value, description, user: cleanUser}] : state;

};
const budget1 = addExpense(budget, spendingLimits, 10, 'Pizza 🍕');
const budget2 = addExpense(budget1, spendingLimits, 100, 'Going to movies 🍿', 'Matilda');
const budget3 = addExpense(budget2, spendingLimits, 200, 'Stuff', 'Jay');
console.log(budget2);

const checkExpenses = function () {
    // for (let entry of budget) {
    //     // const limit = spendingLimits?.[entry.user] ?? 0;
    //     // if (spendingLimits[entry.user]) {
    //     //     lim = spendingLimits[entry.user];
    //     // } else {
    //     //     lim = 0;
    //     // }
    //
    //     if (entry.value < -getLimit(entry.user)) {
    //         entry.flag = 'limit';
    //     }
    // }
    budget = budget.map(entry => entry.value < -getLimit(entry.user) ? {...entry, flag: 'limit'} : entry);
};
checkExpenses();

console.log(budget);

const logBigExpenses = function (bigLimit) {
    let output = '';
    for (const entry of budget) {
        // if (entry.value <= -bigLimit) {
        //     //output += entry.description.slice(-2) + ' / '; // Emojis are 2 chars
        //     output+=`${entry.description.slice(-2)} / `
        // }

        output += entry.value <= -bigLimit ? `${entry.description.slice(-2)} / ` : '';
    }
    output = output.slice(0, -2); // Remove last '/ '

    console.log(output);
};
logBigExpenses(500);
