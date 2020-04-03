import React, { useEffect, useState } from 'react';
import { AppRegistry, SafeAreaView, AsyncStorage, BackHandler, StatusBar } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import 'react-native-gesture-handler';
import { initialValue, styles } from './components/Tools';
import AppContainer from './components/Navigator';


export default function Main() {
  var [config, setConfig] = useState(Object.assign({}, initialValue));
  console.disableYellowBox = true;
  console.warn = () => { };
  
  function returnTrue(){
    return true;
  }

  useEffect(() => {
    AsyncStorage.getItem("blocks").then(val => {
      if (val) setConfig(JSON.parse(val));
    })
    BackHandler.addEventListener('hardwareBackPress', returnTrue);

    return function cleanup() {
      BackHandler.removeEventListener('hardwareBackPress', returnTrue);
    }
  }, [])

  function setConf(newConf) {
    setConfig(newConf)
    AsyncStorage.setItem("blocks", JSON.stringify(newConf));
  }
  return (
    <PaperProvider>
      <SafeAreaView style={{flex:0, backgroundColor: config.darkMode ? "#444" : "#f8f8f8"}}/>
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={config.darkMode ? "#444" : "#f8f8f8"} barStyle={config.darkMode? "light-content" : "dark-content"} />
        <AppContainer config={config} setConfig={setConf} />
      </SafeAreaView>
    </PaperProvider>
  );
}

AppRegistry.registerComponent('main', () => Main);