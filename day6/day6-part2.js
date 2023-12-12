const fs = require('fs');
const readFile = (path) => fs.readFileSync(path, { encoding: "utf8" })
const input = readFile('./day6/input.txt').split('\n')

const boatRace = (input) => {
    let res = input.map((l) => l.split(' ').filter(x => x != '').splice(1).join('')).map(x => Number(x))

    let time = res[0]
    let record = res[1]
    let cur = 0
    let count = 0

    while (cur < time) {
        let distance = cur * (time - cur)
        if (distance > record) count++
        else if (count !== 0 && cur < distance) break
        cur++
    }
    return count
}


console.log(boatRace(input))