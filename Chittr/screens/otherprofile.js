import React, { Component } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Style from '../styles/style';

export default class OtherProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      user_id: "",
      given_name: "",
      family_name: "",
      email: "",
      display_name: "",
    }
  }

  async getUserDetails() {

    const userid = await AsyncStorage.getItem('userid');
    console.log("User ID: " + userid);

    return fetch("http://10.0.2.2:3333/api/v0.0.5/user/" + userid)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          user_id: responseJson.user_id,
          given_name: responseJson.given_name,
          family_name: responseJson.family_name,
          email: responseJson.email,
          password: "",
          display_name: responseJson.given_name + " " + responseJson.family_name
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.getUserDetails();
  }

  async loadCamera() {
    this.props.navigation.navigate('Camera')
  }
  render() {
    return (
      <View style={Style.pageContainer}>

        <View style={Style.profileContainer}>

          <View>
            <Image style={Style.profileImageContainer} source={{ uri: "http://10.0.2.2:3333/api/v0.0.5/user/" + this.state.user_id + "/photo" }} />
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
          <View style={Style.profileDetailsColumn}>
            <Text style={Style.profileFormLabel}>First Name: </Text>
            <Text style={Style.profileFormLabel}>Last Name: </Text>
            <Text style={Style.profileFormLabel}>Email: </Text>
            <Text style={Style.profileFormLabel}>Password: </Text>
          </View>

          <View style={Style.profileDetailsColumn}>
            <TextInput style={Style.profileInput}
              value={this.state.given_name}
              onChangeText={(text) => this.setState({ given_name: text })} />
            <TextInput style={Style.profileInput}
              value={this.state.family_name}
              onChangeText={(text) => this.setState({ family_name: text })} />
            <TextInput style={Style.profileInput}
              value={this.state.email}
              onChangeText={(text) => this.setState({ email: text })} />
            <TextInput style={Style.profileInput}
              onChangeText={(text) => this.setState({ password: text })} />
          </View>

        </View>

        <View style={Style.btnWrapper}>
          <TouchableOpacity style={Style.profileBtn}>
            <Text style={Style.profileBtnText}
              onPress={() => this.login()}>Save Changes</Text>
          </TouchableOpacity>
        </View>

      </View>
    )
  }
}
