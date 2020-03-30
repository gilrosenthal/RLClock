import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import ScheduleFetcher from './ScheduleFetcher';
import CalendarScreen from './CalendarScreen';
import SettingsScreen from './SettingsScreen';
import {styles} from './Tools';
function Navigator({ config, setConfig }) {
  const Tab = createMaterialBottomTabNavigator();
  return (
    <NavigationContainer style={styles.periodWrapper(config.darkMode)}>
      <Tab.Navigator initialRouteName="Today" backBehavior="none" activeColor="#fff" inactiveColor="#fff" barStyle={{ backgroundColor: "#b5302f" }}>
        <Tab.Screen name="Today"
          options={{ tabBarIcon: () => (<MaterialIcons  color={config.darkMode? '#fff' : '#000'} size={20} name='school' />) }}
          component={() => <ScheduleFetcher config={config} />} />
        <Tab.Screen name="Calendar"
          options={{ tabBarIcon: () => <Entypo  color={config.darkMode? '#fff' : '#000'} size={20} name="calendar" /> }}
          component={() => <CalendarScreen config={config} />} />
        <Tab.Screen name="Settings"
          options={{ tabBarIcon: () => (<MaterialIcons color={config.darkMode? '#fff' : '#000'} size={20} name='settings' />) }}
          component={() => <SettingsScreen config={config} setConfig={setConfig} />} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default Navigator;