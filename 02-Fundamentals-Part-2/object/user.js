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

//challenge#3
function calcBMI(weight, height) {
    return weight / height ** 2;
}

const mark = {
    firstName: 'Mark',
    lastName: 'Miller',
    weight: 78,
    height: 1.69,
    getFullName() {
        return this.firstName + ' ' + this.lastName;
    },
    getBMI() {
        this.bmi = +(this.weight / this.height ** 2).toFixed();
        return {
            bmi: this.bmi,
            fullName: this.getFullName(),
        };
    }
};
const john = {
    firstName: 'John',
    lastName: 'Smith',
    weight: 92,
    height: 1.95,
    getFullName() {
        return this.firstName + ' ' + this.lastName;
    },
    getBMI() {
        this.bmi = +(this.weight / this.height ** 2).toFixed();
        return {
            bmi: this.bmi,
            fullName: this.getFullName(),
        };
    }
}

console.log(john.bmi ?? john.getBMI().bmi);
console.log(mark.bmi ?? mark.getBMI().bmi);
const higherBMI = (man1, man2) => {
    function createStr(obj1, obj2) {
        const bmi1 = obj1.getBMI().bmi;
        const bmi2 = obj2.getBMI().bmi;
        const name1 = obj1.getBMI().fullName;
        const name2 = obj2.getBMI().fullName;

        return `${bmi1 > bmi2 ? name1 : name2}'s BMI (${bmi1 > bmi2 ? bmi1 : bmi2})
        is higher than ${bmi1 > bmi2 ? name2 : name1}'s (${bmi1 > bmi2 ? bmi2 : bmi1})!`
    }

    return createStr(man1, man2);
};
console.log(higherBMI(mark, john));
console.log(mark);


