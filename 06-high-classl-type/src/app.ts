// 交差型
type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

// どちらでも可能
// interface ElevatedEmployee extends Admin, Employee {}
type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
  name: "Max",
  privileges: ["create-server"],
  startDate: new Date(),
};

type Conbinable = string | number;
type Numberic = number | boolean;
type Universal = Conbinable & Numberic;

// function override
function add(n1: number, n2:number): number;
function add(s1: string, s2: string): string;
// 型ガード
function add(a: Conbinable, b: Conbinable) {
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}
type UnknownEmployee = Employee | Admin;
function printEmployeeInformation(emp: UnknownEmployee) {
  console.log(emp.name);
  if ("privileges" in emp) {
    console.log("Privileges: " + emp.privileges);
  }
  if ("startDate" in emp) {
    console.log("Start Date: " + emp.startDate);
  }
}
printEmployeeInformation(e1);
printEmployeeInformation({ name: "Manu", startDate: new Date() });

class Car {
  drive() {
    console.log("運転中...");
  }
}

class Truck {
  drive() {
    console.log("トラックを運転中...");
  }

  loadCargo(amount: number) {
    console.log("荷物を乗せています..." + amount);
  }
}
type Vehicle = Car | Truck;
function useVehicle(vehicle: Vehicle) {
    vehicle.drive();
    if ('loadCargo' in vehicle) {
        vehicle.loadCargo(1000);
    }
    if (vehicle instanceof Truck) {
        vehicle.loadCargo(2000);
    }
}

const v1 = new Car();
const v2 = new Truck();
useVehicle(v1);
useVehicle(v2);

// Discriminated Unions
interface Bird {
    type: 'bird';
    flyingSpeed: number;
}
interface Horse {
    type: 'horse';
    runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
    // if ('flyingSpeed' in animal) {
    //     console.log(animal.flyingSpeed);
    // }
    let speed;
    switch (animal.type) {
        case 'bird':
            speed = animal.flyingSpeed;
            break;
        case 'horse':
            speed = animal.runningSpeed;
            break;
    }
    console.log('移動速度：' + speed);
}

moveAnimal({ type: 'bird', flyingSpeed: 10});

// type casting
// const paragraph = document.querySelector('p');
// HTMLを解析しない
const paragraph = document.getElementById('message-output');
// const userInput = document.getElementById('user-input')!;
// const userInput = <HTMLInputElement>document.getElementById('user-input');
// const userInput = document.getElementById('user-input') as HTMLInputElement;
// userInput.value = 'こんにちは';
const userInput = document.getElementById('user-input');
if (userInput) {
    (userInput as HTMLInputElement).value = 'こんにちは';
}

// index Types Signatures
interface ErrorContainer { // {email: '正しいメールアドレスではありません', username: 'ユーザー名を入力してください'}
    // id: string;
    [prop: string]: string;
}

const errorBag: ErrorContainer = {
    email: "正しいメールアドレスではありません"
}

// function override
const result = add("1","5");
result.split(' ');

// optional chaine
const fetchUserData = {
  id: 'u1',
  name: 'user1',
  job: {
    title: 'Developer',
    description: 'TypeScript',
  }
}
// console.log(fetchUserData.job && fetchUserData.job.title);
console.log(fetchUserData?.job?.title);

// NULL合体演算子 null or undefined ??
const userInput2 = '';
const storedData = userInput ?? 'Default';
