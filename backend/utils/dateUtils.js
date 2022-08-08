MILLISECONDS_IN_DAY = 86400000;

function sanitizeDate(date) {
    date = new Date(date);
    dateString = date.toLocaleDateString();
    return Date.parse(dateString);
}

function createArrayOfDays(startDate, endDate) {
    let allDays = [];
    startDate = sanitizeDate(startDate);
    endDate = sanitizeDate(endDate);
    do {
        allDays.push(startDate);
        startDate += MILLISECONDS_IN_DAY;
    } while (startDate <= endDate);
    return allDays;
}

module.exports = {
    createArrayOfDays,
    sanitizeDate
}


