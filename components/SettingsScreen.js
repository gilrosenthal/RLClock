import React, { useState, } from 'react';
import { TextInput, List, Switch, Title, Appbar, Button } from 'react-native-paper';
import { ScrollView, View, BackHandler } from 'react-native';
import { styles } from './Tools';
import MaterialLetter from './MaterialLetter';

export default function SettingsScreen({ config, setConfig }) {
    var listOfBlocks = 'abcdefgh'.split('');
    var [blockEditing, setBlockEditing] = useState("");
    var cfg = Object.assign({}, config);
    BackHandler.addEventListener('hardwareBackPress', () => setBlockEditing(""));
    if (blockEditing != "") return <BlockSettings block={blockEditing} setBlock={setBlockEditing} config={config} setConfig={setConfig} />
    return <View style={{ flex: 1 }}>
        <View style={styles.settingsTitleRow(config.darkMode)}>
            <Title style={styles.title(config.darkMode)}>Settings</Title>
        </View>
        <ScrollView style={styles.periodWrapper(config.darkMode)}>
        <View style={styles.row}>
            <Title style={styles.darkModeSetting(config.darkMode)}>Dark Mode</Title>
            <View style={styles.spacer} />
            <Switch
                style={{ right: 10, position: "absolute" }}
                value={cfg.darkMode}
                onValueChange={val => setConfig({...config, darkMode:val})}
            />
        </View>
            {listOfBlocks.map(block =>
                <List.Item
                    title={`Block Settings`}
                    key={block}
                    titleStyle={styles.itemSetting(config.darkMode)}
                    style={styles.itemSetting(config.darkMode)}
                    left={props => <MaterialLetter {...props} darkMode={config.darkMode} letter={block.toUpperCase()} />}
                    right={props => <List.Icon {...props} color={config.darkMode? '#fff' : '#000'} icon="arrow-right" />}
                    onPress={() => setBlockEditing(block)}
                />
            )}
        </ScrollView>
    </View>
}

function BlockSettings({ block, setBlock, config, setConfig }) {
    var [cfg, setCfg] = useState(config);
    function updateBlockProp(block, val, prop) {
        var nc = Object.assign({}, cfg);
        nc.blocks[block][prop] = val;
        setCfg(nc);
    }

    return <View style={styles.periodWrapper(config.darkMode)}>
        <View style={styles.settingsTitleRow(config.darkMode)}>
            <Appbar.BackAction color={config.darkMode? '#fff' : '#000'} onPress={() => setBlock("")} style={{ left: 0, position: "absolute" }} />
            <Title style={styles.title(config.darkMode)}>{block.toUpperCase()} Block Settings</Title>
            <Button mode={"text"} color={config.darkMode? '#fff' : '#000'} style={{ right: 5, position: "absolute" }} onPress={() => {
                setConfig(cfg);
                setBlock("");
            }}>Save</Button>
        </View>

        <View style={styles.row}>
            <Title style={styles.settingLabel(config.darkMode)}>Is a Free</Title>
            <View style={styles.spacer} />
            <Switch
                style={{ right: 10, position: "absolute" }}
                value={cfg.blocks[block].isFree}
                onValueChange={val => updateBlockProp(block, val, "isFree")}
            />
        </View>
        {!cfg.blocks[block].isFree && <View style={styles.row}>
            <Title style={styles.settingLabel(config.darkMode)}>Class Name</Title>
            <View style={styles.spacer} />
            <TextInput
                placeholder={`${block.toUpperCase()} Block Class Name`}
                mode={'outlined'}
                defaultValue={cfg.blocks[block].name ? cfg.blocks[block].name : null}
                key={`${block}.input`}
                style={{ width: "60%", paddingBottom: 20, paddingRight: 10 }}
                theme={{colors:{
                    background:config.darkMode ?   "#444" : "#f8f8f8", 
                    text: config.darkMode ?  "#f8f8f8" : "#444",
                    placeholder:config.darkMode ?  "#f8f8f8" : "#444",
                }}}
                onChangeText={(text) => updateBlockProp(block, text, "name")}
            />
        </View>}
    </View>

}