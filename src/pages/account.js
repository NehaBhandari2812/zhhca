import React, {Component} from 'react';
import { ScrollView , Text, View, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

import common from '../styles/common.js';

export default class Account extends Component {
    render() {
        return (
            <View style={common.centerFlex}>
                <TouchableOpacity
                onPress={Actions.Login}
                style={{backgroundColor:'#e93324',borderRadius:10}}
                >
                    <Text style={{color:'#fff',fontWeight:'700',fontSize:16,margin:5}}>Logout</Text>
                </TouchableOpacity>
                <Text>Your Account will be appear here.</Text>
            </View>
        )
    }
}
