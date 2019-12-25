import React, { useState } from 'react';
import { BackHandler, ScrollView } from 'react-native';
import { Appbar } from 'react-native-paper';
import { Calendar } from 'react-native-calendars';
import ScheduleFetcher from './ScheduleFetcher';
function padDate(day) {
    if (("" + day).length !== 2) return "0" + day
    else return day;
}
export default function CalendarScreen(props) {
    var [date, setDate] = useState("")
    BackHandler.addEventListener('hardwareBackPress', () => setDate(""));
    if (date == "") return <Calendar
        onDayPress={(day) => {
            setDate("" + day.year + padDate(day.month) + padDate(day.day))
        }} />
    else return <ScrollView>
        <Appbar.BackAction icon="back" onPress={() => { setDate("") }} />
        <ScheduleFetcher day={date} />
    </ScrollView>
}