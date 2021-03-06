import React, { Component } from 'react';
import PercentageCircle from 'react-native-percentage-circle';
import LinearGradient from 'react-native-linear-gradient';
import { addNewUserProps, saveUser, loadUser } from '../../data/FluxActions';
import moment from 'moment';
import UserStore from '../../data/UserStore';
import Orientation from 'react-native-orientation';
import MapView, { Marker } from 'react-native-maps';
import { AsyncStorage } from 'react-native';
import styles from './styles';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  Platform,
  Linking,
  LinkingIOS,
  Dimensions } from 'react-native';

const window = Dimensions.get('window');
const { width, height }  = window;
const LATITUDE_DELTA = 1.5;
const ASPECT_RATIO = (width / height);
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const START_OF_MONTH = moment().startOf('month');
const MIDDLE_OF_MONTH = moment().startOf('month').add(14, 'days');
const COEF = 7452;
let BASE = 135565;

export default class Global extends Component{
  constructor(props) {
    super(props);
    const jsonUser = UserStore.getUser();
    const toIncrease = moment().isSame(START_OF_MONTH, 'days') || moment().isSame(MIDDLE_OF_MONTH, 'days');

    this.state = {
      peopleArroundGLobe: toIncrease ? BASE + COEF : BASE,
      isLandScape: false,
      initialRegion: {
          latitude: 47.810175,
          longitude: 13.045552,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        },
      region: {
          latitude: 47.810175,
          longitude: 13.045552,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        },
      markerPositions: [
        {
          title: 'People using Tabeks',
          coordinates: {
            latitude: 47.810175,
            longitude: 13.045552,
          },
        }, {
          title: 'People using Tabeks',
          coordinates: {
            latitude: 48.178978,
            longitude: 11.643729,
          },
        }, {
          title: 'People using Tabeks',
          coordinates: {
            latitude: 49.498006,
            longitude: 11.066757,
          },
        }, {
          title: 'People using Tabeks',
          coordinates: {
            latitude: 47.150983,
            longitude: 9.675587,
          },
        }, {
          title: 'People using Tabeks',
          coordinates: {
            latitude: 44.515366,
            longitude: 11.051963,
          },
        }, {
          title: 'People using Tabeks',
          coordinates: {
            latitude: 45.795467,
            longitude: 5.320312,
          },
        }, {
          title: 'People using Tabeks',
          coordinates: {
            latitude: 47.065358,
            longitude: 9.738450,
          },
        },
      ],
    };

    this._getUserStartingDate = this._getUserStartingDate.bind(this);
    this._orientationDidChange = this._orientationDidChange.bind(this);
  }

  _orientationDidChange(orientation) {
    this.setState({ isLandScape: orientation === 'LANDSCAPE' });
  }

  _getUserStartingDate() {
    const jsonUser = UserStore.getUser();
    const dates = this._getSelectedRange(jsonUser.startingDate);
    this.setState({
      peopleArroundGLobe: this.state.peopleArroundGLobe + moment().diff(moment(jsonUser.startingDate), 'days'),
    });
  }

  async saveStatistics() {
    let stats = await this.loadStatistics();
    console.log('loaded', stats);

    console.log('in save')
    if (this.state.peopleArroundGLobe > stats.prevValue) {
      console.log('in stats')
      try {
        await AsyncStorage.setItem('peopleArroundGLobe', JSON.stringify({ peopleArroundGLobe: this.state.peopleArroundGLobe, prevValue: this.state.peopleArroundGLobe }));
      } catch (err) {
        console.log(err);
      }
    }

  }

  async loadStatistics() {
    let stats;
    console.log('in load');
    try {
      let data = await AsyncStorage.getItem('peopleArroundGLobe');
      let jsonData = JSON.parse(data);
      console.log(jsonData);

      stats = jsonData;
    } catch (err) {
      console.log(err);
    }

    return stats;
  }

  componentWillMount() {
    this.loadStatistics().then((data) => {
      let toIncrease = moment().isSame(START_OF_MONTH, 'days') || moment().isSame(MIDDLE_OF_MONTH, 'days');
      console.log(data);
      this.setState({
        peopleArroundGLobe: toIncrease ? data.peopleArroundGLobe + COEF : data.peopleArroundGLobe,
      });
    });
    this.saveStatistics().then(err => err ? console.log(err) : console.log('success'));

    const initial = Orientation.getInitialOrientation();
    this.setState({ isLandScape: initial === 'LANDSCAPE' });
    UserStore.on('user-updated', this._getUserStartingDate);
    UserStore.on('user-saved', () => loadUser());
    UserStore.on('number-saved', () => loadNumber());
    Orientation.addOrientationListener(this._orientationDidChange);
  }

  componentWillUnmount() {
    UserStore.removeListener('user-updated', this._getUserStartingDate);
    UserStore.removeListener('user-saved', () => loadUser());
    UserStore.removeListener('number-saved', () => loadNumber());
    Orientation.removeOrientationListener(this._orientationDidChange);
  }

  render() {
    if (this.state.isLandScape) {
      return (
        <ImageBackground
        style={[styles.backgroundImage, { flexDirection: 'row' }]}
        source={require('../../imgs/backgroud12.png')}>
          <View style={{ flex: 1, width: '50%' }}>
              <MapView
                 style={[styles.map, { height: 350, width: 250, alignSelf: 'center' }]}
                 loadingEnabled={true}
                 initialRegion={this.state.initialRegion}
                 region={this.state.region}>
                  {this.state.markerPositions.map((marker, index) => (
                    <Marker
                      key={index}
                      coordinate={marker.coordinates}
                      title={marker.title}
                    />
                  ))}
               </MapView>
          </View>
          <View style={{ flex: 1, width: '50%', alignItems: 'flex-start' }}>
            <TouchableOpacity
              style={{justifyContent: 'center', alignSelf: 'center'}}
              onPress={() => Platform === 'ios' ? LinkingIOS.openURL('https://www.tabex.bg/links/TABEX_LEAFLET_ss3360.pdf') : Linking.openURL('https://www.tabex.bg/links/TABEX_LEAFLET_ss3360.pdf')}>
              <Image
                style={[styles.logo, {justifyContent: 'center', alignSelf: 'center'}]}
                source={require('../../imgs/trackingi.png')} />
            </TouchableOpacity>
          <View style={[styles.containerInner, { flex: 2,  maxHeight: '90%', padding: 40 }]}>
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
                source={require('../../imgs/pin.png')}/>
              <Text style={{ fontSize: 10, color: '#0648aa', flex: 1, textAlign: 'right' }}>
                {this.state.peopleArroundGLobe}
                people in 7 different countries and 2 continents quit smoking today.
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>);
    } else {
      return (<ImageBackground
        style={styles.backgroundImage}
        source={require('../../imgs/backgroud12.png')}>
        <TouchableOpacity
          onPress={() => Platform === 'ios' ? LinkingIOS.openURL('https://www.tabex.bg/links/TABEX_LEAFLET_ss3360.pdf') : Linking.openURL('https://www.tabex.bg/links/TABEX_LEAFLET_ss3360.pdf')}>
          <Image
            style={styles.logo}
            source={require('../../imgs/trackingi.png')} />
        </TouchableOpacity>
          <MapView
             style={styles.map}
             loadingEnabled={true}
             initialRegion={this.state.initialRegion}
             region={this.state.region}>
              {this.state.markerPositions.map((marker, index) => (
                <Marker
                  key={index}
                  coordinate={marker.coordinates}
                  title={marker.title}
                />
              ))}
           </MapView>
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
                source={require('../../imgs/pin.png')}/>
              <Text style={{ fontSize: 10, color: '#0648aa', flex: 1, textAlign: 'right' }}>
                {this.state.peopleArroundGLobe}
                people in 7 different countries and 2 continents quit smoking today.
              </Text>
            </View>
          </View>
      </ImageBackground>);
    }
  }
}
