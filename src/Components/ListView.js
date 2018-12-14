import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, FlatList, Image} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { List, ListItem } from 'react-native-elements';


export default class BellyListView extends Component<Props> {
constructor(props){
    super(props)
    console.log('ehy')
    // this.state = ({
        
    // })
}

renderList(){
    
    if(this.props.data){
        console.log(this.props.data, 'dataprops')
        // let milesUnformatted = biz.distance * 0.000621371192
        // let miles = Math.round(milesUnformatted * 100) / 100
        return (
            // <Text>{this.props.data[0].name}</Text>
        <View>
            {/* <List> */}
            <FlatList
                data={this.props.data}
                keyExtractor={item => item.alias}
                renderItem={({ item }) => (
                    // <ListItem
                    // key={item.name}
                    // roundAvatar
                    // title={item.name}
                    // subtitle={item.name}
                    // avatar={{uri:item.image_url}}
                    
                    // />
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
            {/* </List> */}
        </View>
        )
    }
}
    render() {
        // console.log(this.props.data, 'data');
        return (
            <View>
            {
                this.renderList()
            }               
            </View>
        )
    }
}
// export default BellyListView;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#fff'
    //   position: 'absolute',
    //   top: 0,
    //   left: 0,
    //   right: 0,
    //   bottom: 0,
    //   justifyContent: 'flex-end',
    //   alignItems: 'center'
        // flexDirection: 'column',
        // marginTop: 50
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