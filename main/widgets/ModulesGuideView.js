import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
    ToastAndroid,
    NativeModules
} from 'react-native';

class GuideLayout extends Component {


    render() {
        // let data = require('data.json');
        let data = [
            {
                "url":"http://mall.dev-yijia.weimain.com/app_1_1/api/images/themeIndex.png",
                "text": "主题馆"
            }
            , {
                "url":"http://mall.dev-yijia.weimain.com/app_1_1/api/images/platinumIndex.png",
                "text": "白金馆"
            },
            {
                "url":"http://mall.dev-yijia.weimain.com/app_1_1/api/images/discountIndex.png",
                "text": "折扣馆"
            }
            , {
                "url":"http://mall.dev-yijia.weimain.com/app_1_1/api/images/brandIndex.png",
                "text": "品牌馆"
            }, {
                "url":"http://mall.dev-yijia.weimain.com/app_1_1/api/images/memberIndex.png",
                "text": "会员馆"
            }, {
                "url":"http://mall.dev-yijia.weimain.com/app_1_1/api/images/activityIndex.png",
                "text": "限时活动"
            },
            {
                "url":"http://mall.dev-yijia.weimain.com/app_1_1/api/images/newIndex.png",
                "text": "每周新品"
            },
            {
                "url":"http://mall.dev-yijia.weimain.com/app_1_1/api/images/classificationIndex.png",
                "text": "分类"
            },];
        return (
            <IndexGuideLayout style={styles.IndexGuideLayout} datas={data}/>
        );
    }
}

class IndexGuideLayout extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        let count = 0;
        let arrayData = [];
        return (
            <View style={{flexDirection: 'column', backgroundColor: '#FFF'}}>
                {this.props.datas.map(function (item, index) {

                    arrayData.push(item);
                    if ((index + 1) % 4 == 0) {
                        let tempData = arrayData;
                        arrayData = [];
                        // arrayData
                        count++;
                        return <IndexGuide key={count} datas={tempData}/>;
                        // return <IndexGuide key={index} datas={item}/>;
                    }
                })}

            </View>

        )
    }
}

class IndexGuide extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{flexDirection: 'row'}}>
                {this.props.datas.map(function (item, index) {
                    return <IndexGuideItem key={index} url={item.url} text={item.text}/>
                })}

            </View>
        );
    }
}

class IndexGuideItem extends Component {
    constructor(props) {
        super(props);
    }

    showText(text) {
        // NativeModules.NativeCallback.click(text);
        ToastAndroid.show(text,1000);
    }

    render() {
        return (

            <View style={{
                width: 80,
                flex: 1}}>
                <TouchableHighlight
                    onPress={() => {
                        this.showText("0000000")
                    }}
                    underlayColor='#ff0000'>
                    <View style={{
                        padding:10,
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Image source={{uri:this.props.url}} style={{width: 50, height: 50}}/>
                        <Text style={{textAlign: 'center',color:'#000000',marginTop:5}}>{this.props.text}</Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
        // onPress={()=>{this.showText("你好")}}
    }
}

const styles = StyleSheet.create({
    IndexGuideLayout:{
        padding:10,
        backgroundColor:"#FF0000"
    }
});
module.exports = GuideLayout;