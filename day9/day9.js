const { all } = require('express/lib/application');
const fs = require('fs');
const readFile = (path) => fs.readFileSync(path, { encoding: "utf8" })
const input = readFile('./day9/input.txt').split('\n').map(inp => inp.split(' ').map(x => Number(x)))


const allEqual = arr => arr.every(v => v === arr[0])

const createLower = (inp, holder = [inp]) => {
    let temp = []
    for (let i = 0; i < inp.length - 1; i++) {
        temp.push(inp[i + 1] - inp[i])
    }
    holder.push(temp)
    if (allEqual(temp)) return holder
    else return createLower(temp, holder)
}


const mirageMaintenance = (input) => {
    let res = []
    for (inp of input) {
        const cur = createLower(inp).reverse()
        let final = cur.at(0)[0]
        cur.splice(0, 1)

        cur.forEach((num) => {
            final += num.at(-1)
        })

        res.push(final)
    }
    return res.reduce((cur, accum) => cur + accum)
}

console.log(mirageMaintenance(input))