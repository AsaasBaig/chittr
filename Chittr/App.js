import React, { Component } from 'react';
import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import WelcomePage from './screens/welcome';
import LoginPage from './screens/login';
import RegisterPage from './screens/register';



const Navigator = createSwitchNavigator(
  {
    Welcome: WelcomePage,
    Login: LoginPage,
    Register: RegisterPage,
  },
  {
    initialRouteName: 'Welcome',
  });

const Chittr = createAppContainer(Navigator);
export default Chittr

