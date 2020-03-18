import React, { Component } from 'react';
import {Image, FlatList, Text, TextInput, View, } from 'react-native';
import Style from '../styles/style';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            chitList: [],
            search_content: "",
        }
    }

    async getHomeChits() {
        return fetch("http://10.0.2.2:3333/api/v0.0.5/chits?")
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    chitList: responseJson,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    componentDidMount() {
        this.getHomeChits();
    }

    getChitDate(timestamp) {
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var date = new Date(timestamp * 1000);
        var day = date.getDay();
        var month = months[date.getMonth()];
        var year = date.getFullYear();
        //var hour = date.getHours();
        //var min = date.getMinutes();
        var time = day + " " + month + ' | ' + year;
        return time;
    }

    //onSubmitEditing={}
    render() {
        return (
            <View style={Style.pageContainer}>
                <View style={Style.searchContainer}>
                    <View style={Style.searchInputContainer}>
                        <View style={Style.searchIconContainer}>
                            <Icon color={'#c1c1c1'} size={25} name='search'/>
                        </View>
                        <TextInput style={Style.searchInput}
                            placeholder='Looking for someone? '
                            placeholderTextColor="#c1c1c1"
                            underlineColorAndroid={'transparent'}
                            onChangeText={(text) => this.setState({ search_content: text })} 
                            maxLength={25}/>
                    </View>
                </View>
                <FlatList style={Style.chitList}
                    data={this.state.chitList}
                    renderItem={({ item }) =>
                        <View style={Style.chitContainer}>
                            <View style={Style.chitHeaderContainer}>
                                <View>
                                    <Image style={Style.chitImageContainer} source={{ uri: "http://10.0.2.2:3333/api/v0.0.5/user/"+item.user.user_id+"/photo"}} />
                                </View>
                                <View style={Style.chitHeaderName}>
                                    <Text style={Style.chitHeader}>{item.user.given_name}</Text>
                                    <Text style={Style.chitHeader}>{item.user.family_name}</Text>
                                </View>
                                <View style={Style.chitDateContainer}>
                                    <Text style={Style.chitDate}>{this.getChitDate(item.timestamp)}</Text>
                                </View>
                            </View>
                            
                            <Text style={Style.chitContent}>{item.chit_content}</Text>
                            <View style={Style.chitLocationContainer}>
                                <Text style={Style.chitDate}>Manchester, United Kingdom, England</Text>
                            </View>
                        </View>
                    }
                    keyExtractor={({ id }, index) => id}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        )
    }
}
