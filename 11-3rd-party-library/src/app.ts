// import _ from "lodash";
import "reflect-metadata";
import { plainToClass } from "class-transformer";

import { Product } from "./product.model";

import { validate } from "class-validator";

// console.log(_.shuffle([1, 2, 3]));

declare var GLOBAL: string;
console.log(GLOBAL);

const products = [
  { title: "商品２", price: 200 },
  { title: "商品３", price: 300 },
  { title: "", price: 400 },
  { title: "商品４", price: 0 },
  { title: "商品５", price: -1 },
];

const p1 = new Product("商品１", 100);
console.log(p1.getInformation());

// class-transformer 自動化
// const loadedProducts = products.map((prod) => {
//   return new Product(prod.title, prod.price);
// });
const loadedProducts = plainToClass(Product, products);
loadedProducts.forEach((prod: Product) =>
  validate(prod).then((errors: string | any) => {
    console.log(errors);
    if (errors.length > 0) {
      console.log("バリデーションエラー");
    } else {
      console.log(prod.getInformation());
    }
  })
);
