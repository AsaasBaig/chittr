import React, { Component } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View,} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Style from '../styles/style';

export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loginid: 0,
    }
  }


  async login() {
    //fetch login by posting user details from state
    return fetch("http://10.0.2.2:3333/api/v0.0.5/login",
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
        })
      })
      .then((response) => response.json())
      .then((responseJson) => {

        //set async storage item to be the userid and token of logged in user
        AsyncStorage.setItem('userid', responseJson.id.toString());
        AsyncStorage.setItem('token', responseJson.token);

        console.log(responseJson.token)
        console.log(responseJson.id)
        //navigate to main application once logged in.
        this.props.navigation.navigate('App')
      })
      .catch((error) => {
        //on error, alert that the wrong email or password was input
        Alert.alert("Wrong Email or Password");
      });
  }

  render() {
    return (
      <View style={Style.pageContainer}>
        <View style={Style.authFormContainer}>
          <View style={Style.headerContainer}>
            <Text style={Style.authFormHeader}>
              Log In
              </Text>
          </View>
          <View>
            <Text style={Style.authFormLabel}>
              Email:
              </Text>
            <TextInput style={Style.authFormInput}
              placeholder="Email..."
              placeholderTextColor="#c1c1c1"
              maxLength={35}
              onChangeText={(text) => this.setState({ email: text })} />
            <Text style={Style.authFormLabel}>
              Password:
              </Text>
            <TextInput style={Style.authFormInput}
              placeholder='Password...'
              placeholderTextColor="#c1c1c1"
              secureTextEntry
              maxLength={15}
              onChangeText={(text) => this.setState({ password: text })} />
          </View>
          <View style={Style.btnWrapper}>
            <TouchableOpacity style={Style.registerBtn}>
              <Text style={Style.btnText} onPress={() => this.login()}>Log In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}
