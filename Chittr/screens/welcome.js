import React, { Component } from 'react';
import { Text, TouchableOpacity, View, } from 'react-native';
import Style from '../styles/style'


export default class Welcome extends Component {

  //render splash page with buttons and navigations to authentication routes.
  render() {

    return (
      <View style={Style.pageContainer}>
        <View style={Style.splashContainer}>
          <View>
            <Text style={Style.appTitle}>Chittr</Text>
            <Text style={Style.appWelcome}>
              Welcome to Chittr.{"\n"}Please Log In.
            </Text>
          </View>
          <View style={Style.btnWrapper}>
            <TouchableOpacity style={Style.registerBtn}
              onPress={() => this.props.navigation.navigate('Register')}>
              <Text style={Style.btnText}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity style={Style.loginBtn}
              onPress={() => this.props.navigation.navigate('Login')}>
              <Text style={Style.btnText}>Log In</Text>
            </TouchableOpacity>
          </View>
          <View style={Style.splashBtnWrapper}>
            <TouchableOpacity style={Style.splashBtn}
              onPress={() => this.props.navigation.navigate('GuestHome')}>
              <Text style={Style.btnText}>
                Browse Chittr
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}


