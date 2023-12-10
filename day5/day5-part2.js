const fs = require('fs');
const readFile = (path) => fs.readFileSync(path, { encoding: "utf8" })
const input = readFile('./day5/input.txt').split('\n').filter(x => x !== '')

const checkRange = (rangeMin, rangeMax, checkMin, checkMax) => (rangeMin >= checkMin && rangeMin <= checkMax) || (rangeMax <= checkMax && rangeMax >= checkMin)

const createSeedRanges = (seedsArr) => {
    let arr = []
    for (let i = 0; i < seedsArr.length; i += 2) {
        arr.push([seedsArr[i], seedsArr[i + 1] + seedsArr[i], false])
    }
    return arr
}

const createNewRange = (curRange, numLow, numMax, replacement, rangeArr) => {
    let [low, high] = curRange
    if (high > numMax) {
        let newArr = [numMax + 1, high, false]
        rangeArr.push(newArr)
        high = numMax
        lowDif = low - numLow
        highDif = high - numLow
        low = replacement + lowDif
        high = replacement + highDif
    } else if (low < numLow) {
        let newArr = [low, numLow - 1, false]
        rangeArr.push(newArr)
        low = numLow
        lowDif = low - numLow
        highDif = high - numLow
        low = replacement + lowDif
        high = replacement + highDif
    } else {
        let dif = low - numLow
        let difHigh = high - numLow
        low = replacement + dif
        high = replacement + difHigh
    }
    curRange[0] = low
    curRange[1] = high
    curRange[2] = true
    return rangeArr
}



const seedMapping = (inputs) => {
    let seeds = inputs.splice(0, 1)

    seeds = seeds[0].toString().split(' ').map((seed) => Number(seed))
    seeds.shift()

    let ranges = createSeedRanges(seeds)


    for (inp of inputs) {
        if (inp.split(' ').length === 2) {
            ranges = ranges.map(range => [range[0], range[1], false])
            continue
        }

        inp = inp.split(' ')
        let count = Number(inp[2])
        let num = Number(inp[1])
        let replace = Number(inp[0])
        for (range of ranges) {
            if (checkRange(range[0], range[1], num, num + count - 1)) {
                if (range[2] === true) continue
                createNewRange(range, num, num + count, replace, ranges)
            }
        }

    }
    return Math.min(...ranges.map(range => range[0]))
}


console.log(seedMapping(input))