const fs = require('fs');
const readFile = (path) => fs.readFileSync(path, { encoding: "utf8" })
const input = readFile('./day5/input.txt').split('\n').filter(x => x !== '')

function isBetween(x, min, max) {
    return x >= min && x <= max;
}

const createSeeds = (seedsArr) => {
    let arr = []
    for (let i = 0; i < seedsArr.length; i += 2) {
        arr.push([seedsArr[i], seedsArr[i + 1] + seedsArr[i]])
    }
    return arr
}

const seedMapping = (inputs) => {
    let seeds = inputs.splice(0, 1)

    seeds = seeds[0].toString().split(' ').map((seed) => Number(seed))
    seeds.shift()

    let ranges = createSeeds(seeds)
    let finalArr = []

    for (inp of inputs) {
        if (inp.split(' ').length === 2) {
            // seeds = seeds.map((seed) => [seed[0], false])
            continue
        }

        inp = inp.split(' ')
        let count = Number(inp[2])
        let num = Number(inp[1])
        let replace = Number(inp[0])

        seeds.forEach((seed, index) => {
            if (isBetween(seed[0], num, num + count) && !seed[1]) {
                let dif = seed[0] - num
                seeds[index][0] = dif + replace
                seed[1] = true
            }
        })
    }
    return Math.min(...seeds.map((seed) => Number(seed[0])))
}

console.log(seedMapping(input))