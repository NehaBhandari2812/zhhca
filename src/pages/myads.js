import React, {Component} from 'react';
import { ScrollView , Text, View } from 'react-native';
import common from '../styles/common.js';

export default class MyAds extends Component {
    render() {
        return (
            <View style={common.centerFlex}>
                <Text>Your MyAds will be appear here.</Text>
            </View>
        )
    }
}
