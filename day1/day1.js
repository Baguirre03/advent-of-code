const fs = require('fs');
const readFile = (path) => fs.readFileSync(path, { encoding: "utf8" })
const input = readFile('./day1/input.txt').split('\n')

const cases = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
const numToInt = {
    'one': '1',
    'two': '2',
    'three': '3',
    'four': '4',
    'five': '5',
    'six': '6',
    'seven': '7',
    'eight': '8',
    'nine': '9'
}

const checker = (value) => {
    const map = new Map()
    for (num of cases) {
        if (value.includes(num)) {
            map.set(value.indexOf(num), numToInt[num])
            map.set(value.lastIndexOf(num), numToInt[num])
        }
    }
    return [...map.entries()]
}

function isNumeric(s) {
    return !isNaN(s - parseFloat(s));
}

const findNum = (start, string) => {
    let pointer = start ? 0 : string.length - 1
    while (!isNumeric(string[pointer]) && string[pointer]) {
        start ? pointer++ : pointer--
    }
    return string[pointer] ? [pointer, string[pointer]] : null
}

const decipher = (inputs) => {
    let count = 0
    for (inp of inputs) {
        const currArr = checker(inp)
        currArr.push(findNum(true, inp), findNum(false, inp))

        let res = currArr.filter(x => x)
        res.sort((a, b) => a[0] > b[0] ? 1 : -1)

        count += Number(res[0][1] + res.at(-1)[1])
    }
    return count
}

console.log(decipher(input))
