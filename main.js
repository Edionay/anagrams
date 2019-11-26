const readline = require('readline')
const fs = require('fs')

const input = process.argv.slice(2)[0]

const readInterface = readline.createInterface({
    input: fs.createReadStream('words.txt')
})

const words = []

readInterface.on('line', line => {
    words.push(line)
})

readInterface.on('close', () => {

})