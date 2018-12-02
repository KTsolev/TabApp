import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { CheckBox } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import TextPanel from './TextPanel';
import overallTerms from '../data/termsAndConditionsOverall';
import generalRights from '../data/generallRights';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as loc,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';

export default class TermsAndConditions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTerm: false,
      aggreed: props.isChecked || false,
      activeColors: ['#e3f3fd', '#e7e7e7'],
    };

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onPressHandler = this.onPressHandler.bind(this);
  }

  onChangeHandler() {
    this.setState({
      aggreed: !this.state.aggreed,
    });

    if (!this.state.aggreed) {
      this.setState({ activeColors: ['#009fea', '#0544a8'] });
    } else {
      this.setState({ activeColors: ['#e3f3fd', '#e7e7e7'] });
    }
  }

  onPressHandler() {
    if (this.state.aggreed) {
      this.props.onParentChangeHandler(this.state.aggreed);
    }
  }

  componentDidMount() {
    loc(this);
  }

  componentWillUnMount() {
    rol();
  }

  render() {
    console.log(generalRights);
    const checkBoxText = <View>
        <Text style={styles.containerText}>
          To continue you must aggree to Sopharma AD
        </Text>
      </View>;

    const terms = <ScrollView style={styles.scrollView}>
        <TextPanel style={{flex: 0.4}} panelText={overallTerms} />
        <TextPanel style={{flex: 0.4}} panelText={generalRights} />
        <TouchableOpacity
          onPress={() => this.setState({ showTerm: false })}>
          <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={['#009fea', '#0544a8']}
          style={styles.termsButton}>
                <Text style={styles.buttonText} >Accept</Text>
          </LinearGradient>
        </TouchableOpacity>
    </ScrollView>;

    const view =
        <LinearGradient
          style={styles.container}
          colors={['#fff', '#ddf1fc']} >
          <Text style={styles.containerTitle}>Terms and Conditions</Text>
          <CheckBox
            title={checkBoxText}
            style={styles.checkBox}
            type='font-awellsome'
            uncheckedColor='#c5c5c5'
            uncheckedIcon='square'
            checkedColor='#0643a6'
            checkedIcon='check-square'
            onPress={this.onChangeHandler.bind(this)}
            checked={this.state.aggreed}
          />
          <TouchableOpacity onPress={() => this.setState({ showTerm: true })}>
            <Text style={styles.link}>Terms of Services and Polices.</Text>
          </TouchableOpacity>
          <TouchableOpacity
            dissabled={this.state.aggreed}
            onPress={this.onPressHandler}
            >
            <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={this.state.activeColors}
            style={styles.button}>
                <Text style={styles.buttonText} >CONTINUE</Text>
            </LinearGradient>
          </TouchableOpacity>
        </LinearGradient>;
    return this.state.showTerm ? terms : view;
  }
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 20,
    paddingBottom: 20,
    textAlign: 'justify',
  },

  listText: {
    textAlign: 'justify',
    fontSize: 14,
  },

  container: {
    flex: 1,
    flexDirection: 'column',
    maxWidth: wp('90%'),
    maxHeight: hp('60%'),
    padding: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 50,
  },

  containerTitle: {
    fontSize: 22,
    textTransform: 'capitalize',
    color: '#0643a7',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
  },

  containerText: {
    fontSize: 14,
    textTransform: 'capitalize',
    color: '#0643a7',
    paddingLeft: 10,
    paddingRight: 10,
  },

  checkBox: {
    width: wp('100%'),
    height: hp('100%'),
  },

  link: {
    color: '#fab120',
    textDecorationLine: 'underline',
    paddingLeft: 10,
    paddingRight: 10,
  },

  button: {
    padding: 15,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#fff',
  },

  termsButton: {
      padding: 15,
      marginTop: 10,
      marginBottom: 30,
      borderRadius: 50,
      borderWidth: 1,
      borderColor: '#fff',
    },

  buttonText: {
    color: '#fff',
    textAlign: 'center',
    paddingRight: 50,
    paddingLeft: 50,
  },
});
