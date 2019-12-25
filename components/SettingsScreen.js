import React, { useContext, useState, useEffect } from 'react';
import { TextInput, List, Switch, Text, Title, Paragraph } from 'react-native-paper';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SettingsContext } from './SettingsContext';

export default function SettingsScreen() {
    var listOfBlocks = 'abcdefgh'.split('');
    var [] = useState();
    var { config, setConfig } = useContext(SettingsContext);

    function updateBlockName(block, cl) {
        var nc = Object.assign({}, config)
        nc.blocks[block].name = cl;
        setConfig(nc)
    }
    function updateBlockIsFree(block, isFree) {
        var nc = Object.assign({}, config)
        nc.blocks[block].isFree = isFree;
        setConfig(nc)
    }
    var settingsList = [];
    listOfBlocks.forEach(block => {
        settingsList.push(
            <List.Accordion
                title={`${block.toUpperCase()} Block Settings`}
                key={block}
                left={props => <List.Icon {...props} icon="folder" />}
            >
                <TextInput
                    placeholder={`${block.toUpperCase()} Block Class`}
                    mode={'outlined'}
                    key={`${block}.input`}
                    style={{ width: "95%" }}
                    onSubmitEditing={({ nativeEvent }) => updateBlockName(block, nativeEvent.text)}
                />
                <View style={styles.row}>
                    <Paragraph>Is Free</Paragraph>
                    <Switch
                        value={config.blocks[block].isFree}
                        onValueChange={(val) => {
                            updateBlockIsFree(block, val)
                        }
                        }
                    />
                </View>

            </List.Accordion>)
    })


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
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 8,
        paddingHorizontal: 16
    }
});