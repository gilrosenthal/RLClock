import React, { useContext, useState,  } from 'react';
import { TextInput, List, Switch, Menu, Title, Paragraph, Button } from 'react-native-paper';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SettingsContext } from './SettingsContext';
import { showLunchType } from './Tools';

export default function SettingsScreen() {
    var listOfBlocks = 'abcdefgh'.split('');
    var [menuOpen, setMenuOpen] = useState({});
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
    function updateBlockLunch(block, lunch) {
        var nc = Object.assign({}, config)
        nc.blocks[block].lunchType = lunch;
        setConfig(nc);
        setMenuOpen(mu => ({ ...mu, [block]: false }))
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
                    defaultValue={config.blocks[block].name ? config.blocks[block].name : null}
                    key={`${block}.input`}
                    style={{ width: "95%" }}
                    onSubmitEditing={({ nativeEvent }) => updateBlockName(block, nativeEvent.text)}
                />
                <View style={styles.row}>
                    <Paragraph>Is a Free</Paragraph>
                    <Switch
                        value={config.blocks[block].isFree}
                        onValueChange={val => updateBlockIsFree(block, val)} />
                </View>
                {!config.blocks[block].isFree && <View style={styles.row}>
                    <Paragraph>Lunch Type</Paragraph>
                    <Menu
                        visible={menuOpen[block]}
                        onDismiss={() => setMenuOpen(mu => ({ ...mu, [block]: false }))}
                        anchor={
                            <Button onPress={() => setMenuOpen(mu => ({ ...mu, [block]: true }))}>{showLunchType(config.blocks[block].lunchType)}</Button>
                        }>
                        <Menu.Item onPress={() =>updateBlockLunch(block, 1)} title="First Lunch" />
                        <Menu.Item onPress={() =>updateBlockLunch(block, 2)} title="Second Lunch" />
                    </Menu>
                </View>}
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