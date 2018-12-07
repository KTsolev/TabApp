import React, { Component } from 'react';
import {
  ActivityIndicator,
  AppRegistry,
  ImageBackground,
  Text,
  View,
} from 'react-native';
import styles from './styles';

export default class Spinner extends Component {
  render() {
    return (
      <ImageBackground
        style={[styles.container, styles.horizontal]}
        source={require('../../imgs/main-background.png')}>
        <ActivityIndicator size="large" color="#dbc63d" animating={true} hidesWhenStopped={this.props.hide}/>
      </ImageBackground>
    );
  }
}
