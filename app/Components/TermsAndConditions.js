import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { CheckBox } from 'react-native-elements';
import Hyperlink from 'react-native-hyperlink';
import LinearGradient from 'react-native-linear-gradient';

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

  render() {
    const checkBoxText = <View>
        <Text style={styles.containerText}>
          To continue you must aggree to Sopharma AD
        </Text>
      </View>;

    const terms = <ScrollView style={styles.scrollView}>
        <Text styel={styles.listText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse convallis libero non metus porta, quis accumsan lacus vehicula. Donec scelerisque tristique venenatis. Suspendisse ac libero tincidunt, ultrices dolor a, interdum lorem. Proin convallis ac dolor placerat imperdiet. Mauris tincidunt fermentum quam. Aenean ac purus ac urna viverra blandit. Donec ultrices euismod lacus, et fermentum tortor scelerisque sit amet. Cras ac rhoncus ligula, eget dapibus sapien. Curabitur quis molestie orci.
          Donec ligula erat, pretium eu bibendum sit amet, malesuada sit amet ligula. Proin convallis, nisi vel ultricies ultricies, nibh purus auctor nibh, sit amet dapibus urna dui sit amet quam. Curabitur efficitur leo eget fermentum ultrices. Morbi arcu enim, interdum nec auctor eu, auctor sit amet odio. Nam tempus tortor vitae molestie posuere. Integer a odio at tellus dictum malesuada. Praesent lacinia ex vel leo facilisis, non imperdiet nulla posuere. Duis non ultrices sapien. Nunc condimentum bibendum consequat. Fusce ornare enim et diam mattis, a semper est vestibulum. Mauris euismod metus nisi, sed fringilla risus viverra quis. Vivamus congue pharetra massa et semper. Praesent dignissim nulla lorem, vel feugiat lacus condimentum accumsan. Quisque ac dolor auctor, tincidunt massa eget, hendrerit felis. Vestibulum ac libero ligula. Phasellus auctor tortor mauris, sit amet viverra neque consequat aliquam.
          Ut neque mauris, feugiat non consequat tincidunt, pharetra sed sapien. Cras mollis lorem et lobortis finibus. Phasellus finibus justo et auctor venenatis. Phasellus turpis ligula, posuere ac mattis non, auctor quis augue. In pretium urna eu leo eleifend volutpat. Cras iaculis libero odio, nec feugiat ex iaculis in. Morbi iaculis elementum lectus, tincidunt mollis sem gravida volutpat. In commodo lacus ac facilisis auctor. Ut ut eros at tortor dignissim blandit. Vestibulum nec molestie tortor. Duis vel elit vitae diam lobortis porttitor. Proin vel nibh cursus, tristique ipsum vel, facilisis urna. Sed tincidunt diam eu lacinia commodo. In mattis felis sed mollis sagittis. Etiam sed turpis id magna gravida porttitor vel a dolor. Sed vitae risus venenatis sem bibendum dapibus.
          Nullam bibendum velit ac dapibus venenatis. Vivamus semper commodo massa, in interdum massa. Ut eu scelerisque dolor. Phasellus et elit ac lacus feugiat vulputate in nec mi. Aliquam cursus sapien non viverra condimentum. Nunc consequat arcu lorem, non tincidunt est volutpat nec. Phasellus et eros arcu. Donec vitae vestibulum odio, id gravida elit. Nam luctus quam nunc, eu dignissim enim pharetra quis. Duis aliquam hendrerit nisl.
          Donec vel lobortis neque. Mauris non sagittis arcu. Donec risus orci, interdum sit amet magna ut, commodo eleifend sapien. Morbi malesuada neque et turpis tempus, a rutrum lacus vulputate. Phasellus in aliquam tellus. Aliquam vitae mollis ligula. Morbi in auctor mauris, sit amet cursus ante. Nulla egestas est vitae sodales tempus. Vivamus euismod magna nec iaculis varius.
        </Text>
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
    maxWidth: '90%',
    maxHeight: '50%',
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
