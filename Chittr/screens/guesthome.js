import React, { Component } from 'react';
import { Image, Text, FlatList, View, TouchableOpacity, } from 'react-native';
import Style from '../styles/style';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Geocoder from 'react-native-geocoding';

export default class GuestHome extends Component {

    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            chitList: [],
        }
    }

    //check if component is mounted and then get data.
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
        //initialise google geocode api key
        Geocoder.init('AIzaSyCxZiDqckiTmAmSU0I4kVTyF3GVM-WIm-g');
        //fetch 30 chits
        return fetch("http://10.0.2.2:3333/api/v0.0.5/chits?start=1&count=30")
            .then((response) => response.json())
            .then((responseJson) => {
                //for each chit inside response
                responseJson.forEach(chit => {
                    //if location exists in chit
                    if (chit.location) {
                        //get geocoded geolocation of chit's lat/long
                        this.getLocation(chit.location)
                            .then(json => {
                                //append results to responseJson
                                chit.address = json.results[0].address_components[3].long_name
                                    + " | " + json.results[0].address_components[4].long_name;
                                console.log(chit.address);

                            })
                            .catch(error => console.warn(error));
                    }
                    //create every user's photo URI and append to responseJson
                    chit.user.photo_uri = "http://10.0.2.2:3333/api/v0.0.5/user/" +
                        chit.user.user_id + "/photo?timestamp=" + new Date()

                    //create every user's chit photo URI and append to responseJson
                    chit.photo_uri = "http://10.0.2.2:3333/api/v0.0.5/chits/" +
                        chit.chit_id + "/photo?timestamp=" + new Date()

                    //check if chit image exists on server, if it does, set chit.hasImage to true
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
                //set responseJson to state
                this.setState({
                    isLoading: false,
                    chitList: responseJson,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    //get location from latitude and logitude
    getLocation(location) {
        return Geocoder.from(location.latitude, location.longitude);
    }

    //get Chit date by converting unix timestamp to current date time
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

    //check image url response i.e. 404
    checkImageURL(url) {
        return fetch(url)
    }

    _renderItem = ({ item, index }) => {
        //if image response was 404, chit hasImage will be false
        //based on that, render image container.
        let chitImage;
        if (item.hasImage) {
            chitImage = <Image style={Style.chitPhotoContainer}
                source={{ uri: item.photo_uri }} />
        }
        return (
            <View style={Style.chitContainer}>
                <View style={Style.chitHeaderContainer}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('GuestProfile', item.user)}>
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
                    <Icon color={'#333333'} size={15} name="place" />
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
