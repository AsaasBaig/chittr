import React, { Component } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View, AsyncStorage} from 'react-native';
import Style from '../styles/style';

export default class PostChit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      timestamp: 0,
      chit_content: "",
      location: {
        longitude: 0,
        latitude: 0
      }
    }
  }

  setTimestamp() {
    this.setState({ timestamp: Math.floor((new Date().getTime()) / 1000) })
  }
  async postChit() {
    this.setTimestamp();
    const token = await AsyncStorage.getItem('token');
    console.log(token);
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
      .then((response) => {
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
          <View>
            <Text style={Style.chitFormLabel}>
              Message:
              </Text>
            <TextInput style={Style.chitFormInput}
              multiline
              numberOfLines={6}
              maxLength={141}
              placeholder='Type your message here... (Maximum 141 Characters)'
              placeholderTextColor="#333333"
              onChangeText={(text) => this.setState({ chit_content: text })} />
          </View>
          <View style={Style.btnWrapper}>
            <TouchableOpacity style={Style.postBtn}>
              <Text style={Style.btnText} onPress={() => this.postChit()}>Post</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}
