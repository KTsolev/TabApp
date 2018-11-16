import React, { Component } from 'react';
import PercentageCircle from 'react-native-percentage-circle';
import PillsButton from './PillsButton';
import moment from 'moment';
import { View, Text, Image, StyleSheet, ImageBackground } from 'react-native';
import { addNewUserProps, saveUser, loadUser } from '../data/FluxActions';
import UserStore from '../data/UserStore';
import PillStore from '../data/PillStore';

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
    const currency = user.currency;

    this.state = {
      pills: pills.count,
      pillsTakenToday: user.pillsTakenToday ? user.pillsTakenToday : 1,
      lastPillTaken: null,
      timeSinceStart,
      daysSinceStart,
      endingDate,
      currency,
      notSmoked,
      moneySaved,
    };

    this._getUser = this._getUser.bind(this);
    this._incrementPills = this._incrementPills.bind(this);
  }

  _incrementPills() {
    let pills = PillStore.getPills();
    if (this.state.pills < 6) {
      let sum = this.state.pillsTakenToday + pills.count;
      this.setState({
        pills: pills.count,
        pillsTakenToday: sum,
        lastPillTaken: pills.lastPillTaken,
      });
    }
  }

  _getUser() {
    const jsonUser = UserStore.getUser();
    const startingDate = jsonUser.startingDate;
    const timeSinceStart = moment().diff(moment(startingDate), 'hours');
    const daysSinceStart = moment().diff(moment(startingDate), 'days');
    const endingDate = jsonUser.endingDate;
    const currency = jsonUser.currency;

    this.setState({
      timeSinceStart,
      startingDate,
      daysSinceStart,
      endingDate,
      currency,
      pricePerPack: jsonUser.pricePerPack ? jsonUser.pricePerPack: this.state.pricePerPack,
      ciggarettesPerDay: jsonUser.ciggarettesPerDay ? jsonUser.ciggarettesPerDay : this.state.ciggarettesPerDay,
      pillsTakenToday: jsonUser.pillsTakenToday ? jsonUser.pillsTakenToday : this.state.pillsTakenToday,
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.pillsTakenToday !== this.state.pillsTakenToday) {
      addNewUserProps({ pillsTakenToday: this.state.pillsTakenToday });
      saveUser(UserStore.getUser());
    }
  }

  componentDidMount() {
    UserStore.on('user-updated', this._getUser);
    PillStore.on('pills-increased', this._incrementPills);
    UserStore.on('user-saved', () => loadUser());
  }

  componentWillUnmount() {
    UserStore.removeListener('user-updated', this._getUser);
    PillStore.removeListener('pills-increased', this._incrementPills);
    UserStore.removeListener('user-saved', () => loadUser());
  }

  render() {
    console.log(this.state);

    return (
      <View style={styles.headerContainer}>
        <ImageBackground
          style={styles.backgroundImage}
          source={require('../imgs/rectangle.png')}>
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
          <View style={styles.headerRow}>
            <PillsButton />
            <Text style={styles.headerText}>{this.state.pills} / 6 pills taken</Text>
          </View>
          </ImageBackground>
        <View style={styles.container}>
          <View style={styles.containerInner}>
            <View style={styles.innerRow}>
              <Text style={{ fontSize: 16, color: '#0648aa', flex: 1, textAlign: 'left' }}>quit date:</Text>
              <Text style={{ fontSize: 16, color: '#0648aa', flex: 1, textAlign: 'right' }}>
              { moment(this.state.endingDate).format('DD/MM/YYYY') }
              </Text>
            </View>
            <View style={styles.innerRow}>
              <Text style={{ fontSize: 16, color: '#0648aa', flex: 1, textAlign: 'left' }}>time since:</Text>
              <Text style={{ fontSize: 16, color: '#0648aa', flex: 1, textAlign: 'right' }}>{this.state.timeSinceStart}</Text>
            </View>
            <View style={styles.innerRow}>
              <Text style={{ fontSize: 16, color: '#0648aa', flex: 1, textAlign: 'left' }}>money saved:</Text>
              <Text style={{ fontSize: 16, color: '#0648aa', flex: 1, textAlign: 'right' }}>
                {`${this.state.moneySaved} ${this.state.currency}`}
              </Text>
            </View>
            <View style={styles.innerRow}>
              <Text style={{ fontSize: 16, color: '#0648aa', flex: 1, textAlign: 'left' }}>not smoked:</Text>
              <Text style={{ fontSize: 16, color: '#0648aa', flex: 1, textAlign: 'right' }}>
                {this.state.notSmoked}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  backgroundImage: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'contain',
  },

  logo: {
    width: 150,
    height: 100,
    resizeMode: 'contain',
  },

  headerContainer: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'flex-start',
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
    flex: 2,
    padding: 25,
    margin: 10,
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
    margin: 15,
  },

  innerRow: {
    width: '100%',
    flex: 1,
    height: 70,
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'space-between',
    borderColor: '#0648aa',
    borderBottomWidth: 2,
  },
});
