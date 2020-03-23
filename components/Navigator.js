import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import ScheduleFetcher from './ScheduleFetcher';
import CalendarScreen from './CalendarScreen';
import SettingsScreen from './SettingsScreen';

function Navigator({ config, setConfig }) {
  const Tab = createMaterialBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Today" backBehavior="none" barStyle={{ backgroundColor: "#b5302f" }}>
        <Tab.Screen name="Today"
          options={{ tabBarIcon: ({ tintColor }) => (<MaterialIcons color={tintColor} size={20} name='school' />) }}
          component={() => <ScheduleFetcher config={config} />} />
        <Tab.Screen name="Calendar"
          options={{ tabBarIcon: ({ tintColor }) => <Entypo color={tintColor} size={20} name="calendar" /> }}
          component={() => <CalendarScreen config={config} />} />
        <Tab.Screen name="Settings"
          options={{ tabBarIcon: ({ tintColor }) => (<MaterialIcons color={tintColor} size={20} name='settings' />) }}
          component={() => <SettingsScreen config={config} setConfig={setConfig} />} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default Navigator;