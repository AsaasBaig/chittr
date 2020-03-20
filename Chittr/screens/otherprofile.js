import React, { Component } from 'react';
import { Alert, Image, Text, FlatList, ScrollView, TouchableOpacity, View, } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Style from '../styles/style';

export default class OtherProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isMyProfile: false,
      isFollowing: false,
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

  //get user details for current viewed profile.
  async getUserDetails() {
    //get current user's login token and id and set them to state
    const current_user_id = await AsyncStorage.getItem('userid')
    const token = await AsyncStorage.getItem('token')
    this.setState({
      current_user_id: current_user_id,
      token: token
    })

    return fetch("http://10.0.2.2:3333/api/v0.0.5/user/" + this.state.user.user_id)
      .then((response) => response.json())
      .then((responseJson) => {
        //if the current user's id matches the viewer's profile then it's user's own profile.
        if (this.state.user.user_id == current_user_id) {
          this.setState({
            isMyProfile: true
          })
        }

        console.log("Clicked user id: " + this.state.user.user_id)
        console.log("Current user id: " + current_user_id)

        //set response data to state.
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
        //get followers of current user to check if they are being followed already
        this.getFollowers()
        console.log(responseJson)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //on mount, get user details.
  componentDidMount() {
    this.getUserDetails();
  }

  //send post request to follow current viewed user
  followUser() {
    return fetch("http://10.0.2.2:3333/api/v0.0.5/user/" + this.state.user.user_id + "/follow",
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-Authorization': this.state.token
        },
      })
      .then((response) => {
        Alert.alert("Followed!")
        //refresh user details
        this.getUserDetails();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  //unfollow user by sending delete request with current user's token to the other user's follow api
  unFollowUser() {
    return fetch("http://10.0.2.2:3333/api/v0.0.5/user/" + this.state.user.user_id + "/follow",
      {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-Authorization': this.state.token
        },
      })
      .then((response) => {
        Alert.alert("Unfollowed")
        //refresh user details
        this.getUserDetails();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  //get recent chits timestamps
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

  getFollowers() {
    //fetch followers from followers api of current user being viewed.
    return fetch("http://10.0.2.2:3333/api/v0.0.5/user/" + this.state.user.user_id + "/followers")
      .then((response) => response.json())
      .then((responseJson) => {
        //check if follower list isn't empty
        if (responseJson.length > 0) {
          responseJson.forEach(followers => {
            //for each follower check if they are being followed by the current user,
            //if they are, set isFollowing to true
            if (followers.user_id == this.state.current_user_id) {
              this.setState({
                isFollowing: true,
              })
            }
          });
        }
        else {
          this.setState({
            isFollowing: false,
          })
          console.log("Response was undefined: following = " + this.state.isFollowing)
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //render flatlist components to insert to flatlist
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
  //render recent chits for user.
  render() {
    //if the profile is not the browsing user's own profile, 
    //if the user is following or not following, render a different button.
    let button;
    if (!this.state.isMyProfile) {
      if (!this.state.isFollowing)
        button =
          <TouchableOpacity style={Style.profileBtn}
            onPress={() => this.followUser()}>
            <Text style={Style.profileBtnText}>Follow</Text>
          </TouchableOpacity>
      else {
        button =
          <TouchableOpacity style={Style.profileBtn}
            onPress={() => this.unFollowUser()}>
            <Text style={Style.profileBtnText}>Unfollow</Text>
          </TouchableOpacity>
      }
    }

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

          <View>
            {button}
          </View>

        </View>

        <View style={Style.profileDetailsContainer}>
          <TouchableOpacity style={Style.profileBtn}
            onPress={() => this.props.navigation.navigate('OtherFollowers', this.state.user)}>
            <Text style={Style.profileBtnText}>Followers</Text>
          </TouchableOpacity>
          <TouchableOpacity style={Style.profileBtn}
            onPress={() => this.props.navigation.navigate('OtherFollowing', this.state.user)}>
            <Text style={Style.profileBtnText}>Following</Text>
          </TouchableOpacity>
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
