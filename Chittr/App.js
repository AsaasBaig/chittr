import React, { Component } from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import WelcomeScreen from './screens/welcome';
import LoginScreen from './screens/login';
import RegisterScreen from './screens/register';
import LoginHomeScreen from './screens/home';
import AuthLoadingScreen from './screens/auth';


const authStack = createStackNavigator({
  Welcome: {
    screen: WelcomeScreen,
    navigationOptions: {
      headerShown: false,
    }
  },
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      headerShown: false,
    }
  },
  Register: {
    screen: RegisterScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
});

const appStack = createSwitchNavigator({
  LoginHome: {
    screen: LoginHomeScreen
  },
})

//f65a37
//333333
//e8dfcc
//f96a47
const Chittr = createAppContainer(createSwitchNavigator({
  AuthLoading: AuthLoadingScreen,
  App: appStack,
  Auth: authStack,
},
{
  initialRouteName: 'AuthLoading'
}));
export default Chittr

