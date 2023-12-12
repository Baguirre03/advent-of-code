const fs = require('fs');
const readFile = (path) => fs.readFileSync(path, { encoding: "utf8" })
const input = readFile('./day5/input.txt').split('\n').filter(x => x !== '')

const checkRange = (rangeMin, rangeMax, checkMin, checkMax) => {
    if (rangeMin >= checkMax && rangeMax <= checkMax) return true
    else if (rangeMin >= checkMin && rangeMin <= checkMax) return true
    else if (rangeMax <= checkMax && rangeMax >= checkMin) return true
    else if (rangeMin <= checkMax && rangeMax >= checkMax) return true
    return false
}

const createSeedRanges = (seedsArr) => {
    let arr = []
    for (let i = 0; i < seedsArr.length; i += 2) {
        arr.push([seedsArr[i], seedsArr[i + 1] + seedsArr[i] - 1, false])
    }
    return arr
}

const createNewRange = (curRange, numLow, numMax, replacement, rangeArr) => {
    let [low, high] = curRange
    if (low < numLow && high > numMax) {
        let newArr1 = [low, numLow - 1]
        let newArr2 = [high + 1, numMax]
        rangeArr.push(newArr1, newArr2)
        let dif = numMax - numLow
        curRange[0] = replacement
        curRange[1] = dif + replacement
        curRange[2] = true
        return
    } else if (low >= numLow && high <= numMax) {
        let dif = low - numLow
        let difHigh = high - numLow
        curRange[0] = replacement + dif
        curRange[1] = replacement + difHigh
        curRange[2] = true
        return
    } else if (high > numMax) {
        let newArr = [numMax + 1, high]
        rangeArr.push(newArr)
        high = numMax
        lowDif = low - numLow
        highDif = high - numLow
        curRange[0] = replacement + lowDif
        curRange[1] = replacement + highDif
        curRange[2] = true
        return
    } else if (low < numLow) {
        let newArr = [low, numLow - 1]
        rangeArr.push(newArr)
        low = numLow
        lowDif = low - numLow
        highDif = high - numLow
        curRange[0] = replacement + lowDif
        curRange[1] = replacement + highDif
        curRange[2] = true
        return
    }
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
        let max = num + count - 1
        for (range of ranges) {
            if (checkRange(range[0], range[1], num, max)) {
                if (range[2] === true) continue
                else createNewRange(range, num, num + count, replace, ranges)
            }
        }
    }
    return Math.min(...ranges.map(range => range[0]))
}

console.time("Time");
console.log(seedMapping(input));
console.timeEnd("Time");

// 10114991
// 10114992
// 9622622 - answer ?