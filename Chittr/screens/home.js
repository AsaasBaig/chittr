import React, { Component } from 'react';
import { Image, Text, FlatList, View, } from 'react-native';
import Style from '../styles/style';
import Geocoder from 'react-native-geocoding';

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            chitList: [],
        }
    }

    componentDidMount() {
        this.getHomeChits();
        console.log("component mounted")
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

    getLocation(location) {
        Geocoder.init('AIzaSyCxZiDqckiTmAmSU0I4kVTyF3GVM-WIm-g');
        Geocoder.from(location)
		.then(json => {
            const addressComponent = json.results[0].formatted_address;
            console.log(addressComponent)
            console.log("--*--")
            return addressComponent;
		})
		.catch(error => console.warn(error));
    }

    getChitDate(timestamp) {
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var date = new Date(timestamp * 1000);
        var day = date.getDay();
        var month = months[date.getMonth()];
        var year = date.getFullYear();
        var time = day + " " + month + ' | ' + year;
        return time;
    }

    render() {
        return (
            <View style={Style.pageContainer}>
                <FlatList style={Style.chitList}
                    data={this.state.chitList}
                    renderItem={({ item }) =>
                        <View style={Style.chitContainer}>
                            <View style={Style.chitHeaderContainer}>
                                <View>
                                    <Image style={Style.chitImageContainer} 
                                    source={{ uri: "http://10.0.2.2:3333/api/v0.0.5/user/" + item.user.user_id + "/photo" }}/>
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
                                <Text style={Style.chitDate}>
                                    {item.location == null ? "No location" : console.log(item)}
                                </Text>
                            </View>
                        </View>
                    }
                    keyExtractor={item => item.chit_id}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        )
    }
}
