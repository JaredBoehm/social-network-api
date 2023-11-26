// this was just for fun
let dater = (function () {
    /**
     * Function to get full month name from month number
     * @param {number} month from 0 to 11
     * @returns full month name as string e.g. 'January'
     */
    let month = (month) => {
        // value must be a number
        if (typeof month !== 'number') {
            throw new Error('Invalid month argument. Got "' + month + '" expected a number.')
        }
        // value must be between 0 and 11
        if (month < 0 || month > 11) {
            throw new Error('Invalid month argument. Month must be between 0 and 11.')
        }
        // the months:
        let Months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        return Months[month]
    }

    /**
     * Function to get a day with the proper suffix
     * @param {number} day from 1 to 31
     * @returns day with suffix e.g. '1st'
     */
    let day = (day) => {
        // value must be a number
        if (typeof day !== 'number') {
            throw new Error('Invalid day argument. Got "' + day + '" expected a number.')
        }
        // value must be between 1 and 31
        if (day < 1 || day > 31) {
            throw new Error('Invalid day argument. Day must be between 1 and 31.')
        }
        // special cases because english is weird, thanks english
        let dayString = ''
        switch (day) {
            case 1:
            case 21:
            case 31:
                dayString = `${day}st`
                break
            case 2:
            case 22:
                dayString = `${day}nd`
                break
            case 3:
            case 23:
                dayString = `${day}rd`
                break
            default:
                dayString = `${day}th`
        }
        return dayString
    }
    return {
        month: month,
        day: day
    }
})()

module.exports = {
    /**
     * Format yo dates
     * @param {Date} date js date object
     * @returns Formatted date as Month Day, Year at Time
     */
    formatDate: date => {
        // Format date as Month Day, Year at Time
        return `${dater.month(date.getMonth())} ${dater.day(date.getDate())}, ${date.getFullYear()} at ${date.toLocaleTimeString()}`
    },
}