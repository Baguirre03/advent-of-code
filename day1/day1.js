const fs = require('fs');
const readFile = (path) => fs.readFileSync(path, { encoding: "utf8" })
const input = readFile('./day1/input.txt').split('\n')

function isNumeric(s) {
    return !isNaN(s - parseFloat(s));
}

const findNum = (start, string) => {
    let pointer = start ? 0 : string.length - 1
    while (!isNumeric(string[pointer]) || !string[pointer]) {
        start ? pointer++ : pointer--
    }
    return string[pointer]
}

const decipher = (inputs) => {
    let count = 0
    for (inp of inputs) {
        count += Number(findNum(true, inp) + findNum(false, inp))
    }
    return count
}

const res = decipher(input)
