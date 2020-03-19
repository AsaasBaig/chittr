import React, { Component } from 'react';
import { Image, Text, FlatList, View, } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Style from '../styles/style';

export default class Following extends Component {

   constructor(props) {
      super(props);
      this.state = {
         isLoading: true,
         user_id: this.props.navigation.getParam('user_id'),
         followingList: []
      }
   }

   getFollowedUsers() {

      return fetch("http://10.0.2.2:3333/api/v0.0.5/user/" + this.state.user_id + "/following")
         .then((response) => response.json())
         .then((responseJson) => {
            this.setState({
               isLoading: false,
               followingList: responseJson,
            });
         })
         .catch((error) => {
            console.log(error);
         });
   }

   componentDidMount() {
      this.getFollowedUsers();
   }

   render() {
      return (
         <View style={Style.pageContainer}>
            <FlatList style={Style.chitList}
               data={this.state.followingList}
               renderItem={({ item }) =>
                  <View style={Style.chitContainer}>
                     <View style={Style.chitHeaderContainer}>
                        <View>
                           <Image style={Style.chitImageContainer}
                              source={{ uri: "http://10.0.2.2:3333/api/v0.0.5/user/" + item.user_id + "/photo" }}
                           />
                        </View>
                        <View style={Style.chitHeaderName}>
                           <Text style={Style.chitHeader}>{item.given_name}</Text>
                           <Text style={Style.chitHeader}>{item.family_name}</Text>
                        </View>
                     </View>
                  </View>
               }
               keyExtractor={({ id }, index) => id}
               showsVerticalScrollIndicator={false}
            />
         </View>
      )
   }
}