import React, {Component} from 'react';
import MapView from 'react-native-maps';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
type Props = {};

class BellyMapView extends Component<Props> {

  renderMarkers() {
    if(this.props.basicData.data.businesses){
      console.log(this.props.basicData.data.businesses, 'dad')
      return (
        this.props.basicData.data.businesses.map((biz) => {
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
              description={biz.name}
            />
          )
        })
      )

    }
  }
    render() {
      const lat = this.props.lat;
      const lon = this.props.lon;
        return (
          
          <View style={styles.container}>
    
          {this.props.basicData.data.businesses &&
            
            <MapView style={styles.map}
              region={{
                latitude: lat,
                longitude: lon,
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
          {!this.props.basicData.data.businesses &&
            <MapView style={styles.map}
              region={{
                latitude: 41.8781,
                longitude: -87.6298,
                latitudeDelta: 15.0,
                longitudeDelta: 15.0,
              }}
              showsUserLocation
            >
            </MapView>
          }
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

  const mapStateToProps = (state) => {
    return {
        basicData: state.basicData,
        userCoordinates: state.userCoordinates
    };
};

export default connect(mapStateToProps, null)(BellyMapView);