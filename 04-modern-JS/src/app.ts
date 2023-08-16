// arrow function
const add = (a: number, b: number) => a + b;

const printResult = (output: string | number) => {
  console.log(output);
};
const printResult1: (output: string | number) => void = (output) => {
  console.log(output);
};
let printResult2 = (output: string) => {};
printResult2 = (output) => console.log(output); 

printResult('printResult');
printResult1('printResult V1');
printResult2('printResult V2');

console.log(add(5, 20));

// default parameter
const addDefault = (a: number, b: number = 1) => {
    return a + b;
}
console.log(addDefault(30, 5));
console.log(addDefault(20));

const button = document.querySelector('button');
if (button) {
  button.addEventListener('click', event => {
    console.log(event);
  })
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

type person = {
  firstName: string,
  age: number
}

const person: person = {
  firstName: 'Max',
  age: 30,
}

// ポインターのコピー
// const coiedPerson = person;
// 実際のコピー
const coiedPerson = {
  ...person
}
console.log(coiedPerson);

// rest parameter
const addRest = (...numbers: number[]) => {
  return numbers.reduce((curResult, curValue) => {
    return curResult + curValue;
  }, 0);
};
const addRest3Param = (...numbers: [number, number, number]) => {
  return numbers.reduce((curResult, curValue) => {
    return curResult + curValue;
  }, 0);
};

const addedNumbers = addRest(5, 10, 2, 3.7);
console.log(`total numbers: ${addedNumbers}`);

// Destructuring 分割代入
// const hobby1 = hobbies[0];
// const hobby2 = hobbies[1];
const [hobby1, hobby2, ...remaindHobbies] = hobbies;

const {firstName: userName, age} = person;
