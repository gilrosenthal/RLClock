import { BottomNavigation, Text } from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';
import React, { useState } from 'react';
import ScheduleFetcher from './ScheduleFetcher';

const TodayRoute = () => <ScheduleFetcher />;

const CalendarRoute = () => <Text>Calendar</Text>;

const SettingsRoute = () => <Text>Settings</Text>;

export default function MainActivity(){
    var [navState, setNavState] = useState({
        index:0,
        routes: [
            {key:"today", title:"Today", icon:"calendar-today"},
            {key:"calendar", title:"Calendar", icon: props => <Entypo {...props} name="calendar"/>},
            {key:"settings", title:"Settings", icon:"settings"},
        ]
    });

    const handleIndexChange = index => setNavState({index:index, routes: navState.routes})

    const renderScene = BottomNavigation.SceneMap({
        today:TodayRoute,
        calendar:CalendarRoute,
        settings:SettingsRoute
    })

    return(
        <BottomNavigation 
            navigationState={navState}
            onIndexChange={handleIndexChange}
            renderScene={renderScene}
        />
    )
}