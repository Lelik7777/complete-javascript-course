const user = {
    firstName: 'bob',
    lastName: 'geits',
    birthYear: 2000,
    job: 'developer',
    friends: ['mike', 'tom', 'ann'],
    driveLicense: false,
    getFriends() {//что-то наподобие function declaration
        //let myFriends=[...this.friends];
        //return myFriends;
        return this.friends;
    },
    getFriends2: function () {// что-то наподобие function expression - здесь ф-ция становится значением свойства объекта
        return [...this.friends];
    },
    //здесь,в методе создается через this новое свойство объекта user,в котором записываем результат вычислений
    //далее возращаем это свойство,как результат вызова этого метода,т.е. это свойсто будет создано в момент
    //вызова метода и в него запишется результат вычислений
    calcAge: function () {
        this.age = new Date().getFullYear() - this.birthYear;
        return this.age;
    },
    summarizeInfo() {
        this.info = `${this.firstName} is a ${this.calcAge()}-year old ${this.job}
         and he has ${this.driveLicense ? 'a' : 'no'} driver's license`;
        return this.info;
    }
}
const nameKey = 'Name';
console.log(user["firstName"]);
console.log(user["job"]);
//помещаю выражение,результат которого позволит получить значение свойства объекта
//при этом всегда используются только []
console.log(user[Object.keys(user)[0]]);
console.log(user[`first${nameKey}`]);
console.log(user[`last${nameKey}`]);
let keyObj = prompt('choose from these words: firstName,lastName,job,friends');
//alert(user[keyObj]);
//можно через условный оператор проверять наличие свойства у объекта,поскольку обращение к несуществующему свойству
//вернет undefined ===false, то блок if не сработает ш
if (user[keyObj]) {
    console.log(user[keyObj]);
} else {
    console.log(`property ${keyObj} doesn't exist in object `);
}
//попытка обратиться к несуществующему свойству
console.log(user.hello);//undefined
//getting interactive string
console.log(`${user.firstName} has ${user.friends.length} friends, and his best friend is called ${user.friends[0]}`);

console.log(typeof (user.getFriends()));
//call method using []
console.log(user["getFriends2"]());
console.log(user);
console.log(user.calcAge());
console.log(user.age);
console.log(user.age);
console.log(user.age);
console.log(user.summarizeInfo());
console.log(user.info);
