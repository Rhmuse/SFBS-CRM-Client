class Utilities {
    static capitalize(word) {
        let capitalizedWord = word.charAt(0).toUpperCase() + word.slice(1)
        return capitalizedWord
    }
}

export default Utilities; 