import React, { Component } from 'react';
import { Alert, Text, FlatList, TouchableOpacity, View, } from 'react-native';
import Style from '../styles/style';
import { Header } from 'react-native/Libraries/NewAppScreen';

export default class Home extends Component {

    constructor(props){
        super(props);
        this.state ={
          isLoading: true,
          chitList: []
        }
       }
      
    async getHomeChits(){
    return fetch("http://10.0.2.2:3333/api/v0.0.5/chits?")
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                isLoading: false,
                chitList: responseJson,
            });
        })
        .catch((error) =>{
            console.log(error);
        });
    }

    componentDidMount(){
        this.getHomeChits();
    }

    render() {
        return (
            <View style={Style.pageContainer}>

                <View style={Style.headerContainer}>
                    <View>
                        <FlatList
                            data={this.state.chitList}
                            renderItem={({ item }) =>
                                <View>
                                    <Text>{item.chit_content}</Text>
                                </View>
                            }
                            keyExtractor={({ id }, index) => id}
                        />
                    </View>
                </View>
            </View>
        )
    }
}
