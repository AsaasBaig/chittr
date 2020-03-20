import React, { Component } from 'react';
import { Alert, Image, Text, TextInput, TouchableOpacity, View, } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Style from '../styles/style';

export default class MyProfile extends Component {

  //get params parsed on click to profile ( i.e. user that has been clicked )
  //set default states
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      token: "",
      current_user_id: 0,
      user: {
        user_id: this.props.navigation.getParam('user_id')
      },
      given_name: "",
      family_name: "",
      email: "",
      display_name: "",
      photo_uri: "",
    }
  }

  async getUserDetails() {

    //get current user id and token that were stored locally in async.
    const current_user_id = await (AsyncStorage.getItem('userid'))
    const token = await AsyncStorage.getItem('token')

    //set tokens and id to state to allow later use without async call
    this.setState({
      current_user_id: current_user_id,
      token: token
    })

    //get current user's details from API
    return fetch("http://10.0.2.2:3333/api/v0.0.5/user/" + this.state.current_user_id)
      .then((response) => response.json())
      .then((responseJson) => {
        //set states of user details based on responseJson.
        this.setState({
          isLoading: false,
          user: {
            user_id: responseJson.user_id,
          },
          given_name: responseJson.given_name,
          family_name: responseJson.family_name,
          email: responseJson.email,
          password: "",
          display_name: responseJson.given_name + " " + responseJson.family_name,
          //create a photo_uri for user
          photo_uri: "http://10.0.2.2:3333/api/v0.0.5/user/"+
          responseJson.user_id +"/photo?timestamp="+(Math.floor((new Date().getTime()) / 1000))
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //on component mount, get user details
  componentDidMount() {
    this.getUserDetails();
  }

  //load camera screen function
  loadCamera() {
    this.props.navigation.navigate('Camera')
  }

  //patch user via API patch request
  async patchUser() {
    //assign token and current user id to patch via API.
    return fetch("http://10.0.2.2:3333/api/v0.0.5/user/" + this.state.current_user_id,
      {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-Authorization': this.state.token
        },
        body: JSON.stringify({
          given_name: this.state.given_name,
          family_name: this.state.family_name,
          email: this.state.email,
          password: this.state.password
        })
      })
      .then((response) => {
        //refresh user details on patch.
        Alert.alert("Succesfully Updated Details")
        this.getUserDetails();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  //render components with functions on press etc.
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

          <TouchableOpacity style={Style.profileBtn}
            onPress={() => this.loadCamera()}>
            <Icon color={'#ffffff'} size={25} name="camera-alt" />
          </TouchableOpacity>

        </View>

        <View style={Style.profileDetailsContainer}>
          <TouchableOpacity style={Style.profileBtn}
            onPress={() => this.props.navigation.navigate('Followers', this.state.user)}>
            <Text style={Style.profileBtnText}>Followers</Text>
          </TouchableOpacity>
          <TouchableOpacity style={Style.profileBtn}
            onPress={() => this.props.navigation.navigate('Following', this.state.user)}>
            <Text style={Style.profileBtnText}>Following</Text>
          </TouchableOpacity>
        </View>
        
        <View style={Style.profileDetailsContainer}>
          <View style={Style.profileDetailsColumn}>
            <Text style={Style.profileFormLabel}>First Name: </Text>
            <Text style={Style.profileFormLabel}>Last Name: </Text>
            <Text style={Style.profileFormLabel}>Email: </Text>
            <Text style={Style.profileFormLabel}>Password: </Text>
          </View>

          <View style={Style.profileDetailsColumn}>
            <TextInput style={Style.profileInput}
              value={this.state.given_name}
              onChangeText={(text) => this.setState({ given_name: text })}
              maxLength={20} />
            <TextInput style={Style.profileInput}
              value={this.state.family_name}
              onChangeText={(text) => this.setState({ family_name: text })}
              maxLength={20} />
            <TextInput style={Style.profileInput}
              value={this.state.email}
              onChangeText={(text) => this.setState({ email: text })}
              maxLength={35} />
            <TextInput style={Style.profileInput}
              onChangeText={(text) => this.setState({ password: text })}
              maxLength={15} />
          </View>

        </View>

        <View style={Style.btnWrapper}>
          <TouchableOpacity style={Style.profileBtn}>
            <Text style={Style.profileBtnText}
              onPress={() => this.patchUser()}>Save Changes</Text>
          </TouchableOpacity>
        </View>

      </View>
    )
  }
}
