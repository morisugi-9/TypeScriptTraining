// unknown
let userInput : unknown;
let userName: string;

// ここまでanyと同じ
userInput = 'aaa';
userInput = 1
userInput = true;

// ここから
// unknown型にstring型をセットできない
// error
// userName = userInput;
if (typeof userInput === 'string') {
    userName = userInput;
}

// never
function generateError(message: string, code: number): never {
    throw{ message: message, errorCode: code};
}
generateError('エラーが発生しました', 500);
// const result = generateError('エラーが発生しました', 500);
// console.log(result);

let age: number;
age = 30;
const userName2 = 'Maximilian';

console.log(userName2);