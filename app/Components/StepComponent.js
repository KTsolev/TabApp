import LinearGradient from 'react-native-linear-gradient';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { mergeData, saveData, getData } from '../data/StoreService';
import React, { Component } from 'react';
import { Divider } from 'react-native-elements';
import { createUser, saveUser, } from '../data/FluxActions';

import {
  StyleSheet,
  Text,
  View,
  Image,
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
    let index = Step.currenciesArray.indexOf(props.userData.currency);
    this.state = {
      currency: `key${index}` || 'key0',
      pricePerPack: props.userData.pricePerPack || 0,
      ciggarettesPerDay: props.userData.ciggarettesPerDay || 0,
      startingDate: props.userData.startingDate || '',
      isDateTimePickerVisible: false,
      dissabled: true,
    };

    if (!this.state.dissabled) {
      this.setState({ activeColors: ['#009fea', '#0544a8'] });
    } else {
      this.setState({ activeColors: ['#e3f3fd', '#e7e7e7'] });
    }

    this.selectCurrency = this.selectCurrency.bind(this);
    this.selectPricePerPack = this.selectPricePerPack.bind(this);
    this.selectCiggarettes = this.selectCiggarettes.bind(this);
    this._toggleDateTimePicker = this._toggleDateTimePicker.bind(this);
    this._handleDatePicked = this._handleDatePicked.bind(this);
  }

  selectCurrency(val) {
    console.log(val);
    let index = val.split('key')[1];
    if (val !== 'key0') {
      this.setState({ currency: val });
      this.props.updateUser({ currency: Step.currenciesArray[index] });
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
    this.setState({ startingDate: val, isDateTimePickerVisible: false, });
    this.props.updateUser({
        startingDate: moment(val).format(),
        endingDate: endDate.format(),
      });
  }

  _toggleDateTimePicker() {
    this.setState({ isDateTimePickerVisible: true });
  }

  render() {
    const currencyDropDown = <View>
            <Picker
              style={{ width: 250, height: 50 }}
              selectedValue={this.state.currency}
              onValueChange={this.selectCurrency.bind(this)}>
               {Step.currenciesArray.map((item, index) => {
                  return (<Picker.Item label={item} value={`key${index}`} key={index} />);
                })}
            </Picker>
         </View>;

    let inputs;
    let buttons;

    switch (this.props.currentIndex) {
      case 1:
        inputs = <View>
          <TextInput
            style={styles.input}
            placeholder='0'
            clearTextOnFocus={true}
            keyboardType='numeric'
            onFocus={()=>this.setState({ pricePerPack: '' })}
            onChangeText={(val) => !Number.isNaN(val) && val > 0 ? this.setState({ pricePerPack: val }) : 0}
            onEndEditing={this.selectPricePerPack}
            value={this.state.pricePerPack}
          />
          {currencyDropDown}
        </View>;
        buttons = <View><LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  colors={['#009fea', '#0544a8']}
                  style={styles.button}>
                    <TouchableOpacity
                      onPress={this.props.nextStep}>
                      <Text style={styles.buttonText}>{this.props.nextLabel}</Text>
                    </TouchableOpacity>
                  </LinearGradient></View>;
      break;
      case 2:
        inputs = <View>
          <TextInput
            style={styles.input}
            placeholder='0'
            keyboardType='numeric'
            onFocus={()=>this.setState({ ciggarettesPerDay: '' })}
            onChangeText={(val) => !Number.isNaN(val) && val > 0 ? this.setState({ ciggarettesPerDay: val }) : 0}
            onEndEditing={this.selectCiggarettes}
            value={this.state.ciggarettesPerDay}
          />
        </View>;
        buttons =  <View><LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  colors={['#009fea', '#0544a8']}
                  style={styles.button}>
                    <TouchableOpacity
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
                      onPress={this.props.prevStep}>
                      <Text style={styles.buttonText}>{this.props.prevLabel}</Text>
                    </TouchableOpacity>
                  </LinearGradient></View>;
      break;
      case 3:
        inputs = <View style={styles.datePicker}>
        <TouchableOpacity onPress={this._toggleDateTimePicker}>
          <Text>{this.state.startingDate ? moment(this.state.startingDate).format('DD/MM/YYYY') : 'dd/mm/yyyy'}</Text>
        </TouchableOpacity>
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._toggleDateTimePicker}
        />
      </View>;
      buttons = <View><LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={['#009fea', '#0544a8']}
                style={styles.button}>
                  <TouchableOpacity
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
                    onPress={this.props.prevStep}>
                    <Text style={styles.buttonText}>{this.props.prevLabel}</Text>
                  </TouchableOpacity>
                </LinearGradient></View>;
      break;
      default:
      break;
    }

    return (
        <View style={styles.inputContainer}>
          <Text style={styles.containerTitle}>
            {this.props.children}
          </Text>
          {inputs}
          {buttons}
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
      invalidData: false,
      userData: {},
      completedSteps: Array(this.props.children.length),
    };

    this.state.completedSteps[0] = true;
    this._nextStep = this._nextStep.bind(this);
    this._prevStep = this._prevStep.bind(this);
    this._updateUser = this._updateUser.bind(this);
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
    } else if (this.state.index > 2 && Object.keys(this.state.userData).length === 5) {
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
    console.log(newState);
    this.setState({
      userData: Object.assign({}, this.state.userData, newState),
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <ImageBackground source={require('../imgs/photo.png')} style={styles.headerBackground} >
              <Image source={require('../imgs/tabex-logo.png')} style={styles.image} />
          </ImageBackground>
        </View>
        <View style={styles.mainContainer}>
          <View style={styles.titleContainer}>
            {React.Children.map(this.props.children, (el, index) => <View style={styles.headerItem}>
              <Divider style={styles.beforeHeaderTextElem}></Divider>
              <Text style={this.state.completedSteps[index] ? styles.activeHeader : styles.headerText}>
                {index + 1}
              </Text>
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
          <Image source={require('../imgs/leaves.png')}  style={styles.footerImage}/>
        </View>
      </View>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#ddf1fd',
  },

  mainContainer: {
    flex: 1,
    maxHeight: '61%',
  },

  imageHolder: {
    flex: 1,
    maxHeight: '10%',
    justifyContent: 'flex-end',
    resizeMode: 'cover',
  },

  headerContainer: {
    flex: 1,
    maxHeight: '29%',
  },

  titleContainer: {
    height: '10%',
    marginTop: 20,
    flexDirection: 'row',
  },

  buttonsContainer: {
    height: '90%',
  },

  headerBackground: {
    flex: 1,
    alignSelf: 'stretch',
    resizeMode: 'contain',
  },

  image: {
    width: 250,
    height: 120,
    resizeMode: 'contain',
    alignSelf: 'center',
  },

  currencyText: {
      marginBottom: 5,
    },

  footerImage: {
    width: '100%',
    height: '100%',
    paddingTop: 20,
    resizeMode: 'cover',
  },

  errorText: {
    fontSize: 14,
    padding: 10,
    textTransform: 'capitalize',
    color: '#ff5100',
    textAlign: 'center',
  },

  containerTitle: {
    fontSize: 18,
    padding: 15,
    marginBottom: 10,
    alignSelf: 'flex-start',
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
    padding: 5,
    maxWidth: '40%',
    minWidth: 250,
    minHeight: 30,
    marginTop: 15,
    marginBottom: 15,
    textAlign: 'center',
    paddingLeft: 45,
    paddingRight: 45,
    borderRadius: 50,
    backgroundColor: '#fff',
  },

  beforeHeaderTextElem: {
    position: 'absolute',
    width: '100%',
    height: 2,
    top: '50%',
    marginLeft: -10,
    marginRight: -10,
    borderColor: '#99d7b9',
    borderWidth: 1,
  },

  inputContainer: {
    height: '90%',
    justifyContent: 'flex-start',
    alignItems: 'center',
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
    padding: 5,
    minWidth: 250,
    minHeight: 30,
    marginTop: 15,
    marginBottom: 15,
    borderRadius: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#fff',
  },

  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },

  datePicker: {
    padding: 5,
    minWidth: 250,
    minHeight: 30,
    marginTop: 15,
    marginBottom: 15,
    borderRadius: 50,
    backgroundColor: '#fff',
  },

  datePickerText: {
    textAlign: 'center',
    color: '#cccccc',
  },
});

export default Wizzard;
