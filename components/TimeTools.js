export function processData(data) {
    return {
        name: data.name,
        periods: data.periods.map(period => {
            period.start = new Date().setHours(...period.start.split(":").map(el => parseInt(el)));
            period.end = new Date().setHours(...period.end.split(":").map(el => parseInt(el)));
            return period;
        })
    }
}

export function showTime(ts){
    return new Date(ts).toTimeString().split(":").slice(0,-1).join(":")
}