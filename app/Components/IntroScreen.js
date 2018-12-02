 import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, ScrollView } from 'react-native';
import TermsAndConditions from './TermsAndConditions';
import StartScreen from './StartScreen';
import LinearGradient from 'react-native-linear-gradient';
import Wizzard from './StepComponent';
import { saveData, getData } from '../data/StoreService';

export default class IntroScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      agreed: props.isChecked || false,
      goToSteps: false,
    };

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.goToStepsHandler = this.goToStepsHandler.bind(this);
  }

  onChangeHandler() {
    this.setState({ agreed: !this.state.agreed });
  }

  goToStepsHandler() {
    this.setState({ goToSteps: !this.state.goToSteps, });
  }

  RenderTemplate() {
    if (this.state.goToSteps) {
      return <Wizzard finishSetUpUser={this.props.finishSetUpUser}>
      <Wizzard.Step>How much do you pay for pack of cigarettes?</Wizzard.Step>
      <Wizzard.Step>How many cigarettes do you smoke per day?</Wizzard.Step>
      <Wizzard.Step>When do you want to start your Tabex Treatmen?</Wizzard.Step>
      </Wizzard>;
    }

    if (this.state.agreed) {
      return <View style={styles.container}>
        <ImageBackground
          style={styles.backgroundImage}
          source={require('../imgs/background.png')}>
          <Image
            style={styles.logo}
            resizeMode='contain'
            source={require('../imgs/tabex-logo.png')}/>
          <View style={styles.innerContainer}>
            <StartScreen parentStepsHandler={this.goToStepsHandler}/>
          </View>
        </ImageBackground>
      </View>;
    }

    return <View style={styles.container}>
      <ImageBackground
        style={styles.backgroundImage}
        source={require('../imgs/main-background.png')}>
        <Image
          style={styles.logo}
          resizeMode='contain'
          source={require('../imgs/tabex-logo.png')}/>
        <View style={styles.innerContainer}>
          <TermsAndConditions onParentChangeHandler={this.onChangeHandler} />
        </View>
      </ImageBackground>
    </View>;
  }

  render() {
    let template = this.RenderTemplate();
    return template;
  }
}

const styles = StyleSheet.create({
  logo: {
    width: 300,
    height: '10%',
    marginBottom: 20,
    marginTop: 20,
  },

  wrapper: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
  },

  backgroundBottomImg: {
    width: '50%',
    height: '50%',
    resizeMode: 'contain',
  },

  backgroundImage: {
    alignItems: 'center',
    flex: 1,
    resizeMode: 'cover',
  },

  container: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    height: '100%',
  },

  innerContainer: {
    flex: 1,
    height: '90%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
