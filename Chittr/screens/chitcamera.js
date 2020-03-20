import React, { Component } from 'react';
import { Alert, Text, TouchableOpacity, View, } from 'react-native';
import { RNCamera } from 'react-native-camera'
import Style from '../styles/style';

export default class ChitCamera extends Component {

   constructor(props) {
      super(props);
   }

   takePicture = async () => {
      //if camera exists
      if (this.camera) {
         //set options and get data from camera.
         const options = { quality: 0.5, base64: true };
         const data = await this.camera.takePictureAsync(options);

         console.log(data.uri);
         Alert.alert("Picture Added!");
         //send chit photo data back to previous screen to then handle upload to server.
         this.props.navigation.state.params.handlePhoto(data);
         this.props.navigation.goBack()
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
