import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, FlatList, Image} from 'react-native';


class BellyListView extends Component {
    constructor(props){
        super(props)
        this.state = ({
            yelpData: null
        })
    }
    componentDidMount(){
        if (this.props.data.distance){
            let newObj = this.props.data.map((x) => {
                Math.round((x.distance * 0.000621371192) * 100) / 100
            })
            console.log(newObj, 'newpk');
            let sortedLocations = this.props.data.sort(function (a, b) {
                return a.forks - b.forks;
              });
    }
}

    renderList(){
        if(this.props.data){
            console.log(this.props.data)
            return (
            <View style={styles.listStyle}>
                <FlatList
                    data={this.props.data}
                    keyExtractor={item => item.alias}
                    renderItem={({ item }) => (
                        <View style={styles.container}>
                            <View style={styles.imageContainerStyle}>
                                <Image style={{width: 100, height: 100}} source={{uri: item.image_url}} />
                            </View>
                            <View style={styles.textContainerStyle}>
                                <Text style={styles.mainText}>{item.name}</Text>
                                <Text style={styles.secondaryText}>{Math.round((item.distance * 0.000621371192) * 100) / 100 + ' miles away'}</Text>
                                <Text style={styles.secondaryText}>{item.categories.map(info => info.title + ' ')}</Text>
                            </View>
                            <View style={styles.hoursContainer}>
                            {item.is_closed ? 
                                <Text style={styles.hoursTextClosed}>CLOSED</Text>
                                :
                                <Text style={styles.hoursTextOpened}>OPEN</Text>
                            }
                            </View>    
                        </View>
                        
                    )}
                />
            </View>
            )
        }
    }
    render() {
        return (
            <View>
            {
                this.renderList()
            }               
            </View>
        )
    }
}
export default BellyListView;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: '#fff'
    },
    imageContainerStyle: {
        padding: 10
    },
    textContainerStyle: {
        flexWrap: 'wrap',
        paddingTop: 10,
        paddingBottom: 5
    },
    mainText:{
        fontSize: 17,
        width: 160,
        paddingBottom: 5
    },
    secondaryText: {
        width: 160,
        paddingBottom: 5
    },
    hoursContainer: {
        paddingTop: 10,
        paddingLeft: 35,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        alignSelf: 'flex-start',
        display: 'flex'
    },
    hoursTextClosed: {
        fontSize: 14,
        color: 'red'
    },
    hoursTextOpened: {
        fontSize: 14,
        color: 'green'
    },
    listStyle: {
        paddingBottom: 73
    }
});