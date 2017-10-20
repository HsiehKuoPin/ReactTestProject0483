import React,{Component} from 'react'
import {
    ScrollView,
    View,
    Image,
    Text,
    StyleSheet
}from 'react-native'


class PersonalIndex extends Component{
    render(){
        return (
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <View style={styles.header}>
                    <Image style={styles.avatar}
                           source={{uri: "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3948656430,2360060343&fm=27&gp=0.jpg"}}/>
                    <Text style={styles.nickName}>
                        null
                    </Text>
                </View>
                <View style={styles.allOrder}>
                    <Text style={styles.allOrderLeft}>我的订单</Text>
                    <Text style={styles.allOrderRight}>查看全部订单</Text>
                    <Image style={styles.allOrderArrow} source={require('../../../img/ic_arrow_forward.png')}/>
                </View>
                <View style={styles.orderGuideLayout}>
                    <View style={styles.orderGuideItem}>
                        <Image style={styles.orderGuideItemImage} source={require('../../../img/personal/ic_pending_payment.png')}/>
                        <Text style={styles.orderGuideItemText}>待支付</Text>
                    </View>
                    <View style={styles.orderGuideItem}>
                        <Image style={styles.orderGuideItemImage} source={require('../../../img/personal/ic_waiting_for_delivery.png')}/>
                        <Text style={styles.orderGuideItemText}>待发货</Text>
                    </View>
                    <View style={styles.orderGuideItem}>
                        <Image style={styles.orderGuideItemImage} source={require('../../../img/personal/ic_already_shipped.png')}/>
                        <Text style={styles.orderGuideItemText}>待收货</Text>
                    </View>
                    <View style={styles.orderGuideItem}>
                        <Image style={styles.orderGuideItemImage} source={require('../../../img/personal/ic_pending_evaluation.png')}/>
                        <Text style={styles.orderGuideItemText}>已完成</Text>
                    </View>
                </View>

                <Text style={styles.assetsTip}>我的资产</Text>
                <View style={styles.scoreLayout}>
                    <View style={styles.scoreLayoutItem}>
                        <Text style={styles.scoreValue}>0.00</Text>
                        <Text style={styles.scoreText}>专用积分</Text>
                    </View>
                    <View style={styles.scoreLayoutItem}>
                        <Text style={styles.scoreValue}>0.00</Text>
                        <Text style={styles.scoreText}>通用积分</Text>
                    </View>
                    <View style={styles.scoreLayoutItem}>
                        <Text style={styles.scoreValue}>0.00</Text>
                        <Text style={styles.scoreText}>蓝积分</Text>
                    </View>
                    <View style={styles.scoreLayoutItem}>
                        <Text style={styles.scoreValue}>0.00</Text>
                        <Text style={styles.scoreText}>余额</Text>
                    </View>
                </View>
            </ScrollView>
        );
    }
}


const styles = StyleSheet.create({
    contentContainer: {
        backgroundColor:'#ECECEC'
    },
    header:{
       backgroundColor:'#1f1f1f',
        flex:1,
        height:160,
        flexDirection:'row'
    },
    nickName:{
        color:'white',
        fontSize:16,
        marginTop:40,
        marginLeft:15
    },
    allOrder:{
        backgroundColor:'white',
        borderBottomWidth:0.3,
        borderBottomColor:'#C7C7C7',
        height:50,
        alignItems:'center',
        flex:1,
        flexDirection:'row',
    },
    allOrderLeft:{
        paddingLeft:10,
        flex:3,
        color:'black',
        fontSize:15
    },
    allOrderRight:{
        paddingRight:10,
        color:'gray',
        fontSize:13.5
    },
    allOrderArrow:{
      width:10,
      height:18,
      marginTop:3,
        marginLeft:3,
        marginBottom:3,
      marginRight:7
    },
    avatar:{
        marginLeft:10,
        marginTop:30,
        width:90,
        height:90,
        borderColor:'#dab26a',
        borderWidth:5,
        borderRadius:45
        // resizeMode:'center'
    },
    orderGuideLayout:{
        backgroundColor:'white',
        flex:1,
        flexDirection:'row',
        height:90
    },
    orderGuideItem:{
        flex:1,
        alignItems:'center',
        flexDirection:'column'
    },
    orderGuideItemImage:{
        width:'45%',
        height:'45%',
        marginTop:10,
        marginBottom:5
    },
    orderGuideItemText:{
        color:'black'
    },
    assetsTip:{
        backgroundColor:'white',
        marginTop:15,
        borderTopColor:'#C7C7C7',
        borderTopWidth:0.3,
        borderBottomColor:'#C7C7C7',
        borderBottomWidth:0.3,
        paddingLeft:10,
        textAlignVertical:'center',//只支持android
        height:40,
        color:'black',
        fontSize:15,
    },
    scoreLayout:{
        backgroundColor:"white",
        height:60,
        flex:1,
        flexDirection:'row'
    },
    scoreLayoutItem:{
        flex:1,
        alignItems:'center'

    },
    scoreValue:{
        marginTop:10,
        fontSize:16,
        fontWeight:'bold',
        color:"black"
    },
    scoreText:{
        fontSize:14,
        color:"black"
    }
});

module.exports = PersonalIndex;