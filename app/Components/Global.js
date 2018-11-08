import React, { Component } from 'react';
import { View, Text, Image, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import PercentageCircle from 'react-native-percentage-circle';
import LinearGradient from 'react-native-linear-gradient';
import { saveData, getData } from '../data/StoreService';
import moment from 'moment';

export default class Global extends Component{
  constructor(props) {
    super(...props);
    this.state = {
      peopleArroundGLobe: 135565,
      updatedAt: '',
    };
  }

  componentDidMount() {
    getData('userData').then((user, err) => {
      const jsonUser = JSON.parse(user);

      if (jsonUser) {

        this.setState({
          daysSinceStart: moment().diff(moment(jsonUser[3].startingDate), 'days'),
          peopleArroundGLobe: this.state.peopleArroundGLobe + moment().diff(moment(jsonUser[3].startingDate), 'days'),
        });
      }
    });
  }

  render() {
    return (
      <ImageBackground
        style={styles.backgroundImage}
        source={require('../imgs/background.png')}>
        <Image
          style={styles.logo}
          resizeMode='contain'
          source={require('../imgs/tracking.png')}/>
        <Image
          style={styles.earthImg}
          resizeMode='contain'
          source={require('../imgs/Earth.png')}/>
          <View style={styles.containerInner}>
            <Text style={{ marginTop: 5, fontSize: 18, color: '#0648aa', textAlign: 'center' }}>
              {this.state.peopleArroundGLobe}
            </Text>
            <Text style={{ marginTop: 5, fontSize: 14, color: '#0648aa', textAlign: 'center' }}>
              people arround the world quit smoking today
            </Text>
            <View style={styles.innerRow}>
              <Image
                style={styles.img}
                resizeMode='contain'
                source={require('../imgs/pin.png')}/>
              <Text style={{ fontSize: 12, color: '#0648aa', flex: 1, textAlign: 'right' }}>
                {this.state.peopleArroundGLobe} people in 7 different countries and 2 continents quit smoking today.
              </Text>
            </View>
          </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    height: '100%',
    flex: 1,
    marginTop: -70,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  logo: {
    width: 200,
    height: 250,
  },

  earthImg: {
    marginTop: -70,
    width: 350,
    height: 350,
  },

  img: {
    width: 30,
    height: 28,
    padding: 5,
    marginLeft: -10,
    marginTop: 10,
  },

  containerInner: {
    flexDirection: 'column',
    width: '90%',
    height: '25%',
    marginTop: -30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    borderRadius: 50,
  },

  innerRow: {
    flexDirection: 'row',
    width: '80%',
    marginTop: 20,
  },
});
