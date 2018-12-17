import React, {Component} from 'react';
import MapView from 'react-native-maps';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
type Props = {};

class BellyMapView extends Component<Props> {
  constructor(props){
    super(props)

    this.state = ({
        latitude: null,
        longitude: null,
        data: null
    })
}

  renderMarkers() {
    if(this.props.data){
      return (
        this.props.data.map((biz) => {
          let milesUnformatted = biz.distance * 0.000621371192
          let miles = Math.round(milesUnformatted * 100) / 100
          return(
            <MapView.Marker
              key={biz.id}
              coordinate={{
                latitude: biz.coordinates.latitude,
                longitude: biz.coordinates.longitude,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1
              }}
              title={biz.name}
              description={miles.toString() + ' miles away'}
            />
          )
        })
      )

    } else{
      <Text>LOADING</Text>
    }
  }
    render() {
      let { lat, lon, data } = this.props;
        return (
          <View style={styles.container}>
          {
            lat !== null && lon !== null && data !== null &&
            <MapView style={styles.map}
            region={{
              latitude: this.props.lat,
              longitude: this.props.lon,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1
            }}
            showsUserLocation
          >
            {
              this.renderMarkers()
            }
          </MapView>
          }
          </View>
        );
      }
}

const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      flex: 1,
    },
    map: {
      display: 'flex',
      flexDirection: 'row',
      flex: 1,
    }
  });

  const mapStateToProps = (state) => {
    return {
        basicData: state.basicData,
        userCoordinates: state.userCoordinates
    };
};

export default connect(mapStateToProps, null)(BellyMapView);