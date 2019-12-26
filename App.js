import React, { useEffect, useState } from 'react';
import { StyleSheet, AppRegistry, SafeAreaView, AsyncStorage, StatusBar, BackHandler } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import 'react-native-gesture-handler'
import { SettingsContext, initialValue } from './components/SettingsContext';
import AppContainer from './components/Navigator';
export default function Main() {
  var [config, setConfig] = useState(Object.assign({}, initialValue));
  console.disableYellowBox = true;
  console.warn = () => { };

  useEffect(() => {
    AsyncStorage.setItem("blocks", JSON.stringify(config));
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
    AsyncStorage.setItem("blocks", JSON.stringify(config));
  }

  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <SettingsContext.Provider value={{ config: config, setConfig: setConf }}>
          <AppContainer />
        </SettingsContext.Provider>
      </SafeAreaView>
    </PaperProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight
  },
});
AppRegistry.registerComponent('main', () => Main);