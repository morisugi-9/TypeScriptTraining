"use strict";
// type との違い
// interface はオブジェクトの構造のみを記述可能
// type型はunion型などこれまでに学んだ様々な型を定義できる
let add;
add = (n1, n2) => {
    return n1 + n2;
};
let addIF;
addIF = (n1, n2) => {
    return n1 + n2;
};
class NamedImpl {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    greet(phrase) {
        throw new Error("Method not implemented.");
    }
}
let user1;
user1 = {
    name: 'Max',
    age: 30,
    greet(phrase) {
        console.log(phrase + ' ' + this.name);
    }
};
let user2;
user2 = {
    name: 'Max',
    // age: 30, // error
    greet(phrase) {
        console.log(phrase + ' ' + this.name);
    },
};
class Person2 {
    // age: number;
    constructor(name) {
        this.name = name;
    }
    greet(phrase) {
        console.log(phrase + ' ' + this.name);
    }
}
let user3;
user3 = new Person2('Manu');
console.log(user3);
