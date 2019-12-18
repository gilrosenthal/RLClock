import React, { useState, useEffect } from 'react';
import { List, Title } from 'react-native-paper';
import {ScrollView, StyleSheet} from 'react-native';
import MaterialLetter from './MaterialLetter';
import {showTime, getCurrentPeriod} from './TimeTools';
function ScheduleDisplay({schedule}){
  var [timeLeft, setTimeLeft] = useState(()=>getCurrentPeriod(schedule).timeToEnd);
  var [currentPeriod, setCurrentPeriod] = useState(()=>getCurrentPeriod(schedule).currentPeriod);
  var timer;

  useEffect(()=>{
    timer = setInterval(tick,1000)
    return function cleanup(){
      clearInterval(timer);
    }
  },[])

  function tick(){
    if(timeLeft <= 0) {
      setTimeLeft(getCurrentPeriod(schedule).timeToEnd);
      setCurrentPeriod(getCurrentPeriod(schedule).currentPeriod);
    }
    else setTimeLeft(time => time - 1000)
  }

    var periods = [];
    var hr = schedule.periods[0];
    periods.push(
        <List.Item
        title="Homeroom"
        key="Homeroom"
        description= {showTime(hr.start) + " - " + showTime(hr.end)}
        left={props => <List.Icon {...props} icon="home" />}
      />
    )
    schedule.periods.slice(1).forEach(p=>
        periods.push(
            <List.Item
            title={p.name}
            key={p.name}
            description={showTime(p.start) + " - " + showTime(p.end)}
            left={props => <MaterialLetter {...props} letter={p.block} />}
            />
        )
    )
   return (
       <ScrollView >
        <Title style={styles.title}>{schedule.name}</Title>
        <Title style={styles.timeLeft}>{currentPeriod.name} </Title>
        <Title style={styles.timeLeft}>{Math.ceil(timeLeft / 60000)} minutes left</Title>
        <List.Section>
        {periods}
        </List.Section>
       </ScrollView>
   )
}

var styles = StyleSheet.create({
    title: {
      textAlign: "center",
      fontSize:20,
      paddingTop: 10
    },
    timeLeft: {
      textAlign: "center",
      fontSize:30,
      paddingTop: 20
    }
  });

export default ScheduleDisplay;