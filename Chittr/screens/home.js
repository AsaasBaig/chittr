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
        Geocoder.init('AIzaSyCxZiDqckiTmAmSU0I4kVTyF3GVM-WIm-g');
        return fetch("http://10.0.2.2:3333/api/v0.0.5/chits?start=1&count=15")
            .then((response) => response.json())
            .then((responseJson) => {
                responseJson.forEach(chit => {
                    if (chit.location) {
                        this.getLocation(chit.location)
                        .then(json => {
                            chit.address = json.results[0].address_components[3].long_name
                                + " | " + json.results[0].address_components[4].long_name;
                            console.log(chit.address);

                        })
                            .catch(error => console.warn(error));
                    }
                    chit.user.photo_uri = "http://10.0.2.2:3333/api/v0.0.5/user/" +
                        chit.user.user_id + "/photo?timestamp=" + new Date()

                    chit.photo_uri = "http://10.0.2.2:3333/api/v0.0.5/chits/" +
                        chit.chit_id + "/photo?timestamp=" + new Date()

                    this.checkImageURL(chit.photo_uri)
                        .then((response) => {
                            if (response.status == 404) {
                                chit.hasImage = false
                            }
                            else {
                                chit.hasImage = true
                            }
                        })
                        .catch((error) => {
                            console.log(error)
                        });

                    //console.log(chit.user.photo_uri)
                    //console.log(chit.photo_uri)
                })
                this.setState({
                    isLoading: false,
                    chitList: responseJson,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    checkImage() {

    }
    getLocation(location) {
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

    checkImageURL(url) {
        return fetch(url)
    }

    _renderItem = ({ item, index }) => {
        //console.log("Listed Chit's User ID:" + item.user.user_id)
        //console.log("CHIT IMAGE ID URI: " + item.photo_uri)
        let chitImage;
        if (item.hasImage) {
            chitImage = <Image style={Style.chitPhotoContainer}
                source={{ uri: item.photo_uri }} />
        }
        return (
            <View style={Style.chitContainer}>
                <View style={Style.chitHeaderContainer}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('OtherProfile', item.user)}>
                        <Image style={Style.chitImageContainer}
                            source={{ uri: item.user.photo_uri }}
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
                <View>
                    {chitImage}
                </View>
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
