import { StyleSheet } from 'react-native';

export function processData(data, config) {
    var processedPeriods = data.periods.map(period => {

        if (period.block && period.block !== "Lunch" && config.blocks[period.block.toLowerCase()].isFree) period.name = "Free - " + showPeriodNumber(period.period);

        //If not free and has been named
        else if (period.block && period.block !== "Lunch" && config.blocks[period.block.toLowerCase()].name) period.name = config.blocks[period.block.toLowerCase()].name;

        //Some string/date work to convert their format into Date objects
        var s = period.start.split(":").map(el => parseInt(el)); //
        var e = period.end.split(":").map(el => parseInt(el));
        period.start = new Date().setHours(s[0], s[1], 0, 0);
        period.end = new Date().setHours(e[0], e[1], 0, 0);

        return period;
    });

    return {
        name: data.name,
        periods: processedPeriods
    }
}

export function showTime(ts) {
    var hm = new Date(ts)
    var hrs = hm.getHours();
    if (hrs > 12) hrs -= 12;
    return hrs + ":" + padNumber(hm.getMinutes());
}

export function getCurrentPeriod(schedule) {
    var currentTS = new Date();
    var currentPeriod;
    var timeToEnd = 0;
    
    schedule.periods.forEach(el => {
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
            });
            return { currentPeriod: { name: `Passing Period before ${n.block}`, nextBlock: n }, timeToEnd: n.start - new Date() }
        }
    }
    else {
        var c = Object.assign({}, currentPeriod);
        c.name = c.block + " - " + c.name;
        return { currentPeriod: c, timeToEnd: timeToEnd }
    }
}

export function formatDate(date) {
    var d = new Date(date);
    return [d.getFullYear(), padNumber('' + (d.getMonth() + 1)), padNumber('' + d.getDate())].join();
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

export function padNumber(num){
    return (("" + num).length !== 2) ? "0" + num : num
}

export function iconColor(darkMode){
    return darkMode? '#fff' : '#000';
}

export const styles = StyleSheet.create({
    title: darkMode => ({
        textAlign: "center",
        fontSize: 30,
        paddingTop: 7.5,
        justifyContent: 'center',
        color: darkMode ? "#f8f8f8" : "#444",
    }),
    currentPeriod: {
        textAlign: "center",
        fontSize: 30,
        paddingTop: 10,
        color: "#b5302f"
    },
    timeLeft: darkMode => ({
        textAlign: "center",
        fontSize: 20,
        paddingTop: 5,
        color: darkMode ? "#f8f8f8" : "#444"
    }),
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 8,
        display: 'flex'
    },
    settingsTitleRow: darkMode => ({
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 8,
        paddingTop: 10,
        display: 'flex',
        backgroundColor: darkMode ? "#444" : "#f8f8f8",
    }),
    spacer: {
        flexGrow: 1
    },
    container: {
        flex: 1,
        backgroundColor: "#b5302f"
    },
    timeRange: darkMode => ({
        fontSize: 15,
        paddingTop: 9,
        color: darkMode ? "#ccc" : "#595959"
    }),
    periodWrapper: darkMode => ({
        backgroundColor: darkMode ? "#444" : "#f8f8f8",
        height: "100%"
    }),
    periodItem: (period, current, darkMode) => {
        var s = {
            backgroundColor: darkMode ? "#555555" : "#fff",
            marginTop: 5,
            marginRight: 7,
            marginLeft: 7,
            marginBottom: 0,
            padding: 3.5,
            lineHeight: 5,
        };
        if (period.block != null && period.block === current.block) s.backgroundColor = darkMode ? "#959f52" : '#b5cf92';
        return s;
    },
    darkModeSetting: darkMode => ({
        left: "100%",
        paddingTop: 20,
        color: darkMode ? "#f8f8f8" : "#444",
    }),
    itemSetting: darkMode => ({
        marginTop: 0,
        color: darkMode ? "#f8f8f8" : "#444",
    }),
    settingLabel: darkMode => ({
        left: "10%",
        paddingVertical: 20,
        color: darkMode ? "#f8f8f8" : "#444",
    }), 
    calendarStyle: darkMode => ({
        calendarBackground: darkMode ? "#444" : "#f8f8f8", //Inverted to rest
        dayTextColor: darkMode ? "#f8f8f8" : "#444",
        monthTextColor: darkMode ? "#f8f8f8" : "#444",
    }),
    barStyle:{ backgroundColor: "#b5302f", height:50 },
    appBarLeft:{ left: 0, position: "absolute" },
    classNameInput: darkMode=>({
        colors: {
            background: darkMode ? "#444" : "#f8f8f8",
            text: darkMode ? "#f8f8f8" : "#444",
            placeholder: darkMode ? "#f8f8f8" : "#444",
        }
    })
});


export const initialValue = {
    blocks: {
        a: {
            name: "",
            isFree: false,
            lunchType: 0 // 0 means not configured, 1 means first lunch, 2 means second lunch
            //Keeping in for future when remote learning isn't a thing
        },
        b: {
            name: "",
            isFree: false,
            lunchType: 0
        },
        c: {
            name: "",
            isFree: false,
            lunchType: 0
        },
        d: {
            name: "",
            isFree: false,
            lunchType: 0
        },
        e: {
            name: "",
            isFree: false,
            lunchType: 0
        },
        f: {
            name: "",
            isFree: false,
            lunchType: 0
        },
        g: {
            name: "",
            isFree: false,
            lunchType: 0
        },
        h: {
            name: "",
            isFree: false,
            lunchType: 0
        },
    },
    calendarDate: "",
    darkMode: false
}