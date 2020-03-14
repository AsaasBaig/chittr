import React, { Component } from 'react';
import { View, AsyncStorage, ActivityIndicator } from 'react-native';
import Style from '../styles/style';


export default class Logout extends Component{

    constructor(props) {
        super(props);
        this._logout();
    }
    _logout = async() => {
        AsyncStorage.setItem('token', responseJson.token);
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