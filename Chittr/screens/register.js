import React, { Component } from 'react';
import { Text, Alert, TextInput, TouchableOpacity, View, } from 'react-native';
import Style from '../styles/style';

export default class Register extends Component{

    constructor(props){
      super(props);
      this.state ={
        given_name: "",
        family_name: "",
        email: "",
        password: "",
        confirmed_password: "",
      }
     }

    //register user via state values set in form
    async registerUser(){
      //check if password user entered match the confirm password pass user entered.
      if (this.state.password === this.state.confirmed_password){
        //if passwords match, send state data to register user endpoint
        return fetch("http://10.0.2.2:3333/api/v0.0.5/user",
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              given_name: this.state.given_name,
              family_name: this.state.family_name,
              email: this.state.email,
              password: this.state.password
            })
        })
        .then((response) => {
          //on response, Alert user and navigate back to splash so user can login.
          Alert.alert("Registered Successfully");
          this.props.navigation.navigate('Welcome');
        })
        .catch((error) => {
          console.error(error);
        });
      }
      else{
        //password mismatch alert
        Alert.alert("Error: Passwords do not match.");
      }
    }
  
    render(){
      return(
        <View style={Style.pageContainer}>
          <View style={Style.authFormContainer}>
            <View style={Style.headerContainer}>
              <Text style={Style.authFormHeader}>
                Register
              </Text>
            </View>
            <View>
              <Text style={Style.authFormLabel}>
                First Name:
              </Text>
              <TextInput style={Style.authFormInput}
              placeholder="First Name..."
              placeholderTextColor="#c1c1c1"
              maxLength={20}
              onChangeText={(text) => this.setState({given_name : text})}/>
              <Text style={Style.authFormLabel}>
                Last Name:
              </Text>
              <TextInput style={Style.authFormInput}
              placeholder="Last Name..."
              placeholderTextColor="#c1c1c1"
              maxLength={20}
              onChangeText={(text) => this.setState({family_name : text})}/>
              <Text style={Style.authFormLabel}>
                Email:
              </Text>
              <TextInput style={Style.authFormInput}
              placeholder="Email..."
              placeholderTextColor="#c1c1c1"
              maxLength={35}
              onChangeText={(text) => this.setState({email : text})}/>
              <Text style={Style.authFormLabel}>
                Password:
              </Text>
              <TextInput style={Style.authFormInput}
              placeholder="Password..."
              placeholderTextColor="#c1c1c1"
              secureTextEntry
              maxLength={15}
              onChangeText={(text) => this.setState({password : text})}/>
              <Text style={Style.authFormLabel}>
                Confirm Password:
              </Text>
              <TextInput style={Style.authFormInput}
              placeholder="Confirm password..."
              placeholderTextColor="#c1c1c1"
              secureTextEntry
              maxLength={15}
              onChangeText={(text) => this.setState({confirmed_password : text})}/>
            </View>
            <View style={Style.btnWrapper}>
            <TouchableOpacity style = {Style.registerBtn} onPress={() => this.registerUser()}>
              <Text style={Style.btnText}>Register</Text>
            </TouchableOpacity>
            </View>
          </View>
        </View>
      )
    }
}
  