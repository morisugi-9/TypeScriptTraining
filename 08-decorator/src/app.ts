// メタプログラミングに使用
// 1. デコレータとは何か
// 最終的にはただの関数。特定の方法でクラスに適応する
// デコレータはクラス定義時ではなく、インスタンス生成時に実行される
// デコレータを追加したクラスを継承した上で新しいクラスに置き換えることができる
// function Logger(constructor: Function) {
//   console.log("ログ出力中...");
//   console.log(constructor);
// }
// デコレータファクトリーÏ
function Logger(logString: string) {
  console.log("LOGGER ファクトリ");
  // デコレータファンクション
  return function (constructor: Function) {
    console.log(logString);
    console.log(constructor);
  };
}
function WithTemplate(template: string, hookId: string) {
  console.log("TEMPLATEファクトリ");
  // new 関数は何らかのオブジェクトを返す 任意の数の引数を受け取る 何らかのオブジェクトを返す
  return function <T extends { new (...args: any[]): { name: string } }>(
    originalConstructor: T
  ) {
    // コンストラクタ関数を返すことができる 別のクラスのコンストラクタに変更可能
    return class extends originalConstructor {
      // constructor(...args: any[]) { // 全てのコンストラクタ関数の引数を受け取って元のコンストラクタ関数に渡すことができる
      constructor(..._: any[]) {
        // _は引数として受け取る必要があるが、実際には使用しないとTSへ伝える
        // 全てのコンストラクタ関数の引数を受け取って元のコンストラクタ関数に渡すことができる
        super();
        // 引数を受け取るが必要ない
        console.log("テンプレートを表示");
        const hookEl = document.getElementById(hookId);
        if (hookEl) {
          hookEl.innerHTML = template;
          hookEl.querySelector("h1")!.textContent = this.name;
        }
      }
    };
  };
}

// @Logger("ログ出力中... PERSON")
@Logger("ログ出力中")
@WithTemplate("<h1>personオブジェクト１</h1>", "div1")
class Person {
  name = "Max";

  constructor() {
    console.log("Personオブジェクトを作成中");
  }
}

const person = new Person();
console.log(person);

/// デコレータはクラス、メソッドで利用
// プロパティデコレータはJavaScriptでクラス定義された時に実行される
function Log(target: any, propertyName: string | Symbol) {
  console.log("Property デコレータ");
  console.log(target, propertyName);
}

// propertydescriptorとは
// 名前、属性、プロパティが関連づけられているコンポーネントクラス、プロパティの型で構成

// アクセサーデコレータ
function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log("Accssor デコレータ");
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

function Log3(
  target: any,
  name: string | Symbol,
  descriptor: PropertyDescriptor
) {
  console.log("Method デコレータ");
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

function Log4(target: any, name: string | Symbol, position: number) {
  console.log("パラメータデコレータ");
  console.log(target);
  console.log(name);
  console.log(position);
}

class Product {
  @Log
  private _title: string;
  private _price: number;
  constructor(t: string, p: number) {
    this._title = t;
    this._price = p;
  }
  @Log2
  set price(val: number) {
    if (val > 0) {
      this._price = val;
    } else {
      throw new Error("不正な価格です - 0以下は設定できません。");
    }
  }
  get price(): number {
    return this._price;
  }

  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this._price * (1 + tax);
  }
}

const p1 = new Product("Book", 100);
const p2 = new Product("Book2", 200);

/**
 *
 * @param _ (target)
 * @param methodName
 * @param descriptor
 * @returns
 */

function Autobind(
  _: any,
  methodName: string | Symbol | number,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      // descriptorが保持するvalueプロパティ
      // thisはもともと存在するを参照する
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}

class Printer {
  private message: string = "クリックしました！";

  @Autobind
  showMessage() {
    console.log(this.message);
  }
}
const p = new Printer();
p.showMessage();

const button = document.querySelector("button")!;
// button押下で「undefined」となる
// thisはbuttonオブジェクトを参照している
// 対応方法１ bindメソッド
// button.addEventListener('click',p.showMessage.bind(p));
button.addEventListener("click", p.showMessage);

// 入力値のバリデーション

interface Validatorconfig {
  [prop: string]: {
    [validatableProp: string]: string[]; // ['required', 'positive']
  };
}

// インデックス型
interface testIF {
  [prop: string] : {[prop2: string]: string[]};
}
interface testIF2 {
  aa: number;
  ab: number;
  ac: number;
  [prop: string] : number;
}
const test: testIF = {
  a: {a: ['testA']},
};
(test["1"])["1"] = ["1"];
test.a.b = ["2"];
test.a.b["1"] = "1";
test.a = {...(test["a"]), c: ["3"]};
function testAddName(name: string) {
  test.a = {
    ...test.a,
    [name]: [...(test["a"]?.[name] ?? []), "4"]
  }
}

const registeredValidators: Validatorconfig = {};

function Required(target: any, propName: string) {
  console.log("Required");
  console.log(target);
  console.log(propName);

  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: [
      ...(registeredValidators[target.constructor.name]?.[propName] ?? []),
      "required",
    ],
  };
}
// function Required(target: any, propName: string) {
//   registeredValidators[target.constructor.name] = {
//     ...registeredValidators[target.constructor.name],
//     [propName]: [
//       ...(registeredValidators[target.constructor.name]?.[propName] ?? []),
//       "required",
//     ],
//   };
// }

function PositiveNumber(target: any, propName: string) {
  console.log("PositiveNumber");
  console.log(target);
  console.log(propName);

  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: [
      ...(registeredValidators[target.constructor.name]?.[propName] ?? []),
      "positive",
    ],
  };
}


function validate(obj: any) {
  console.log("registeredValidators:" + registeredValidators);
  // 引数のオブジェクトがどのconstructor関数を元にしたオブジェクトなのかを判定
  const objValidatorConfig = registeredValidators[obj.constructor.name];
  if (!objValidatorConfig) {
    return true;
  }
  let isValid = true;
  for (const prop in objValidatorConfig) {
    console.log(`prop: ${prop}`);
    console.log(`objValidatorConfig[prop]: ${objValidatorConfig[prop]}`);
    for (const validator of objValidatorConfig[prop]) {
      switch (validator) {
        case "required":
          isValid = isValid && !!obj[prop];
          // return !!obj[prop];
          break;
        case "positive":
          isValid = isValid && obj[prop] > 0;
          break;
      }
    }
  }
  return isValid;
}

class Course {
  @Required
  @PositiveNumber
  id: number;
  @Required
  title: string;
  @PositiveNumber
  price: number;

  constructor(i: number, t: string, p: number) {
    this.id = i;
    this.title = t;
    this.price = p;
  }
}

const courseForm = document.querySelector("form")!;
courseForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const idEl = document.getElementById("id") as HTMLInputElement;
  const titleEl = document.getElementById("title") as HTMLInputElement;
  const priceEl = document.getElementById("price") as HTMLInputElement;

  const id = +idEl.value;
  const title = titleEl.value;
  const price = +priceEl.value;

  const createdCourse = new Course(id, title, price);
  if (!validate(createdCourse)) {
    alert("正しく入力してください！");
  }
  console.log(createdCourse);
});
