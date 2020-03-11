import React, { Component } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View, AsyncStorage } from 'react-native';
import Style from '../styles/style';
import { Header } from 'react-native/Libraries/NewAppScreen';

export default class Login extends Component{

    constructor(props){
      super(props);
      this.state ={
        email: "",
        password: "",
        loginid: 0,
        token: "",
      }
     }

    async login(){
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
        //Alert.alert(response);
        //console.warn(response)

        //navigate('Welcome');
      .then((responseJson) => {

        AsyncStorage.setItem('token', responseJson.token);
        // this.setState({

        //   loginid: responseJson.id,
        //   token: responseJson.token
        // })
        console.log(responseJson.token)
        console.log(responseJson.id)
        var { navigate } = this.props.navigation
        navigate('App')
      })
      .catch((error) => {
        console.error(error);
      });
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
                Email:
              </Text>
              <TextInput style={Style.formInput} 
              placeholder="Email..."
              placeholderTextColor="#c1c1c1"
              onChangeText={(text) => this.setState({email: text})}/>
              <Text style={Style.formLabel}>
                Password:
              </Text>
              <TextInput style={Style.formInput}
              placeholder='Password...'
              placeholderTextColor="#c1c1c1"
              secureTextEntry
              onChangeText={(text) => this.setState({password: text})}/>
            </View>
            <View style={Style.btnWrapper}>
            <TouchableOpacity style = {Style.registerBtn}>
              <Text style={Style.btnText} onPress={() => this.login()}>Log In</Text>
            </TouchableOpacity>
            </View>
          </View>
        </View>
      )
    }
}
  