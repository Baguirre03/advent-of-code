const fs = require('fs');
const readFile = (path) => fs.readFileSync(path, { encoding: "utf8" })
const input = readFile('./day8/input.txt').split('\n')

class Node {
    constructor(val, left, right) {
        this.val = val
        this.left = left
        this.right = right
    }
}

const createMap = (input) => {
    let mp = new Map()
    input.shift()

    for (inp of input) {
        let arr = inp.replace(/[(),=]/g, '').split(' ').filter(x => x != '')
        mp.set(arr[0], [arr[1], arr[2]])
    }

    return mp
}

const hauntedWasteland = (input) => {
    let pattern = input.splice(0, 1)[0].split('')
    let mp = createMap(input)
    let cur = mp.get('AAA')
    let lOrR = 0
    let steps = 0

    while (cur) {
        if (pattern[lOrR] === 'L') {
            if (cur[0] === "ZZZ") break
            cur = mp.get(cur[0])
        } else {
            if (cur[1] === "ZZZ") break
            cur = mp.get(cur[1])
        }
        lOrR = lOrR === pattern.length - 1 ? 0 : lOrR + 1
        steps++
    }
    return steps + 1
}

console.time('time')
console.log(hauntedWasteland(input))
console.timeEnd('time')