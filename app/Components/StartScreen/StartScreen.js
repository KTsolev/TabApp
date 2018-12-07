import React, { Component } from 'react';
import { Text, View, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { CheckBox, Button } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as loc,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';
import styles from './styles';

export default class TermsAndConditions extends Component {
  componentDidMount() {
    loc(this);
  }

  componentWillUnMount() {
    rol();
  }

  render() {
    return (
      <LinearGradient
        style={styles.container}
        colors={['#fff', '#ddf1fc']}>
          <View style={styles.imageHolder}>
            <Image
              style={styles.rightImage}
              resizeMode='contain'
              source={require('../../imgs/left-leaf.png')}/>
            <Image
              style={styles.leftImage}
              resizeMode='contain'
              source={require('../../imgs/right-leaf.png')}/>
          </View>
          <Text style={styles.containerTitle}>QUIT</Text>
          <Text style={styles.containerText}>in less than a month!</Text>
          <TouchableOpacity onPress={this.props.parentStepsHandler}>
            <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={['#009fea', '#0544a8']}
            style={styles.button}>
                  <Text style={styles.buttonText}>START</Text>
            </LinearGradient>
          </TouchableOpacity>
      </LinearGradient>
    );
  }
}
