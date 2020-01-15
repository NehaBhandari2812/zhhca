"use strict";

import React, { Component } from 'react';
import { TouchableOpacity, Text, View, ScrollView, TextInput, Image, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
import Toast from 'react-native-simple-toast';
import Icon from 'react-native-vector-icons/FontAwesome';

const FBSDK = require('react-native-fbsdk');
const {LoginManager, AccessToken} = FBSDK;

import common from '../styles/common.js';

const Width = Dimensions.get('window').width;

class Login extends Component {

  componentWillMount() {
    this.state = {
      screen: 'login',//login,enterMobile,enterOtp
      enterMobile:'',
      enterEmail:'',
      enterOtp:'',
      sendOtp:'',
      loginType:'',//mobile,email
    };

    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      webClientId: '1057532468266-hncjene7hb71otte08f216nk8n9ne7ad.apps.googleusercontent.com',
    });
  }


 _fbAuth = () => {
    LoginManager.logInWithPermissions(['public_profile','email','user_mobile_phone']).then(
      function(result) {
        if (result.isCancelled) {
          Toast.show('Login was cancelled');
        } else {
          AccessToken.getCurrentAccessToken().then((data) => {
            const { accessToken } = data;
            fetch('https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' + accessToken)
              .then((response) => response.json())
              .then((json) => {

                  var myArray = [{
                    facebook_id:json.id,
                    goolge_id:'',
                    name:json.name,
                    email:json.email,
                    mobile:'',
                    login_by:'facebook',
                    otp:'',
                    status:1,
                    login_status:1,
                  }]

                  fetch(global.apiUrl+'user', {
                      method: 'POST',
                      headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify(myArray),
                    })
                    .then((response) => response.json())
                    .then((json) => {
                      if(json.status == '1'){
                          //var user_id = json.data;
                          Actions.Index();
                      }else{
                        Toast.show(json.error);
                      }
                      // console.log(json);
                    })
                    .catch(function(error) {
                      Toast.show("Server is Not Responding, Please try later");
                      console.log('There has been a problem with your fetch operation: ' + error.message);
                      throw error;
                    });
              })
              .catch(function(error) {
                Toast.show("Server is Not Responding, Please try later");
                console.log('There has been a problem with your fetch operation: ' + error.message);
                  throw error;
                });
          })
        }
      },
      function(error) {
        Toast.show('Login failed with error: ' + error);
      }
    );
  }

  googleAuth = async () => 
  {
      // Actions.Google();
      try {
        await GoogleSignin.hasPlayServices({
          showPlayServicesUpdateDialog: true,
        });

        const json = await GoogleSignin.signIn();
        console.log('User Info --> ', json);
        var myArray = [{
          facebook_id:'',
          goolge_id:json.user.id,
          name:json.user.name,
          email:json.user.email,
          mobile:'',
          login_by:'google',
          otp:'',
          status:1,
          login_status:1,
        }]

        fetch(global.apiUrl+'user', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(myArray),
          })
          .then((response) => response.json())
          .then((json) => {
            if(json.status == '1'){
              Toast.show("Logged success");
                // var user_id = json.data;
                Actions.Index();
            }else{
              Toast.show(json.error);
            }
            // console.log(json);
          })
          .catch(function(error) {
            Toast.show("Server is Not Responding, Please try later");
            console.log('There has been a problem with your fetch operation: ' + error.message);
            throw error;
          });

      } catch (error) {
          // Toast.show('Message: '+error.message);
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            Toast.show('User Cancelled the Login Flow');
          } else if (error.code === statusCodes.IN_PROGRESS) {
            Toast.show('Signing In');
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            Toast.show('Play Services Not Available or Outdated');
          } else {
            Toast.show('Some Other Error Happened');
          }
      }


  }
  
  sendOtp = (type) => 
  {
      if(type == 'mobile')
      {
          if(this.state.enterMobile != '' && parseInt(this.state.enterMobile.length) == 10)
          {
              fetch(global.apiUrl+'/user/sendOtp/'+this.state.enterMobile)
                .then((response) => response.json())
                .then((json) => {
                    if(json.status == '1'){
                        this.setState({sendOtp : json.data});
                        this.setState({loginType : 'mobile'});
                        this.setState({screen : 'enterOtp'});
                    }else{
                      Toast.show(json.error);
                    }
                    // console.log(json);
                })
                .catch(function(error) {
                  Toast.show("Server is Not Responding, Please try later");
                  console.log('There has been a problem with your fetch operation: ' + error.message);
                  throw error;
                });
          }else{
            Toast.show("Please Enter 10 digit Mobile No.");
          }
      }else{
          if(this.state.enterEmail != '')
          {
              fetch(global.apiUrl+'user/sendEmailOtp/'+this.state.enterEmail)
                .then((response) => response.json())
                .then((json) => {
                  if(json.status == '1'){
                      this.setState({sendOtp : json.data});
                      this.setState({loginType : 'email'});
                      this.setState({screen : 'enterOtp'});
                  }else{
                    Toast.show(json.error);
                  }
                  // console.log(json);
                })
                .catch(function(error) {
                  Toast.show("Server is Not Responding, Please try later");
                  console.log('There has been a problem with your fetch operation: ' + error.message);
                  throw error;
                });
          }else{
            Toast.show("Please Enter Valid Email Id");
          }
      }
  }

  otpAuth = () => 
  {
      if(this.state.enterOtp == this.state.sendOtp )
      {
        var myArray = [{
          facebook_id:'',
          goolge_id:'',
          name:'',
          email: this.state.enterEmail,
          mobile: this.state.enterMobile,
          login_by: this.state.loginType,
          otp: this.state.sendOtp,
          status:1,
          login_status:1,
        }]

        fetch(global.apiUrl+'/user', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(myArray),
          })
          .then((response) => response.json())
          .then((json) => {
            if(json.status == '1'){
                //var user_id = json.data;
                Actions.Index();
            }else{
              Toast.show(json.error);
            }
            // console.log(json);
          })
          .catch(function(error) {
            Toast.show("Server is Not Responding, Please try later");
            console.log('There has been a problem with your fetch operation: ' + error.message);
            throw error;
          });
      }else{
        Toast.show("Please Enter Valid OTP");
      }
  }

  goToTerms = () => {
    Actions.Terms()
  }

  _renderLoginScreen(){
      switch(this.state.screen)
      {
          case 'login':
              return (
                <View>
                    <TouchableOpacity 
                    onPress = {() =>this._fbAuth()}
                      >
                        <View style={[styles.buttonContain,styles.fbButton]}>
                          <Text style={[styles.externalLogo]}>
                            <Image  style={[styles.logoImg]} source={require('../images/icon/fb.png')}/>
                          </Text>
                          <Text style = {[styles.buttonText,styles.fbText]}> CONTINUE WITH FACEBOOK </Text>
                      </View>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                  onPress = {() =>this.googleAuth()}
                  >
                        <View style={[styles.buttonContain,styles.googleButton]}>
                          <Text style={[styles.externalLogo]}>
                            <Image  style={[styles.logoImg]} source={require('../images/icon/google.png')}/>
                          </Text>
                          <Text style = {[styles.buttonText,styles.googleText]}> CONTINUE WITH GOOGLE </Text>
                      </View>
                  </TouchableOpacity>
    
                  <TouchableOpacity
                  onPress = {() =>this.setState({screen :'enterMobile'}) }
                  >
                        <View style={[styles.buttonContain,styles.mobileButton]}>
                          <Text style={[styles.externalLogo]}>
                            <Image  style={[styles.logoImg]} source={require('../images/icon/mobile.png')}/>
                          </Text>
                          <Text style = {[styles.buttonText,styles.mobileText]}> CONTINUE WITH PHONE </Text>
                      </View>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                  onPress = {() =>this.setState({screen :'enterEmail'}) }
                  >
                        <View style={[styles.buttonContain,styles.emailButton]}>
                          <Text style={[styles.externalLogo]}>
                            <Image  style={[styles.logoImg]} source={require('../images/icon/email.png')}/>
                          </Text>
                          <Text style = {[styles.buttonText,styles.emailText]}> CONTINUE WITH EMAIL </Text>
                      </View>
                  </TouchableOpacity>

              </View>
              );
            break;
          case 'enterMobile':
                return(
                  <View>
                      <View style={styles.confirmSaction}>
                          <Text style={styles.title}>Enter Your Phone Number</Text>
                          <Text />
                          <Text style={styles.subtitle}>We will send a Confirmation</Text>
                          <Text style={styles.subtitle}> Code to Your Phone</Text>
                          <Text />
                      </View>
                      <View style={[styles.inputContent,styles.googleButton]}>
                          <Icon style={{margin:5}} name="mobile" size={25} color="#ccc" />   
                          <TextInput placeholder="Enter Your Phone"
                          onChangeText={(enterMobile) => this.setState({enterMobile: enterMobile})}
                          value={this.state.enterMobile}
                          />
                      </View>
                      
                      <TouchableOpacity
                      onPress = {() =>this.sendOtp('mobile')}
                      >
                            <View style={[styles.submitButton]}>
                              <Text style = {[styles.submitText]}> NEXT </Text>
                            </View>
                      </TouchableOpacity>

                      <Text />
                    <TouchableOpacity
                      onPress = {() =>this.setState({screen :'login'}) }
                      >
                            <Text style={styles.subtitle,common.danger}><Icon name="long-arrow-left" size={14} />  Back To Login</Text>
                      </TouchableOpacity>
                  </View>
                );
            break;
            case 'enterEmail':
                return(
                  <View>
                      <View style={styles.confirmSaction}>
                          <Text style={styles.title}>Enter Your Email Id</Text>
                          <Text />
                          <Text style={styles.subtitle}>We will send a Confirmation</Text>
                          <Text style={styles.subtitle}> Code to Your Email</Text>
                          <Text />
                      </View>
                      <View style={[styles.inputContent,styles.googleButton]}>
                          <Icon style={{margin:5}} name="envelope" size={25} color="#ccc" />   
                          <TextInput placeholder="Enter Your Email"
                          onChangeText={(enterEmail) => this.setState({enterEmail: enterEmail})}
                          value={this.state.enterEmail}
                          />
                      </View>
                      
                      <TouchableOpacity
                      onPress = {() =>this.sendOtp('email')}
                      >
                            <View style={[styles.submitButton]}>
                              <Text style = {[styles.submitText]}> NEXT </Text>
                            </View>
                      </TouchableOpacity>

                      <Text />
                    <TouchableOpacity
                      onPress = {() =>this.setState({screen :'login'}) }
                      >
                            <Text style={styles.subtitle,common.danger}><Icon name="long-arrow-left" size={14} /> Back To Login</Text>
                      </TouchableOpacity>
                  </View>
                );
            break;
            case 'enterOtp':
              return(
                <View>
                    <View style={styles.confirmSaction}>
                        <Text style={styles.title}>Enter Confirmation Code</Text>
                        <Text />
                        <Text style={styles.subtitle}>We Sent You a 6-Digit Confirmation</Text>
                        <Text style={styles.subtitle}> Code On <Text style={common.bold}>{(this.state.loginType == 'mobile')?this.state.enterMobile:this.state.enterEmail}</Text></Text>
                        <Text />
                    </View>
                    <View style={[styles.inputContent,styles.googleButton]}>
                        <Icon style={{margin:5}} name="lock" size={25} color="#ccc" />   
                        <TextInput placeholder="Enter 6 Digit OTP"
                        onChangeText={(enterOtp) => this.setState({enterOtp: enterOtp})}
                        value={this.state.enterOtp}
                        />
                    </View>
                    
                    <TouchableOpacity
                    onPress = {() =>this.otpAuth()}
                    >
                          <View style={[styles.submitButton]}>
                            <Text style = {[styles.submitText]}> LOGIN </Text>
                          </View>
                    </TouchableOpacity>

                    <Text />
                    <TouchableOpacity
                      onPress = {() =>this.sendOtp(this.state.loginType)}
                      >
                            <Text style={styles.subtitle,common.danger}>Resend Confirmation Code</Text>
                      </TouchableOpacity>

                </View>
              );
          break;
          default:
            return null;
      }
  }

  render() {
     return (  
            <View style = {styles.container}>
                <View style={styles.logoContainer}>
                    <Image  style={styles.logo} source={require('../images/icon/logo.png')}/>
                </View>

              <Image  style={styles.separator}
          			source={require('../images/icon/separator.png')}/>
              
              {this._renderLoginScreen()}
              

              <Text style = {styles.termsTest}> 
                    IF You Continue Your are accepting
              </Text>

              <TouchableOpacity
                  style = {styles.termsButton}
                  onPress = {
                    () => this.goToTerms()
                  } 
                  >
                  <Text style = {styles.termsText}> 
                    <Text style = {styles.boldText}>Zhhca Terms and Conditions and Privacy Policy </Text>
                  </Text>
                  
              </TouchableOpacity>
              <View style={[styles.hr,common.sactionWidth]} />
            </View>
     )
  }
}

export default Login


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hr :{
    height:3,
    borderBottomColor:'#848484',
    borderBottomWidth:1,
  },
  logoContainer : {
    justifyContent:'flex-end',
    alignItems: 'center'
  },
  logo: {
    width:200,
    height: 200
  },
  separator:{
    height:1,
    width:300,
    alignItems: 'center',
    marginBottom:35,
    marginTop:35
  },
  buttonContain: {
    backgroundColor: '#fff',
    borderRadius:5,
    borderWidth:1,
    height: 50,
    width:Width - 80,
    flexDirection:'row',
    textAlignVertical: 'center',
    alignItems: 'center',
    flexWrap:'wrap',
    marginBottom:15,
  },
  inputContent: {
    backgroundColor: '#fff',
    borderRadius:5,
    borderWidth:1,
    height: 50,
    width:Width - 80,
    flexDirection:'row',
    justifyContent:'flex-start',
    alignContent:'center',
    textAlignVertical: 'center',
    alignItems: 'center',
    flexWrap:'wrap',
    marginBottom:15,
  },
  submitButton:{
    backgroundColor:'#e93324',
    borderRadius:5,
    height: 50,
    width:Width - 80,
    justifyContent:'center',
    alignContent:'center',
    alignItems: 'center',
  },
  submitText:{
    fontSize:16,
    color:'#fff',
    fontWeight:'bold',
  },
  externalLogo: {
    width:40,
    height:40,
    flexDirection:'row',
    flexWrap:'wrap', 
    marginLeft:16,
    marginTop:30,
    alignItems: 'center',
    textAlignVertical: 'center',
    flexDirection:'row',
    flexWrap:'wrap',

  },
  logoImg: {
    width:25,
    height:25,
    borderRadius:5,
  },
  buttonText: {
    fontSize: 14,
    textAlignVertical: 'center',
    alignItems: 'center',
    textAlignVertical: 'center',
    flexWrap:'wrap',
    height:40,
  },
  fbButton:{
    borderColor:'#3b5998',
  },
  fbText:{
    color: '#3b5998'
 },
 googleButton:{
    borderColor:'#e93324',
  },
  googleText:{
    color: '#e93324'
  },
 mobileButton:{
  borderColor:'#42a201',
  },
  mobileText:{
    color: '#42a201'
  },
  emailButton:{
    borderColor:'#848484',
  },
  emailText:{
    color: '#848484'
  },
  termsText: {
    color: '#848484',
    justifyContent: 'center',
    alignSelf: "center",
    alignItems: "center",
    fontSize:12
  },
  boldText: {
    fontWeight: 'bold',
    justifyContent: 'center',
    alignSelf: "center",
    alignItems: "center",
    fontSize:12,
  },
  termsTest: {
    color: '#848484',
    justifyContent: 'center',
    alignSelf: "center",
    alignItems: "center",
    marginTop:20
  },
  confirmSaction:{
    flexDirection:'column',
    justifyContent:'center',
    alignContent:'center',
    alignItems:'center',
  },
  title:{
    fontWeight:'700',
    fontSize:18,
  },
  subtitle:{
    fontWeight:'normal',
    fontSize:14,
    alignSelf:'center',
  },

});
