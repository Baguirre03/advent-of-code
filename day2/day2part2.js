const fs = require('fs');
const readFile = (path) => fs.readFileSync(path, { encoding: "utf8" })
const input = readFile('./day2/input.txt').split('\n')

const cubeConundrum = (inputs) => {
    let res = []
    for (inp of inputs) {
        const inpGames = inp.split(/[:;]/)
        let dict = {
            green: [],
            red: [],
            blue: []
        }

        for (let i = 1; i < inpGames.length; i++) {
            let colors = inpGames[i].trimStart().split(', ').map((col) => {
                let arr = col.split(' ')
                return [arr[1], arr[0]]
            })
            colors.forEach((color) => {
                dict[color[0]].push(Number(color[1]))
            })
        }
        let max = Object.values(dict).map((arr) => Math.max(...arr))
        res.push(max.reduce((accum, cur) => accum * cur, 1))
    }
    return res.reduce((accum, cur) => accum + cur, 0)
}

console.log(cubeConundrum(input))