import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, FlatList, Image} from 'react-native';


class BellyListView extends Component {
    constructor(props){
        super(props)
        this.state = ({
            yelpData: null
        })
    }

    renderList(){
        if(this.props.data){
            return (
            <View>
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
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#fff'
    },
    imageContainerStyle: {
        padding: 15
    },
    textContainerStyle: {
        flexWrap: 'wrap'
    },
    mainText:{
        fontSize: 17,
        width: 225
    },
    secondaryText: {
        width: 225
    },
});