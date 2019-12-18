import React, { useState, useEffect } from 'react';
import {View} from 'react-native';
import { ActivityIndicator, Colors } from 'react-native-paper';
import ScheduleDisplay from './ScheduleDisplay';
import {processData, formatDate} from './TimeTools';
function ScheduleFetcher({day}){
    let [isLoading, setIsLoading] = useState(true);
    let [data, setData] = useState(null);
    var url;
    if(!day) url =  "http://casper.roxburylatin.org/getSched/20191211"
    else url = `http://casper.roxburylatin.org/getSched/${day}`
    console.log(url)
    useEffect(()=>{
        fetch(url)
        .then(res=> res.json())
        .then(resJSON => {
            if(Object.entries(resJSON).length === 0) {
                setIsLoading(false);
                setData(null);
            }
            else{
            processedData = processData(resJSON);
            processedData.date = day ? day : formatDate();
            setData(processedData);
            setIsLoading(false);
            }
        })
        .catch(error=> console.log(error))
    },[])
   
    if (isLoading) return <ActivityIndicator animating={true} color={Colors.red800} />
    else return <View><ScheduleDisplay schedule={data} /></View>
}

export default ScheduleFetcher;