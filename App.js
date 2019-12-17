import * as React from 'react';
import { StyleSheet, AppRegistry, SafeAreaView, Platform, StatusBar } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import MainActivity from './components/MainActivity';

export default function Main() {
  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
      <MainActivity />
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