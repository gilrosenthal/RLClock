import React, { useEffect, useState } from 'react';
import { AppRegistry, SafeAreaView, AsyncStorage, BackHandler } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import 'react-native-gesture-handler';
import { initialValue, styles } from './components/Tools';
import AppContainer from './components/Navigator';


export default function Main() {
  var [config, setConfig] = useState(Object.assign({}, initialValue));
  console.disableYellowBox = true;
  console.warn = () => { };

  useEffect(() => {
    AsyncStorage.getItem("blocks").then(val => {
      if (val) setConfig(JSON.parse(val));
    })
    BackHandler.addEventListener('hardwareBackPress', () => true);

    return function cleanup() {
      BackHandler.removeEventListener('hardwareBackPress', () => true);
    }
  }, [])

  function setConf(newConf) {
    setConfig(newConf)
    AsyncStorage.setItem("blocks", JSON.stringify(newConf));
  }
  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <AppContainer config={config} setConfig={setConf} />
      </SafeAreaView>
    </PaperProvider>
  );
}

AppRegistry.registerComponent('main', () => Main);