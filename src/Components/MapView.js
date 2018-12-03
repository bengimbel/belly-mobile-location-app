import React, {Component} from 'react';
import MapView from 'react-native-maps';
import {Platform, StyleSheet, Text, View} from 'react-native';

type Props = {};

export default class BellyMapView extends Component<Props> {
    render() {
        return (
          <View style={styles.container}>
    
            <MapView style={styles.map}
              region={{
                latitude: 41.878113,
                longitude: -87.629799,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1
              }}
              showsUserLocation
            >
            <MapView.Marker 
              coordinate={{
                latitude: 41.878113,
                longitude: -87.629799
              }}
              title={'marker#1'}
              description={'marker description'}
            />
              
            </MapView>

          </View>
        );
      }
}

const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'flex-end',
      alignItems: 'center'
    },
    map: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
    }
  });