const massMark=78;
const heightMark=1.69;
const massJohn=92;
const  heightJohn=1.95;
let BMI_Mark=massMark/heightMark**2;
console.log(BMI_Mark.toFixed());
const BMI_John=massJohn/heightJohn**2;
console.log(BMI_John.toFixed());
console.log(BMI_Mark>BMI_John);
if(BMI_Mark>BMI_John){
    console.log(`Mark BMI is higher`);
    console.log(`Marks BMI(${BMI_Mark}) is higher than John's(${BMI_John})  `)
}else {
    console.log(`John BMI is higher`)
}
