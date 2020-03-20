import React, { Component } from 'react';
import { Image, Text, FlatList, View, } from 'react-native';
import Style from '../styles/style';

export default class Followers extends Component {

   constructor(props) {
      super(props);
      this.state = {
         isLoading: true,
         //get user id of user that the follower button was clicked from
         user_id: this.props.navigation.getParam('user_id'),
         followerList: []
      }
   }

   getFollowers() {
      //get viewed user's followers list
      return fetch("http://10.0.2.2:3333/api/v0.0.5/user/" + this.state.user_id + "/followers")
         .then((response) => response.json())
         .then((responseJson) => {
            //add photo_uri for each user into the response.
            responseJson.forEach(user => {
               user.photo_uri = "http://10.0.2.2:3333/api/v0.0.5/user/" +
                  user.user_id + "/photo?timestamp=" + new Date()

            })
            //set states 
            this.setState({
               isLoading: false,
               followerList: responseJson,
            });
            console.log(responseJson)
         })
         .catch((error) => {
            console.log(error);
         });
   }

   componentDidMount() {
      //get followers once component mounts
      this.getFollowers();
   }

   //render components within flatlist and the images of the users in the list.
   _renderItem = ({ item, index }) => {
      return (
         <View style={Style.chitContainer}>
            <View style={Style.chitHeaderContainer}>
               <View>
                  <Image style={Style.chitImageContainer}
                     source={{ uri: item.photo_uri }}
                  />
               </View>
               <View style={Style.chitHeaderName}>
                  <Text style={Style.chitHeader}>{item.given_name}</Text>
                  <Text style={Style.chitHeader}>{item.family_name}</Text>
               </View>
            </View>
         </View>
      )
   }

   render() {
      return (
         <View style={Style.pageContainer}>
            <FlatList style={Style.chitList}
               data={this.state.followerList}
               renderItem={this._renderItem}
               keyExtractor={(item) => item.user_id}
               showsVerticalScrollIndicator={false}
            />
         </View>
      )
   }
}