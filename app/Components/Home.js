import React, { Component } from 'react';
import PercentageCircle from 'react-native-percentage-circle';
import PillsButton from './PillsButton';
import moment from 'moment';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Divider } from 'react-native-elements';
import { saveData, getData } from '../data/StoreService';

export default class Home extends Component {
  constructor(props) {
    super(...props);
    this.state = {
      pills: 1,
      pillsTakenToday: 1,
      lastPillTaken: null,
      user: null,
      ciggarettesInPack: 25,
      timeSinceStart: 0,
      daysSinceStart: 0,
      shortCurrecny: '',
    };

    this.incrementPills = this.incrementPills.bind(this);
  }

  incrementPills() {
    if (this.state.pillsTakenToday < 6) {
      this.setState({ pills: this.state.pills + 1, pillsTakenToday:this.state.pillsTakenToday + 1 ,lastPillTaken: moment().format() });
    }
  }

  getItemAtPos(pos, name) {
    if (this.state.user)
      return this.state.user[pos][name];
  }

  componentDidUpdate() {
    saveData('pillsTaken', {
      pillsTaken: this.state.pills,
      lastPillTaken: this.state.lastPillTaken,
      pillsTakenToday: moment().diff(moment(this.state.lastPillTaken), 'days') !== 0 ? 1 : this.state.pillsTakenToday,
    });
  }

  componentDidMount() {
    getData('pillsTaken').then((data, err) => {
      const jsonData = JSON.parse(data);

      if (jsonData) {
        this.setState({
            pills: jsonData.pillsTaken,
            lastPillTaken: jsonData.lastPillTaken,
          });
      }
    });

    getData('userData').then((user, err) => {
      const jsonUser = JSON.parse(user);

      if (jsonUser) {

        this.setState({
          user: jsonUser,
          timeSinceStart: moment().diff(moment(jsonUser[3].startingDate), 'hours'),
          daysSinceStart: moment().diff(moment(jsonUser[3].startingDate), 'days'),
          // pricePerPack / 25 (total cigarretes in pack) * ciggarettesPerDay * day past//
          moneySaved: Math.round(((jsonUser[1].pricePerPack / this.state.ciggarettesInPack) * jsonUser[2].ciggarettesPerDay ) * moment().diff(moment(jsonUser[3].startingDate), 'days')),
          notSomked: (jsonUser[2].ciggarettesPerDay * moment().diff(moment(jsonUser[3].startingDate), 'days')),
          shortCurrecny: jsonUser[0].currency.split('-')[1],
        });
      }
    });
  }

  render() {
    console.warn(this.state)
    return (
      <View style={styles.headerContainer}>
        <Image style={styles.logo} source={require('../imgs/tracking.png')}/>
        <PercentageCircle
          radius={75}
          percent={this.state.daysSinceStart}
          innerColor={'#0187e6'}
          bgcolor={'#3498db'}
          borderWidth={5}
          color={'#d3ebfb'}>
            <Text style={{ fontSize: 16, color: '#d3ebfb' }}>{this.state.daysSinceStart}</Text>
            <Text style={{ fontSize: 16, color: '#d3ebfb' }}>DAYS</Text>
            <Text style={{ fontSize: 16, color: '#d3ebfb' }}>smoke free</Text>
        </PercentageCircle>
        <Divider style={styles.headerDivider}></Divider>
        <View style={styles.headerRow}>
          <PillsButton increasePills={this.incrementPills}/>
          <Text style={styles.headerText}>{this.state.pills} / 6 pills taken</Text>
        </View>
        <View style={styles.containerInner}>
          <View style={styles.innerRow}>
            <Text style={{ fontSize: 16, color: '#0648aa', flex: 1, textAlign: 'left' }}>quit date:</Text>
            <Text style={{ fontSize: 16, color: '#0648aa', flex: 1, textAlign: 'right' }}>
            { moment(this.getItemAtPos(3, 'endingDate')).format('L') }
            </Text>
          </View>
          <Divider style={styles.rowDivider}></Divider>
          <View style={styles.innerRow}>
            <Text style={{ fontSize: 16, color: '#0648aa', flex: 1, textAlign: 'left' }}>time since:</Text>
            <Text style={{ fontSize: 16, color: '#0648aa', flex: 1, textAlign: 'right' }}>{this.state.timeSinceStart}</Text>
          </View>
          <Divider style={styles.rowDivider}></Divider>
          <View style={styles.innerRow}>
            <Text style={{ fontSize: 16, color: '#0648aa', flex: 1, textAlign: 'left' }}>money saved:</Text>
            <Text style={{ fontSize: 16, color: '#0648aa', flex: 1, textAlign: 'right' }}>
              {`${this.state.moneySaved} ${this.state.shortCurrecny}`}
            </Text>
          </View>
          <Divider style={styles.rowDivider}></Divider>
          <View style={styles.innerRow}>
            <Text style={{ fontSize: 16, color: '#0648aa', flex: 1, textAlign: 'left' }}>not smoked:</Text>
            <Text style={{ fontSize: 16, color: '#0648aa', flex: 1, textAlign: 'right' }}>
              {this.state.notSomked}
            </Text>
          </View>
          <Divider style={styles.rowDivider}></Divider>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  logo: {
    width: 150,
    height: 100,
    resizeMode: 'contain',
  },

  headerContainer: {
    flexDirection: 'column',
    width: '100%',
    height: '55%',
    justifyContent: 'flex-start',
    backgroundColor: '#0187e6',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  headerText: {
    color: '#fff',
    fontSize: 18,
    paddingLeft: 15,
    paddingRight: 15,
    textAlign: 'center',
  },

  containerInner: {
    flexDirection: 'column',
    width: '90%',
    height: '60%',
    padding: 25,
    marginTop: 25,
    marginBottom: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    borderRadius: 50,
    shadowColor: '#000000',
    shadowOffset: {
        width: 0,
        height: 3,
      },
    shadowRadius: 5,
    shadowOpacity: 1.0,
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  innerRow: {
    flex: 1,
    width: '100%',
    height: 70,
    flexDirection: 'row',
    paddingLeft: 5,
    paddingRight: 5,
    justifyContent: 'space-around',
  },

  headerDivider: {
    width: '100%',
    height: 2,
    marginTop: 25,
    marginBottom: 25,
    marginLeft: -10,
    marginRight: -10,
    borderColor: '#d3ebfb',
    borderWidth: 1,
  },

  rowDivider: {
    width: '100%',
    marginTop: 5,
    marginBottom: 5,
    borderColor: '#0648aa',
    borderWidth: 1,
  },
});
