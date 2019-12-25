import React, { useState, useEffect, useContext } from 'react';
import { List, Title } from 'react-native-paper';
import { ScrollView, StyleSheet } from 'react-native';
import MaterialLetter from './MaterialLetter';
import Entypo from 'react-native-vector-icons/Entypo';
import { showTime, getCurrentPeriod, formatDate, showDate, showDayType } from './TimeTools';
import { SettingsContext } from './SettingsContext';

function ScheduleDisplay({ schedule }) {
  if (!schedule || Object.entries(schedule).length === 0) return <Title style={styles.title}>No School</Title>
  else {
    var { config, setConfig } = useContext(SettingsContext);

    var [timeLeft, setTimeLeft] = useState(() => getCurrentPeriod(schedule).timeToEnd);
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
        description={showTime(hr.start) + " - " + showTime(hr.end)}
        left={props => <Entypo size={40} name="home" />}
      />
    )
    schedule.periods.slice(1).forEach(p => {
      periods.push(
        <List.Item
          title={`${p.block && config.blocks[p.block.toLowerCase()].name ? config.blocks[p.block.toLowerCase()].name + " - " : ""}${p.name}`}
          key={p.name}
          description={showTime(p.start) + " - " + showTime(p.end)}
          left={p.block ? props => <MaterialLetter {...props} letter={p.block} /> : props => <Entypo size={40} name="modern-mic" />}
        />
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
            <Title style={styles.title}>{showDate(schedule.date)}</Title>
            <Title style={styles.title}>{showDayType(schedule)}</Title>
          </React.Fragment>
          : <React.Fragment>
            <Title style={styles.title}>{showDayType(schedule)}</Title>

            <Title style={styles.timeLeft}>{currentPeriod.name} </Title>
            {!!timeLeft && <Title style={styles.timeLeft}>{Math.ceil(timeLeft / 60000)} minutes left</Title>}
          </React.Fragment>}
        <List.Section>
          {periods}
        </List.Section>
      </React.Fragment>
    )
  }
}

var styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 20,
    paddingTop: 10
  },
  timeLeft: {
    textAlign: "center",
    fontSize: 30,
    paddingTop: 20
  }
});

export default ScheduleDisplay;