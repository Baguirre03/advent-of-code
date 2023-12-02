const fs = require('fs');
const readFile = (path) => fs.readFileSync(path, { encoding: "utf8" })
const input = readFile('./day2/input.txt').split('\n')


let dict = {
    red: 12,
    green: 13,
    blue: 14,
}

const cubeConundrum = (inputs) => {
    let res = []
    for (inp of inputs) {
        const inpGames = inp.split(/[:;]/)
        let id = Number(inpGames[0].split(' ')[1]);
        let checker = true;
        for (let i = 1; i < inpGames.length; i++) {
            let colors = inpGames[i].trimStart().split(', ').map((col) => {
                let arr = col.split(' ')
                return [arr[1], arr[0]]
            })
            if (!colors.every((arr) => arr[1] <= dict[arr[0]])) {
                checker = false
            }
        }
        if (checker) res.push(id)
    }
    return res.reduce((accum, cur) => accum + cur, 0)
}

console.log(cubeConundrum(input))
