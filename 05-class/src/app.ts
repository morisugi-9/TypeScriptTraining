// type との違い
// interface はオブジェクトの構造のみを記述可能
// type型はunion型などこれまでに学んだ様々な型を定義できる


// 関数型インターフェース

// alias type
type addFn = (a: number, b: number) => number;
let add: addFn;
add = (n1: number, n2: number) => {
    return n1 + n2;
}

interface AddFn {
    (a: number, b: number): number;
}
let addIF: AddFn;
addIF = (n1: number, n2: number) => {
    return n1 + n2;
}

interface Person {
    name: string;
    age?: number; // optional

    greet(phrase?: string): void;
}
interface Greetable {
    name: string;

    greet(phrase?: string): void;
}

interface Named extends Greetable, Person {

}

class NamedImpl implements Named {
    constructor(public name: string, public age?: number) {

    }
    greet(phrase: string): void {
        throw new Error("Method not implemented.");
    }
}


let user1:Person;

user1 = {
    name: 'Max',
    age: 30,
    greet(phrase: string) {
        console.log(phrase + ' ' + this.name);
    }
}

let user2: Greetable;

user2 = {
    name: 'Max',
    // age: 30, // error
    greet(phrase) {
        console.log(phrase + ' ' + this.name);
    },
}

class Person2 implements Greetable {
    name: string;
    // age: number;
    constructor(name: string) {
        this.name = name;
    }
    greet(phrase: string): void {
        console.log(phrase + ' ' + this.name);
    }
}
let user3: Greetable;
user3 = new Person2('Manu');
console.log(user3);


