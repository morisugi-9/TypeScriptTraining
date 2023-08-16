"use strict";
const e1 = {
    name: "Max",
    privileges: ["create-server"],
    startDate: new Date(),
};
// 型ガード
function add(a, b) {
    if (typeof a === "string" || typeof b === "string") {
        return a.toString() + b.toString();
    }
    return a + b;
}
function printEmployeeInformation(emp) {
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
    loadCargo(amount) {
        console.log("荷物を乗せています..." + amount);
    }
}
function useVehicle(vehicle) {
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
function moveAnimal(animal) {
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
moveAnimal({ type: 'bird', flyingSpeed: 10 });
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
    userInput.value = 'こんにちは';
}
const errorBag = {
    email: "正しいメールアドレスではありません"
};
//# sourceMappingURL=app.js.map