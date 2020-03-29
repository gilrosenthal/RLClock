import React, { useState, useEffect, useContext } from 'react';
import { List, Title } from 'react-native-paper';
import MaterialLetter from './MaterialLetter';
import Entypo from 'react-native-vector-icons/Entypo';
import { showTime, getCurrentPeriod, formatDate, showDate, showDayType, styles } from './Tools';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function ScheduleDisplay({ schedule }) {
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
        description={showTime(hr.start) + " - " + showTime(hr.end)}
        left={props => <Entypo size={40} name="home" />}
      />
    )
    schedule.periods.slice(1).forEach((p, i) => {
      periods.push(<React.Fragment>
        {!currentPeriod.block && !!currentPeriod.nextBlock && currentPeriod.nextBlock.block === p.block &&  
          <List.Item
          title={"Passing Period"}
          key={"Passing Period"}
          style={{backgroundColor: 'yellow'}}

          />
        }
        <List.Item
          title={`${p.name}`}
          key={`${p.name}${i}`}
          style={{backgroundColor: (p.block != null && p.block == currentPeriod.block) ? 'yellow' : undefined}}
          description={showTime(p.start) + " - " + showTime(p.end)}
          left={p.block ? (p.block == "Lunch" ? () =><MaterialIcons size={40} name="food-fork-drink" /> : props => <MaterialLetter {...props} letter={p.block} />) : props => <Entypo size={40} name="modern-mic" />}
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

export default ScheduleDisplay;