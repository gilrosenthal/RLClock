import React, { useState, useEffect } from 'react';
import {FlatList, Text, View} from 'react-native';
import { ActivityIndicator, Colors } from 'react-native-paper';
import ScheduleDisplay from './ScheduleDisplay';
import {processData} from './TimeTools';
function ScheduleFetcher(props){
    let [isLoading, setIsLoading] = useState(true);
    let [data, setData] = useState(null);
    useEffect(()=>{
        fetch("http://casper.roxburylatin.org/getSched/20191023")
        .then(res=> res.json())
        .then(resJSON => {
            processedData = processData(resJSON);
            console.log(processedData)
            setData(processedData);
            setIsLoading(false);
        })
        .catch(error=>{
            console.log(error)
        })
    },[])
   
    if (isLoading) return <ActivityIndicator animating={true} color={Colors.red800} />
    else return <View><ScheduleDisplay schedule={data} /></View>
}

export default ScheduleFetcher;