const object = {
    firstName: 'bob',
    lastName: 'geits',
    job: 'developer',
    friends: ['mike', 'tom', 'ann'],
}
const nameKey = 'Name';
console.log(object["firstName"]);
console.log(object["job"]);
//помещаю выражение,результат которого позволит получить значение свойства объекта
//при этом всегда используются только []
console.log(object[Object.keys(object)[0]]);
console.log(object[`first${nameKey}`]);
console.log(object[`last${nameKey}`]);
let keyObj = prompt('choose from these words: firstName,lastName,job,friends');
alert(object[keyObj]);
//можно через условный оператор проверять наличие свойства у объекта,поскольку обращение к несуществующему свойству
//вернет undefined ===false, то блок if не сработает ш
if(object[keyObj]){
    console.log(object[keyObj]);
}
//попытка обратиться к несуществующему свойству
console.log(object.hello);//undefined