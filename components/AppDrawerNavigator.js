import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import { AppTabNavigator } from './AppTabNavigator'
import CustomSideBarMenu  from './CustomSideBarMenu';
import SettingScreen from '../screens/SettingScreen';
import MyBarterScreen from '../screens/MyBarterScreen';
import NotificationScreen from '../screens/NotificationScreen'

export const AppDrawerNavigator = createDrawerNavigator({
    Home : {
      screen : AppTabNavigator
    },
    MyBarters:{
      screen:MyBarterScreen
    },
    Notifications:{
        screen:NotificationScreen
    },
    Setting:{
      screen:SettingScreen
    }
},
{
contentComponent:CustomSideBarMenu
},
{
initialRouteName : 'Home'
});