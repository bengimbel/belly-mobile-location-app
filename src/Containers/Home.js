import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Dimensions, TouchableOpacity, AsyncStorage} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BellyMapView from '../Components/MapView';
import BellyListView from '../Components/ListView';
import fetchBasicData from '../Actions/FetchBasicData';
import fetchUserCoordinates from '../Actions/FetchUserCoordinates';
import fetchCustomBusiness from '../Actions/FetchCustomBusiness';
import _ from 'lodash';
import { SearchBar } from 'react-native-elements';

class Home extends Component {
    constructor(props){
        super(props)

        this.state = ({
            externalData: null,
            myLatitude: null,
            myLongitude: null,
            error: null,
            termInput: '',
            activateMapButtonToggle: true
        })
        this.onTermInputChange = this.onTermInputChange.bind(this)
        this.onTermInputClear = this.onTermInputClear.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.renderMapButton = this.renderMapButton.bind(this)
    }

     async componentDidMount() {
        await AsyncStorage.getItem('storedData').then((value) => {
            let newValue = JSON.parse(value);
            console.log(newValue, 'parsedValue')
            this.setState({
                externalData: newValue
            })
         })
         await AsyncStorage.getItem('storedBasicDataLat').then((value) => {
            let newValue = JSON.parse(value);
            console.log(newValue, 'parsedValueLat')
            this.setState({
                myLatitude: newValue
            })
         })
         await AsyncStorage.getItem('storedBasicDataLon').then((value) => {
            let newValue = JSON.parse(value);
            console.log(newValue, 'parsedValueLon')
            this.setState({
                myLongitude: newValue
            })
         })

        navigator.geolocation.getCurrentPosition(
            (position) => {
                let lat = JSON.stringify(position.coords.latitude);
                let lon = JSON.stringify(position.coords.longitude);
                AsyncStorage.setItem('storedBasicDataLat', lat);
                AsyncStorage.setItem('storedBasicDataLon', lon);
                this.setState({
                myLatitude: position.coords.latitude,
                myLongitude: position.coords.longitude,
                error: null,
                }, () => {
                this.props.fetchBasicData(this.state.myLatitude, this.state.myLongitude).then(() => {
                    if(this.props.basicData.data.businesses){
                        let sortedBasicData = this.props.basicData.data.businesses.sort(function (a, b) {
                            return a.distance - b.distance;
                            });
                            console.log(sortedBasicData, 'sortedBasicData')
                            let stringifyValue = JSON.stringify(sortedBasicData)
                            AsyncStorage.setItem('storedData', stringifyValue);
                        this.setState({
                            externalData: sortedBasicData
                        })
                    }
                })
                });
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
            )
    }

    onTermInputChange(termInput){
        this.setState({
            termInput: termInput
        })
        console.log(this.state.termInput)
    }
    onTermInputClear(){
        this.setState({
            termInput: ''
        })
        console.log(this.state.termInput)
    }
    
    onSubmit() {
        this.props.fetchCustomBusiness(this.state.termInput, this.state.myLatitude, this.state.myLongitude).then(() => {
            if(this.props.customData.data.region){
                let sortedCustomData = this.props.customData.data.businesses.sort(function (a, b) {
                    return a.distance - b.distance;
                  });
                  AsyncStorage.setItem('storedData', JSON.stringify(sortedCustomData));
                this.setState({
                    externalData: sortedCustomData
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
                                clearIcon={{ color: 'red' }}
                                inputContainerStyle={{backgroundColor: '#fff'}}
                                value={this.state.termInput}
                                onChangeText={this.onTermInputChange}
                                onClear={this.onTermInputClear}
                                onSubmitEditing={this.onSubmit}
                                style={{marginRight: 40, marginLeft: '40px', fontSize: 1}}
                                placeholder='Search by Keyword'
                                placeholderTextColor= '#33A9E0'
                                />
                        </View>
                        <BellyMapView
                            lat={this.state.myLatitude}
                            lon={this.state.myLongitude}
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
            </View>
        )
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchBasicData, fetchUserCoordinates, fetchCustomBusiness }, dispatch);
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