import React, { Component } from 'react';
import { ActivityIndicator, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Style from '../styles/style';


export default class Auth extends Component {

    constructor(props) {
        super(props);
        this._authTokenCheck();
    }

    _authTokenCheck = async () => {
        const isLoggedIn = await AsyncStorage.getItem('token');
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
