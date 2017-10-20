/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    Image,
    StyleSheet
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
// cmd项目路径下执行npm install react-native-tab-navigator --save
import Home from './pages/tabhost/TabIndex'
import Second from './pages/tabhost/TabProductCategory'
import Three from './pages/tabhost/Tab3'
import Personal from './pages/tabhost/TabPersonal'

export default class ReactTestProject0483 extends Component {
    state = {tab: 'index'}

    render() {

        return (
            <TabNavigator
                tabBarStyle={{height: 50}}
                style={{flex: 1}}>
              <TabNavigator.Item
                  title="主页"
                  titleStyle={styles.title}
                  selected={this.state.tab == 'index'}
                  selectedTitleStyle={styles.selectedTitle}
                  onPress={() => this.setState({tab: 'index'})}
                  renderIcon={() => <Image
                      style={styles.icon}
                      source={require('../img/tab/ic_home.png')}/>}
                  renderSelectedIcon={() => <Image
                      style={styles.icon}
                      source={require('../img/tab/ic_home_select.png')}/>}>
                <Home/>
              </TabNavigator.Item>
              <TabNavigator.Item
                  title="分类"
                  titleStyle={styles.title}
                  selected={this.state.tab == 'gategory'}
                  selectedTitleStyle={styles.selectedTitle}
                  onPress={() => this.setState({tab: 'gategory'})}
                  renderIcon={() => <Image
                      style={styles.icon}
                      source={require('../img/tab/ic_sort.png')}/>}
                  renderSelectedIcon={() => <Image
                      style={styles.icon}
                      source={require('../img/tab/ic_sort_select.png')}/>}>
                <Second/>
              </TabNavigator.Item>
              <TabNavigator.Item
                  title="购物车"
                  titleStyle={styles.title}
                  selected={this.state.tab == 'shoppingcart'}
                  selectedTitleStyle={styles.selectedTitle}
                  onPress={() => this.setState({tab: 'shoppingcart'})}
                  renderIcon={() => <Image
                      style={styles.icon}
                      source={require('../img/tab/ic_shopping_car.png')}/>}
                  renderSelectedIcon={() => <Image
                      style={styles.icon}
                      source={require('../img/tab/ic_shopping_car_select.png')}/>}>
                <Three/>
              </TabNavigator.Item>
              <TabNavigator.Item
                  title="个人中心"
                  titleStyle={styles.title}
                  selected={this.state.tab == 'personal'}
                  selectedTitleStyle={styles.selectedTitle}
                  onPress={() => this.setState({tab: 'personal'})}
                  renderIcon={() => <Image
                      style={styles.icon}
                      source={require('../img/tab/ic_me.png')}/>}
                  renderSelectedIcon={() => <Image
                      style={styles.icon}
                      source={require('../img/tab/ic_me_select.png')}/>}>
                <Personal/>
              </TabNavigator.Item>
            </TabNavigator>
        );
    }
}

const styles = StyleSheet.create({

    title: {
        fontSize: 12,
        color: 'black'
    },
    selectedTitle: {
        fontSize: 12,
        color: 'black'
    },
    icon: {
        width: 22,
        height: 22,
        resizeMode: 'contain'
    },
    selectedIcon: {
        width: 22,
        height: 22,
        resizeMode: 'contain'
    },
});
AppRegistry.registerComponent('ReactTestProject0483', () => ReactTestProject0483);
