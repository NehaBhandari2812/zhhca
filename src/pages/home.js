import React, { Component } from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Col from "../components/Col.js";
import Row from "../components/Col.js";
import Grid from "../components/Grid.js";
import common from '../styles/common.js';
import homeStyle from '../styles/home.js';

export default class Home extends Component {
    render() {
      return (
        <ScrollView style={common.container}>

            <View style={[common.centerFlex,common.theme,common.fullWidth,{height:170}]}>
                <View style={{height:30}}></View>
                <View style={{height:50}}>
                    <View style={[common.spaceFlex,common.theme,common.sactionWidth]}>
                        <TouchableOpacity style={[common.inline]}>
                          <Icon name="map-marker" size={25} color="#fff" />   
                          <Text style={common.themeText}> Current Location</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Icon name="bell" size={25} color="#fff" />
                        </TouchableOpacity>
                    </View>
                  </View>
                <View style={{height:50}}>
                    <View style={[common.theme,common.sactionWidth,homeStyle.serchbar]}>
                        <Icon style={{margin:5}} name="search" size={25} color="#ccc" />   
                        <TextInput
                            style = {common.sactionWidth} 
                            placeholder="Find Car, Mobile Phones and More..."/>
                      </View>
                </View>
            </View>

            <View style={[common.centerFlex,common.fullWidth,{backgroundColor:'#fff'}]}>
                  <View style={{height:30}}></View>
                  <View style={[common.spaceFlex,common.sactionWidth]}>
                      <Text style={homeStyle.sactionTitle}> Browse Categories</Text>
                      <TouchableOpacity>
                        <Text style={[homeStyle.sactionTitle,{color:'#e23439'}]}>View All</Text>
                      </TouchableOpacity>
                  </View>
                  <View style={{height:15}}></View>
                <View style={[common.sactionWidth]}>  
                    <Grid style={common.spaceFlex} >
                          <Col style={[homeStyle.gridCol]}>
                              <TouchableOpacity style={[homeStyle.catItem]}>
                                  <Image  resizeMode={'cover'}
                                      style={{ width: 70, height: 70 }} source={require("../images/category/appliences.png")} />
                                    <Text>Appliences</Text>
                              </TouchableOpacity>
                          </Col>
                          <Col style={[homeStyle.gridCol]}>
                              <TouchableOpacity style={[homeStyle.catItem]}>
                                  <Image  resizeMode={'cover'}
                                      style={{ width: 70, height: 70 }} source={require("../images/category/health.png")} />
                                    <Text>Health</Text>
                              </TouchableOpacity>
                          </Col>
                          <Col style={[homeStyle.gridCol]}>
                              <TouchableOpacity style={[homeStyle.catItem]}>
                                  <Image  resizeMode={'cover'}
                                      style={{ width: 70, height: 70 }} source={require("../images/category/education.png")} />
                                    <Text>Education</Text>
                              </TouchableOpacity>
                          </Col>
                    </Grid>
                    <Grid style={common.spaceFlex, homeStyle.gridItem} >
                          <Col style={[homeStyle.gridCol]}>
                              <TouchableOpacity style={[homeStyle.catItem]}>
                                  <Image  resizeMode={'cover'}
                                      style={{ width: 70, height: 70 }} source={require("../images/category/business.png")} />
                                    <Text>Business</Text>
                              </TouchableOpacity>
                          </Col>
                          <Col style={[homeStyle.gridCol]}>
                              <TouchableOpacity style={[homeStyle.catItem]}>
                                  <Image  resizeMode={'cover'}
                                      style={{ width: 70, height: 70 }} source={require("../images/category/automobiles.png")} />
                                    <Text>Automobiles</Text>
                              </TouchableOpacity>
                          </Col>
                          <Col style={[homeStyle.gridCol]}>
                              <TouchableOpacity style={[homeStyle.catItem]}>
                                  <Image  resizeMode={'cover'}
                                      style={{ width: 70, height: 70 }} source={require("../images/category/clothing.png")} />
                                    <Text>Clothing</Text>
                              </TouchableOpacity>
                          </Col>
                    </Grid>
                    <Grid style={common.spaceFlex, homeStyle.gridItem} >
                          <Col style={[homeStyle.gridCol]}>
                              <TouchableOpacity style={[homeStyle.catItem]}>
                                  <Image  resizeMode={'cover'}
                                      style={{ width: 70, height: 70 }} source={require("../images/category/electronics.png")} />
                                    <Text>Electronics</Text>
                              </TouchableOpacity>
                          </Col>
                          <Col style={[homeStyle.gridCol]}>
                              <TouchableOpacity style={[homeStyle.catItem]}>
                                  <Image  resizeMode={'cover'}
                                      style={{ width: 70, height: 70 }} source={require("../images/category/furniture.png")} />
                                    <Text>Furniture</Text>
                              </TouchableOpacity>
                          </Col>
                          <Col style={[homeStyle.gridCol]}>
                              <TouchableOpacity style={[homeStyle.catItem]}>
                                  <Image  resizeMode={'cover'}
                                      style={{ width: 70, height: 70 }} source={require("../images/category/jobs.png")} />
                                    <Text>Jobs</Text>
                              </TouchableOpacity>
                          </Col>
                    </Grid>
                  </View>
              </View>

              <View style={[common.centerFlex,common.fullWidth,{backgroundColor:'#fff'}]}>
                  <View style={{height:30}}></View>
                  <View style={[common.spaceFlex,common.sactionWidth]}>
                      <Text style={homeStyle.sactionTitle}> Recommendations For You</Text>
                  </View>
                  <View style={{height:15}}></View>
                  <View style={[common.sactionWidth]}>  
                        <Grid>
                              <Col style={[homeStyle.gridCol]}>
                                  <View style={[homeStyle.centerFlex,homeStyle.catItem]}>
                                        <View>
                                            <Image style={{ width: 100, height: 80 }} source={require("../images/products/computer.jpeg")} />
                                        </View>
                                        <View style={{height:10}}></View>
                                        <View >
                                            <Text style={homeStyle.sactionTitle}>Rs.1200 </Text>
                                            <Text numberOfLines={1}> #Flat on Sale# In Hiinganghat District:- indore </Text>
                                        </View>
                                        <View style={homeStyle.productBtn}>
                                            <TouchableOpacity>
                                                <Icon name="comments-o" size={20} color="#000" />
                                            </TouchableOpacity>
                                            <TouchableOpacity>
                                                <Icon name="share-alt" size={20} color="#000" />
                                            </TouchableOpacity> 
                                            <TouchableOpacity>
                                                <Icon name="heart-o" size={20} color="#000" />
                                            </TouchableOpacity>
                                        </View>
                                  </View>
                                </Col>
                                <Col style={[homeStyle.gridCol]}>
                                  <View style={[homeStyle.centerFlex,homeStyle.catItem]}>
                                        <View>
                                            <Image style={{ width: 100, height: 80 }} source={require("../images/products/computer.jpeg")} />
                                        </View>
                                        <View style={{height:10}}></View>
                                        <View >
                                            <Text style={homeStyle.sactionTitle}>Rs.1200 </Text>
                                            <Text numberOfLines={1}> #Flat on Sale# In Hiinganghat District:- indore </Text>
                                        </View>
                                        <View style={homeStyle.productBtn}>
                                            <TouchableOpacity>
                                                <Icon name="comments-o" size={20} color="#000" />
                                            </TouchableOpacity>
                                            <TouchableOpacity>
                                                <Icon name="share-alt" size={20} color="#000" />
                                            </TouchableOpacity> 
                                            <TouchableOpacity>
                                                <Icon name="heart-o" size={20} color="#000" />
                                            </TouchableOpacity>
                                        </View>
                                  </View>
                                </Col>
                              </Grid>
                        

                  </View>
              </View>

        </ScrollView>
      )
    }
  }
  