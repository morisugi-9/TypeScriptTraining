"use strict";
// Generics
// // const names = ['Max', 'Manu'];
// const names: Array<string> = []; // string[]
// const promise: Promise<number> = new Promise<string>((resolve, reject) => {
//   setTimeout(() => {
//     resolve("終わりました！");
//   }, 2000);
// });
// promise.then(data => {
//     // data.split(' ');
// })
function merge(objA, objB) {
    return Object.assign(objA, objB);
}
const mergeObj = merge({ name: "Max", hobbies: ["Sports"] }, { age: 30 });
const mergeObj2 = merge({ name: "Max" }, { age: 30 });
console.log(mergeObj.age);
function countAndDescribe(element) {
    let descriptionText = "値がありません。";
    if (element.length > 0) {
        descriptionText = "値は" + element.length + "個です。";
    }
    return [element, descriptionText];
}
console.log(countAndDescribe(["Sports", "Cooking"]));
function extractAndConvert(obj, key) {
    return "Value:" + obj[key];
}
extractAndConvert({ name: "Max" }, "name");
// create generic class
class DataStorage {
    constructor() {
        this.data = [];
    }
    addItem(item) {
        this.data.push(item);
    }
    removeItem(item) {
        if (this.data.indexOf(item) === -1) {
            return;
        }
        this.data.splice(this.data.indexOf(item), 1); // 見つからない場合、-1を返す（配列の最後） 
    }
    getItems() {
        return [...this.data];
        // return this.data;
    }
}
const textStorage = new DataStorage();
textStorage.addItem("Data1");
textStorage.addItem("Data2");
textStorage.removeItem("Data1");
console.log(textStorage.getItems());
const objStorage = new DataStorage();
const obj = { name: 'Max' };
objStorage.addItem(obj);
objStorage.addItem({ name: 'Manu' });
objStorage.removeItem(obj);
console.log(objStorage.getItems());
//# sourceMappingURL=app.js.map