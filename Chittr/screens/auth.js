import React, { Component } from 'react';
import { View, AsyncStorage, ActivityIndicator } from 'react-native';
import Style from '../styles/style';


export default class Auth extends Component{

    constructor(props) {
        super(props);
        this._authTokenCheck();
    }

    _authTokenCheck = async() => {
        //await AsyncStorage.clear();
        const isLoggedIn = await AsyncStorage.getItem('token');
        this.props.navigation.navigate(isLoggedIn != null? 'App' : 'Auth');
    }
    render(){
        return(
            <View style={Style.pageContainer}>
                <ActivityIndicator/>
            </View>
        )
    }
}


