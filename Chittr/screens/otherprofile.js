import React, { Component } from 'react';
import { Alert, Image, Text, FlatList, TouchableOpacity, View, } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
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
      recentChits: [],
    }
  }

  async getUserDetails() {
    const current_user_id = await AsyncStorage.getItem('userid')
    const token = await AsyncStorage.getItem('token')
    this.setState({
      current_user_id: current_user_id,
      token: token
    })
    return fetch("http://10.0.2.2:3333/api/v0.0.5/user/" + this.state.user.user_id)
      .then((response) => response.json())
      .then((responseJson) => {
        if (this.state.user.user_id == current_user_id) {
          this.setState({
            isMyProfile: true
          })
        }
        console.log("Clicked user id: " + this.state.user.user_id)
        console.log("Current user id: " + current_user_id)
        console.log(this.state.isMyProfile)
        this.setState({
          isLoading: false,
          given_name: responseJson.given_name,
          family_name: responseJson.family_name,
          email: responseJson.email,
          password: "",
          display_name: responseJson.given_name + " " + responseJson.family_name,
          recentChits: responseJson.recentChits
        });
        this.getFollowers()
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.getUserDetails();
  }

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
        this.getUserDetails();
      })
      .catch((error) => {
        console.error(error);
      });
  }

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
        this.getUserDetails();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getFollowers() {
    return fetch("http://10.0.2.2:3333/api/v0.0.5/user/" + this.state.user.user_id + "/followers")
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.length > 0) {
          responseJson.forEach(followers => {
            if (followers.user_id == this.state.current_user_id) {
              console.log("Is follow before: " + this.state.isFollowing)
              this.setState({
                isFollowing: true,
              })
              console.log("Is follow after: " + this.state.isFollowing)
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
            {item.address ? item.address : "No Location"}
          </Text>
        </View>
      </View>
    )
  }

  render() {

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
              source={{ uri: "http://10.0.2.2:3333/api/v0.0.5/user/" + this.state.user.user_id + "/photo" }} />
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
        <View>
          <FlatList style={Style.chitList}
            data={this.state.chitList}
            renderItem={this._renderItem}
            keyExtractor={(item) => item.user_id}
            showsVerticalScrollIndicator={false}
          />
        </View>

      </View>
    )
  }
}
