import React, { Component } from 'react';
import { Text, TouchableOpacity, View, } from 'react-native';
import Style from '../styles/style';


export default class Welcome extends Component{

  render(){

    const { navigate } = this.props.navigation;

    return(
      <View style={Style.pageContainer}>
        <View style={Style.splashContainer}>
          <View>
            <Text style={Style.appTitle}>Chittr</Text>
            <Text style={Style.appWelcome}>
              Welcome to Chittr.{"\n"}Please Sign In.
            </Text>
          </View>
          <View style={Style.btnWrapper}>
          <TouchableOpacity style = {Style.registerBtn} onPress={() => navigate('Register')}>
            <Text style={Style.registerBtnText}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity style = {Style.loginBtn} onPress={() => navigate('Login')}>
            <Text style={Style.loginBtnText}>Log In</Text>
          </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}


