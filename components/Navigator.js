import React from 'react';
import { View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import ScheduleFetcher from './ScheduleFetcher';
import CalendarScreen from './CalendarScreen';

const AppNavigator = createMaterialBottomTabNavigator({
  Today: {
    screen: ScheduleFetcher,
    navigationOptions:{
      tabBarIcon:({tintColor, focused}) => (<MaterialIcons color={tintColor} size={20} name='school'/>)
    }
  },
  Calendar:{
      screen:CalendarScreen,
      navigationOptions:{
        tabBarIcon:({tintColor, focused}) => (<Entypo color={tintColor} size={20} name="calendar"/>)
      }
  }
},{
    initialRouteName:"Today",
    backBehavior:"none",
    barStyle:{
      backgroundColor:"#b5302f"
    }
});

export default createAppContainer(AppNavigator);