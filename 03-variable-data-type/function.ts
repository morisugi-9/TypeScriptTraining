function addFunc(n1: number, n2: number) {
    return n1 + n2;
}

function printlResult(num: number): void {
    console.log('Result: ' + num);
}
// callback function
function addAndHandle(n1: number, n2: number, cb: (num: number) => void) {
    const result = n1 + n2;
    cb(result);
}

addAndHandle(10,20, (result => {
    console.log(result);
    return result;
}))

// function type
// let conbineValues: Function;
let conbineValues: (a: number, b: number) => number;
conbineValues = addFunc;
// error
// conbineValues = printlResult;
// mondai
// conbineValues = 1;

printlResult(addFunc(5,12));
printlResult(conbineValues(10,24));

// unknown