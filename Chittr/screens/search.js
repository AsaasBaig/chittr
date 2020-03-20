import React, { Component } from 'react';
import { Image, FlatList, Text, TextInput, TouchableOpacity, View, } from 'react-native';
import Style from '../styles/style';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class Search extends Component {

    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            userList: [],
            search_string: "a",
        }
    }

    searchUser() {
        return fetch("http://10.0.2.2:3333/api/v0.0.5/search_user?q=" + this.state.search_string)
            .then((response) => response.json())
            .then((responseJson) => {

                responseJson.forEach(user => {
                    user.photo_uri = "http://10.0.2.2:3333/api/v0.0.5/user/"+
                    user.user_id +"/photo?timestamp="+(Math.floor((new Date().getTime()) / 1000))
                    console.log(user.photo_uri)
                })
                this.setState({
                    isLoading: false,
                    userList: responseJson,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    componentDidMount() {
        this._isMounted = true;
        this.searchUser();
        console.log("component mounted")
    }

    componentWillUnmount() {
        this._isMounted = false;
        console.log("component unmounted")
    }

    _renderItem = ({ item, index }) => {
        return (
            <View style={Style.chitContainer}>
                <View style={Style.chitHeaderContainer}>
                    <View>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('OtherProfile', item)}>
                            <Image style={Style.chitImageContainer} source={{ uri: item.photo_uri }} />
                        </TouchableOpacity>
                    </View>
                    <View style={Style.chitHeaderName}>
                        <Text style={Style.chitHeader}>{item.given_name}</Text>
                        <Text style={Style.chitHeader}>{item.family_name}</Text>
                    </View>
                </View>
            </View>
        )
    }

    render() {
        return (
            <View style={Style.pageContainer}>
                <View style={Style.searchContainer}>
                    <View style={Style.searchInputContainer}>
                        <View style={Style.searchIconContainer}>
                            <Icon color={'#c1c1c1'} size={25} name='search' />
                        </View>
                        <TextInput style={Style.searchInput}
                            placeholder='Looking for someone? '
                            placeholderTextColor="#c1c1c1"
                            underlineColorAndroid={'transparent'}
                            onChangeText={(text) => this.setState({ search_string: text })}
                            maxLength={25}
                            onSubmitEditing={() => this.searchUser()} />
                    </View>
                </View>
                <FlatList style={Style.chitList}
                    data={this.state.userList}
                    renderItem={this._renderItem}
                    keyExtractor={(item) => item.user_id}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        )
    }
}
