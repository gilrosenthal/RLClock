import React, { useState } from 'react';
import { BackHandler } from 'react-native';
import { Calendar } from 'react-native-calendars';
import ScheduleFetcher from './ScheduleFetcher';

export default function CalendarScreen(props) {
    var [date, setDate] = useState("")
    BackHandler.addEventListener('hardwareBackPress', () => setDate(""));
    if (date == "") return <Calendar
        onDayPress={(day) => {
            setDate("" + day.year + day.month + day.day)
        }} />
    else return <ScheduleFetcher day={date} />
}