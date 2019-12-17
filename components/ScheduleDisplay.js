import React, { useState } from 'react';
import { Headline, List, Title } from 'react-native-paper';
import {ScrollView, StyleSheet, View, Text} from 'react-native';
import MaterialLetter from './MaterialLetter';
import {showTime} from './TimeTools';
function ScheduleDisplay({schedule}){
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
        <List.Section>
        {periods}
        </List.Section>
       </ScrollView>
   )
}

const styles = StyleSheet.create({
    title: {
      textAlign: "center",
      fontSize:30,
      paddingTop: 20
    },
  });

export default ScheduleDisplay