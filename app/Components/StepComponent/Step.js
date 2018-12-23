import LinearGradient from 'react-native-linear-gradient';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { mergeData, saveData, getData } from '../../data/StoreService';
import React, { Component } from 'react';
import { Divider } from 'react-native-elements';
import { createUser, saveUser, } from '../../data/FluxActions';
import { Dropdown } from 'react-native-material-dropdown';
import styles from './styles';
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
import validation from '../../validators/validation';
import validateWrapper from '../../validators/validate_wrapper';

export default class Step extends Component {
  static currenciesArray = [
    { value: 'Leva-BGN(lv)' },
    { value: 'US Dolar-USD(USD)' },
    { value: 'Euro-EUR(€)' },
    { value: 'Pound sterling-GBP(£)' },
    { value: 'Japaneese yen-JPY(¥)' },
    { value: 'Canadian Dolar-CAD(C$)' },
    { value: 'Croatian kuna-HRK(kn)' },
    { value: 'Polish złoty-PLN(zł)' },
    { value: 'Swiss Frank-CHF(Fr)' },
    { value: 'Swidish korona-SEK(kr)' },
    { value: 'Czech koruna-CZK(Kč)' },
    { value: 'Danish krone-DKK(Kr)' },
    { value: 'Icelandic króna-ISK(ikr)' },
    { value: 'Romanian leu-RON(lei)' },
    { value: 'Ukrainian hryvnia-UAH(₴)' },
    { value: 'Turkish Lira-TRY(₺)' },
    { value: 'Russian rubla-RUB(₽)' },
  ];

  constructor(props) {
    super(props);

    this.state = {
      currency: props.userData.currency || '',
      pricePerPack: props.userData.pricePerPack || 0,
      ciggarettesPerDay: props.userData.ciggarettesPerDay || 0,
      startingDate: props.userData.startingDate || '',
      isDateTimePickerVisible: false,
      activeColors: ['#009fea', '#0544a8'],
      pricePerPackError: validateWrapper('pricePerPack', props.userData.pricePerPack),
      currencyError: validateWrapper('currency', props.userData.currency),
      ciggarettesPerDayError: validateWrapper('ciggarettesPerDay', props.userData.ciggarettesPerDay),
      startingDateError: validateWrapper('startingDate', props.userData.startingDate),
    };

    this.selectCurrency = this.selectCurrency.bind(this);
    this.selectPricePerPack = this.selectPricePerPack.bind(this);
    this.selectCiggarettes = this.selectCiggarettes.bind(this);
    this._toggleDateTimePicker = this._toggleDateTimePicker.bind(this);
    this._handleDatePicked = this._handleDatePicked.bind(this);
  }

  selectCurrency(val) {
    let errorText = validateWrapper('currency', val);
    console.log(val)
    if (!!errorText) {
      this.setState({ currencyError: errorText });
      return;
    }

    this.setState({ currency: val });
    this.props.updateUser({ currency: val });
  }

  selectPricePerPack() {
    let errorText = validateWrapper('pricePerPack', this.state.pricePerPack);

    if (!!errorText) {
      this.setState({ pricePerPackError: errorText });
      return;
    }

    this.props.updateUser({ pricePerPack: this.state.pricePerPack });
  }

  selectCiggarettes() {
    let errorText = validateWrapper('ciggarettesPerDay', this.state.ciggarettesPerDay);

    if (!!errorText) {
      this.setState({ ciggarettesPerDayError: errorText });
      return;
    }

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

  componentDidMount() {
    loc(this);
  }

  componentWillUnMount() {
    rol();
  }

  render() {
    const currencyDropDown = <Dropdown
       label='choose currency'
       value={this.state.currency}
       selectedItemColor='#0544a8'
       containerStyle={{ width: 250, height: 60, margin: 10, marginTop: -5, alignSelf: 'center' }}
       data={Step.currenciesArray}
       onBlur={() => {
          this.setState({
            currencyError: validateWrapper('currency', this.state.currency),
          });
       }}
       onChangeText={this.selectCurrency}
     />;

    let inputs;
    let buttons;
    let errorText = '';
    let toDisable = true;
    let isValid = false;

    switch (this.props.currentIndex) {
      case 1:
        errorText = <Text style={[styles.errorText, { textAlign: 'center' }]}>
        { `${!!this.state.pricePerPackError ? this.state.pricePerPackError : ''} \n ${!!this.state.currencyError ? this.state.currencyError : ''} `}</Text>;
        inputs = <View>
          <TextInput
            style={styles.input}
            placeholder='0'
            clearTextOnFocus={true}
            keyboardType='numeric'
            onBlur={() => {
              this.setState({
                pricePerPackError: validateWrapper('pricePerPack', this.state.pricePerPack),
              });
            }}
            onFocus={() => this.setState({ pricePerPack: '' })}
            onChangeText={(val) => {
              if (val.indexOf(',') !== -1 ) {
                let newVal = val.split(',');
                val = val === ',' ? `0.` : `${newVal[0]}.`;
              }

              this.setState({ pricePerPack: val });
            }}
            onEndEditing={this.selectPricePerPack}
            value={`${this.state.pricePerPack}`}
          />
          {errorText}
          {currencyDropDown}
        </View>;
        buttons = <View><LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  colors={!!this.state.currencyError || !!this.state.pricePerPackError ? ['#e3f3fd', '#e7e7e7'] : ['#009fea', '#0544a8']}
                  style={styles.button}>
                    <TouchableOpacity
                      disabled={!!this.state.currencyError || !!this.state.pricePerPackError}
                      onPress={this.props.nextStep}>
                      <Text style={styles.buttonText}>{this.props.nextLabel}</Text>
                    </TouchableOpacity>
                  </LinearGradient></View>;
      break;
      case 2:
        errorText = <Text style={[styles.errorText, { alignSelf: 'center' }]}>{!!this.state.ciggarettesPerDayError ? this.state.ciggarettesPerDayError : ''}</Text>;
        inputs = <View>
          <TextInput
            style={styles.input}
            placeholder='0'
            keyboardType='numeric'
            onBlur={() => {
              this.setState({
                ciggarettesPerDayError: validateWrapper('pricePerPack', this.state.ciggarettesPerDay),
              });
            }}
            onFocus={()=>this.setState({ ciggarettesPerDay: '' })}
            onChangeText={(val) => (val) => {
              if (val.indexOf(',') !== -1 ) {
                let newVal = val.split(',');
                val = val === ',' ? `0.` : `${newVal[0]}.`;
              }

              this.setState({ selectCiggarettes: val });
            }}
            onEndEditing={this.selectCiggarettes}
            value={`${this.state.ciggarettesPerDay}`}
          />
          {errorText}
        </View>;
        buttons =  <View><LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  colors={!!this.state.ciggarettesPerDayError ? ['#e3f3fd', '#e7e7e7'] : ['#009fea', '#0544a8']}
                  style={styles.button}>
                    <TouchableOpacity
                      disabled={!!this.state.ciggarettesPerDayError}
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
        isValid = moment(this.state.startingDate).isBefore(moment(), 'days');
        toDisable = this.state.startingDate === '';
        errorText = <Text style={[styles.errorText, { alignSelf: 'center' }]}>You have to select a valid date that is not prior to the current!</Text>
        inputs = <View style={styles.datePicker}>
        <TouchableOpacity onPress={this._toggleDateTimePicker}>
          <Text style={[styles.buttonText, {color:'#000'}]}> {this.state.startingDate ? moment(this.state.startingDate).format('DD/MM/YYYY') : 'dd/mm/yyyy'}</Text>
        </TouchableOpacity>
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._toggleDateTimePicker}
        />
      </View>;
        buttons = <View>
          {toDisable || isValid ? errorText : null}
        <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                disabled={toDisable || isValid}
                colors={toDisable || isValid ? ['#e3f3fd', '#e7e7e7'] : ['#009fea', '#0544a8']}
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
