import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SearchBar } from 'react-native-elements';

class SearchBar extends Component {
    render(){
        return(
            <SearchBar
                lightTheme
                onChangeText={someMethod}
                onClear={someMethod}
                placeholder='Type Here...' />
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Searchbar)