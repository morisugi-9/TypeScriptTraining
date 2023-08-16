"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
function Logger(logString) {
    console.log("LOGGER ファクトリ");
    // デコレータファンクション
    return function (constructor) {
        console.log(logString);
        console.log(constructor);
    };
}
function WithTemplate(template, hookId) {
    console.log("TEMPLATEファクトリ");
    // new 関数は何らかのオブジェクトを返す 任意の数の引数を受け取る 何らかのオブジェクトを返す
    return function (originalConstructor) {
        // コンストラクタ関数を返すことができる 別のクラスのコンストラクタに変更可能
        return class extends originalConstructor {
            // constructor(...args: any[]) { // 全てのコンストラクタ関数の引数を受け取って元のコンストラクタ関数に渡すことができる
            constructor(..._) {
                // 全てのコンストラクタ関数の引数を受け取って元のコンストラクタ関数に渡すことができる
                super();
                // 引数を受け取るが必要ない
                console.log("テンプレートを表示");
                const hookEl = document.getElementById(hookId);
                if (hookEl) {
                    hookEl.innerHTML = template;
                    hookEl.querySelector("h1").textContent = this.name;
                }
            }
        };
    };
}
// @Logger("ログ出力中... PERSON")
let Person = class Person {
    constructor() {
        this.name = "Max";
        console.log("Personオブジェクトを作成中");
    }
};
Person = __decorate([
    Logger("ログ出力中"),
    WithTemplate("<h1>personオブジェクト１</h1>", "div1")
], Person);
const person = new Person();
console.log(person);
/// デコレータはクラス、メソッドで利用
// プロパティデコレータはJavaScriptでクラス定義された時に実行される
function Log(target, propertyName) {
    console.log("Property デコレータ");
    console.log(target, propertyName);
}
// propertydescriptorとは
// 名前、属性、プロパティが関連づけられているコンポーネントクラス、プロパティの型で構成
// アクセサーデコレータ
function Log2(target, name, descriptor) {
    console.log("Accssor デコレータ");
    console.log(target);
    console.log(name);
    console.log(descriptor);
}
function Log3(target, name, descriptor) {
    console.log("Method デコレータ");
    console.log(target);
    console.log(name);
    console.log(descriptor);
}
function Log4(target, name, position) {
    console.log("パラメータデコレータ");
    console.log(target);
    console.log(name);
    console.log(position);
}
class Product {
    constructor(t, p) {
        this._title = t;
        this._price = p;
    }
    set price(val) {
        if (val > 0) {
            this._price = val;
        }
        else {
            throw new Error("不正な価格です - 0以下は設定できません。");
        }
    }
    get price() {
        return this._price;
    }
    getPriceWithTax(tax) {
        return this._price * (1 + tax);
    }
}
__decorate([
    Log
], Product.prototype, "_title", void 0);
__decorate([
    Log2
], Product.prototype, "price", null);
__decorate([
    Log3,
    __param(0, Log4)
], Product.prototype, "getPriceWithTax", null);
const p1 = new Product("Book", 100);
const p2 = new Product("Book2", 200);
/**
 *
 * @param _ (target)
 * @param methodName
 * @param descriptor
 * @returns
 */
function Autobind(_, methodName, descriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            // descriptorが保持するvalueプロパティ
            // thisはもともと存在するを参照する
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    };
    return adjDescriptor;
}
class Printer {
    constructor() {
        this.message = 'クリックしました！';
    }
    showMessage() {
        console.log(this.message);
    }
}
__decorate([
    Autobind
], Printer.prototype, "showMessage", null);
const p = new Printer();
p.showMessage();
const button = document.querySelector("button");
// button押下で「undefined」となる
// thisはbuttonオブジェクトを参照している
// 対応方法１ bindメソッド
// button.addEventListener('click',p.showMessage.bind(p));
button.addEventListener('click', p.showMessage);
const registeredValidators = {};
function Required(target, propName) {
    console.log('Required');
    console.log(target);
    console.log(propName);
    registeredValidators[target.constructor.name] = Object.assign(Object.assign({}, registeredValidators[target.constructor.name]), { [propName]: ['required'] });
}
function PositiveNumber(target, propName) {
    console.log('PositiveNumber');
    console.log(target);
    console.log(propName);
    registeredValidators[target.constructor.name] = Object.assign(Object.assign({}, registeredValidators[target.constructor.name]), { [propName]: ['positive'] });
}
function validate(obj) {
    console.log('registeredValidators:' + registeredValidators);
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
                case 'required':
                    isValid = isValid && !!obj[prop];
                    // return !!obj[prop];
                    break;
                case 'positive':
                    isValid = isValid && obj[prop] > 0;
                    break;
            }
        }
    }
    return isValid;
}
class Course {
    constructor(i, t, p) {
        this.id = i;
        this.title = t;
        this.price = p;
    }
}
__decorate([
    Required,
    PositiveNumber
], Course.prototype, "id", void 0);
__decorate([
    Required
], Course.prototype, "title", void 0);
__decorate([
    PositiveNumber
], Course.prototype, "price", void 0);
const courseForm = document.querySelector("form");
courseForm.addEventListener('submit', event => {
    event.preventDefault();
    const idEl = document.getElementById('id');
    const titleEl = document.getElementById('title');
    const priceEl = document.getElementById('price');
    const id = +idEl.value;
    const title = titleEl.value;
    const price = +priceEl.value;
    const createdCourse = new Course(id, title, price);
    if (!validate(createdCourse)) {
        alert('正しく入力してください！');
    }
    console.log(createdCourse);
});
//# sourceMappingURL=app.js.map