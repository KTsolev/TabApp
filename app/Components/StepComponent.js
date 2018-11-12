import LinearGradient from 'react-native-linear-gradient';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { mergeData, saveData, getData } from '../data/StoreService';
import React, { Component } from 'react';
import { Divider } from 'react-native-elements';
import UserStore from '../data/FluxStore';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Picker,
  TextInput } from 'react-native';

class Step extends Component {
  static currenciesArray = [
    'choose currency',
    'Leva-BGN(lv)',
    'US Dolar-USD(USD)',
    'Euro-EUR(€)',
    'Pound sterling-GBP(£)',
    'Japaneese yen-JPY(¥)',
    'Canadian Dolar-CAD(C$)',
    'Croatian kuna-HRK(kn)',
    'Polish złoty-PLN(zł)',
    'Swiss Frank-CHF(Fr)',
    'Swidish korona-SEK(kr)',
    'Czech koruna-CZK(Kč)',
    'Danish krone-DKK(Kr)',
    'Icelandic króna-ISK(ikr)',
    'Romanian leu-RON(lei)',
    'Ukrainian hryvnia-UAH(₴)',
    'Turkish Lira-TRY(₺)',
    'Russian rubla-RUB(₽)',
  ];

  constructor(props) {
    super(props);
    this.state = {
      currency: Step.currenciesArray[0],
      isDateTimePickerVisible: false,
    };
    this.selectCurrency = this.selectCurrency.bind(this);
    this.selectPricePerPack = this.selectPricePerPack.bind(this);
    this.selectCiggarettes = this.selectCiggarettes.bind(this);
    this._toggleDateTimePicker = this._toggleDateTimePicker.bind(this);
    this._handleDatePicked = this._handleDatePicked.bind(this);
  }

  selectCurrency(val) {
    if (val !== 'choose currency') {
      this.setState({ currency: Step.currenciesArray[val].split('-')[1] });
      this.props.updateUser({ currency: Step.currenciesArray[val].split('-')[1] });
    }
  }

  selectPricePerPack() {
    this.props.updateUser({ pricePerPack: this.state.pricePerPack });
  }

  selectCiggarettes() {
    this.props.updateUser({ ciggarettesPerDay: this.state.ciggarettesPerDay });
  }

  _handleDatePicked(val) {
    let endDate = moment(val).add(30, 'days');
    this.setState({ startingDate: val });
    this.props.updateUser({
        startingDate: moment(val).format(),
        endingDate: endDate.format(),
      });
  }

  _toggleDateTimePicker() {
    this.setState({ isDateTimePickerVisible: !this.state.isDateTimePickerVisible });
  }

  render() {
    const currencyDropDown = <View>
            <Picker selectedValue={this.state.currency} onValueChange={this.selectCurrency}>
               {Step.currenciesArray.map((item, index) => {
                  return (<Picker.Item label={item} value={index} key={index} />);
                })}
            </Picker>
            <Text style = {styles.text}>{this.state.currency}</Text>
         </View>;

    let inputs;

    switch (this.props.currentIndex) {
      case 1:
        inputs = <View style={styles.containerInner}>
          {currencyDropDown}
          <TextInput
            style={styles.input}
            placeholder="0"
            keyboardType='numeric'
            onChangeText={(val) => !Number.isNaN(val) && val > 0 ? this.setState({ pricePerPack: val }) : ''}
            onEndEditing={this.selectPricePerPack}
          />
        </View>;
      break;
      case 2:
        inputs = <View>
          <TextInput
            style={styles.input}
            placeholder="0"
            keyboardType='numeric'
            onChangeText={(val) => !Number.isNaN(val) && val > 0 ? this.setState({ ciggarettesPerDay: val }) : ''}
            onEndEditing={this.selectCiggarettes}
          />
        </View>;
      break;
      case 3:
        inputs = <View style={styles.datePicker}>
        <TouchableOpacity onPress={this._toggleDateTimePicker}>
          <Text>dd/mm/yyyy</Text>
        </TouchableOpacity>
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._toggleDateTimePicker}
        />
      </View>;
      break;
      default:
      break;
    }
    return (
      <View
        style={styles.innerBackgroundImage}>
          <Text style={styles.containerTitle}>
            {this.props.children}
          </Text>
          {inputs}
          <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={['#009fea', '#0544a8']}
          style={styles.button}>
            <TouchableOpacity
              dissabled={this.props.isLast}
              onPress={this.props.nextStep}>
              <Text style={styles.buttonText}>{this.props.nextLabel}</Text>
            </TouchableOpacity>
          </LinearGradient>
          <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={['#009fea', '#0544a8']}
          style={styles.button}>
            <TouchableOpacity
              dissabled={this.props.isfirst}
              onPress={this.props.prevStep}>
              <Text style={styles.buttonText}>{this.props.prevLabel}</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>);
  }
}

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
      userData: {},
      completedSteps: Array(this.props.children.length),
    };

    this._nextStep = this._nextStep.bind(this);
    this._prevStep = this._prevStep.bind(this);
    this._updateUser = this._updateUser.bind(this);
  }

  _nextStep() {
    if (this.state.index !== this.props.children.length - 1) {
      this.setState(prevState => ({
        index: prevState.index + 1,
        nextLabel: prevState.index === 3 ? 'BEGIN' : 'NEXT',
        isLast: this.state.index === this.props.children.length - 1,
        isfirst: this.state.index === 0,
      }));
      this.state.completedSteps[this.state.index] = true;
    } else if (this.state.index === 2) {
      UserStore.createNewData(this.state.userData);
      this.props.finishSetUpUser({ isFinished: true });
    }
  }

  _prevStep() {
    if (this.state.index > 0) {
      this.setState(prevState => ({
        index: prevState.index - 1,
        isfirst: this.state.index === 0,
        prevLabel: prevState.index === 3 ? 'BEGIN' : 'PREVIOUS',
        isLast: this.state.index === this.props.children.length - 1,
      }));
      this.state.completedSteps[this.state.index] = false;
    }
  }

  _updateUser(newState) {
    this.setState({
      userData: Object.assign({}, this.state.userData, newState),
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          {React.Children.map(this.props.children, (el, index) => <View style={styles.headerItem}>
            <Divider style={styles.beforeHeaderTextElem}></Divider>
            <Text style={this.state.completedSteps[index] ? styles.activeHeader : styles.headerText}>
              {index + 1}
            </Text>
        </View>)}
        </View>
        {React.Children.map(this.props.children, (el, index) => {
          if (index === this.state.index) {
            return React.cloneElement(el, {
              currentIndex: this.state.index + 1,
              nextStep: this._nextStep,
              prevStep: this._prevStep,
              updateUser: this._updateUser,
              prevLabel: this.state.prevLabel,
              nextLabel: this.state.nextLabel,
              isfirst: this.state.index === 0,
              isLast: this.state.index === this.props.children.length - 1,
            });
          }

          return null;
        })}
      </View>);
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
  },

  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#ddf1fd',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 50,
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

  headerText: {
    fontSize: 16,
    textTransform: 'capitalize',
    color: '#fff',
    width: 25,
    height: 25,
    textAlign: 'center',
    borderRadius: 50,
    backgroundColor: '#99d8ba',
  },

  activeHeader: {
    fontSize: 16,
    textTransform: 'capitalize',
    color: '#fff',
    width: 25,
    height: 25,
    textAlign: 'center',
    borderRadius: 50,
    backgroundColor: '#54bd74',
  },

  input: {
    width: '100%',
    paddingLeft: 45,
    paddingRight: 45,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 50,
    backgroundColor: '#fff',
  },

  beforeHeaderTextElem: {
    position: 'absolute',
    width: '100%',
    height: 2,
    top: 10,
    marginLeft: -10,
    marginRight: -10,
    borderColor: '#99d7b9',
    borderWidth: 1,
  },

  headerItem: {
    width: '33%',
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#fff',
    position: 'relative',
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
    flexDirection: 'column',
    backgroundColor: '#ddf1fd',
  },

  mainBackgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },

  datePicker: {
    marginTop: 20,
    padding: 10,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: '#fff',
  },

  datePickerText: {
    textAlign: 'center',
    color: '#cccccc',
  },
});

export default Wizzard;
