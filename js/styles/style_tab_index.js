'use strict';

import {
    StyleSheet,
    Dimensions,
} from 'react-native';
var width = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#FFF',
        backgroundColor: '#ECECEC'
    },
    navBar: {
        height: 64,
        backgroundColor: '#CCC'
    },
    row: {
        // padding: 10,
        // height: 44,
    },
    wrapper: {
        width,
        height: 150,
    },

    image: {
        width,
        height: 150,
    },
    productItemText: {
        fontSize: 13, color: 'black', textAlign: 'center'
    },
    productItemPrice: {
        fontSize: 16,
        color: '#dab26a',
        marginTop: 5,
        textAlign: 'center'
    },
    modulesTip: {fontSize: 16, color: 'black', fontWeight: 'bold', padding: 10, textAlign: 'center'},
    guessImage: {
        width: (width - 15) / 2,
        height: (width - 15) / 2,
    },
    SpeciallyProductItem:{
        width:(width - 10 )/3,
        height:(width - 10)/3
    }
});

module.exports = styles;