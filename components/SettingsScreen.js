import React, { useContext } from 'react';
import { TextInput, Text, Title } from 'react-native-paper';
import { ScrollView, StyleSheet } from 'react-native';
import { SettingsContext } from './SettingsContext';

export default function SettingsScreen() {
    var listOfBlocks = 'abcdefgh'.split('');
    var { config, setConfig } = useContext(SettingsContext);
    // var inputRefs = [];
    function updateSetting(block, cl) {
        config.blocks[block] = cl;
        setConfig(config)
    }
    var settingsList = [];
    listOfBlocks.forEach(block => {
        settingsList.push(<Text key={block}> {block.toUpperCase()} Block Class </Text>)
        settingsList.push(<TextInput
            placeholder={"Currently Empty"}
            mode={'outlined'}
            key={`${block}.input`}
            // ref={(ref) => inputRefs[block] = ref}
            onSubmitEditing={({nativeEvent}) => updateSetting(block, nativeEvent.text)}
        />)
    })
    // console.log(inputRefs)
    if (settingsList.length !== 0) return <ScrollView>
        <Title style={styles.title}>Settings</Title>
        {settingsList}
    </ScrollView>
    else return null;

}

var styles = StyleSheet.create({
    title: {
        textAlign: "center",
        fontSize: 20,
        paddingTop: 10
    }
});