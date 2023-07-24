class Utilities {
    static capitalize(word) {
        let capitalizedWord = word.charAt(0).toUpperCase() + word.slice(1)
        return capitalizedWord
    }

    iteratorGenerator = function* () {
        let counter = 0
        while (true) {
            yield counter
            counter += 1
        }
    }

    static isManager(userObj) {
        if (userObj.roles.find(role => role === "Manager")) return true
        else return false
    }

    static isAdmin(userObj) {
        if (userObj.roles.find(role => role === "Admin")) return true
        else return false
    }

    static isSalesperson(userObj) {
        if (userObj.roles.find(role => role === "Salesperson")) return true
        else return false
    }

    static isEmployee(userObj) {
        if (userObj.roles.find(role => role === "Employee")) return true
        else return false
    }
}

export default Utilities; 