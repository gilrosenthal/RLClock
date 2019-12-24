import React from 'react';
import {ScrollView} from 'react-native';
import { createAppContainer } from 'react-navigation';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import ScheduleFetcher from './ScheduleFetcher';
import CalendarScreen from './CalendarScreen';
import SettingsScreen from './SettingsScreen';

const AppNavigator = createMaterialBottomTabNavigator({
  Today: {
    screen: ()=><ScrollView><ScheduleFetcher /></ScrollView>,
    navigationOptions: {
      tabBarIcon: ({ tintColor, focused }) => (<MaterialIcons color={tintColor} size={20} name='school' />)
    }
  },
  Calendar: {
    screen: CalendarScreen,
    navigationOptions: {
      tabBarIcon: ({ tintColor, focused }) => <Entypo color={tintColor} size={20} name="calendar" />
    }
  },
  Settings: {
    screen: SettingsScreen,
    navigationOptions: {
      tabBarIcon: ({ tintColor, focused }) => (<MaterialIcons color={tintColor} size={20} name='settings' />)
    }
  }
}, {
    initialRouteName: "Today",
    backBehavior: "none",
    barStyle: {
      backgroundColor: "#b5302f"
    },
  });

export default createAppContainer(AppNavigator);