import React, { Component } from 'react';
import { AppRegistry} from 'react-native';
import Routes from './src/Routes.js';
import SplashScreen from './src/components/SplashScreen.js'

console.disableYellowBox = true;//hide warnings from simulator 

class MyApp extends Component{  
  
  constructor(){
    super();
    // Creating Global Variable.
    global.apiUrl = 'http://abitdemo.in:50005/';
 
  }

  componentWillMount() {
    this.state = {
        view : <SplashScreen />
    };

    setTimeout(() => {
        if(true) {
            this.setState({
                view : <Routes />
            })
        } else {
            this.setState({
                view : <Error/>
            })
        }
    }, 3000) //TIME OF WAITING


}


  render() {
    return (
      this.state.view
    );
  }
}

export default MyApp
AppRegistry.registerComponent('MyApp', () => MyApp) 


