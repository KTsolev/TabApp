import React, { Component } from 'react';
import PercentageCircle from 'react-native-percentage-circle';
import PillsButton from '../PillsButton/PillsButton';
import moment from 'moment';
import { Divider } from 'react-native-elements';
import { addNewUserProps, saveUser, loadUser, } from '../../data/FluxActions';
import UserStore from '../../data/UserStore';
import PillStore from '../../data/PillStore';
import Orientation from 'react-native-orientation';
import styles from './styles';
import {
  Platform,
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  Linking,
  LinkingIOS } from 'react-native';

export default class Home extends Component {
  constructor(props) {
    super(props);
    const user = UserStore.getUser();
    let pills = PillStore.getPills();
    const timeSinceStart = moment().diff(moment(user.startingDate), 'hours');
    const daysSinceStart = moment().diff(moment(user.startingDate), 'days');
    // pricePerPack / 25 (total cigarretes in pack) * ciggarettesPerDay * day //
    const moneySaved = Math.round(((user.pricePerPack / 20) * user.ciggarettesPerDay) * daysSinceStart);
    const notSmoked = (user.ciggarettesPerDay * daysSinceStart);
    const endingDate = user.endingDate;
    const currency = user.currency.split('-')[1];
    let disabled = user.disabled ? moment().diff(moment(user.lastPillTaken), 'days') > 0 ? false : true : false;

    this.state = {
      pills: Number(user.pills) || 1,
      pillsTaken: user.pillsTaken ? Number(user.pillsTaken) || 1 : 1,
      lastPillTaken: user.lastPillTaken,
      timeSinceStart: timeSinceStart < 0 ? 0 : timeSinceStart,
      daysSinceStart: daysSinceStart < 0 ? 0 : daysSinceStart,
      endingDate,
      isLandScape: false,
      currency,
      disabled: timeSinceStart < 0 ? true : disabled,
      notSmoked: notSmoked < 0 ? 0 : notSmoked,
      moneySaved: moneySaved < 0 ? 0 : moneySaved,
    };

    this._getUser = this._getUser.bind(this);
    this._incrementPills = this._incrementPills.bind(this);
    this._dozeHandler = this._dozeHandler.bind(this);
    this._orientationDidChange = this._orientationDidChange.bind(this);
  }

  _incrementPills() {
    let pills = PillStore.getPills();

    if (!this.state.disabled) {
      let sum = this.state.pillsTaken + 1;
      this.setState({
        pills: pills.count,
        pillsTaken: sum,
        lastPillTaken: pills.lastPillTaken,
      });

      addNewUserProps({
        pills: pills.count,
        pillsTaken: pills.count,
      });
      setTimeout(() => saveUser(UserStore.getUser()), 1000);
    }
  }

  _dozeHandler() {
    this.setState({ disabled: true });
    addNewUserProps({
      pills: 1,
      pillsTaken: this.state.pillsTaken,
      lastPillTaken: this.state.lastPillTaken,
      disabled: true,
    });
    setTimeout(() => saveUser(UserStore.getUser()), 1000);
  }

  _getUser() {
    const jsonUser = UserStore.getUser();
    const startingDate = jsonUser.startingDate;
    const timeSinceStart = moment().diff(moment(startingDate), 'hours');
    const daysSinceStart = moment().diff(moment(startingDate), 'days');
    const endingDate = jsonUser.endingDate;
    const currency = jsonUser.currency.split('-')[1];
    this.setState({
      timeSinceStart,
      startingDate,
      daysSinceStart,
      endingDate,
      isLandScape: false,
      pills: Number(jsonUser.pills),
      pillsTaken: jsonUser.pillsTaken ? Number(jsonUser.pillsTaken) || 1 : 1,
      currency,
      pricePerPack: jsonUser.pricePerPack && Number(jsonUser.pricePerPack) > 0 ? Number(jsonUser.pricePerPack) : Number(this.state.pricePerPack),
      ciggarettesPerDay: jsonUser.ciggarettesPerDay && Number(jsonUser.ciggarettesPerDay) > 0 ? Number(jsonUser.ciggarettesPerDay) : Number(this.state.ciggarettesPerDay),
      pillsTaken: jsonUser.pillsTaken ? Number(jsonUser.pillsTaken) : Number(this.state.pillsTaken),
    });
  }

  _orientationDidChange(orientation) {
    this.setState({ isLandScape: orientation === 'LANDSCAPE' });
  }

  componentWillMount() {
    const initial = Orientation.getInitialOrientation();
    this.setState({ isLandScape: initial === 'LANDSCAPE' });
    UserStore.on('user-updated', this._getUser);
    PillStore.on('pills-increased', this._incrementPills);
    UserStore.on('user-saved', () => loadUser());
    PillStore.on('day-doze-reached', this._dozeHandler);
    Orientation.addOrientationListener(this._orientationDidChange);
  }

  componentWillUnmount() {
    UserStore.removeListener('user-updated', this._getUser);
    PillStore.removeListener('pills-increased', this._incrementPills);
    UserStore.removeListener('user-saved', () => loadUser());
    PillStore.removeListener('day-doze-reached', this._dozeHandler);
    Orientation.removeOrientationListener(this._orientationDidChange);
  }

  render() {
    return (
      <View style={this.state.isLandScape ? styles.rowContainer : styles.container}>
        <ImageBackground
          style={styles.backgroundImage}
          source={require('../../imgs/rectangle.png')}>
          <TouchableOpacity
            style={styles.logoHollder}
            onPress={() => Platform === 'ios' ? LinkingIOS.openURL('https://www.tabex.bg/links/TABEX_LEAFLET_ss3360.pdf') : Linking.openURL('https://www.tabex.bg/links/TABEX_LEAFLET_ss3360.pdf')}>
            <Image
              style={styles.logo}
              source={require('../../imgs/trackingi.png')} />
          </TouchableOpacity>
          <PercentageCircle
            radius={75}
            percent={this.state.daysSinceStart}
            innerColor={'#0187e6'}
            bgcolor={'#3498db'}
            height={'25%'}
            borderWidth={5}
            color={'#d3ebfb'}>
              <Text style={{ fontSize: 16, color: '#d3ebfb' }}>{this.state.daysSinceStart}</Text>
              <Text style={{ fontSize: 16, color: '#d3ebfb' }}>DAYS</Text>
              <Text style={{ fontSize: 16, color: '#d3ebfb' }}>smoke free</Text>
          </PercentageCircle>
          <Divider style={styles.divider}/>
          <View style={ this.state.isLandScape ? styles.headerRowElevated : styles.headerRow }>
            <PillsButton disabled={this.state.disabled} />
            <Text style={styles.headerText}>{this.state.pills} / 6 pills taken</Text>
          </View>
          </ImageBackground>
        <View style={ this.state.isLandScape ? styles.infoContainerBigger : styles.infoContainer }>
          <View style={styles.containerInner}>
            <View style={styles.innerRow}>
              <Text style={{ fontSize: 14, color: '#0648aa', textAlign: 'left' }}>quit date:</Text>
              <Text style={{ fontSize: 14, color: '#0648aa', textAlign: 'right' }}>
              { moment(this.state.endingDate).format('DD/MM/YYYY') }
              </Text>
            </View>
            <View style={styles.innerRow}>
              <Text style={{ fontSize: 14, color: '#0648aa', textAlign: 'left' }}>time since:</Text>
              <Text style={{ fontSize: 14, color: '#0648aa', textAlign: 'right' }}>{this.state.timeSinceStart}</Text>
            </View>
            <View style={styles.innerRow}>
              <Text style={{ fontSize: 14, color: '#0648aa', textAlign: 'left' }}>money saved:</Text>
              <Text style={{ fontSize: 14, color: '#0648aa', textAlign: 'right' }}>
                {`${this.state.moneySaved} ${this.state.currency}`}
              </Text>
            </View>
            <View style={styles.innerRow}>
              <Text style={{ fontSize: 14, color: '#0648aa', textAlign: 'left' }}>not smoked:</Text>
              <Text style={{ fontSize: 14, color: '#0648aa', textAlign: 'right' }}>
                {this.state.notSmoked}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
