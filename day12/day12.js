const fs = require('fs');
const { combinations } = require('mathjs');
const math = require('mathjs')
const readFile = (path) => fs.readFileSync(path, { encoding: "utf8" })
const input = readFile('./day12/input.txt').split('\n')

// function createGroups(positions) {
//     let prev = positions.shift()
//     let arr = [prev]
//     let groups = []

//     while (positions.length) {
//         let cur = positions.shift()
//         if (arr.at(-1) + 1 === cur) {
//             arr.push(cur)
//         } else {
//             groups.push(arr.concat())
//             arr.splice(0)
//             arr = [cur]
//         }
//     }
//     groups.push(arr.concat())

//     return groups
// }


const checkString = (string, positions) => {

}

function getNumbers(options, count, prev, nums = []) {
    if (nums.length === count) return nums

    let curNum = options[Math.floor(Math.random() * options.length)]
    if (nums.includes(curNum)) {
        return getNumbers(options, count, prev, nums)
    } else {
        nums.push(curNum)
        return getNumbers(options, count, prev, nums)
    }
}

function decipher(pattern, questionMarks, replacements, combos, count = 0, prev = []) {
    if (combos < 0) return count

    let numsReplacement = getNumbers(questionMarks, replacements, prev)
    console.log('replace', numsReplacement)
    // if (prev.contains(String(choices))) {
    //     decipher(pattern, questionMarks, replacements, combos, count, prev)
    // }
}

const hotSprings = (input) => {
    let res = []

    for (inp of input) {
        let [pattern, numbers] = inp.split(' ')
        let [questionMarks, hashes] = [Object.entries(pattern).map((x) => x[1] === '?' ? +x[0] : null).filter(x => x || x === 0), Object.entries(pattern).map((x) => x[1] === '#' ? +x[0] : null).filter(x => x || x === 0).length]

        let replacements = numbers.split(',').map(x => +x).reduce((acum, cur) => acum + cur) - hashes
        let combos = math.combinations(questionMarks.length, replacements)

        let count = decipher(pattern, questionMarks, replacements, combos)
        res.push(count)
    }

    res.reduce((acum, cur) => acum + cur)
}

console.log(hotSprings(input))