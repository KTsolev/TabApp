import React, { Component } from 'react';
import {
  ActivityIndicator,
  AppRegistry,
  StyleSheet,
  ImageBackground,
  Text,
  View,
} from 'react-native';

export default class Spinner extends Component {
  render() {
    return (
      <ImageBackground
        style={[styles.container, styles.horizontal]}
        source={require('../imgs/background.png')}>
        <ActivityIndicator size="large" color="#dbc63d" animating={true} hidesWhenStopped={this.props.hide}/>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
