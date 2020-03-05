import React, { Component } from 'react';
import { Text, TextInput, TouchableOpacity, View, } from 'react-native';
import Style from '../styles/style';
import { Header } from 'react-native/Libraries/NewAppScreen';

export default class Login extends Component{

    constructor(props){
      super(props);
      this.state ={
      }
     }
  
    render(){
      return(
        <View style={Style.pageContainer}>
          <View style={Style.formContainer}>
            <View style={Style.headerContainer}>
              <Text style={Style.formHeader}>
                Log In
              </Text>
            </View>
            <View>
              <Text style={Style.formLabel}>
                Email
              </Text>
              <TextInput style={Style.formInput}></TextInput>
              <Text style={Style.formLabel}>
                Password
              </Text>
              <TextInput style={Style.formInput}></TextInput>
            </View>
            <View style={Style.btnWrapper}>
            <TouchableOpacity style = {Style.registerBtn}>
              <Text style={Style.btnText}>Log In</Text>
            </TouchableOpacity>
            </View>
          </View>
        </View>
      )
    }
}
  