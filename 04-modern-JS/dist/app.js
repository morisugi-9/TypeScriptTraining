"use strict";
// arrow function
const add = (a, b) => a + b;
const printResult = (output) => {
    console.log(output);
};
const printResult1 = (output) => {
    console.log(output);
};
let printResult2 = (output) => { };
printResult2 = (output) => console.log(output);
printResult('printResult');
printResult1('printResult V1');
printResult2('printResult V2');
console.log(add(5, 20));
// default parameter
const addDefault = (a, b = 1) => {
    return a + b;
};
console.log(addDefault(30, 5));
console.log(addDefault(20));
const button = document.querySelector('button');
if (button) {
    button.addEventListener('click', event => {
        console.log(event);
    });
}
const hobbies = ['Sports', 'Cooking'];
const activeHobbies = ['Hiking'];
activeHobbies.push();
for (let hobby of hobbies) {
    console.log(hobby);
    // activeHobbies.push(hobby);
}
// スプレッド演算子
activeHobbies.push(...activeHobbies);
const person = {
    name: 'Max',
    age: 30,
};
// ポインターのコピー
// const coiedPerson = person;
// 実際のコピー
const coiedPerson = Object.assign({}, person);
console.log(coiedPerson);
// rest parameter
const addRest = (...numbers) => {
    return numbers.reduce((curResult, curValue) => {
        return curResult + curValue;
    }, 0);
};
const addedNumbers = addRest(5, 10, 2, 3.7);
console.log(`total numbers: ${addedNumbers}`);
//# sourceMappingURL=app.js.map