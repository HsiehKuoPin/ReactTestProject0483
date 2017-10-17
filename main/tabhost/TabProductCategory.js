import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    ListView,
    View,
    Image
} from 'react-native';

// export default
class ProductCategory extends Component{
    render(){
        return (
            <View
             style={{flexDirection:'row'}}>
                <CategoryListView/>
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
            dataSource: ds.cloneWithRows(['分类1', '分类2', '分类3', '分类4','分类5','分类6', '分类7', '分类3', '分类4','分类5','分类1', '分类2', '分类3', '分类4','分类5']),
        };
    }

    render() {
        return (
            <View>
                <ListView
                    style={{backgroundColor:'white'}}
                    showsHorizontalScrollIndicator={false}
                    horizontal={false}
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) =>
                        <Text style={{width:80,height:30,textAlign:'center',borderBottomColor:'#C7C7C7', borderBottomWidth:0.5  }}>{rowData}</Text>
                    }
                />
            </View>
        )
    }
}

{/*<View style={{marginLeft: 5, backgroundColor: 'white'}}>*/}
    {/*<Image style={{width: 120, height: 120}}*/}
           {/*source={{uri: 'http://bonn.qiniudn.com/images/Company/20161022/20161022172815473.jpg'}}/>*/}
    {/*<View style={{padding: 10}}>*/}
        {/*<Text style={styles.productItemText}>健来福</Text>*/}
        {/*<Text style={styles.productItemText}>路老牌盈石胶囊</Text>*/}
        {/*<Text style={styles.productItemPrice}>￥1,080.00</Text>*/}
    {/*</View>*/}
{/*</View>*/}

module.exports = ProductCategory;