import React, { Component } from 'react';
import { Alert, View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Style from '../styles/style';


export default class Logout extends Component{

    constructor(props) {
        super(props);
        this._logout();
    }
    async logoutRequest() {
        const token = await AsyncStorage.getItem('token');
        console.log("Token: " + token);
        return fetch("http://10.0.2.2:3333/api/v0.0.5/logout",
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'X-Authorization': token
            },
        })
        .then((response) => {
        Alert.alert("Successfully Logged out")
        })
        .catch((error) => {
        console.error(error);
        });
    }
    _logout = async() => {
        this.logoutRequest()
        AsyncStorage.removeItem('token');
        this.props.navigation.navigate('Auth');
    }
    render(){
        return(
            <View style={Style.pageContainer}>
                <ActivityIndicator/>
            </View>
        )
    }
}