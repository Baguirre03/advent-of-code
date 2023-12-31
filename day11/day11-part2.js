const fs = require('fs');
const readFile = (path) => fs.readFileSync(path, { encoding: "utf8" })
const input = readFile('./day11/input.txt').split('\n')

const expand = (input) => {
    // Horizontal expand
    let horizontal = []
    for (let i = 0; i < input.length; i++) {
        if (input[i].split('').every(x => x === '.')) {
            horizontal.push(i)
        }
    }

    // Vertical expand
    let vertical = []
    for (let i = 0; i < input[0].length; i++) {
        if (input.every(x => x[i] === '.')) {
            vertical.push(i)
        }
    }

    return [horizontal, vertical]
}

const compare = ([y1, x1], [y2, x2], horizontal, vertical) => {
    // console.log(y1, x1, y2, x2, horizontal, vertical)
    let count = 0
    horizontal.forEach((index) => {
        if (y1 < index && y2 > index || y1 > index && y2 < index) count++
    })

    vertical.forEach((index) => {
        if (x1 < index && x2 > index || x1 > index && x2 < index) count++
    })

    return count
}

const cosmicExpansic = (input) => {
    let [horizontal, vertical] = expand(input)

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
                let count = compare(positions[0], pair, horizontal, vertical)
                res.push(distance + (count * 999999))
            }
        })
        cur++
        positions.shift()
    }
    return res.reduce((cur, accum) => cur + accum)
}

console.time('time')
console.log(cosmicExpansic(input))
console.timeEnd('time')