class Utilities {
    static capitalize(word) {
        let capitalizedWord = word.charAt(0).toUpperCase() + word.slice(1)
        return capitalizedWord
    }

    iteratorGenerator = function* () {
        let counter = 0
        while (true) {
            yield counter
            counter += 1  // Increment the counter
        }
    }
}

export default Utilities; 