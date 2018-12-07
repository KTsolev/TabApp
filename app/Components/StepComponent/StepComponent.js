import LinearGradient from 'react-native-linear-gradient';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { mergeData, saveData, getData } from '../../data/StoreService';
import React, { Component } from 'react';
import { Divider } from 'react-native-elements';
import { createUser, saveUser, } from '../../data/FluxActions';
import { Dropdown } from 'react-native-material-dropdown';
import styles from './styles';
import Step from './Step';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  Keyboard,
  Picker,
  TouchableWithoutFeedback,
  TextInput } from 'react-native';
import {
  listenOrientationChange as loc,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';


class Wizzard extends Component {
  static Step = (props) => <Step {...props}/>;

  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      nextLabel: 'NEXT',
      prevLabel: 'PREV',
      isLast: false,
      isFirts: false,
      keyboardShown: false,
      invalidData: false,
      userData: {},
      completedSteps: Array(this.props.children.length),
    };

    this.state.completedSteps[0] = true;
    this._nextStep = this._nextStep.bind(this);
    this._prevStep = this._prevStep.bind(this);
    this._updateUser = this._updateUser.bind(this);
    this._keyboardDidHide = this._keyboardDidHide.bind(this);
    this._keyboardDidShow = this._keyboardDidShow.bind(this);
  }

  _nextStep() {
    if (this.state.index !== this.props.children.length - 1) {
      this.state.completedSteps[this.state.index + 1] = true;
      this.setState(prevState => ({
        index: prevState.index + 1,
        nextLabel: prevState.index === 2 ? 'BEGIN' : 'NEXT',
        isLast: this.state.index === this.props.children.length - 1,
        isfirst: this.state.index === 0,
      }));
    } else if (this.state.index >= 2 && Object.keys(this.state.userData).length === 5) {
      createUser(this.state.userData);
      saveUser(this.state.userData);
    } else {
      this.setState({ invalidData: true });
    }
  }

  _prevStep() {
    if (this.state.index > 0) {
      this.state.completedSteps[this.state.index] = false;
      this.setState(prevState => ({
        index: prevState.index - 1,
        isfirst: this.state.index === 0,
        prevLabel: prevState.index === 3 ? 'BEGIN' : 'PREV',
        isLast: this.state.index === this.props.children.length - 1,
      }));
    }

    this.setState({ invalidData: false });
  }

  _updateUser(newState) {
    this.setState({
      userData: Object.assign({}, this.state.userData, newState),
    });
  }

  _keyboardDidShow () {
    this.setState({ keyboardShown: true });
  }

  _keyboardDidHide () {
    this.setState({ keyboardShown: false });
  }

  componentDidMount() {
    loc(this);
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }

  componentWillUnMount() {
    rol();
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  render() {
    return (
      <TouchableWithoutFeedback accessible={false} onPress={() => {
        Keyboard.dismiss();
        this.setState({ keyboardShown: false });
      }
    }>
        <View style={this.state.keyboardShown ? [styles.container, { position: 'absolute', zIndex: -5 }] : styles.container}>
            <View style={styles.headerContainer}>
              <ImageBackground source={require('../../imgs/photo.png')} style={styles.headerBackground} >
                  <Image source={require('../../imgs/tabex-logo.png')} style={styles.image} />
              </ImageBackground>
            </View>
            <View style={styles.mainContainer}>
              <View style={styles.titleContainer}>
                {React.Children.map(this.props.children, (el, index) => <View style={styles.headerItem}>
                  <Divider style={styles.beforeHeaderTextElem}></Divider>
                  <View style={this.state.completedSteps[index] ? styles.activeHeader : styles.headerText}>
                    <Text style={styles.innerText}>
                      {index + 1}
                    </Text>
                  </View>
                </View>)}
              </View>
              <View style={styles.buttonsContainer}>
                <Text style={styles.errorText}> {this.state.invalidData ? 'You haven\'t completed whole step. Goback and fill missing data': '' }</Text>
                {React.Children.map(this.props.children, (el, index) => {
                  if (index === this.state.index) {
                    return React.cloneElement(el, {
                      currentIndex: this.state.index + 1,
                      nextStep: this._nextStep,
                      prevStep: this._prevStep,
                      updateUser: this._updateUser,
                      userData: this.state.userData,
                      prevLabel: this.state.prevLabel,
                      nextLabel: this.state.nextLabel,
                      isfirst: this.state.index === 0,
                      isLast: this.state.index === this.props.children.length - 1,
                    });
                  }

                  return null;
                })}
              </View>
            </View>
            <View style={styles.imageHolder}>
              <Image source={require('../../imgs/leaves.png')}  style={styles.footerImage}/>
            </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default Wizzard;
