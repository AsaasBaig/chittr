import React, { Component } from 'react';
import { Text, TouchableOpacity, View, AsyncStorage, Alert } from 'react-native';
import { RNCamera } from 'react-native-camera'
import Style from '../styles/style';

export default class Camera extends Component {

   constructor(props) {
      super(props);
   }

   takePicture = async() => {
      if(this.camera) {
         const options = {quality: 0.5, base64: true};
         const token = await AsyncStorage.getItem("token");
         const data = await this.camera.takePictureAsync(options);

         console.log(data.uri, token);

         return fetch("http://10.0.2.2:3333/api/v0.0.5/user/photo",{
            method: 'POST',
            headers: {
               "Content-Type": "image/jpeg",
               "X-Authorization": token
            },
            body: data
         })
         .then((response) =>{
            Alert.alert("Picture Added!");
            this.props.navigation.navigate('Profile')
         })
         .catch((error) =>{
            console.error(error);
         })
      }
   }

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
  