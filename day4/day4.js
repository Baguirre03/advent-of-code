const fs = require('fs');
const readFile = (path) => fs.readFileSync(path, { encoding: "utf8" })
const input = readFile('./day4/input.txt').split('\n')

const cleanArr = (arr) => {
    arr.shift()
    let luckyNums = arr[1].split(' ').filter(x => x !== '')
    let checkNums = arr[0].split(' ').filter(x => x !== '')
    return [checkNums, luckyNums]
}

const scratchCard = (inputs) => {
    let res = []
    for (inp of inputs) {
        let cur = inp.split(/[:|]/)
        let [checkNums, luckyNums] = cleanArr(cur)
        let curWin = 0

        checkNums.forEach((num) => {
            if (luckyNums.includes(num)) {
                curWin = curWin === 0 ? 1 : curWin *= 2
            }
        })

        res.push(curWin)
    }

    return res.reduce((acum, cur) => acum + cur, 0)
}

console.log(scratchCard(input))