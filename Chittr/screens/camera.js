import React, { Component } from 'react';
import { Alert, Text, TouchableOpacity, View, } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { RNCamera } from 'react-native-camera'
import Style from '../styles/style';

export default class Camera extends Component {

   constructor(props) {
      super(props);
   }

   takePicture = async () => {
      //if camera exists
      if (this.camera) {
         //set options, get user token and then set data to be the camera picture data
         const options = { quality: 0.5, base64: true };
         const token = await AsyncStorage.getItem("token");
         const data = await this.camera.takePictureAsync(options);

         console.log("DEBUG: " + " URI, TOKEN: " + data.uri, token);

         //post photo taken to POST user profile photo endpoint using token for correct user.
         return fetch("http://10.0.2.2:3333/api/v0.0.5/user/photo", {
            method: 'POST',
            headers: {
               "Content-Type": "image/jpeg",
               "X-Authorization": token
            },
            body: data
         })
            .then((response) => {
               //Once added, navigate back to profile.
               Alert.alert("Picture Added!");
               this.props.navigation.goBack()
            })
            .catch((error) => {
               console.error(error);
            })
      }
   }
   //render camera component with reference to this.camera
   render() {
      return (
         <View style={Style.cameraContainer}>
            <RNCamera
               ref={ref => {
                  this.camera = ref;
               }}
               style={Style.cameraPreview}
            />
            <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
               <TouchableOpacity
                  onPress={this.takePicture.bind(this)}
                  style={Style.cameraCapture}>
                  <Text style={{ fontSize: 16 }}>
                     CAPTURE
                  </Text>
               </TouchableOpacity>
            </View>
         </View>
      );
   }
}
