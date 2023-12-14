const fs = require('fs');
const readFile = (path) => fs.readFileSync(path, { encoding: "utf8" })
const input = readFile('./day7/input.txt').split('\n')

let ranks = {
    '5 of a kind': 7,
    'Four of a kind': 6,
    'Full house': 5,
    'Three of a kind': 4,
    'Two pair': 3,
    'One pair': 2,
    'High Card': 1
}

let cards = {
    'A': 13,
    'K': 12,
    'Q': 11,
    'T': 9,
    '9': 8,
    '8': 7,
    '7': 6,
    '6': 5,
    '5': 4,
    '4': 3,
    '3': 2,
    '2': 1,
    'J': 0,
}

function solveJ(mp) {
    let entries = [...mp.entries()]

    entries.sort((a, b) => {
        if (a[0] === 'J') return 1
        else if (b[0] === 'J') return -1
        else return a[1] >= b[1] ? -1 : 1
    })

    return entries[0][0]

}

function solve(input) {
    let mp = new Map()
    for (char of input) {
        mp.has(char) ? mp.set(char, mp.get(char) + 1) : mp.set(char, 1)
    }

    if (mp.get('J') < 5) {
        let letter = solveJ(mp)
        mp.set(letter, mp.get(letter) + mp.get('J'))
        mp.delete('J')
    }

    let values = [...mp.values()]
    values.sort((a, b) => a > b ? -1 : 1)

    switch (true) {
        case values.includes(5):
            return 7
        case values.includes(4):
            return 6
        case values.includes(3) && values.includes(2):
            return 5
        case values.includes(3):
            return 4
        case values[0] === values[1] && values[0] === 2: // two pair
            return 3
        case values.includes(2):
            return 2
        default:
            return 1
    }
}

function figureOutHighest(str, str2) {
    let cur = 0
    while (str[cur] === str2[cur]) {
        cur++
    }
    if (cards[str[cur]] > cards[str2[cur]]) {
        return -1
    } else if (cards[str[cur]] < cards[str2[cur]]) {
        return 1
    }
}

const camelCards = (input) => {
    let res = []
    for (inp of input) {
        let cur = inp.split(' ')
        const num = solve(cur[0])
        cur.push(num)
        res.push(cur)
    }

    res.sort((a, b) => {
        if (a[2] === b[2]) {
            return figureOutHighest(a[0], b[0])
        } else {
            return a[2] > b[2] ? -1 : 1
        }
    })

    res = res.reverse().map((arr, index) => [...arr, index + 1]).map(x => Number(x[1] * x[3]))
    return res.reduce((cur, accum) => cur + accum, 0)
}


console.log(camelCards(input))
// 250506580