import React, { Component } from 'react';
import { Alert, Image, Text, FlatList, ScrollView, TouchableOpacity, View, } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Style from '../styles/style';

export default class GuestProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      token: "",
      current_user_id: "",
      user: {
        user_id: this.props.navigation.getParam('user_id')
      },
      given_name: "",
      family_name: "",
      email: "",
      display_name: "",
      photo_uri: "",
      recent_chits: [],
    }
  }

  //on component mount, get user details.
  componentDidMount() {
    this.getUserDetails();
  }

  async getUserDetails() {

    //get clicked user's details via API
    return fetch("http://10.0.2.2:3333/api/v0.0.5/user/" + this.state.user.user_id)
      .then((response) => response.json())
      .then((responseJson) => {

        console.log("Clicked user id: " + this.state.user.user_id)

        //set response data to state
        this.setState({
          isLoading: false,
          given_name: responseJson.given_name,
          family_name: responseJson.family_name,
          email: responseJson.email,
          password: "",
          display_name: responseJson.given_name + " " + responseJson.family_name,
          recent_chits: responseJson.recent_chits,
          photo_uri: "http://10.0.2.2:3333/api/v0.0.5/user/" +
            this.state.user.user_id + "/photo?timestamp=" + new Date()
        });
        console.log(responseJson)
      })
      .catch((error) => {
        console.log(error);
      });
  }



  //get recent chit's date
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

  //render recent chits for user.
  _renderItem = ({ item, index }) => {
    return (
      <View style={Style.otherChitContainer}>
        <View style={Style.chitHeaderContainer}>
          <View>
            <Image style={Style.chitImageContainer}
              source={{ uri: this.state.photo_uri }}
            />
          </View>
          <View style={Style.chitHeaderName}>
            <Text style={Style.chitHeader}>{this.state.given_name}</Text>
            <Text style={Style.chitHeader}>{this.state.family_name}</Text>
          </View>
          <View style={Style.chitDateContainer}>
            <Text style={Style.chitDate}>{this.getChitDate(item.timestamp)}</Text>
          </View>
        </View>
        <Text style={Style.chitContent}>{item.chit_content}</Text>
      </View>
    )
  }

  render() {

    return (
      <View style={Style.pageContainer}>
        <View style={Style.profileContainer}>

          <View>
            <Image style={Style.profileImageContainer}
              source={{ uri: this.state.photo_uri }} />
          </View>

          <View>
            <Text style={Style.profileLabel}>{this.state.display_name}</Text>
          </View>

        </View>

        <Text style={Style.chitFormLabel}>
          Recent Chits:
        </Text>

        <FlatList style={Style.chitList}
          data={this.state.recent_chits}
          renderItem={this._renderItem}
          keyExtractor={(item) => item.user_id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    )
  }
}
