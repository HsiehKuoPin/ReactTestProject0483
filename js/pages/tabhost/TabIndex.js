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
import ModulesGuideView from '../../widgets/ModulesGuideView';
import LoadMoreFooter from '../../widgets/LoadMoreFooterView';
import GiftedListView from '../../widgets/RefreshListView';
import Swiper from 'react-native-swiper';
import styles from '../../styles/style_tab_index';

var CommonRequest = require('../../../common/CommonRequest');

const {width} = Dimensions.get('window');

class TabIndex extends Component {


    constructor(props) {
        super(props);
        this.state = {
            firstLoad: true,//是否第一次加载
            haveInitDefData: false,
            data: [],
        };
    }

    /**
     * 刷新数据
     * @param callback
     * @param options
     * @private
     */
    _onRefresh(callback, options) {
        var body = {
            "phone_imei": "357615696645247",
            "platform": "android",
            "version": "1.3.0"
        };
        CommonRequest.post("http://mall.dev-yijia.weimain.com/app_1_1/main/index?psid=8000", body)
            .then((responseData) => {
                // console.log("回调在外--------------面的数据：" + JSON.stringify(responseData));
                console.log("回调在外面的数据");
                var rows = [];
                rows.push({"data": responseData.obj.listImg, 'index': 0});
                rows.push({"data": "", 'index': 1});
                rows.push({"data": "", 'index': 2});
                rows.push({"data": "", 'index': 3});
                callback(rows, {isShowFirstLoadView: false,});
            });
    }

    /**
     * Will be called when refreshing
     * Should be replaced by your own logic
     * @param {number} page Requested page to fetch
     * @param {function} callback Should pass the rows
     * @param {object} options Inform if first load
     */
    _onFetch(page = 1, callback, options) {

        setTimeout(() => {
            var rows = [];
            rows.push({'data': '', 'isFirst':(page === 1)});
            for (var i = 0; i < 10; i++) {
                rows.push({'data': ''});
            }
            if (page === 4) {
                // the end of the list is reached
                callback(rows, {allLoaded: true,});
            } else {
                callback(rows);
            }
        }, 3000); // simulating network fetching
    }

    /**
     * 加载猜你喜欢数据
     * @param page
     * @param callback
     * @param options
     * @private
     */
    _loadGuessProductList(page = 1, callback, options) {

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

    render() {
        return (
            <View style={styles.container}>

                <GiftedListView
                    ref="giftedListView"
                    rowView={this._renderRowView}
                    onFetch={this._onFetch}
                    onRefresh={this._onRefresh}
                    firstLoader={false} // display a loader for the first fetching
                    pagination={true} // enable infinite scrolling using touch to load more
                    refreshable={true} // enable pull-to-refresh for iOS and touch-to-refresh for Android
                    withSections={false} // enable sections
                    // renderFooter={ this._renderFooter.bind(this) }
                    isMounted={false}
                    // onEndReached={ this._toEnd }
                    // onEndReachedThreshold={0}
                    isShowFirstLoadView={true}
                    enableEmptySections={true}

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
        console.log("index:" + index + ",isFirst:" + this.props.rowData.isFirst);
        if (index === 0) {//广告轮播图
            return (<AdsSwiper data={this.props.rowData.data}/>);
        } else if (index === 1) {//功能入口
            return (<ModulesGuideView/>);
        } else if (index === 2) {//特别精选
            return (<SpeciallySelectedView/>)
        } else if (index === 3) {//品牌精选
            return (<BrandSelectedView/>)
        } else {
            return (
                <GuessDataView isFirst={this.props.rowData.isFirst}/>
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
            // imgList: [
            //     'http://bonn.qiniudn.com/images/Company/20171011/20171011140122505.jpg?imageView2/2/q/100/w/640/h/320',
            //     'http://bonn.qiniudn.com/images/Company/20171011/20171011140204889.jpg?imageView2/2/q/100/w/640/h/320',
            //     'http://bonn.qiniudn.com/images/Company/20171011/20171011140306194.jpg?imageView2/2/q/100/w/640/h/320',
            //     'http://bonn.qiniudn.com/images/Company/20171011/20171011140438548.jpg?imageView2/2/q/100/w/640/h/320'
            // ],
            // loadQueue: [0, 0, 0, 0]
        };

        this.props.data.map((item,i)=>{
           console.log(item.urlImg);
        });

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
                        this.props.data.map((item, i) =>
                            <Image key={i} style={styles.image} source={{uri: item.urlImg}}/>
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
                    <Image style={{flex: 1}}
                           source={{uri: 'http://bonn.qiniudn.com/images/Company/20170522/20170522114114898.jpg'}}/>
                    <View style={{marginLeft: 5, backgroundColor: 'white'}}>
                        <Image style={styles.SpeciallyProductItem}
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
                        <Image style={styles.SpeciallyProductItem}
                               source={{uri: 'http://bonn.qiniudn.com/images/Company/20161022/20161022172815473.jpg'}}/>
                        <View style={{padding: 10}}>
                            <Text style={styles.productItemText}>健来福</Text>
                            <Text style={styles.productItemText}>路老牌盈石胶囊</Text>
                            <Text style={styles.productItemPrice}>￥1,080.00</Text>
                        </View>
                    </View>
                    <View style={{marginLeft: 5, backgroundColor: 'white'}}>
                        <Image style={styles.SpeciallyProductItem}
                               source={{uri: 'http://bonn.qiniudn.com/images/Company/20161022/20161022172815473.jpg'}}/>
                        <View style={{padding: 10}}>
                            <Text style={styles.productItemText}>健来福</Text>
                            <Text style={styles.productItemText}>路老牌盈石胶囊</Text>
                            <Text style={styles.productItemPrice}>￥1,080.00</Text>
                        </View>
                    </View>
                    <View style={{marginLeft: 5, backgroundColor: 'white'}}>
                        <Image style={styles.SpeciallyProductItem}
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

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         // backgroundColor: '#FFF',
//         backgroundColor: '#ECECEC'
//     },
//     navBar: {
//         height: 64,
//         backgroundColor: '#CCC'
//     },
//     row: {
//         // padding: 10,
//         // height: 44,
//     },
//     wrapper: {
//         width,
//         height: 150,
//     },
//
//     image: {
//         width,
//         height: 150,
//     },
//     productItemText: {
//         fontSize: 13, color: 'black', textAlign: 'center'
//     },
//     productItemPrice: {
//         fontSize: 16,
//         color: '#dab26a',
//         marginTop: 5,
//         textAlign: 'center'
//     },
//     modulesTip: {fontSize: 16, color: 'black', fontWeight: 'bold', padding: 10, textAlign: 'center'},
//     guessImage: {
//         width: (width - 15) / 2,
//         height: (width - 15) / 2,
//     },
//     SpeciallyProductItem:{
//         width:(width - 10 )/3,
//         height:(width - 10)/3
//     }
//
// });

module.exports = TabIndex;