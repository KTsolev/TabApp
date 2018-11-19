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
    saveData({ agreed: this.state.agreed });
    this.setState({ goToSteps: !this.state.goToSteps, });
  }

  RenderTemplate() {
    if (this.state.goToSteps) {
      return <Wizzard finishSetUpUser={this.props.finishSetUpUser}>
      <Wizzard.Step>How much you pay for pack of cigarettes?</Wizzard.Step>
      <Wizzard.Step>How many cigarettes you smoke per day?</Wizzard.Step>
      <Wizzard.Step>When do you want to start your Tabex Treatmen?</Wizzard.Step>
      </Wizzard>;
    }

    if (this.state.agreed) {
      return <StartScreen parentStepsHandler={this.goToStepsHandler}/>;
    }

    return <TermsAndConditions onParentChangeHandler={this.onChangeHandler} />;
  }

  render() {
    let template = this.RenderTemplate();
    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.backgroundImage}
          source={require('../imgs/main-background.png')}>
          <Image
            style={styles.logo}
            resizeMode='contain'
            source={require('../imgs/tabex-logo.png')}/>
          {template}
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  logo: {
    width: 300,
    height: 200,
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
});
