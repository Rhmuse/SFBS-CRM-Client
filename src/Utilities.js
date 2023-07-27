class Utilities {
    iteratorGenerator = function* () {
        let counter = 0
        while (true) {
            yield counter
            counter += 1
        }
    }

    static capitalize(word) {
        let capitalizedWord = word.charAt(0).toUpperCase() + word.slice(1)
        return capitalizedWord
    }

    static moneyFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    })

    static dateFormatter(date) {
        return `${new Date(
            Date(date.announcementDate)
        ).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            time: 'numeric',
        })}
     at 
    ${new Date(
            Date(date.announcementDate)
        ).toLocaleTimeString('en-US')}`
    }


    //User type checking
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