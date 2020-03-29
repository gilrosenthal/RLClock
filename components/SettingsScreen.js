import React, { useState, } from 'react';
import { TextInput, List, Switch, Title, Appbar, Button } from 'react-native-paper';
import { ScrollView, View, BackHandler } from 'react-native';
import { styles } from './Tools';
import MaterialLetter from './MaterialLetter';

export default function SettingsScreen({ config, setConfig }) {
    var listOfBlocks = 'abcdefgh'.split('');
    var [blockEditing, setBlockEditing] = useState("");
    BackHandler.addEventListener('hardwareBackPress', () => setBlockEditing(""));
    if (blockEditing != "") return <BlockSettings block={blockEditing} setBlock={setBlockEditing} config={config} setConfig={setConfig} />
    return <View style={{ flex: 1 }}>
        <View style={styles.row}>
            <Title style={styles.title}>Settings</Title>
        </View>
        <ScrollView>
            {listOfBlocks.map(block =>
                <List.Item
                    title={`${block.toUpperCase()} Block Settings`}
                    key={block}
                    left={props => <MaterialLetter {...props} letter={block.toUpperCase()} />}
                    right={props => <List.Icon {...props} icon="arrow-right" />}
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

    return <View>
        <View style={styles.row}>
            <Appbar.BackAction onPress={() => setBlock("")} style={{ left: 0, position: "absolute" }} />
            <Title style={styles.title}>{block.toUpperCase()} Block Settings</Title>
            <Button style={{ right: 0, position: "absolute" }} onPress={() => {
                setConfig(cfg);
                setBlock("");
            }}>Save</Button>
        </View>

        <View style={styles.row}>
            <Title style={{ left: "10%", paddingVertical: 20 }}>Is a Free</Title>
            <View style={styles.spacer} />
            <Switch
                style={{ right: 0, position: "absolute" }}
                value={cfg.blocks[block].isFree}
                onValueChange={val => updateBlockProp(block, val, "isFree")}
            />
        </View>
        {!cfg.blocks[block].isFree && <View style={styles.row}>
            <Title style={{ left: "10%", paddingVertical: 20 }}>Class Name</Title>
            <View style={styles.spacer} />
            <TextInput
                placeholder={`${block.toUpperCase()} Block Class Name`}
                mode={'outlined'}
                defaultValue={cfg.blocks[block].name ? cfg.blocks[block].name : null}
                key={`${block}.input`}
                style={{ width: "60%", paddingBottom: 20, paddingRight: 10 }}
                onChangeText={(text) => updateBlockProp(block, text, "name")}
            />
        </View>}
    </View>

}