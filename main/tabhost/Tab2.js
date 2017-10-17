import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';

// export default
class TestModulesComponent extends Component{
    render(){
        return (
            <Text>这是新的模块</Text>
        );
    }
}

module.exports = TestModulesComponent;