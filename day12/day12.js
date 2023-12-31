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

function createCombos(questionMarks, replacements, combinations) {
    let comboArr = []
    let prev = []

    while (combinations > 1) {
        let curNum = getNumbers(questionMarks, replacements)
        if (!prev.includes(String(curNum))) {
            comboArr.push(curNum)
            prev.push(String(curNum))
            combinations--
        }
    }

    return comboArr
}

function getNumbers(questionMarks, replacements, nums = []) {
    if (nums.length === replacements) return nums.sort((last, cur) => last - cur)

    let curNum = questionMarks[Math.floor(Math.random() * questionMarks.length)]
    if (nums.includes(curNum)) {
        return getNumbers(questionMarks, replacements, nums)
    } else {
        nums.push(curNum)
        return getNumbers(questionMarks, replacements, nums)
    }
}

function decipher(pattern, questionMarks, replacements, combos, checker, prev = []) {
    let count = 0
    let optionsArr = createCombos(questionMarks, replacements, combos)
    console.log(optionsArr)

    if (!prev.includes(String(numsReplacement))) {
        combos--
        prev.push(String(numsReplacement))
        if (checkString(pattern.split(''), numsReplacement, checker)) count++
    }

    return count
}

const hotSprings = (input) => {
    let res = []

    for (inp of input) {
        let [pattern, numbers] = inp.split(' ')
        let [questionMarks, hashes] = [Object.entries(pattern).map((x) => x[1] === '?' ? +x[0] : null).filter(x => x || x === 0), Object.entries(pattern).map((x) => x[1] === '#' ? +x[0] : null).filter(x => x || x === 0).length]

        let replacements = numbers.split(',').map(x => +x).reduce((acum, cur) => acum + cur) - hashes
        let combos = math.combinations(questionMarks.length, replacements)

        let count = decipher(pattern, questionMarks, replacements, combos, numbers.split(',').map(x => +x))
        res.push(count)
    }

    return res.reduce((acum, cur) => acum + cur)
}

console.log(hotSprings(input))