import React, { Component } from 'react';
import { Text, View } from 'react-native';
import IntroScreen from './app/Components/IntroScreen';
import { StackNavigator} from 'react-navigation';

export default class tabexapp extends Component {
  render() {
    return (
        <IntroScreen />
      );
  }
}
