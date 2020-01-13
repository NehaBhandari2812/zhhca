import React, { Component } from 'react'; 
import Routes from './Routes.js' 
import { AppRegistry, SectionList, StyleSheet, Text, View ,Image,ImageBackground} from 'react-native';  
  
export default class SplashScreen extends Component { 
    
    render() {    
        return (
          <View style={styles.container}>
            <Image  style={{width:310, height: 310}}
          			source={require('./images/logo_white.png')}/>
          </View>
          );
        return (
        <Routes/>
        )
       }
}  

  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e93324',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
// skip this line if using Create React Native App  
AppRegistry.registerComponent('AwesomeProject', () => SplashScreen);
