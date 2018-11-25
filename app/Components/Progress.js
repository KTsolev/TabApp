import React, { Component } from 'react';
import { View, Text, Image, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import PercentageCircle from 'react-native-percentage-circle';
import LinearGradient from 'react-native-linear-gradient';
import { addNewUserProps, saveUser, loadUser } from '../data/FluxActions';
import moment from 'moment';
import UserStore from '../data/UserStore';

export default class ProgressScreen extends Component{
  constructor(props) {
    super(props);
    const user = UserStore.getUser();
    console.log(user);
    const pillsTaken = user.pillsTaken ? Number(user.pillsTaken) > 180 ? 180 : Number(user.pillsTaken) : 1;
    const timeSinceStart = moment().diff(moment(user.startingDate), 'hours');
    const daysSinceStart = moment().diff(moment(user.startingDate), 'days');
    const leftDays = 30 - daysSinceStart;
    const currency = user.currency.split('-')[1];
    const daysWidth = Math.round(((30 - daysSinceStart) / 30) * 100);
    const daysMargin = Math.round((daysSinceStart / 30) * 100);
    const leftPills = 180 - pillsTaken;
    const pillsWidth = Math.round((((180 - pillsTaken) / 180) * 100));
    const pillsMargin = Math.round((pillsTaken / 180) * 100);
    // pricePerPack / 25 (total cigarretes in pack) * ciggarettesPerDay * day past//
    const moneySaved = Math.round(((user.pricePerPack / 25) * user.ciggarettesPerDay) * daysSinceStart);
    const notSomked = user.ciggarettesPerDay * daysSinceStart;

    this.state = {
      timeSinceStart,
      daysSinceStart,
      leftPills,
      leftDays,
      daysWidth,
      currency,
      daysMargin,
      pillsWidth,
      pillsMargin,
      moneySaved,
      notSomked,
    };

    this._getUserInfo = this._getUserInfo.bind(this);
  }

  _getUserInfo() {
    const user = UserStore.getUser();
    console.log(user);
    const pills = user.pillsTaken ? Number(user.pillsTaken) : 0;
    const timeSinceStart = moment().diff(moment(user.startingDate), 'hours');
    const daysSinceStart = moment().diff(moment(user.startingDate), 'days');
    const leftDays = 30 - daysSinceStart;
    const daysWidth = Math.round(((30 - daysSinceStart) / 30) * 100);
    const daysMargin = Math.round((daysSinceStart / 30) * 100);
    const leftPills = 180 - pills;
    const currency = user.currency.split('-')[1];
    const pillsWidth = Math.round((((180 - pills) / 180) * 100));
    const pillsMargin = Math.round(((pills / 180) * 100));
    // pricePerPack / 25 (total cigarretes in pack) * ciggarettesPerDay * day past//
    const moneySaved = Math.round(((user.pricePerPack / 25) * user.ciggarettesPerDay) * daysSinceStart);
    const notSomked = user.ciggarettesPerDay * daysSinceStart;

    this.setState({
      user,
      leftPills,
      timeSinceStart,
      daysSinceStart,
      leftDays,
      currency,
      daysWidth,
      daysMargin,
      pills,
      pillsWidth,
      pillsMargin,
      moneySaved,
      notSomked,
    });
  }

  componentDidMount() {
    UserStore.on('user-updated', this._getUserInfo);
    UserStore.on('user-saved', () => loadUser());
  }

  componentWillUnmount() {
    UserStore.removeListener('user-updated', this._getUserInfo);
    UserStore.removeListener('user-saved', () => loadUser());
  }

  render() {
    return (
      <ImageBackground
        style={styles.backgroundImage}
        source={require('../imgs/background.png')}>
        <View style={styles.container}>
          <Image
            style={styles.logo}
            resizeMode='contain'
            source={require('../imgs/trackingi.png')}/>
        </View>
        <View style={styles.headerContainer}>
          <PercentageCircle
            radius={60}
            percent={this.state.daysMargin}
            innerColor={'#d3ebfb'}
            bgcolor={'#d3ebfb'}
            borderWidth={5}
            color={'#3caf9c'}>
              <Text style={{ fontSize: 22, color: '#002157' }}>{`${this.state.daysMargin}%`}</Text>
              <Text style={{ fontSize: 16, color: '#002157' }}>completed</Text>
          </PercentageCircle>
        </View>
        <View style={styles.tabBarRow}>
          <View style={styles.imageHolder}>
            <Image style={styles.img} source={require('../imgs/pill-smaller.png')} />
          </View>
          <View style={styles.tabBarHolder}>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 0.3, y: 1 }}
              colors={['#56c17b', '#2ca5af']}
              style={styles.barGreen}>
              <TouchableOpacity disabled={true} style={[styles.innerBar, { marginLeft: `${this.state.pillsMargin ? this.state.pillsMargin : 0}%`, width: `${this.state.pillsWidth ? this.state.pillsWidth : 100}%` }]}>
                  <Text style={styles.innerBarText}>{this.state.leftPills} pills left</Text>
              </TouchableOpacity>
            </LinearGradient>
            <View style={styles.barBottomRow}>
              <Text style={styles.barLeftText}>0</Text>
              <Text style={styles.barRightText}>180</Text>
            </View>
          </View>
        </View>
        <View style={styles.tabBarRow}>
          <View style={styles.imageHolder}>
            <Image style={styles.img} source={require('../imgs/heart.png')} />
          </View>
          <View style={styles.tabBarHolder}>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 0.3, y: 1 }}
              colors={['#ac66ea', '#3655bb']}
              style={styles.barPurple}>
              <TouchableOpacity disabled={true} style={[styles.innerBar, { marginLeft: `${this.state.daysMargin ? this.state.daysMargin : 0}%`, width: `${this.state.daysWidth ? this.state.daysWidth : 100}%` }]}>
                  <Text style={styles.innerBarText}>{this.state.leftDays} days left</Text>
              </TouchableOpacity>
            </LinearGradient>
            <View style={styles.barBottomRow}>
              <Text style={styles.barLeftText}>0</Text>
              <Text style={styles.barRightText}>30</Text>
            </View>
          </View>
        </View >
        <View style={styles.infoArea}>
          <TouchableOpacity disabled={true} style={styles.moneyArea}>
            <Text style={styles.areaTextBolded}>{this.state.moneySaved}</Text>
            <Text style={styles.areaText}>{this.state.currency} saved</Text>
          </TouchableOpacity>
          <TouchableOpacity disabled={true} style={styles.ciggarettesArea}>
            <Text style={styles.areaTextBolded}>{this.state.notSomked}</Text>
            <Text style={styles.areaTextSmaller}>ciggarettes not smoked</Text>
          </TouchableOpacity>
          <TouchableOpacity disabled={true} style={styles.daysArea}>
            <Text style={styles.areaTextBolded}>{this.state.daysSinceStart}</Text>
            <Text style={styles.areaTextSmaller}>days smoke free</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    flex: 1,
    maxWidth: 200,
    maxHeight: '10%',
    marginTop: 50,
    marginBottom: 50,
  },

  img: {
    width: 25,
    height: 25,
    marginTop: 10,
    resizeMode: 'contain',
  },

  headerContainer: {
    flex: 1,
    maxHeight: '20%',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  tabBarRow: {
    flex: 1,
    maxHeight: '15%',
    padding: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  imageHolder: {
    width: '10%',
    height: 70,
  },

  tabBarHolder: {
    width: '90%',
    height: 70,
  },

  backgroundImage: {
    resizeMode: 'contain',
    justifyContent: 'flex-start',
    flex: 1,
  },

  barGreen: {
    marginTop: 11,
    marginRight: 10,
    width: '100%',
    height: 'auto',
    borderWidth: 2,
    borderColor: '#56c17b',
    borderRadius: 50,
  },

  barPurple: {
    marginTop: 11,
    marginRight: 10,
    width: '100%',
    height: 'auto',
    borderWidth: 2,
    borderColor: '#ac66ea',
    borderRadius: 50,
  },

  barBottomRow: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  barLeftText: {
    fontSize: 12,
    color: '#fff',
    textAlign: 'left',
    marginLeft: 2,
  },

  barRightText: {
    fontSize: 12,
    color: '#fff',
    textAlign: 'right',
  },

  innerBarText: {
    fontSize: 12,
    color: '#fff',
    textAlign: 'right',
  },

  innerBar: {
    padding: 2,
    height: 'auto',
    marginLeft: '0%',
    width: '100%',
    backgroundColor: '#05439c',
    borderRadius: 50,
  },

  progressBar: {
    marginTop: 15,
    marginBottom: 15,
  },

  infoArea: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    maxHeight: '40%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  moneyArea: {
    padding: 4,
    height: 'auto',
    width: '33%',
    marginTop: 20,
    marginBottom: 20,
    height: '80%',
    borderWidth: 2,
    borderColor: '#d0f190',
    justifyContent: 'center',
    borderRadius: 100,
  },

  ciggarettesArea: {
    padding: 4,
    height: 'auto',
    width: '33%',
    marginTop: 20,
    marginBottom: 20,
    height: '80%',
    borderWidth: 2,
    borderColor: '#2ca5af',
    justifyContent: 'center',
    borderRadius: 100,
  },

  daysArea: {
    padding: 4,
    height: 'auto',
    width: '33%',
    marginTop: 20,
    marginBottom: 20,
    height: '80%',
    borderWidth: 2,
    borderColor: '#af67eb',
    justifyContent: 'center',
    borderRadius: 100,
  },

  areaText: {
    fontSize: 18,
    padding: 2,
    color: '#fff',
    textAlign: 'center',
  },

  areaTextBolded: {
    fontSize: 18,
    padding: 2,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
  },

  areaTextSmaller: {
    fontSize: 14,
    padding: 2,
    color: '#fff',
    textAlign: 'center',
  },

});
