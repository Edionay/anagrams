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
    anagrams(countLetters(input), reduceWords(words, countLetters(input)), [])
})

/**
 * Reduce the words to input's anagrams
 * @param {[string]} words Dictionary os words
 * @param {string} input User input
 */
function reduceWords(words, input) {
    let candidates = new Map()
    words.forEach(line => {
        let candidateMap = countLetters(line)
        let isContained = true
        candidateMap.forEach((value, key) => {
            if (!input.has(key) || input.get(key) < value) isContained = false
        })
        if (isContained === true) candidates.set(line, candidateMap)
    })
    return candidates
}

/**
 * Map a string to a mapped object
 * @param {string} word 
 */
function countLetters(word) {

    let counts = {}
    let character, index, count

    for (index = 0, word.length; index < word.length; ++index) {
        character = word.charAt(index)
        count = counts[character]
        counts[character] = count ? count + 1 : 1
    }
    let map = new Map(Object.entries(counts))
    map.delete(' ')
    return map
}

function mapContains(bigMap, smallMap) {
    let isContained = true
    smallMap.forEach((value, key) => {
        if (!bigMap.has(key) && bigMap.get(key) < value) isContained = false
    })

    return isContained
}

/**
 * Returns an intersection between a bigger and smaller mapped word
 * @param {*} biggerMap 
 * @param {*} smallerMap 
 */
function removeLetters(biggerMap, smallerMap) {
    smallerMap.forEach((value, key) => {
        biggerMap.set(key, biggerMap.get(key) - value)
        if (biggerMap.get(key) <= 0) biggerMap.delete(key)
    })
    return biggerMap
}

const anagramlist = []

/**
 * Re
 * @param {*} mappedInput 
 * @param {*} reducedWords 
 * @param {*} chosenWords 
 */
function anagrams(mappedInput, reducedWords, chosenWords) {
    console.log(mappedInput, reducedWords, chosenWords)
    if (mappedInput.size === 0) {
        anagramlist.push(chosenWords)
    } else {
        reducedWords.forEach((value, key) => {
            if (mapContains(mappedInput, value)) {
                let newEntradaMap = removeLetters(mappedInput, value)
                chosenWords.push(key)
                anagrams(newEntradaMap, reducedWords, chosenWords)
            }
        })
    }
}