import React, { useState } from 'react';
import { BackHandler, ScrollView } from 'react-native';
import { Appbar } from 'react-native-paper';
import { Calendar } from 'react-native-calendars';
import ScheduleFetcher from './ScheduleFetcher';
function padDate(day) {
    return (("" + day).length !== 2) ? "0" + day : day
}
export default function CalendarScreen({ config }) {
    var [date, setDate] = useState("");
    BackHandler.addEventListener('hardwareBackPress', () => setDate(""));
    if (date == "") return <Calendar onDayPress={(day) => setDate("" + day.year + padDate(day.month) + padDate(day.day))} />
    else return <ScrollView>
        <Appbar.BackAction icon="back" onPress={() => { setDate("") }} />
        <ScheduleFetcher config={config} day={date} />
    </ScrollView>
}