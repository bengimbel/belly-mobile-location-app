import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Dimensions, TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BellyMapView from '../Components/MapView';
import BellyListView from '../Components/ListView';
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
            activateMapButtonToggle: true
        })
        this.onCityInputChange = this.onCityInputChange.bind(this)
        this.onCityInputClear = this.onCityInputClear.bind(this)
        this.onTermInputChange = this.onTermInputChange.bind(this)
        this.onTermInputClear = this.onTermInputClear.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.renderMapButton = this.renderMapButton.bind(this)
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
              this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                error: null,
              }, () => {
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
                })
            }
        })
    }

    renderMapButton(){
        if(this.state.activateMapButtonToggle){
            return(
                 <TouchableOpacity
                    style={styles.toggleButton}
                    raised={true}
                    onPress={() => this.setState({
                        activateMapButtonToggle: !this.state.activateMapButtonToggle
                    })}
                >
                    <Text style={styles.toggleButtonText}>Show List</Text>
                </TouchableOpacity>
            )
        } else {
            return(
                <TouchableOpacity
                    style={styles.toggleButton}
                    raised={true}
                    onPress={() => this.setState({
                        activateMapButtonToggle: !this.state.activateMapButtonToggle
                    })}
                >
                    <Text style={styles.toggleButtonText}>Show Map</Text>
                </TouchableOpacity>
            )
        }

    }


    render(){
        return (
            <View style={styles.phoneContainer}>
                {this.state.activateMapButtonToggle ? 
                    <View style={styles.mainContainer}>
                        <View style={styles.searchContainer}>
                            <Text style={styles.title}>Locations</Text>
                            {
                                this.renderMapButton()
                            }
                            <SearchBar
                                containerStyle={{backgroundColor: '#33A9E0', borderBottomColor: 'transparent', borderTopColor: 'transparent'}}
                                lightTheme
                                round
                                inputContainerStyle={{backgroundColor: '#fff'}}
                                value={this.state.cityInput}
                                onChangeText={this.onCityInputChange}
                                onClear={this.onCityInputClear}
                                onSubmitEditing={this.onSubmit}
                                placeholder='Search City' />
                            <SearchBar 
                                containerStyle={{backgroundColor: '#33A9E0', borderBottomColor: 'transparent', borderTopColor: 'transparent'}}
                                lightTheme
                                round
                                inputContainerStyle={{backgroundColor: '#fff'}}
                                value={this.state.termInput}
                                onChangeText={this.onTermInputChange}
                                onClear={this.onTermInputClear}
                                onSubmitEditing={this.onSubmit}
                                style={{marginRight: 40, marginLeft: '40px'}}
                                placeholder='Search Keyword' />
                        </View>
                        <BellyMapView
                            lat={this.state.latitude}
                            lon={this.state.longitude}
                            data={this.state.externalData}
                        /> 
                    </View>
                : 
                    <View style={styles.mainContainer}>
                        <View style={styles.searchContainer}>
                            <Text style={styles.title}>Locations</Text>
                            {
                                this.renderMapButton()
                            }
                        </View>
                        <BellyListView
                            data={this.state.externalData}
                        />
                    </View>
                }   
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
    phoneContainer: {
        flex: 1,
        flexDirection: 'column',
        paddingTop: 25,
        backgroundColor: '#33A9E0'
    },
    mainContainer: {
        flex: 1,
        flexDirection: 'column',
        paddingTop: 25,
        backgroundColor: '#33A9E0'
    },
    searchContainer: {
        marginRight: 10,
        marginLeft: 10,
        backgroundColor: '#33A9E0'
    },
    toggleButton: {
        marginRight:10,
        marginLeft:10,
        marginTop:5,
        marginBottom:10,
        paddingTop:5,
        paddingBottom:5,
        backgroundColor:'#fff',
        borderRadius:10,
    },
    toggleButtonText: {
        color: '#33A9E0', 
        textAlign: 'center'
    },
    title: {
        fontSize: 26,
        color: '#fff',
        textAlign: 'center'
    }
  });