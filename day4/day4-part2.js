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
    const cardAndWins = new Map()
    let curCard = 1
    for (inp of inputs) {
        let cur = inp.split(/[:|]/)
        let [checkNums, luckyNums] = cleanArr(cur)
        cardAndWins.set(curCard, 1)
        checkNums.forEach((num,) => {
            if (luckyNums.includes(num)) {
                cardAndWins.set(curCard, cardAndWins.get(curCard) + 1)
            }
        })
        curCard++
    }

    curCard = 1
    const amountOfCards = new Map()
    for (inp of inputs) {
        amountOfCards.set(curCard, 1)
        curCard++
    }

    curCard = 1
    for (inp of inputs) {
        const wins = cardAndWins.get(curCard)
        const copies = amountOfCards.get(curCard)
        for (let i = 0; i < copies; i++) {
            for (let j = curCard + 1; j < wins + curCard; j++) {
                amountOfCards.set(j, amountOfCards.get(j) + 1)
            }
        }
        curCard++
    }
    return [...amountOfCards.values()].reduce((accum, cur) => accum + cur, 0)
}

console.log(scratchCard(input))