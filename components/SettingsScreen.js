import React, { useEffect } from 'react';
import { TextInput, Text, Title } from 'react-native-paper';
import { AsyncStorage } from 'react-native';
import { ScrollView, StyleSheet } from 'react-native';
import { SettingsContext } from './SettingsContext';

export default function SettingsScreen() {
    var listOfBlocks = 'abcdefgh'.split('');

    return <SettingsContext.Consumer>
        {({ config, setConfig }) => {
            function updateSetting(block, cl) {
                var nc = Object.assign({},config)
                nc.blocks[block] = cl;
                setConfig(nc)
            }
            var settingsList = [];
            listOfBlocks.forEach(block => {
                settingsList.push(<Text key={block}> {block.toUpperCase()} Block Class </Text>)
                settingsList.push(<TextInput
                    placeholder={"Currently Empty"}
                    mode={'outlined'}
                    key={`${block}.input`}
                    onChangeText={text => updateSetting(block, text)}
                />)
            })
            if (settingsList.length !== 0) return <ScrollView>
                <Title style={styles.title}>Settings</Title>
                {settingsList}
            </ScrollView>
            else return null;

        }}
    </SettingsContext.Consumer>

}

var styles = StyleSheet.create({
    title: {
        textAlign: "center",
        fontSize: 20,
        paddingTop: 10
    }
});