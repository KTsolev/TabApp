import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

class Step extends Component {
  state = {};

  render() {
    return (
      <View style={styles.containerInner}>
      <ImageBackground
        style={styles.innerBackgroundImage}
        source={require('../imgs/shape-1.png')}>
          <Text style={styles.containerTitle}>
            {this.props.children}
          </Text>
          <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={['#009fea', '#0544a8']}
          style={styles.button}>
            <TouchableOpacity
              dissabled={this.props.last}
              onPress={this.props.nextStep}>
              <Text style={styles.buttonText}>{this.props.label}</Text>
            </TouchableOpacity>
          </LinearGradient>
        </ImageBackground>
      </View>);
  }
}

class Wizzard extends Component {
  static Step = (props) => <Step {...props}/>;

  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      label: 'NEXT',
      isLast: false,
      isCompleted: false,
    };

    this._nextStep = this._nextStep.bind(this);
  }

  _nextStep() {
    if (this.state.index !== this.props.children.length - 1) {
      this.setState(prevState => ({
        index: prevState.index + 1,
        label: prevState.index === 3 ? 'BEGIN' : 'NEXT',
        isLast: this.state.index === this.props.children.length - 1,
      }));
    }
  }

  render() {
    return (
      <View style={styles.container}>
      <ImageBackground
        style={styles.mainBackgroundImage}
        source={require('../imgs/photo.png')}>
          <View>
            {React.Children.map(this.props.children, (el, index) => <Text style={styles.containerText}>{index + 1}</Text>)}
          </View>
          {React.Children.map(this.props.children, (el, index) => {
            if (index === this.state.index) {
              return React.cloneElement(el, {
                currentIndex: this.state.index + 1,
                nextStep: this._nextStep,
                label: this.state.label,
                isLast: this.state.index === this.props.children.length - 1,
              });
            }

            return null;
          })}
        </ImageBackground>
      </View>);
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 50,
  },

  containerInner: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  containerTitle: {
    fontSize: 22,
    textTransform: 'capitalize',
    color: '#0643a7',
    textAlign: 'center',
  },

  containerText: {
    fontSize: 14,
    textTransform: 'capitalize',
    color: '#0643a7',
    paddingLeft: 10,
    paddingRight: 10,
  },

  button: {
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

  innerBackgroundImage: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    flex: 1,
    resizeMode: 'contain',
  },

  mainBackgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
});

export default Wizzard;
