import { StyleSheet } from 'react-native';

export function processData(data, config) {
    var lunchPeriod = data.periods.findIndex(el => el.name.indexOf("Lunch") !== -1)

    var processedPeriods = data.periods.map(period => {
        //If free period
        if (period.block && config.blocks[period.block.toLowerCase()].isFree) period.name = "Free - " + showPeriodNumber(period.period);

        //If not free and has been named
        else if (period.block && config.blocks[period.block.toLowerCase()].name) period.name = config.blocks[period.block.toLowerCase()].name + " - " + showPeriodNumber(period.period);

        //Some string/date work to convert their format into Date objectys
        var s = period.start.split(":").map(el => parseInt(el)); //
        var e = period.end.split(":").map(el => parseInt(el));
        period.start = new Date().setHours(s[0], s[1], 0, 0);
        period.end = new Date().setHours(e[0], e[1], 0, 0);

        return period;
    });

    processLunch(processedPeriods, lunchPeriod, config);

    return {
        name: data.name,
        periods: processedPeriods
    }
}

export function processLunch(processedPeriods, lunchPeriod, config) {
    //If lunch period is free, reduce all 3 into mega lunch
    if (config.blocks[processedPeriods[lunchPeriod].block.toLowerCase()].isFree) {
        var megaLunch = {
            block: processedPeriods[lunchPeriod].block,
            name: "Lunch " + processedPeriods[lunchPeriod].name.replace("- First Lunch", ""),
            period: processedPeriods[lunchPeriod].period,
            start: processedPeriods[lunchPeriod].start,
            end: processedPeriods[lunchPeriod + 2].end
        };
        processedPeriods.splice(lunchPeriod, 3)
        processedPeriods.splice(lunchPeriod, 0, megaLunch)

    }
    else if (config.blocks[processedPeriods[lunchPeriod].block.toLowerCase()].lunchType === 1) {
        var firstLunch = {
            block: processedPeriods[lunchPeriod].block,
            name: "First Lunch - " + showPeriodNumber(processedPeriods[lunchPeriod].period),
            period: processedPeriods[lunchPeriod].period,
            start: processedPeriods[lunchPeriod].start,
            end: processedPeriods[lunchPeriod].end
        };
        var secondHalfClass = {
            block: processedPeriods[lunchPeriod].block,
            name: processedPeriods[lunchPeriod].name.replace("- First Lunch", ""),
            period: processedPeriods[lunchPeriod].period,
            start: processedPeriods[lunchPeriod].end,
            end: processedPeriods[lunchPeriod + 2].end
        }
        processedPeriods.splice(lunchPeriod, 3)
        processedPeriods.splice(lunchPeriod, 0, secondHalfClass)
        processedPeriods.splice(lunchPeriod, 0, firstLunch)

    }
    else if (config.blocks[processedPeriods[lunchPeriod].block.toLowerCase()].lunchType === 2) {
        var clss = {
            block: processedPeriods[lunchPeriod].block,
            name: processedPeriods[lunchPeriod].name.replace("- Second Lunch", ""),
            period: processedPeriods[lunchPeriod].period,
            start: processedPeriods[lunchPeriod].start,
            end: processedPeriods[lunchPeriod + 1].end
        }
        var secondLunch = {
            block: processedPeriods[lunchPeriod].block,
            name: "Second Lunch - " + showPeriodNumber(processedPeriods[lunchPeriod].period),
            period: processedPeriods[lunchPeriod].period,
            start: processedPeriods[lunchPeriod].end,
            end: processedPeriods[lunchPeriod + 2].end
        };
        processedPeriods.splice(lunchPeriod, 3)
        processedPeriods.splice(lunchPeriod, 0, secondLunch)
        processedPeriods.splice(lunchPeriod, 0, clss)
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
    if (hrs > 12) hrs =- 12;
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
            var n = Object.assign({}, schedule).periods.filter(p => p.start >= new Date()).reduce((p, c) => {
                if (!p) return c;
                if (p.start >= c.start) return c;
                else return p;
            })
            return { currentPeriod: { name: "Passing Period" }, timeToEnd: n.start - new Date() }
        }
    }
    else {
        var c = Object.assign({}, currentPeriod);
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

export function showDate(date) {
    var year = date.substring(0, 4)
    var month = date.substring(4, 6);
    var day = date.substring(6, 8);
    return month + "/" + day + "/" + year
}

export function showDayType(sched) {
    var firstBlock = sched.periods.filter(el => !!el.block)[0].block;
    if (sched.name.indexOf("Hall") !== -1 && sched.name.indexOf("No") === -1) {
        var hallLength = parseInt(sched.name);
        return (firstBlock + "-" + hallLength + " Day")
    }
    else return firstBlock + " Day";
}

export function showLunchType(type) {
    switch (type) {
        case 0: return 'Unconfigured';
        case 1: return 'First Lunch';
        case 2: return "Second Lunch";
    }
}

export function showPeriodNumber(period) {
    switch (period) {
        case 0: return "";
        case 1: return "1st";
        case 2: return "2nd";
        case 3: return "3rd";
        case 4: return "4th";
        case 5: return "5th";
        case 6: return "6th";
        case 7: return "7th";
    }
}

export const styles = StyleSheet.create({
    title: {
        textAlign: "center",
        fontSize: 20,
        paddingTop: 10
    },
    timeLeft: {
        textAlign: "center",
        fontSize: 30,
        paddingTop: 20
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 8,
    }
});

export const initialValue = {
    blocks: {
        a: {
            name: "",
            isFree: false,
            lunchType:0 // 0 means not configured, 1 means first lunch, 2 means second lunch
        },
        b: {
            name: "",
            isFree: false,
            lunchType:0
        },
        c: {
            name: "",
            isFree: false,
            lunchType:0
        },
        d: {
            name: "",
            isFree: false,
            lunchType:0
        },
        e: {
            name: "",
            isFree: false,
            lunchType:0
        },
        f: {
            name: "",
            isFree: false,
            lunchType:0
        },
        g: {
            name: "",
            isFree: false,
            lunchType:0
        },
        h: {
            name: "",
            isFree: false,
            lunchType:0
        },
    },
    calendarDate: ""
}
