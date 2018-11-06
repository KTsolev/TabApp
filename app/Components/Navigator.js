import React, { Component } from 'react';
import { Text, Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import Home from './Home';
import CalendarTracking from './CalendarTracking';
import ProgressScreen from './Progress';
import Global from './Global';
import Tips from './Tips';

const MainNavigator = createBottomTabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor }) => (<Image
              style={{ width: 30, height: 30 }}
              source={require('../imgs/home.png')}/>),
    },
  },

  Calendar: {
    screen: CalendarTracking,
    navigationOptions: {
      tabBarLabel: 'Calendar',
      tabBarIcon: ({ tintColor }) => (<Image
              style={{ width: 30, height: 30 }}
              source={require('../imgs/calendar.png')}/>),
    },
  },

  Progress: {
    screen: ProgressScreen,
    navigationOptions: {
      tabBarLabel: 'Progress',
      tabBarIcon: ({ tintColor }) =>(<Image
            style={{ width: 30, height: 30 }}
            source={require('../imgs/progress.png')}/>),
    },
  },

  Global: {
    screen: Global,
    navigationOptions: {
      tabBarLabel: 'Community',
      tabBarIcon: ({ tintColor }) => (<Image
            style={{ width: 30, height: 30 }}
            source={require('../imgs/community.png')}/>),
    },
  },

  Tips: {
    screen: Tips,
    navigationOptions: {
      tabBarLabel: 'Tips',
      tabBarIcon: ({ tintColor }) => (<Image
              style={{ width: 30, height: 30 }}
              source={require('../imgs/tips.png')}/>),
    },
  },
}, {
  initialRoueName: 'Home',
  navigationOptions: {
    textBarVisible: false,
  },
  tabBarOptions: {
    showLabel: false,
    activeTintColor: '#fff',
    inactiveTintColor: '#fff',
    animationEnabled: true,
    lazy: false,
    activeBackgroundColor: '#0187e6',
    inactiveBackgroundColor: '#0648aa',
  },
});

export default MainNavigator;
