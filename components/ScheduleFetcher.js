import React, { useState, useEffect, useContext } from 'react';
import { ScrollView } from 'react-native';
import { ActivityIndicator, Colors } from 'react-native-paper';
import ScheduleDisplay from './ScheduleDisplay';
import { processData, formatDate, styles } from './Tools';

function ScheduleFetcher({ config, day }) {
    let [isLoading, setIsLoading] = useState(true);
    let [data, setData] = useState(null);
    var url;
    if (!day) url = "http://casper.roxburylatin.org/getSched/20200330"
    else url = `http://casper.roxburylatin.org/getSched/${day}`
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(resJSON => {
                if (Object.entries(resJSON).length === 0) {
                    setIsLoading(false);
                    setData(null);
                }
                else {
                    processedData = processData(resJSON, config);
                    processedData.date = day ? day : formatDate();
                    setData(processedData);
                    setIsLoading(false);
                }
            })
            .catch(error => console.log(error))
    }, [])

    if (isLoading) return <ActivityIndicator animating={true} color={Colors.red800} />
    else return <ScrollView style={styles.periodWrapper(config.darkMode)}><ScheduleDisplay schedule={data} darkMode={config.darkMode} /></ScrollView>
}

export default ScheduleFetcher;