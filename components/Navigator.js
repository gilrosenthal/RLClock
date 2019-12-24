import React from 'react';
import { createAppContainer } from 'react-navigation';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SettingsContext } from './SettingsContext';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import ScheduleFetcher from './ScheduleFetcher';
import CalendarScreen from './CalendarScreen';
import SettingsScreen from './SettingsScreen';

const AppNavigator = createMaterialBottomTabNavigator({
  Today: {
    screen: ScheduleFetcher,
    navigationOptions: {
      tabBarIcon: ({ tintColor, focused }) => (<MaterialIcons color={tintColor} size={20} name='school' />)
    }
  },
  Calendar: {
    screen: CalendarScreen,
    navigationOptions: {
      tabBarIcon: ({ tintColor, focused }) => (<SettingsContext.Consumer>
        {({config,setConfig})=>{
        return <Entypo color={tintColor} size={20} name="calendar" onPress={()=>{
          config.calendarDate = "";
          // setConfig(config);
        }}/>

        }}

        </SettingsContext.Consumer>),
      tabBarOnPress:({navigation, defaultHandler})=>{
        console.log(navigation);
        defaultHandler();
      }
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