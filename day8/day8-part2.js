const fs = require('fs');
const readFile = (path) => fs.readFileSync(path, { encoding: "utf8" })
const input = readFile('./day8/input.txt').split('\n')
const math = require('mathjs')

const createMap = (input) => {
    let mp = new Map()
    input.shift()
    let start = []

    for (inp of input) {
        let arr = inp.replace(/[(),=]/g, '').split(' ').filter(x => x != '')
        if (arr[0][2] === 'A') start.push(arr[0])
        mp.set(arr[0], [arr[1], arr[2]])
    }
    return [mp, start]
}

const hauntedWasteland = (input) => {
    let pattern = input.splice(0, 1)[0].split('')
    let [mp, curArr] = createMap(input)
    let lOrR = 0
    let steps = 0
    const checker = (str) => str[2] === 'Z'
    let res = []

    while (curArr.length > 0) {
        curArr.forEach((cur, index) => {
            if (cur[2] === 'Z') {
                res.push(steps)
                curArr.splice(index, 1)
            }
        })

        if (pattern[lOrR] === 'L') {
            curArr = curArr.map((cur) => {
                return mp.get(cur)[0]
            })
        } else {
            curArr = curArr.map((cur) => {
                return mp.get(cur)[1]
            })
        }
        lOrR = lOrR === pattern.length - 1 ? 0 : lOrR + 1
        steps++
    }

    return math.lcm(...res)
}

console.time('time')
console.log(hauntedWasteland(input))
console.timeEnd('time')