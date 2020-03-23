import React, { useState, } from 'react';
import { TextInput, List, Switch, Menu, Title, Paragraph, Button } from 'react-native-paper';
import { ScrollView, View } from 'react-native';
import { showLunchType, styles } from './Tools';

export default function SettingsScreen({ config, setConfig }) {
    var listOfBlocks = 'abcdefgh'.split('');
    var [menuOpen, setMenuOpen] = useState({});

    function updateBlockProp(block, val, prop) {
        var nc = Object.assign({}, config)
        nc.blocks[block][prop] = val;
        setConfig(nc)
    }
    function updateBlockLunch(block, lunch) {
        updateBlockProp(block, lunch, "lunchType")
        setMenuOpen(mu => ({ ...mu, [block]: false }))
    }
    return <ScrollView>
        <Title style={styles.title}>Settings</Title>
        {listOfBlocks.map(block =>

            <List.Accordion
                title={`${block.toUpperCase()} Block Settings`}
                key={block}
                left={props => <List.Icon {...props} icon="folder" />}
            >

                <View style={styles.row}>
                    <Paragraph>Is a Free</Paragraph>
                    <Switch
                        value={config.blocks[block].isFree}
                        onValueChange={val => updateBlockProp(block, val, "isFree")}
                    />
                </View>
                {!config.blocks[block].isFree && <View>

                    <TextInput
                        placeholder={`${block.toUpperCase()} Block Class`}
                        mode={'outlined'}
                        defaultValue={config.blocks[block].name ? config.blocks[block].name : null}
                        key={`${block}.input`}
                        style={{ width: "95%" }}
                        onSubmitEditing={({ nativeEvent }) => updateBlockProp(block, nativeEvent.text, "name")}
                    />

                    <View style={styles.row}>
                        <Paragraph>Lunch Type</Paragraph>
                        <Menu
                            visible={menuOpen[block]}
                            onDismiss={() => setMenuOpen(mu => ({ ...mu, [block]: false }))}
                            anchor={
                                <Button onPress={() => setMenuOpen(mu => ({ ...mu, [block]: true }))}>{showLunchType(config.blocks[block].lunchType)}</Button>}
                        >
                            <Menu.Item onPress={() => updateBlockLunch(block, 1)} title="First Lunch" />
                            <Menu.Item onPress={() => updateBlockLunch(block, 2)} title="Second Lunch" />
                        </Menu>
                    </View>
                </View>}
            </List.Accordion>
        )}
    </ScrollView>
}