const fs = require('fs');
const readFile = (path) => fs.readFileSync(path, { encoding: "utf8" })
const input = readFile('./day10/input.txt').split('\n').map(inp => inp.split(''))

const cases = {
    '|': [[1, 0], [-1, 0]],
    '-': [[0, -1], [0, 1]],
    'L': [[-1, 0], [0, 1]],
    'J': [[-1, 0], [0, -1]],
    '7': [[0, -1], [1, 0]],
    'F': [[0, 1], [1, 0]],
    'S': [0, 0],
}

const findS = (input) => {
    for (inp of input) {
        if (inp.includes('S')) return [input.indexOf(inp), inp.indexOf('S')]
    }
}

const findSides = [[0, 1], [0, -1], [1, 0], [-1, 0]]
const string = (x, y) => String(x) + String(y)
const getBoard = (board, y, x) => board[y][x]

const start = (sides) => {
    let cur = []
    sides.splice(sides.findIndex(x => x.some(v => v < 0)), 1)
    sides.forEach((side) => {
        let y = side[0]
        let x = side[1]
        let piece = input[y][x]
        if (cases[piece]) {
            cur.push([piece, y, x, string(y, x)])
        }
    })

    return cur[0]
}


const pipeMaze = (input) => {
    const sCords = findS(input)
    const sides = findSides.map((x) => [x[0] + sCords[0], x[1] + sCords[1]])
    let curCord = start(sides)

    let count = 0
    let last = string(sCords[0], sCords[1])

    while (curCord[0] !== 'S') {
        let opts = cases[curCord[0]]
        let nextPositions = opts.map((opt) => {
            let y = opt[0] + curCord[1]
            let x = opt[1] + curCord[2]
            let piece = getBoard(input, y, x)
            return [piece, y, x, string(y, x)]
        })
        nextPositions = nextPositions.filter(x => x[3] !== last)
        last = curCord[3]
        curCord = nextPositions[0]
        count++
    }

    return Math.round(count / 2)
}

console.log(pipeMaze(input))