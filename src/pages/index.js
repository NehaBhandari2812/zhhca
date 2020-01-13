import React, { Component } from 'react';
import { View, Text, Image} from 'react-native';
import BottomNavigation, {FullTab} from 'react-native-material-bottom-navigation'
import Icon from 'react-native-vector-icons/FontAwesome';

import Home from './home.js';
import Chat from './chat.js';
import Sell from './sell.js';
import MyAds from './myads.js';
import Account from './account.js';

export default class App extends Component {
    tabs = [
      {
        key: 'home',
        page: <Home />,
        icon: 'home',
        label: 'HOME',
        barColor: '#e23439',
        pressColor: 'rgba(255, 255, 255, 0.16)'
      },
      {
        key: 'chat',
        page: <Chat />,
        icon: 'comments',
        label: 'CHATS',
        barColor: '#B71C1C',
        pressColor: 'rgba(255, 255, 255, 0.16)'
      },
      {
        key: 'sell',
        page: <Sell />,
        icon: 'camera',
        label: 'SELL',
        barColor: '#E64A19',
        pressColor: 'rgba(255, 255, 255, 0.16)'
      },
      {
        key: 'myads',
        page: <MyAds />,
        icon: 'list',
        label: 'MY ADS',
        barColor: '#664F19',
        pressColor: 'rgba(255, 255, 255, 0.16)'
      },
      {
        key: 'account',
        page: <Account />,
        icon: 'user-circle-o',
        label: 'ACCOUNT',
        barColor: '#F64C19',
        pressColor: 'rgba(255, 255, 255, 0.16)'
      }
    ]
   
    state = {
      activeTab: 'home',
      activePage: <Home />
    }

    renderPage = (tabKey, tabPage) => {
      this.setState({ activeTab: tabKey })
      this.setState({ activePage: tabPage }) 
    }

    renderIcon = icon => ({ isActive }) => (
      <Icon name={icon} size={25} color="#fff" />      
    )
   
    renderTab = ({ tab, isActive }) => (
      <FullTab
        isActive={isActive}
        key={tab.key}
        label={tab.label}
        renderIcon={this.renderIcon(tab.icon)}
      />
    )
   
    render() {
      return (
        <View style={{ flex: 1 }}>
          {this.state.activePage}
          <BottomNavigation
            activeTab={this.state.activeTab}
            onTabPress={newTab => this.renderPage(newTab.key, newTab.page)}
            renderTab={this.renderTab}
            tabs={this.tabs}
          />
        </View>
      )
    }
  }
  