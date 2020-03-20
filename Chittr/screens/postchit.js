import React, { Component } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View, PermissionsAndroid } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Geolocation from 'react-native-geolocation-service';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Style from '../styles/style';

export default class PostChit extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      timestamp: 0,
      chit_content: "",
      location: {
        longitude: "0",
        latitude: "0",
      },
      locationPermission: false,
      photo_data: "",
    }
  }

  //on component mount, find current location coordinates
  componentDidMount() {
    this._isMounted = true;
    this.findCoordinates();
    console.log("component mounted")
  }
  componentWillUnmount() {
    this._isMounted = false;
    console.log("component unmounted")
  }

  //set timestamp to state on button press
  setTimestamp() {
    this.setState({ timestamp: Math.floor((new Date().getTime()) / 1000) })
  }

  //handlePhoto pulls photo data from chitcamera screen back to this screen and sets to state
  handlePhoto(photo) {
    this.setState({ photo_data: photo });
  }

  //request android permission if the user has not allowed location on chit posts
  async requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Chittr Location Permission',
          message:
            'This app requires access to your location.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can access location');
        return true;
      } else {
        console.log('Location permission denied');
        return false;
      }
    } catch (err) {
      console.warn(err);
    }
  }

  //find current coordinates via geolocation react-native service
  findCoordinates = () => {
    //only go forward with location if permission exists
    if (!this.state.locationPermission) {
      this.state.locationPermission = this.requestLocationPermission();
      Geolocation.getCurrentPosition(
        (position) => {

          this.setState({
            location: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            }
          });
        },
        (error) => {
          Alert.alert(error.message)
        },
        {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 1000
        }
      );
    }
  };
  
  //load camera on camera button press,
  //send handlePhoto function to chitcamera to then retrieve data back to the function.
  loadCamera() {
    this.props.navigation.navigate('ChitCamera', { handlePhoto: this.handlePhoto.bind(this) })
  }

  async uploadPhoto(chit_id) {
    //get current user token
    const token = await AsyncStorage.getItem("token");

    //post chit image with current user's token to associate correct chit with correct user
    return fetch("http://10.0.2.2:3333/api/v0.0.5/chits/" + chit_id + "/photo", {
      method: 'POST',
      headers: {
        "Content-Type": "image/jpeg",
        "X-Authorization": token
      },
      body: this.state.photo_data
    })
      .then((response) => {
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async postChit() {
    //set timestamp on post chit
    this.setTimestamp();
    //get token for user
    const token = await AsyncStorage.getItem('token');

    //post chit data to chit endpoint
    return fetch("http://10.0.2.2:3333/api/v0.0.5/chits",
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-Authorization': token
        },
        body: JSON.stringify({
          timestamp: this.state.timestamp,
          chit_content: this.state.chit_content,
          location: this.state.location,
        })
      })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("Chit ID:" + responseJson.chit_id)

        //if photo data exists in state, meaning user has opted to upload a photo, 
        //launch upload photo function
        if(this.state.photo_data){
          this.uploadPhoto(responseJson.chit_id)
        }
        Alert.alert("Succesfully posted Chit!")
        this.props.navigation.navigate('Home')
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <View style={Style.pageContainer}>
        <View style={Style.chitFormContainer}>
          <View style={Style.headerContainer}>
            <Text style={Style.chitFormHeader}>
              Post a Chit
            </Text>
          </View>
          <View style={Style.chitFormContainerDetails}>
            <Text style={Style.chitFormLabel}>
              Message:
            </Text>
            <TextInput style={Style.chitFormInput}
              multiline
              numberOfLines={8}
              maxLength={141}
              placeholder='Type your message here... (Maximum 141 Characters)'
              placeholderTextColor="#c1c1c1"
              onChangeText={(text) => this.setState({ chit_content: text })} />
          </View>
          <View style={Style.btnWrapper}>
            <TouchableOpacity style={Style.postBtn}
              onPress={() => this.loadCamera()}>
              <Text style={Style.btnText} >
                <Icon color={'#333333'} size={25} name="camera-alt" />
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={Style.postBtn}
              onPress={() => this.postChit()}>
              <Text style={Style.btnText}>Post</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}
