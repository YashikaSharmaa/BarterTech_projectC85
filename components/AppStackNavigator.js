import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from '../screens/HomeScreen';
import BarterDetailScreen  from '../screens/BarterDetailScreen';

export const AppStackNavigator = createStackNavigator({
  Home : {
    screen : HomeScreen,
    navigationOptions:{
      headerShown : false
    }
  },
  BarterDetails : {
    screen : BarterDetailScreen,
    navigationOptions:{
      headerShown : false
    }
  }
},
  {
    initialRouteName: 'Home'
  }
);