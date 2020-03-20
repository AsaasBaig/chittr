import React, { Component } from 'react';
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
import OtherProfileScreen from './screens/otherprofile';
import SearchScreen from './screens/search';
import LogoutScreen from './screens/logout';
import CameraScreen from './screens/camera';
import ChitCameraScreen from './screens/chitcamera';
import FollowersScreen from './screens/followers';
import FollowingScreen from './screens/following';
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

const otherProfileStack = createStackNavigator({
  OtherProfile: {
    screen: OtherProfileScreen,
    navigationOptions: {
      headerShown: false,
    }
  },
  OtherFollowers: {
    screen: FollowersScreen,
    navigationOptions: {
      headerShown: false,
    }
  },
  OtherFollowing: {
    screen: FollowingScreen,
    navigationOptions: {
       headerShown: false,
    }
  },
})
const profileStack = createStackNavigator({
  Profile: {
    screen: MyProfileScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  Followers: {
    screen: FollowersScreen,
    navigationOptions: {
      headerShown: false,
    }
  },
  Following: {
    screen: FollowingScreen,
    navigationOptions: {
      headerShown: false,
    }
  },
  Camera: {
    screen: CameraScreen,
  },

})

const appStack = createStackNavigator({
  LoginHome: {
    screen: HomeScreen,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Header navigation={navigation} title='Home' />,
        headerStyle: {
          backgroundColor: '#333333'
        }
      }
    },
  },
  otherProfile: { 
    screen: otherProfileStack,
    navigationOptions: {
      headerShown: false,
    }
  }
})

const postChitStack = createStackNavigator({
  PostChit: {
    screen: PostChitScreen,
    navigationOptions: {
      headerShown: false,
    }
  },

  ChitCamera: {
    screen: ChitCameraScreen,
    navigationOptions: {
      headerShown: false,
    }
  }
})

const appTabs = createMaterialBottomTabNavigator({
  Home: {
    screen: appStack,
    navigationOptions: {
      title: 'Home',
      tabBarIcon: ({ tintColor }) => (
        <Icon color={tintColor} size={25} name="home" />
      ),
    }
  },
  Search: {
    screen: SearchScreen,
    navigationOptions: {
      title: 'Search',
      tabBarIcon: ({ tintColor }) => (
        <Icon color={tintColor} size={25} name="search" />
      ),
    }
  },
  PostChit: {
    screen: postChitStack,
    navigationOptions: {
      title: 'Make a Chit',
      tabBarIcon: ({ tintColor }) => (
        <Icon color={tintColor} size={25} name="create" />
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
  MyProfile: {
    screen: profileStack
  },
  Home: {
    screen: appTabs
  },
  Logout: {
    screen: LogoutScreen,
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

