const fs = require('fs');
const readFile = (path) => fs.readFileSync(path, { encoding: "utf8" })
const input = readFile('./day3/input.txt').split('\n')

function isNumeric(s) {
    return !isNaN(s - parseFloat(s));
}

const boardCreate = (input) => {
    let board = []
    for (inp of input) {
        board.push(inp.split(''))
    }
    return board
}

const getCords = (board, x, y, curNumArr, finalArr = []) => {
    let cases = [[0, 1], [1, 0], [-1, 0], [0, -1], [1, -1], [-1, 1], [1, 1], [-1, -1]]
    const adjacents = cases.map((cord) => {
        if (x + cord[0] >= board.length || y + cord[1] >= board[0].length || x + cord[0] < 0 || y + cord[1] < 0) return null
        else return board[x + cord[0]][y + cord[1]]
    })
    finalArr.push(adjacents)

    if (isNumeric(adjacents[0])) {
        curNumArr.push(board[x][y + 1])
        return getCords(board, x, y += 1, curNumArr, finalArr)
    } else {
        return [finalArr.flat().filter(x => x), curNumArr, y]
    }

}

const checkCords = (elem) => !isNumeric(elem) && elem !== '.'

const engineSchematic = (input) => {
    let board = boardCreate(input)
    let res = []
    for (let i = 0; i < board.length; i++) {
        let curCount = 0
        while (curCount <= board[i].length) {
            if (isNumeric(board[i][curCount])) {
                let curNumArr = [board[i][curCount]]
                let [cords, finalNum, upCount] = getCords(board, i, curCount, curNumArr)
                curCount = upCount
                if (cords.some(checkCords)) res.push(Number(finalNum.join('')))
            }
            curCount++
        }
    }
    return res.reduce((accum, cur) => accum + cur, 0)
}

console.log(engineSchematic(input))