const fs = require('fs');
const math = require('mathjs')
const readFile = (path) => fs.readFileSync(path, { encoding: "utf8" })
const input = readFile('./day12/input.txt').split('\n')

function createGroups(positions) {
    let prev = positions.shift()
    let arr = [prev]
    let groups = []

    while (positions.length) {
        let cur = positions.shift()
        if (arr.at(-1) + 1 === cur) {
            arr.push(cur)
        } else {
            groups.push(arr.concat())
            arr.splice(0)
            arr = [cur]
        }
    }
    groups.push(arr.concat())

    return groups
}

const checkString = (string, positions, checker) => {
    positions.forEach((position) => {
        string[position] = '#'
    })

    string = string.map(x => x === '?' ? '.' : x).join('')
    const hashes = Object.entries(string).map(x => x[1] === '#' ? +x[0] : null).filter(x => x || x === 0)
    const groups = createGroups(hashes).map(x => x.length)

    if (String(groups) === String(checker)) return true
    else return false
}

function choose(arr, k, prefix = []) {
    if (k == 0) return [prefix];
    return arr.flatMap((v, i) =>
        choose(arr.slice(i + 1), k - 1, [...prefix, v])
    );
}

function createCombos(questionMarks, replacements, pattern, checker) {
    let count = 0
    const optionsArr = choose(questionMarks, replacements)
    optionsArr.forEach((option) => {
        if (checkString(pattern.split(''), option, checker)) count++
    })

    return count
}

const hotSprings = (input) => {
    let res = []

    for (inp of input) {
        let [pattern, numbers] = inp.split(' ')
        let [questionMarks, hashes] = [Object.entries(pattern).map((x) => x[1] === '?' ? +x[0] : null).filter(x => x || x === 0), Object.entries(pattern).map((x) => x[1] === '#' ? +x[0] : null).filter(x => x || x === 0).length]

        let replacements = numbers.split(',').map(x => +x).reduce((acum, cur) => acum + cur) - hashes
        let count = createCombos(questionMarks, replacements, pattern, numbers.split(',').map(x => +x))

        res.push(count)
    }

    return res.reduce((acum, cur) => acum + cur)
}

console.time('time')
console.log(hotSprings(input))
console.timeEnd('time')
