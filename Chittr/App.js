import React, { Component } from 'react';
//Import navs
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
//Import screens
import Icon from 'react-native-vector-icons/MaterialIcons';
import WelcomeScreen from './screens/welcome';
import LoginScreen from './screens/login';
import RegisterScreen from './screens/register';
import HomeScreen from './screens/home';
import GuestHomeScreen from './screens/guesthome';
import AuthLoadingScreen from './screens/auth';
import PostChitScreen from './screens/postchit';
import MyProfileScreen from './screens/myprofile';
import OtherProfileScreen from './screens/otherprofile';
import GuestProfileScreen from './screens/guestprofile';
import SearchScreen from './screens/search';
import LogoutScreen from './screens/logout';
import CameraScreen from './screens/camera';
import ChitCameraScreen from './screens/chitcamera';
import FollowersScreen from './screens/followers';
import FollowingScreen from './screens/following';
import Header from './screens/header';

//Create stack navigation for when user has not logged in.
//Disable headers
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
  GuestHome: {
    screen: GuestHomeScreen,
    navigationOptions: {
      headerShown: false,
    }
  },
  GuestProfile: {
    screen: GuestProfileScreen,
    navigationOptions: {
      headerShown: false,
    }
  }
});

//Stack navigation for when a user is viewing another user's profile.
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

//Stack navigation for when a user is viewing their own profile.
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

//Main application stack navigator.
const appStack = createStackNavigator({
  //Create home feed after login, with custom header component
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

//Create chit posting stack navigation
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

//Bottom tab navigator that holds application stack 
//(home page -> other profiles)
//(search page -> other profiles)
//(post chit page -> camera <-)
//includes tab styles and icons into tab bar.
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
//Drawer Nav created with a tab navigator inside as the main route (home page)
const homeDrawerNav = createDrawerNavigator({
  MyProfile: {
    screen: profileStack,
    navigationOptions: {
      title: "My Profile"
    }
  },
  Home: {
    screen: appTabs
  },
  Logout: {
    screen: LogoutScreen,
    navigationOptions: {
      title: "Log Out"
    }
  }
},
  {
    initialRouteName: 'Home'
  })

//export navigation by creating switch to determine authentication results
//directing user to correct stack/route
//if logged in => app (drawer nav)
//else auth stack
//load auth check by default.
const Chittr = createAppContainer(createSwitchNavigator({
  AuthLoading: AuthLoadingScreen,
  App: homeDrawerNav,
  Auth: authStack,
},
  {
    initialRouteName: 'AuthLoading'
  }));
export default Chittr

