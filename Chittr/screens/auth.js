import React, { Component } from 'react';
import { ActivityIndicator, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Style from '../styles/style';
//import components

export default class Auth extends Component {

    constructor(props) {
        super(props);
        this._authTokenCheck();
    }
    //on load check auth token exists
    _authTokenCheck = async () => {
        const isLoggedIn = await AsyncStorage.getItem('token');
        //check if useris logged in when token exists, if token exits, navigate to app stack
        //else navigate to login
        this.props.navigation.navigate(isLoggedIn != null ? 'App' : 'Auth');
    }
    render() {
        return (
            <View style={Style.pageContainer}>
                <ActivityIndicator />
            </View>
        )
    }
}
