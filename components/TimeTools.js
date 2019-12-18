export function processData(data) {
    return {
        name: data.name,
        periods: data.periods.map(period => {
            var s = period.start.split(":").map(el => parseInt(el));
            var e = period.end.split(":").map(el => parseInt(el))
            period.start = new Date().setHours(s[0], s[1], 0, 0);
            period.end = new Date().setHours(e[0], e[1], 0, 0);
            return period;
        })
    }
}

export function showTime(ts) {
    var options = {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    };
    return new Date(ts).toLocaleString('en-us', options).split(" ")[3].split(":").slice(0, -1).join(":")
}

export function getCurrentPeriod(schedule) {
    var currentTS = new Date();
    var currentPeriod;
    var timeToEnd = 0;
    schedule.periods.forEach((el, index) => {
        if (el.start <= currentTS && el.end >= currentTS) {
            timeToEnd = el.end - currentTS;
            currentPeriod = el;
        }
    });
    if (!currentPeriod) {
        if (currentTS >= schedule.periods.slice(-1).pop().end) return { currentPeriod: { name: "After School" } }
        else {
            var nextPeriod = schedule.periods.reduce((previous, current) => {
                if (current.start >= currentTS) {
                    if (!previous || current.start >= previous.start) return current;
                    else return previous;
                }
                else return previous;
            })
            return { currentPeriod: "Passing Period", timeToEnd: nextPeriod.start - currentTS }
        }
    }
    else return { currentPeriod: currentPeriod, timeToEnd: timeToEnd }
}