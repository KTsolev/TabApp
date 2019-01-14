import React, { Component } from 'react';
import PercentageCircle from 'react-native-percentage-circle';
import PillsButton from '../PillsButton/PillsButton';
import moment from 'moment';
import { Divider } from 'react-native-elements';
import { addNewUserProps, saveUser, loadUser, savePillsData, loadPillsData } from '../../data/FluxActions';
import UserStore from '../../data/UserStore';
import PillStore from '../../data/PillStore';
import Orientation from 'react-native-orientation';
import styles from './styles';

let PushNotification = require('react-native-push-notification');

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
    const pills = PillStore.getPills();

    const timeSinceStart = moment().diff(moment(user.startingDate), 'hours');
    const daysSinceStart = moment().diff(moment(user.startingDate), 'days');

    // pricePerPack / 25 (total cigarretes in pack) * ciggarettesPerDay * day //
    const moneySaved = Math.round(((user.pricePerPack / 20) * user.ciggarettesPerDay) * daysSinceStart).toFixed(2);
    const notSmoked = Math.round(user.ciggarettesPerDay * daysSinceStart).toFixed(2);

    const endingDate = user.endingDate;
    const currency = user.currency.split('-')[1];

    let disabled = pills.disabled ? moment().diff(moment(pills.lastPillTaken), 'days') > 0 ? false : true : false;

    this.state = {
      pills: pills.count,
      pillsTaken: user.pillsTaken ? Number(user.pillsTaken) || 0 : 0,
      lastPillTaken: pills.lastPillTaken,
      timeSinceStart: timeSinceStart < 0 ? 0 : timeSinceStart,
      daysSinceStart: daysSinceStart < 0 ? 0 : daysSinceStart,
      endingDate,
      isLandScape: false,
      currency,
      disabled: timeSinceStart < 0 ? true : disabled,
      notSmoked: notSmoked < 0 ? 0 : notSmoked,
      moneySaved: moneySaved < 0 ? 0 : moneySaved,
    };

    this._incrementPills = this._incrementPills.bind(this);
    this._dozeHandler = this._dozeHandler.bind(this);
    this._orientationDidChange = this._orientationDidChange.bind(this);
  }

  _incrementPills() {
    let pills = PillStore.getPills();
    if (!pills.disabled) {
      this.setState({
        pills: pills.count,
        leftPills: pills.leftPills,
        lastPillTaken: pills.lastPillTaken,
      });

      setTimeout(() => savePillsData(pills), 0);
    }
  }

  _dozeHandler() {
    this.setState({ disabled: true });
    let pills = PillStore.getPills();

    setTimeout(() => savePillsData(pills), 0);
  }

  _orientationDidChange(orientation) {
    this.setState({ isLandScape: orientation === 'LANDSCAPE' });
  }

  componentWillMount() {
    const initial = Orientation.getInitialOrientation();
    this.setState({ isLandScape: initial === 'LANDSCAPE' });
    UserStore.on('user-saved', () => loadUser());
    PillStore.on('pills-increased', this._incrementPills);
    PillStore.on('day-doze-reached', this._dozeHandler);
    PillStore.on('pills-data-saved', () => loadPillsData());
    Orientation.addOrientationListener(this._orientationDidChange);
  }

  componentWillUnmount() {
    UserStore.removeListener('user-saved', () => loadUser());
    PillStore.removeListener('pills-increased', this._incrementPills);
    PillStore.removeListener('day-doze-reached', this._dozeHandler);
    PillStore.removeListener('pills-data-saved', () => loadPillsData());
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
