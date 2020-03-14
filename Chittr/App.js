import React, { Component } from 'react';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';

import Icon from 'react-native-vector-icons/MaterialIcons';
import WelcomeScreen from './screens/welcome';
import LoginScreen from './screens/login';
import RegisterScreen from './screens/register';
import HomeScreen from './screens/home';
import AuthLoadingScreen from './screens/auth';
import PostChitScreen from './screens/postchit';
import MyProfileScreen from './screens/myprofile';
import SearchScreen from './screens/search';
import LogoutPage from './screens/logout';
import Header from './screens/header';

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

const appStack = createStackNavigator({
  LoginHome: {
    screen: HomeScreen,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Header navigation={navigation} title='Home'/>,
        headerStyle:{
          backgroundColor: '#c1c1c1'
        }
      }
    },
  }
})

const appTabs = createMaterialBottomTabNavigator({
  Home: {
    screen: appStack,
    navigationOptions: {
      title: 'HOME',
      tabBarIcon: ({ tintColor }) => (
        <Icon color={tintColor} size={25} name="home" />
      ),
    }
  },
  Search: {
    screen: SearchScreen,
    navigationOptions: {
      title: 'EXPLORE',
      tabBarIcon: ({ tintColor }) => (
        <Icon color={tintColor} size={25} name="search" />
      ),
    }
  },
  PostChit: {
    screen: PostChitScreen,
    navigationOptions: {
      title: 'MAKE A CHIT',
      tabBarIcon: ({ tintColor }) => (
        <Icon color={tintColor} size={25} name="create" />
      ),
    }
  },
  Profile: {
    screen: MyProfileScreen,
    navigationOptions: {
      title: 'MY PROFILE',
      tabBarIcon: ({ tintColor }) => (
        <Icon color={tintColor} size={25} name="person" />
      ),
    }
  }
},
  {
    initialRouteName: 'Home',
    activeColor: '#f96a47',
    inactiveColor: '#ffffff',
    barStyle: {
      backgroundColor: '#333333',
    }
  })

  const homeDrawerNav = createDrawerNavigator({
    Home: {
      screen: appTabs 
    },
    Logout: {
      screen: LogoutPage,
    }
  },
  {
    initialRouteName: 'Home'
  })

//f65a37
//333333
//e8dfcc
//f96a47
const Chittr = createAppContainer(createSwitchNavigator({
  AuthLoading: AuthLoadingScreen,
  App: homeDrawerNav,
  Auth: authStack,
},
  {
    initialRouteName: 'AuthLoading'
  }));
export default Chittr

