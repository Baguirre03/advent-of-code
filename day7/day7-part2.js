const fs = require('fs');
const readFile = (path) => fs.readFileSync(path, { encoding: "utf8" })
const input = readFile('./day7/input.txt').split('\n')

const camelCards = (input) => {
    for (inp of input) {
        console.log(inp)
    }
}


console.log(camelCards(input))