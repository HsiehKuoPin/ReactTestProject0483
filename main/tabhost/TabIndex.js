import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    ListView,
    View,
    Image,
    TouchableHighlight,
    ToastAndroid,
    Dimensions,
} from 'react-native';
import ModulesGuideView from '../widgets/ModulesGuideView'
import LoadMoreFooter from '../widgets/LoadMoreFooterView'
//npm install react-native-gifted-listview --save
// import GiftedListView from 'react-native-gifted-listview';
import GiftedListView from '../widgets/GiftedListView'
// npm install react-native-swiper --save
import Swiper from 'react-native-swiper';

const {width} = Dimensions.get('window');

class TabIndex extends Component {

    constructor(props) {
        super(props);
    }

    /**
     * Will be called when refreshing
     * Should be replaced by your own logic
     * @param {number} page Requested page to fetch
     * @param {function} callback Should pass the rows
     * @param {object} options Inform if first load
     */
    _onFetch(page = 1, callback, options) {

        console.log("page:" + page)
        setTimeout(() => {
            var index1 = ((page - 1) * 5 + 0);
            var index2 = ((page - 1) * 5 + 1);
            var index3 = ((page - 1) * 5 + 2);
            var index4 = ((page - 1) * 5 + 3);
            var index5 = ((page - 1) * 5 + 4);
            var rows = [{'data': 'row ' + ((page - 1) * 5 + 1), 'index': index1},
                {'data': 'row ' + ((page - 1) * 5 + 2), 'index': index2},
                {'data': 'row ' + ((page - 1) * 5 + 3), 'index': index3},
                {'data': 'row ' + ((page - 1) * 5 + 4), 'index': index4},
                {'data': 'row ' + ((page - 1) * 5 + 5), 'index': index5}];
            // rows = [];
            if (page === 4) {
                // the end of the list is reached
                callback(rows, {allLoaded: true,});
            } else {
                callback(rows);
            }
        }, 1000); // simulating network fetching
    }

    /**
     * Render a row
     * @param {object} rowData Row data
     */
    _renderRowView(rowData) {
        return (
            <RowView rowData={rowData}></RowView>
        );
    }

    _renderFooter() {
        // const { reducer } = this.props;
        // //通过当前product数量和刷新状态（是否正在下拉刷新）来判断footer的显示
        // if (reducer.products.length < 1 || reducer.isRefreshing) {
        //     return null
        // };
        // if (reducer.products.length < reducer.totalProductCount) {
        //     //还有更多，默认显示‘正在加载更多...’
        //     return <LoadMoreFooter />
        // }else{
        //     // 加载全部
        //     return <LoadMoreFooter isLoadAll={true}/>
        // }

        return <LoadMoreFooter isLoadAll={true}/>
    }

    _toEnd(){
        console.log("已经滑动到底部++++++");

    }

    render() {
        return (
            <View style={styles.container}>
                {/*<View style={styles.navBar} />*/}
                <GiftedListView
                    rowView={this._renderRowView}
                    onFetch={this._onFetch}
                    firstLoader={true} // display a loader for the first fetching
                    pagination={true} // enable infinite scrolling using touch to load more
                    refreshable={true} // enable pull-to-refresh for iOS and touch-to-refresh for Android
                    withSections={false} // enable sections
                    // renderFooter={ this._renderFooter.bind(this) }
                    isMounted={false}
                    // onEndReached={ this._toEnd }
                    // onEndReachedThreshold={0}
                    enableEmptySections={true}
                    customStyles={{
                        paginationView: {
                            backgroundColor: '#C7C7C7',
                        },
                    }}

                    refreshableTintColor="blue"
                />
            </View>
        );
    }
}

class RowView extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        var index = this.props.rowData.index;

        if (index === 0) {//广告轮播图
            return (<AdsSwiper/>);
        } else if (index === 1) {//功能入口
            return (<ModulesGuideView/>);
        } else if (index === 2) {//特别精选
            return (<SpeciallySelectedView/>)
        } else if (index === 3) {//品牌精选
            return (<BrandSelectedView/>)
        } else {
            return (
                <GuessDataView isFirst={index === 4}/>
            )
        }
    };
}

// {/*<View>*/}
// {/*<Text>{this.props.rowData.data + ",index:" + this.props.rowData.index}</Text>*/}
// {/*</View>*/}

/**
 * 广告轮播图
 */
class AdsSwiper extends Component {
    constructor(props) {
        super(props)
        this.state = {
            imgList: [
                'http://bonn.qiniudn.com/images/Company/20171011/20171011140122505.jpg?imageView2/2/q/100/w/640/h/320',
                'http://bonn.qiniudn.com/images/Company/20171011/20171011140204889.jpg?imageView2/2/q/100/w/640/h/320',
                'http://bonn.qiniudn.com/images/Company/20171011/20171011140306194.jpg?imageView2/2/q/100/w/640/h/320',
                'http://bonn.qiniudn.com/images/Company/20171011/20171011140438548.jpg?imageView2/2/q/100/w/640/h/320'
            ],
            loadQueue: [0, 0, 0, 0]
        }
    }

    render() {
        return (
            <View style={{flex: 1}}>
                {/*loadMinimal loadMinimalSize={1}*/}
                {/*showsButtons={false}*/}
                <Swiper style={styles.wrapper} loop={true} autoplay={true}
                        dot={<View style={{
                            backgroundColor: 'rgba(255,255,255,.3)',
                            width: 8,
                            height: 8,
                            borderRadius: 4,
                            marginLeft: 4,
                            marginRight: 4
                        }}/>}
                        activeDot={<View style={{
                            backgroundColor: '#fff',
                            width: 8,
                            height: 8,
                            borderRadius: 4,
                            marginLeft: 4,
                            marginRight: 4
                        }}/>}>
                    {
                        this.state.imgList.map((item, i) =>
                            <Image key={i} style={styles.image} source={{uri: item}}/>
                        )
                    }
                </Swiper>
            </View>
        )
    }
}

//特别精选
class SpeciallySelectedView extends Component {
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(['row 1', 'row 2', 'row 1', 'row 1']),
        };
    }

    render() {
        return (
            <View>
                <Text style={styles.modulesTip}>特别精选
                    | SPECIAL</Text>
                <ListView
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) =>
                        <View style={{marginLeft: 5, backgroundColor: 'white'}}>
                            <Image style={{width: 120, height: 120}}
                                   source={{uri: 'http://bonn.qiniudn.com/images/Company/20161022/20161022172815473.jpg'}}/>
                            <View style={{padding: 10}}>
                                <Text style={styles.productItemText}>健来福</Text>
                                <Text style={styles.productItemText}>路老牌盈石胶囊</Text>
                                <Text style={styles.productItemPrice}>￥1,080.00</Text>
                            </View>
                        </View>
                    }
                />
            </View>
        )
    }
}

//品牌精选
class BrandSelectedView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <Text style={styles.modulesTip}>品牌精选
                    | BRAND</Text>
                <View style={{flexDirection: 'row'}}>
                    <Image style={{flex: 2}}
                           source={{uri: 'http://bonn.qiniudn.com/images/Company/20170522/20170522114114898.jpg'}}/>
                    <View style={{flex: 1, marginLeft: 5, backgroundColor: 'white'}}>
                        <Image style={{width: 120, height: 120}}
                               source={{uri: 'http://bonn.qiniudn.com/images/Company/20161022/20161022172815473.jpg'}}/>
                        <View style={{padding: 10}}>
                            <Text style={styles.productItemText}>健来福</Text>
                            <Text style={styles.productItemText}>路老牌盈石胶囊</Text>
                            <Text style={styles.productItemPrice}>￥1,080.00</Text>
                        </View>
                    </View>
                </View>
                <View style={{flexDirection: 'row', marginTop: 5}}>
                    <View style={{backgroundColor: 'white'}}>
                        <Image style={{width: 120, height: 120}}
                               source={{uri: 'http://bonn.qiniudn.com/images/Company/20161022/20161022172815473.jpg'}}/>
                        <View style={{padding: 10}}>
                            <Text style={styles.productItemText}>健来福</Text>
                            <Text style={styles.productItemText}>路老牌盈石胶囊</Text>
                            <Text style={styles.productItemPrice}>￥1,080.00</Text>
                        </View>
                    </View>
                    <View style={{marginLeft: 5, backgroundColor: 'white'}}>
                        <Image style={{width: 120, height: 120}}
                               source={{uri: 'http://bonn.qiniudn.com/images/Company/20161022/20161022172815473.jpg'}}/>
                        <View style={{padding: 10}}>
                            <Text style={styles.productItemText}>健来福</Text>
                            <Text style={styles.productItemText}>路老牌盈石胶囊</Text>
                            <Text style={styles.productItemPrice}>￥1,080.00</Text>
                        </View>
                    </View>
                    <View style={{marginLeft: 5, backgroundColor: 'white'}}>
                        <Image style={{width: 120, height: 120}}
                               source={{uri: 'http://bonn.qiniudn.com/images/Company/20161022/20161022172815473.jpg'}}/>
                        <View style={{padding: 10}}>
                            <Text style={styles.productItemText}>健来福</Text>
                            <Text style={styles.productItemText}>路老牌盈石胶囊</Text>
                            <Text style={styles.productItemPrice}>￥1,080.00</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

//猜你喜欢数据
class GuessDataView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var guessView;
        if (this.props.isFirst) {
            guessView = (<Text style={styles.modulesTip}>猜你喜欢| GUESS</Text>);
        }
        return (
            <View>
                {guessView}
                <View style={{flexDirection: 'row', marginBottom: 5}}>
                    <View style={{marginLeft: 5, marginRight: 2.5, backgroundColor: 'white',}}>
                        <Image style={styles.guessImage}
                               source={{uri: 'http://bonn.qiniudn.com/images/Company/20161022/20161022172815473.jpg'}}/>
                        <View style={{padding: 10, marginTop: 15}}>
                            <Text style={styles.productItemText}>健来福</Text>
                            <Text style={styles.productItemText}>路老牌盈石胶囊</Text>
                            <Text style={styles.productItemPrice}>￥1,080.00</Text>
                        </View>
                    </View>
                    <View style={{marginLeft: 2.5, marginRight: 5, backgroundColor: 'white',}}>
                        <Image style={styles.guessImage}
                               source={{uri: 'http://bonn.qiniudn.com/images/Company/20161022/20161022172815473.jpg'}}/>
                        <View style={{padding: 10, marginTop: 15}}>
                            <Text style={styles.productItemText}>健来福</Text>
                            <Text style={styles.productItemText}>路老牌盈石胶囊</Text>
                            <Text style={styles.productItemPrice}>￥1,080.00</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

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
    }
});

module.exports = TabIndex;