import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BellyMapView from './MapView';
import fetchBasicData from '../Actions/FetchBasicData';
import fetchUserCoordinates from '../Actions/FetchUserCoordinates';
import _ from 'lodash';

type Props = {};

class Home extends Component<Props> {
    constructor(props){
        super(props)

        this.state = ({
            externalData: null,
            latitude: null,
            longitude: null,
            error: null
        })
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
              this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                error: null,
              }, () => {
                this.props.fetchBasicData(this.state.latitude, this.state.longitude)
              });
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
          )
      }

    check() {
        if(this.state.latitude){
            console.log(this.state.latitude, 'state.latitude')
        }
        if(this.props.userCoordinates.coordinates.coords){
            console.log(this.props.userCoordinates.coordinates.coords.latitude, 'latitude')
            console.log(this.props.userCoordinates.coordinates.coords.longitude, 'longitude')
        }
        if(this.props.basicData.data){
            console.log(this.props.basicData.data);
        }
    }

    render(){
        return (
            <View style={styles.container}>
                <BellyMapView />
                {
                    this.check()
                }
            </View>
        )
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchBasicData, fetchUserCoordinates }, dispatch);
  }

const mapStateToProps = (state) => {
    return {
        basicData: state.basicData,
        userCoordinates: state.userCoordinates
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Home);

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