import React, { useState, useEffect } from 'react';
import { List, Title, Caption } from 'react-native-paper';
import MaterialLetter from './MaterialLetter';
import Entypo from 'react-native-vector-icons/Entypo';
import { showTime, getCurrentPeriod, formatDate, showDate, showDayType, styles, iconColor } from './Tools';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function ScheduleDisplay({ darkMode, schedule, setDate }) {
  if (!schedule || Object.entries(schedule).length === 0) return <Title style={styles.title}>No School</Title>
  else {

    var [timeLeft, setTimeLeft] = useState(0);
    var [currentPeriod, setCurrentPeriod] = useState(() => getCurrentPeriod(schedule).currentPeriod);
    var timer;
    function tick() {
      if (timeLeft <= 0) {
        setTimeLeft(getCurrentPeriod(schedule).timeToEnd);
        setCurrentPeriod(getCurrentPeriod(schedule).currentPeriod);
      }
      else {
        setTimeLeft(time => time - 1000);
        setCurrentPeriod(getCurrentPeriod(schedule).currentPeriod);
      }
    }

    var periods = [];
    var hr = schedule.periods[0];
    periods.push(
      <List.Item
        title="Homeroom"
        key="Homeroom"
        style={styles.periodItem({},{},darkMode)}
        right={()=><Caption style={styles.timeRange(darkMode)}>{showTime(hr.start) + " - " + showTime(hr.end)}</Caption>}
        left={() => <Entypo size={40} color={iconColor(darkMode)}  name="home" />}
        titleStyle={{color: iconColor(darkMode)}}
        />
    )
    schedule.periods.slice(1).forEach((p, i) => {
      periods.push(<React.Fragment>
        <List.Item
          title={`${p.name}`}
          key={`${p.name}${i}`}
          right={()=><Caption style={styles.timeRange(darkMode)}>{showTime(p.start) + " - " + showTime(p.end)}</Caption>}
          left={p.block ? (p.block == "Lunch" ? () =><MaterialIcons color={iconColor(darkMode)} size={40} name="food-fork-drink" /> : props => <MaterialLetter {...props} darkMode={darkMode} letter={p.block} />) : props => <Entypo size={40} color={iconColor(darkMode)}  name="modern-mic" />}
          style={styles.periodItem(p, currentPeriod,darkMode)}
          titleStyle={{color: iconColor(darkMode)}}
        />
        
      </React.Fragment>
      )
    }
    )
    useEffect(() => {
      timer = setInterval(tick, 1000)
      return function cleanup() {
        clearInterval(timer);
      }
    }, [])

    return (
      <React.Fragment>
        {schedule.date !== formatDate()
          ? <React.Fragment>
            <View style={styles.settingsTitleRow(darkMode)}>
              <Appbar.BackAction icon="back" onPress={() => { setDate("") }} />
              <Title style={styles.title(darkMode)}>{showDate(schedule.date)}</Title>
            </View>
            <Title style={styles.title(darkMode)}>{showDayType(schedule)}</Title>

          </React.Fragment>
          : <React.Fragment>
            <Title style={styles.currentPeriod}>{currentPeriod.name} </Title>
            {!!timeLeft && <Title style={styles.timeLeft(darkMode)}>{Math.ceil(timeLeft / 60000)} minutes left</Title>}

            <Title style={styles.title(darkMode)}>{showDayType(schedule)}</Title>

          </React.Fragment>}
        <List.Section>
          {periods}
        </List.Section>
      </React.Fragment>
    )
  }
}

export default ScheduleDisplay;