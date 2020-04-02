import React, { useState } from 'react';
import { BackHandler, ScrollView } from 'react-native';
import { Appbar } from 'react-native-paper';
import { Calendar } from 'react-native-calendars';
import { styles, padNumber } from './Tools';
import ScheduleFetcher from './ScheduleFetcher';

export default function CalendarScreen({ config }) {
    var [date, setDate] = useState("");
    BackHandler.addEventListener('hardwareBackPress', () => setDate(""));
    if (date == "") return <Calendar
        style={styles.periodWrapper(config.darkMode)}
        onDayPress={(day) => setDate("" + day.year + padNumber(day.month) + padNumber(day.day))}
        theme={styles.calendarStyle(config.darkMode)}
    />
    else return <ScrollView style={styles.periodWrapper(config.darkMode)}>
        <ScheduleFetcher config={config} setDate={setDate} day={date} />
    </ScrollView>
}