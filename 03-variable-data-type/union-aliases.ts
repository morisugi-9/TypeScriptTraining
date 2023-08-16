// const person: {
//     name: string,
//     age: number
// }
const person = {
  name: "morisugi",
  age: 40,
  hobbies: ["Sports", "Cooking"],
};

let favoriteAttributes: string[];
// favoriteAttributes[0] = 'abc';
favoriteAttributes = ["abc", "def"];
favoriteAttributes.push("efg");
// console.log(favoriteAttributes);
for (const attribute of favoriteAttributes) {
  console.log(attribute);
}

// let mixArray: any[];
// mixArray = ['a',2,true];

for (const hobby of person.hobbies) {
  console.log(hobby);
}

const product = {
  id: "abc1",
  price: 12.99,
  tags: ["great-offer", "hot-and-new"],
  details: {
    title: "Red Carpet",
    description: "A great carpet - alomost brancd-new!",
  },
};

console.log(person);
console.log(product);

// typescript only
// Tuple
let role: [number, string] = [2, "author"];
// role.push('test');
// role[1] = 1;
// role = [0, 'admin'];

// enum
// const ADMIN = 1;
// const READ_ONLY = 1;
enum Role {
  ADMIN = "ADMIN",
  READ_ONLY = 100,
  AUTHOR = 200,
}

const person2 = {
  name: "morisugi",
  age: 40,
  hobbies: ["Sprots", "Cooking"],
  role: Role.READ_ONLY,
};
if (person2.role === Role.READ_ONLY) {
  console.log("読み取り専用ユーザ");
}

// type of custom alias
type Combinable = number | string;
type ConversionDescriptor = 'as-number' | 'as-string';

type User = {name: string; age: number} | string;
const u1: User = {name:'a', age:1};
const u2: User = 'user';
console.log(u1);
console.log(u2);

// union
function conbine(
  n1: Combinable,
  n2: Combinable,
  // resultConversion: string
  // literal
  resultConversion: ConversionDescriptor
) {
  let result;
  if ((typeof n1 === "number" && typeof n2 === "number") || resultConversion === "as-number") {
    result = +n1 + +n2;
  } else {
    result = n1.toString() + n2.toString();
  }
  // if (resultConversion === 'as-number') {
  //   return + result;
  // } else {
  //   return result.toString();
  // }
  return result;
}

const conbineAges = conbine(30, 26, "as-number");
console.log(conbineAges);

const conbineStringAges = conbine("30", "26", "as-number");
console.log(conbineStringAges);

const conbineNames = conbine("Max", "Anna", "as-string");
console.log(conbineNames);


