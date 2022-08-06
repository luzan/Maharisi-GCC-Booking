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
    for (let i = startDate; i <= endDate; i = i + MILLISECONDS_IN_DAY) {
        allDays.push(i);
    }
    return allDays;
}

module.exports = {
    createArrayOfDays,
    sanitizeDate
}


