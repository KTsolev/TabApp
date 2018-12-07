import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import { deleteUser, resetCompleted } from '../../data/FluxActions';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as loc,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';
import styles from './styles';

export default class Modal extends Component {
  componentDidMount() {
    loc(this);
  }

  componentWillUnMount() {
    rol();
  }

  render() {
		return <ImageBackground
			    style={styles.container}
          source={require('../../imgs/main-background.png')}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Hey it seems you missed quite few pills!</Text>
  			<View style={styles.rowContainer}>
  			  <TouchableOpacity
            onPress={() => {
              deleteUser();
              resetCompleted();
              this.props.hideModal();
            }}

            style={[styles.button, { width: '55%' }]}>
            <Text style={[styles.buttonText, { color: '#b02352' }]}>Do you want to reset your treatment?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.props.hideModal();
            }}

            style={[styles.button, { width: '35%' }]}>
            <Text style={[styles.buttonText, { color: '#2367b0' }]}>Take pill now!</Text>
          </TouchableOpacity>
  			</View>
      </View>
		</ImageBackground>;
  }
}
