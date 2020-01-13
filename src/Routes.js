import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import Login from './pages/login.js';
import Index from './pages/index.js';
import Terms from './pages/terms.js';



const Routes = () => (
   <Router>
      <Scene key = "root">
            <Scene key = "Login" component = {Login} title = "Login"  initial ={true} hideNavBar={true} />
            <Scene key = "Index" component = {Index} title = "Index"  hideNavBar={true} />
         	<Scene key = "Terms" component = {Terms} title = "Terms and Conditions" />
      </Scene>
   </Router>
)
export default Routes

  