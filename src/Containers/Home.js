import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Dimensions} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BellyMapView from '../Components/MapView';
import fetchBasicData from '../Actions/FetchBasicData';
import fetchUserCoordinates from '../Actions/FetchUserCoordinates';
import fetchCustomLocation from '../Actions/FetchCustomLocation';
import _ from 'lodash';
import { SearchBar } from 'react-native-elements';

type Props = {};

class Home extends Component<Props> {
    constructor(props){
        super(props)

        this.state = ({
            externalData: null,
            latitude: null,
            longitude: null,
            error: null,
            cityInput: '',
            termInput: '',
        })
        this.onCityInputChange = this.onCityInputChange.bind(this)
        this.onCityInputClear = this.onCityInputClear.bind(this)
        this.onTermInputChange = this.onTermInputChange.bind(this)
        this.onTermInputClear = this.onTermInputClear.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
              this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                error: null,
              }, () => {
                  console.log(this.state.latitude, this.state.longitude, 'LAT&LONG')
                this.props.fetchBasicData(this.state.latitude, this.state.longitude).then(() => {
                    if(this.props.basicData.data.businesses){
                        this.setState({
                            externalData: this.props.basicData.data.businesses
                        })
                    }
                })
              });
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
          )
      }

    check() {
        if(this.state.latitude){
            console.log(this.state.latitude, 'state.latitude')
            console.log(this.state.longitude, 'state.longitude')
        }
        if(this.props.userCoordinates.coordinates.coords){
            console.log(this.props.userCoordinates.coordinates.coords.latitude, 'latitude')
            console.log(this.props.userCoordinates.coordinates.coords.longitude, 'longitude')
        }
        if(this.props.basicData.data){
            console.log(this.props.basicData.data);
        }
        if(this.props.customData.data.region){
            console.log(this.props.customData, 'customLocation')
            console.log(this.props.customData.data.region.center.latitude, 'customLocationLatitude')
            // console.log(this.props.customData.data.coordinates.longitude, 'customLocationLongitude')
        }
    }

    onCityInputChange(cityInput){
        this.setState({
            cityInput: cityInput
        })
        console.log(this.state.cityInput)
    }
    onTermInputChange(termInput){
        this.setState({
            termInput: termInput
        })
        console.log(this.state.termInput)
    }
    onCityInputClear(){
        this.setState({
            cityInput: ''
        })
        console.log(this.state.cityInput)
    }
    onTermInputClear(){
        this.setState({
            termInput: ''
        })
        console.log(this.state.termInput)
    }
    
    onSubmit() {
        this.props.fetchCustomLocation(this.state.cityInput, this.state.termInput).then(() => {
            if(this.props.customData.data.region){
                this.setState({
                    latitude: this.props.customData.data.region.center.latitude,
                    longitude: this.props.customData.data.region.center.longitude,
                    externalData: this.props.customData.data.businesses
                }, console.log(this.state, 'stateee'))
            }
        })
    }


    render(){
        return (
            <View style={styles.container}>
                <BellyMapView
                    lat={this.state.latitude}
                    lon={this.state.longitude}
                    data={this.state.externalData}
                />
                <SearchBar 
                    lightTheme
                    value={this.state.cityInput}
                    onChangeText={this.onCityInputChange}
                    onClear={this.onCityInputClear}
                    onSubmitEditing={this.onSubmit}
                    placeholder='Type Here...' />
                <SearchBar 
                    lightTheme
                    value={this.state.termInput}
                    onChangeText={this.onTermInputChange}
                    onClear={this.onTermInputClear}
                    onSubmitEditing={this.onSubmit}
                    placeholder='Type Here...' />
                    
                {
                    this.check()
                }
                
            </View>
        )
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchBasicData, fetchUserCoordinates, fetchCustomLocation }, dispatch);
  }

const mapStateToProps = (state) => {
    return {
        basicData: state.basicData,
        userCoordinates: state.userCoordinates,
        customData: state.customData
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
    container: {
    //   position: 'absolute',
    //   top: 0,
    //   left: 0,
    //   right: 0,
    //   bottom: 0,
    //   justifyContent: 'flex-end',
    //   alignItems: 'center'
    flex: 1,
    flexDirection: 'column',
    marginTop: 50
    },
    map: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
    },

  });