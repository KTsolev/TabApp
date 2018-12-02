import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import { deleteUser, resetCompleted } from '../data/FluxActions';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as loc,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';

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
          source={require('../imgs/main-background.png')}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: 18,
    color: '#b05423',
    padding: 10,
  },

  button: {
    margin: 5,
    padding: 5,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#1a4266',
  },

  buttonText: {
    fontSize: 14,
    padding: 5,
  },

  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    maxHeight: hp('35%'),
    maxWidth: wp('95%'),
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#1a4266',
  },

  rowContainer: {
    justifyContent: 'space-around',
    alignItems: 'stretch',
    flexDirection: 'row',
    paddingTop: 20,
    paddingBottom: 20,
  },
});
