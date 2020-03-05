import React, { Component } from 'react';
import { Text, TextInput, TouchableOpacity, View, } from 'react-native';
import Style from '../styles/style';

export default class Register extends Component{

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
                Register
              </Text>
            </View>
            <View>
              <Text style={Style.formLabel}>
                First Name
              </Text>
              <TextInput style={Style.formInput}></TextInput>
              <Text style={Style.formLabel}>
                Last Name
              </Text>
              <TextInput style={Style.formInput}></TextInput>
              <Text style={Style.formLabel}>
                Email
              </Text>
              <TextInput style={Style.formInput}></TextInput>
              <Text style={Style.formLabel}>
                Password
              </Text>
              <TextInput style={Style.formInput}></TextInput>
              <Text style={Style.formLabel}>
                Confirm Password
              </Text>
              <TextInput style={Style.formInput}></TextInput>
            </View>
            <View style={Style.btnWrapper}>
            <TouchableOpacity style = {Style.registerBtn}>
              <Text style={Style.btnText}>Register</Text>
            </TouchableOpacity>
            </View>
          </View>
        </View>
      )
    }
}
  