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
        hour12: false
    };
    var hm = new Date(ts).toLocaleString('en-us', options).split(" ")[3].split(":");
    var hrs = parseInt(hm[0]);
    if(hrs > 12) hrs = hrs - 12;
    return hrs + ":" + hm[1];
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
            var n = Object.assign({},schedule).periods.filter(p=>p.start >= new Date()).reduce((p,c)=>{
                if(!p) return c;
                if(p.start >= c.start) return c;
                else return p;
            })
            return { currentPeriod: {name:"Passing Period"}, timeToEnd: n.start - new Date() }
        }
    }
    else {
        var c = Object.assign({},currentPeriod);
        c.name = c.block + " - " + c.name + " Period" 
        return { currentPeriod: c, timeToEnd: timeToEnd }
    }
}

export function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join();
}

export function showDate(date){
    var year = date.substring(0,4)
    var month = date.substring(4,6);
    var day = date.substring(6,8);
    return month+"/"+day+"/"+year
}

export function showDayType(sched){
    var firstBlock = sched.periods.filter(el=>!!el.block)[0].block;
    if(sched.name.indexOf("Hall")!==-1){
        var hallLength = parseInt(sched.name);
        return (firstBlock + "-" + hallLength + " Day")
    }
    else return firstBlock +" Day";

}