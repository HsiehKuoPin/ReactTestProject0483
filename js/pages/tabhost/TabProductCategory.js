import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    ListView,
    View,
    Image,
    Dimensions
} from 'react-native';
const {width} = Dimensions.get('window');
// export default
class ProductCategory extends Component {
    render() {
        return (
            <View
                style={{flexDirection: 'row',backgroundColor: '#ECECEC'}}>
                <CategoryListView/>
                <CategoryProductListView/>
            </View>
        );
    }
}

//特别精选
class CategoryListView extends Component {
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(['分类1', '分类2', '分类3', '分类4', '分类5', '分类6', '分类7', '分类8', '分类9', '分类10', '分类1', '分类2', '分类3', '分类4', '分类0']),
        };
    }

    render() {
        return (
            <View>
                <ListView
                    style={{backgroundColor: 'white'}}
                    showsVerticalScrollIndicator={false}
                    horizontal={false}
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) =>

                        <View style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: 90,
                            height: 40,
                            borderBottomColor: '#C7C7C7',
                            borderBottomWidth: 0.5
                        }}>
                            <Text style={{color: 'black'}}>{rowData}</Text>
                        </View>

                    }
                />
            </View>
        )
    }
}

class CategoryProductListView extends Component {

    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(['分类1', '分类2', '分类3', '分类4', '分类5', '分类6', '分类7', '分类8', '分类9', '分类10', '分类1', '分类2', '分类3', '分类4', '分类5']),
        };
    }

    render() {
        return (
            <ListView
                showsVerticalScrollIndicator={true}
                horizontal={false}
                dataSource={this.state.dataSource}
                renderRow={(rowData) =>
                    <View>
                        <View style={{flexDirection: 'row', marginBottom: 5}}>
                            <View style={{marginLeft: 5, marginRight: 2.5, backgroundColor: 'white',}}>
                                <Image style={styles.categoryProductImage}
                                       source={{uri: 'http://bonn.qiniudn.com/images/Company/20161022/20161022172815473.jpg'}}/>
                                <View style={{padding: 10, marginTop: 15}}>
                                    <Text style={styles.productItemText}>健来福</Text>
                                    <Text style={styles.productItemText}>路老牌盈石胶囊</Text>
                                    <Text style={styles.productItemPrice}>￥1,080.00</Text>
                                </View>
                            </View>
                            <View style={{marginLeft: 2.5, marginRight: 5, backgroundColor: 'white',}}>
                                <Image style={styles.categoryProductImage}
                                       source={{uri: 'http://bonn.qiniudn.com/images/Company/20161022/20161022172815473.jpg'}}/>
                                <View style={{padding: 10, marginTop: 15}}>
                                    <Text style={styles.productItemText}>健来福</Text>
                                    <Text style={styles.productItemText}>路老牌盈石胶囊</Text>
                                    <Text style={styles.productItemPrice}>￥1,080.00</Text>
                                </View>
                            </View>
                        </View>
                    </View>}
            />
        )
    };
}

const styles = StyleSheet.create({
    productItemText: {
        fontSize: 13, color: 'black', textAlign: 'center'
    },
    productItemPrice: {
        fontSize: 16,
        color: '#dab26a',
        marginTop: 5,
        textAlign: 'center'
    },
    categoryProductImage:{
        width:(width - 105)/2,
        height:(width - 105)/2,
    }
});

module.exports = ProductCategory;