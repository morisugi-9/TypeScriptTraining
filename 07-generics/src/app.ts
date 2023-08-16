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

function merge<T extends {}, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

const mergeObj = merge({ name: "Max", hobbies: ["Sports"] }, { age: 30 });
const mergeObj2 = merge({ name: "Max" }, { age: 30 });
console.log(mergeObj.age);

interface Lengthy {
  length: number;
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
  let descriptionText = "値がありません。";
  if (element.length > 0) {
    descriptionText = "値は" + element.length + "個です。";
  }
  return [element, descriptionText];
}

console.log(countAndDescribe(["Sports", "Cooking"]));

function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  return "Value:" + obj[key];
}

extractAndConvert({ name: "Max" }, "name");

// utitilty
class DataStorage<T extends string | number | boolean> {
  private data: T[] = [];
  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
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

const textStorage = new DataStorage<string>();
textStorage.addItem("Data1");
textStorage.addItem("Data2");
textStorage.removeItem("Data1");
console.log(textStorage.getItems());

// const objStorage = new DataStorage<object>();
// const obj = {name: 'Max'};
// objStorage.addItem(obj);
// objStorage.addItem({name: 'Manu'});
// objStorage.removeItem(obj);
// console.log(objStorage.getItems());

// Generic Utility
interface CourseGoal {
  title: string;
  description: string;
  date: Date;
}
function createCourseGoal(title: string, description: string, date: Date): CourseGoal {
  // return {
  //   title: title,
  //   description: description,
  //   date: date,
  // }
  // Partial オブジェクト型に指定されたオブジェクトのすべてのプロパティをオプショナルに変更する
  let courseGoal: Partial<CourseGoal> = {};
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.date = date;
  return courseGoal as CourseGoal;
}

// OK
// const names = ['Max', 'Anna'];
// names.push('Manu');
// NG
const names: Readonly<string[]> = ['Max', 'Anna'];
// names.push('Manu');
// names.pop();

