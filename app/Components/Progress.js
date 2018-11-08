import React, { Component } from 'react';
import { View, Text, Image, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import PercentageCircle from 'react-native-percentage-circle';
import LinearGradient from 'react-native-linear-gradient';
import { saveData, getData } from '../data/StoreService';
import moment from 'moment';

export default class ProgressScreen extends Component{
  constructor(props) {
    super(...props);
    this.state = {
      pills: 1,
      leftPills: 180,
      lastPillTaken: null,
      user: null,
      daysSinceStart: 0,
      leftDays: 30,
      daysWidth: 100,
      daysMargin: 0,
      pillsWidth: 100,
      pillsMargin: 0,
      moneySaved: 0,
      notSomked: 0,
      shortCurrecny: '',
    };
  }

  getItemAtPos(pos, name) {
    if (this.state.user)
      return this.state.user[pos][name];
  }

  componentDidMount() {
    getData('pillsTaken').then((data, err) => {
      const jsonData = JSON.parse(data);

      if (jsonData) {
        this.setState({
            pills: jsonData.pillsTaken,
            leftPills: 180 - jsonData.pillsTaken,
            lastPillTaken: jsonData.lastPillTaken,
            pillsWidth: Math.round((((180 - jsonData.pillsTaken) / 180) * 100)),
            pillsMargin: Math.round(((jsonData.pillsTaken / 180) * 100)),
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
          leftDays: 30 - moment().diff(moment(jsonUser[3].startingDate), 'days'),
          daysWidth: Math.round(((30 - moment().diff(moment(jsonUser[3].startingDate), 'days')) / 30) * 100),
          daysMargin: Math.round((moment().diff(moment(jsonUser[3].startingDate), 'days') / 30) * 100),
          // pricePerPack / 25 (total cigarretes in pack) * ciggarettesPerDay * day past//
          moneySaved: Math.round(((jsonUser[1].pricePerPack / 25) * jsonUser[2].ciggarettesPerDay) * moment().diff(moment(jsonUser[3].startingDate), 'days')),
          notSomked: jsonUser[2].ciggarettesPerDay * moment().diff(moment(jsonUser[3].startingDate), 'days'),
          shortCurrecny: jsonUser[0].currency.split('-')[1],
        });
      }
    });
  }

  render() {
    console.warn(this.state);
    return (
      <ImageBackground
        style={styles.backgroundImage}
        source={require('../imgs/background.png')}>
        <Image
          style={styles.logo}
          resizeMode='contain'
          source={require('../imgs/tracking.png')}/>
        <View>
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
              <TouchableOpacity style={[styles.innerBar, { marginLeft: `${this.state.pillsMargin ? this.state.pillsMargin: 0}%`, width: `${this.state.pillsWidth ? this.state.pillsWidth : 100}%` }]}>
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
              <TouchableOpacity style={[styles.innerBar, { marginLeft: `${this.state.daysMargin ? this.state.daysMargin : 0}%`, width: `${this.state.daysWidth ? this.state.daysWidth : 100}%` }]}>
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
          <TouchableOpacity style={styles.moneyArea}>
            <Text style={styles.areaTextBolded}>{this.state.moneySaved}</Text>
            <Text style={styles.areaText}>{this.state.shortCurrecny} saved</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.ciggarettesArea}>
            <Text style={styles.areaTextBolded}>{this.state.notSomked}</Text>
            <Text style={styles.areaTextSmaller}>ciggarettes not smoked</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.daysArea}>
            <Text style={styles.areaTextBolded}>{this.state.daysSinceStart}</Text>
            <Text style={styles.areaTextSmaller}>days smoke free</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  logo: {
    width: 200,
    height: 250,
  },

  img: {
    width: 30,
    height: 28,
    padding: 5,
    marginLeft: -10,
    marginTop: 10,
  },

  tabBarRow: {
    margin: 15,
    width: '90%',
    flexDirection: 'row',
  },

  imageHolder: {
    width: '10%',
    height: 70,
    flexDirection: 'column',
  },

  tabBarHolder: {
    width: '90%',
    height: 70,
    flexDirection: 'column',
  },

  backgroundImage: {
    width: '100%',
    height: '100%',
    flex: 1,
    marginTop: -70,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  barGreen: {
    marginTop: 11,
    marginRight: 10,
    width: 310,
    height: 'auto',
    borderWidth: 2,
    marginLeft: -5,
    borderColor: '#56c17b',
    borderRadius: 50,
  },

  barPurple: {
    marginTop: 11,
    marginRight: 10,
    width: 310,
    height: 'auto',
    borderWidth: 2,
    marginLeft: -5,
    borderColor: '#ac66ea',
    borderRadius: 50,
  },

  barBottomRow: {
    flex: 1,
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
    marginTop: 35,
    marginBottom: 35,
  },

  infoArea: {
    marginBottom: 20,
    marginTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  moneyArea: {
    padding: 4,
    height: 'auto',
    width: 95,
    height: 95,
    borderWidth: 2,
    borderColor: '#d0f190',
    borderRadius: 50,
  },

  ciggarettesArea: {
    padding: 4,
    height: 'auto',
    width: 95,
    height: 95,
    borderWidth: 2,
    borderColor: '#2ca5af',
    borderRadius: 50,
  },

  daysArea: {
    padding: 4,
    height: 'auto',
    width: 95,
    height: 95,
    borderWidth: 2,
    borderColor: '#af67eb',
    borderRadius: 50,
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
