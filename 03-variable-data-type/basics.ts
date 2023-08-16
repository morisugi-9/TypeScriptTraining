function add(n1: number, n2: number, showResult: boolean, phase: string) {
    // if (typeof n1 !== 'number' || typeof n2 !== 'number') {
    //     throw new Error('type error');
    // }
    if (showResult) {
        console.log(`${phase} ${n1 + n2}`);
    } else {
        return n1 + n2;
    }
}

const number1: number = 1;
const number2: number = 2;
const printResult: boolean = true;
const resultPhase: string = 'Result: ';

const result = add(number1, number2, printResult, resultPhase);
// console.log(result);
