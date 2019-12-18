import React, {useEffect} from 'react';
import { StyleSheet, AppRegistry, SafeAreaView, Platform, StatusBar, BackHandler } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import 'react-native-gesture-handler'
import AppContainer from './components/Navigator';
export default function Main() {
  console.disableYellowBox = true;
  useEffect(()=>{
    BackHandler.addEventListener('hardwareBackPress',()=>true);
    return function cleanup(){
      BackHandler.removeEventListener('hardwareBackPress', ()=>true);
    }
  })
  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
      <AppContainer />
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