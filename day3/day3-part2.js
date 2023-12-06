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

const getCords = (board, x, y, curNumArr, finalAdjacents = []) => {
    let cases = [[0, 1], [1, 0], [-1, 0], [0, -1], [1, -1], [-1, 1], [1, 1], [-1, -1]]
    const adjacents = cases.map((cord) => {
        if (x + cord[0] >= board.length || y + cord[1] >= board[0].length || x + cord[0] < 0 || y + cord[1] < 0) return null
        else return [board[x + cord[0]][y + cord[1]], x + cord[0], y + cord[1]]
    }).filter(x => x)
    board[x][y] = '.'

    finalAdjacents.push(adjacents)
    if (isNumeric(adjacents[0][0])) {
        curNumArr.push(board[x][y + 1])
        return getCords(board, x, y += 1, curNumArr, finalAdjacents)
    } else {
        return [finalAdjacents.flat(), curNumArr, y]
    }

}

const checkCords = (elem) => elem[0] === '*'

const findAdjacentsNum = (board, x, y, numHolder = []) => {
    let cases = [[0, 1], [1, 0], [-1, 0], [0, -1], [1, -1], [-1, 1], [1, 1], [-1, -1]]
    const adjacents = cases.map((cord) => {
        if (x + cord[0] >= board.length || y + cord[1] >= board[0].length || x + cord[0] < 0 || y + cord[1] < 0) return null
        else return [board[x + cord[0]][y + cord[1]], x + cord[0], y + cord[1]]
    }).filter(x => x)
    for (const cord of adjacents) {
        if (isNumeric(cord[0])) {
            numHolder.push(cord[0])
            let x = cord[1]
            let left = cord[2] - 1
            let right = cord[2] + 1
            board[x][[cord[2]]] = '.'
            while (isNumeric(board[x][left])) {
                numHolder.unshift(board[x][left])
                board[x][left] = '.'
                left--
            }
            while (isNumeric(board[x][right])) {
                numHolder.push(board[x][right])
                board[x][right] = '.'
                right++
            }
            return numHolder.length ? Number(numHolder.join('')) : 0
        }
    }
}

const engineSchematic = (input) => {
    let board = boardCreate(input)
    let res = []
    for (let i = 0; i < board.length; i++) {
        let curCount = 0
        while (curCount <= board[i].length) {
            if (isNumeric(board[i][curCount])) {
                let curNumArr = [board[i][curCount]]
                let [allAdjacents, finalNum, upCount] = getCords(board, i, curCount, curNumArr)
                curCount = upCount
                for (cord of allAdjacents) {
                    if (checkCords(cord[0])) {
                        let x = cord[1]
                        let y = cord[2]
                        let finalNum2 = findAdjacentsNum(board, x, y)
                        if (finalNum2) res.push(Number(finalNum.join('')) * finalNum2)
                    }
                }
            }
            curCount++
        }
    }
    return res.reduce((accum, cur) => accum + cur, 0)
}

console.log(engineSchematic(input))