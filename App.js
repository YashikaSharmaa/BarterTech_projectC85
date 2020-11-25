import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import SignupLoginScreen from './screens/SignupLoginScreen';
import { createAppContainer, createSwitchNavigator,} from 'react-navigation';
import { AppDrawerNavigator } from './components/AppDrawerNavigator';
import { render } from 'react-dom';

export default class App extends Component {
  render(){
    return (
      <AppContainer />
    );
  }
}

const switchNavigator = createSwitchNavigator({
  SignupLoginScreen:{screen: SignupLoginScreen},
  Drawer:{screen: AppDrawerNavigator}
})

const AppContainer =  createAppContainer(switchNavigator);