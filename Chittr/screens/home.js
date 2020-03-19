import React, { Component } from 'react';
import { Image, Text, FlatList, View, TouchableOpacity, } from 'react-native';
import Style from '../styles/style';
import Geocoder from 'react-native-geocoding';

export default class Home extends Component {

    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            chitList: [],
        }
    }

    componentDidMount() {
        this._isMounted = true;
        this.getHomeChits();
        console.log("component mounted")
    }
    componentWillUnmount() {
        this._isMounted = false;
        console.log("component unmounted")
    }

    getHomeChits() {
        return fetch("http://10.0.2.2:3333/api/v0.0.5/chits?")
            .then((response) => response.json())
            .then((responseJson) => {
                responseJson.forEach(chit => {
                    if (chit.location) {
                        this.getLocation(chit.location).then(json => {
                            chit.address = json.results[0].address_components[3].long_name
                                + " | " + json.results[0].address_components[4].long_name;
                            console.log(chit.address);
                        })
                            .catch(error => console.warn(error));
                    }
                });
                this.setState({
                    isLoading: false,
                    chitList: responseJson,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    getLocation(location) {
        Geocoder.init('AIzaSyCxZiDqckiTmAmSU0I4kVTyF3GVM-WIm-g');
        return Geocoder.from(location.latitude, location.longitude);
    }

    getChitDate(timestamp) {
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var date = new Date(timestamp * 1000);
        var day = date.getDay();
        var month = months[date.getMonth()];
        var year = date.getFullYear();
        var time = day + " " + month + ' | ' + year;
        console.log(time)
        return time;
    }

    _renderItem = ({ item, index }) => {
        return (
            <View style={Style.chitContainer}>
                <View style={Style.chitHeaderContainer}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('OtherProfile', item.user)}>
                        <Image style={Style.chitImageContainer}
                            source={{ uri: "http://10.0.2.2:3333/api/v0.0.5/user/" + item.user.user_id + "/photo" }}
                        />
                    </TouchableOpacity>
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
                    <Text style={Style.chitDate}>
                        {item.address ? item.address : "Location Unavailable"}
                    </Text>
                </View>
            </View>
        )
    }
    render() {
        return (
            <View style={Style.pageContainer}>
                <FlatList style={Style.chitList}
                    data={this.state.chitList}
                    renderItem={this._renderItem}
                    keyExtractor={(item) => item.chit_id}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        )
    }
}
