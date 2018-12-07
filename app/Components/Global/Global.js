import React, { Component } from 'react';
import PercentageCircle from 'react-native-percentage-circle';
import LinearGradient from 'react-native-linear-gradient';
import { addNewUserProps, saveUser, loadUser } from '../../data/FluxActions';
import moment from 'moment';
import UserStore from '../../data/UserStore';
import Orientation from 'react-native-orientation';
import MapView, { Marker } from 'react-native-maps';
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

export default class Global extends Component{
  constructor(props) {
    super(props);

    const jsonUser = UserStore.getUser();
    const window = Dimensions.get('window');
    const { width, height }  = window;
    const LATITUDE_DELTA = 1.5;
    const ASPECT_RATIO = (width / height);
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

    let coeficient =  moment().diff(moment(jsonUser.startingDate), 'days');

    this.state = {
      peopleArroundGLobe: coeficient < 0 ? 135565 : 135565 + coeficient,
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

  componentWillMount() {
    const initial = Orientation.getInitialOrientation();
    this.setState({ isLandScape: initial === 'LANDSCAPE' });
    UserStore.on('user-updated', this._getUserStartingDate);
    UserStore.on('user-saved', () => loadUser());
    Orientation.addOrientationListener(this._orientationDidChange);
  }

  componentWillUnmount() {
    UserStore.removeListener('user-updated', this._getUserStartingDate);
    UserStore.removeListener('user-saved', () => loadUser());
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
