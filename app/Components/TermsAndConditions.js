import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { CheckBox } from 'react-native-elements';
import Hyperlink from 'react-native-hyperlink';
import LinearGradient from 'react-native-linear-gradient';

export default class TermsAndConditions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aggreed: props.isChecked || false,
      activeColors: ['#e3f3fd', '#e7e7e7'],
    };

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onPressHandler = this.onPressHandler.bind(this);
  }

  onChangeHandler() {
    this.setState({ aggreed: !this.state.aggreed });
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

  render() {
    const checkBoxText = <View>
        <Text style={styles.containerText}>
          To continue you must aggree to Sopharma AD
        </Text>
        <Hyperlink>
          <Text style={styles.link}>Terms of Services and Polices.</Text>
        </Hyperlink>
      </View>;
    return (
      <View style={styles.container}>
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
        <TouchableOpacity
          dissabled={this.state.aggreed}
          onPress={this.onPressHandler.bind(this)}
          >
          <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={this.state.activeColors}
          style={styles.button}>
                <Text style={styles.buttonText} >CONTINUE</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: '90%',
    height: '40%',
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
    width: '100%',
    height: '100%',
  },

  link: {
    color: '#fab120',
    textDecorationLine: 'underline',
    paddingLeft: 10,
    paddingRight: 10,
  },

  button: {
    overflow: 'hidden',
    padding: 10,
    marginTop: 20,
    marginBottom: 20,
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
