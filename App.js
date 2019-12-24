import React, { useEffect } from 'react';
import { StyleSheet, AppRegistry, SafeAreaView, AsyncStorage, StatusBar, BackHandler } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import 'react-native-gesture-handler'
import { SettingsContext } from './components/SettingsContext';
import AppContainer from './components/Navigator';
export default function Main() {
  var config =   {
    blocks: {},
    calendarDate:""
  };
  console.disableYellowBox = true;

  useEffect(() => {
    AsyncStorage.setItem("blocks", JSON.stringify(config));
    BackHandler.addEventListener('hardwareBackPress', () => true);
    return function cleanup() {
      BackHandler.removeEventListener('hardwareBackPress', () => true);
    }
  })

  function setConfig(newConf) {
    config = newConf;
    AsyncStorage.setItem("blocks", JSON.stringify(config));
  }

  AsyncStorage.getItem("blocks").then(val => {
    if (val) config = JSON.parse(val);
  })

  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <SettingsContext.Provider value={{ config: config, setConfig: setConfig }}>
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