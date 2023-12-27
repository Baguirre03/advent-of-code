const fs = require('fs');
const readFile = (path) => fs.readFileSync(path, { encoding: "utf8" })
const input = readFile('./day11/input.txt').split('\n')

const expand = (input) => {
    // Horizontal expand
    let indexes = []
    let copy = input[0].split('').map(() => '.').join('')
    for (let i = 0; i < input.length; i++) {
        if (input[i].split('').every(x => x === '.')) {
            indexes.push(i)
        }
    }
    indexes.forEach((ind, index) => input.splice(ind + index, 0, copy))

    // Vertical expand
    indexes.splice(0)
    for (let i = 0; i < input[0].length; i++) {
        if (input.every(x => x[i] === '.')) {
            indexes.push(i)
        }
    }

    for ([index, inp] of input.entries()) {
        let tmp = inp
        indexes.forEach((ind, index2) => {
            let arr = tmp.split('')
            arr.splice(ind + index2, 0, '.')
            tmp = arr.join('')
        })
        input[index] = tmp
    }

    return input
}

const cosmicExpansic = (input) => {
    expand(input)
    const positions = []
    const regex = /#/g;

    for ([index, inp] of input.entries()) {
        while ((match = regex.exec(inp)) != null) {
            positions.push([index, match.index])
        }
    }

    // create pairs
    const res = []
    let cur = 0
    while (positions.length) {
        positions.forEach((pair, index) => {
            if (index === 0) {
                // do nothing same pair
            } else {
                let distance = Math.abs(positions[0][0] - pair[0]) + Math.abs(positions[0][1] - pair[1])
                res.push(distance)
            }
        })
        cur++
        positions.splice(0, 1)
    }
    return res.reduce((cur, accum) => cur + accum)
}

console.log(cosmicExpansic(input))