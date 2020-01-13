import React, { Component } from 'react';
import Routes from '../Routes.js' 
import { AppRegistry, Dimensions, StyleSheet, View ,Image} from 'react-native';  
  
const Width = Dimensions.get("window").width;
const Hidth = Dimensions.get("window").height;

class SplashScreen extends Component { 
    
    render() {    
        return (
          <View style={styles.container}>
            <Image  style={{width:"70%", height: 200}}
          			source={require('../images/icon/logo_white.png')}/>
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
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E23439',
    width:Width,
  },
});

export default SplashScreen
// skip this line if using Create React Native App  
AppRegistry.registerComponent('SplashScreen', () => SplashScreen);
