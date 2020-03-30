import React, { useState } from 'react';
import { BackHandler, ScrollView } from 'react-native';
import { Appbar } from 'react-native-paper';
import { Calendar } from 'react-native-calendars';
import { styles } from './Tools';
import ScheduleFetcher from './ScheduleFetcher';
function padDate(day) {
    return (("" + day).length !== 2) ? "0" + day : day
}
export default function CalendarScreen({ config }) {
    var [date, setDate] = useState("");
    BackHandler.addEventListener('hardwareBackPress', () => setDate(""));
    if (date == "") return <Calendar
        style={styles.periodWrapper(config.darkMode)}
        onDayPress={(day) => setDate("" + day.year + padDate(day.month) + padDate(day.day))}
        theme={{
            calendarBackground: config.darkMode ? "#444" : "#f8f8f8", //Inverted to rest
            dayTextColor: config.darkMode ? "#f8f8f8" : "#444",
            monthTextColor: config.darkMode ? "#f8f8f8" : "#444",
        }}
    />
    else return <ScrollView style={styles.periodWrapper(config.darkMode)}>
        <ScheduleFetcher config={config} setDate={setDate} day={date} />
    </ScrollView>
}