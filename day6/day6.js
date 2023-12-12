const fs = require('fs');
const readFile = (path) => fs.readFileSync(path, { encoding: "utf8" })
const input = readFile('./day6/input.txt').split('\n')

const boatRace = (input) => {
    let res = input.map((l) => l.split(' ').filter(x => x != '').map(x => Number(x)).splice(1))

    let final = []
    for (let i = 0; i < res[0].length; i++) {
        let time = res[0][i]
        let record = res[1][i]

        let cur = 0
        let winners = []
        while (cur < time) {
            let distance = cur * (time - cur)
            if (distance > record) winners.push(1)
            else if (winners.length && cur < distance) break
            cur++
        }
        final.push(winners.reduce((cur, accum) => cur + accum, 0))
    }
    return final.reduce((cur, accum) => cur * accum, 1)
}


console.log(boatRace(input))