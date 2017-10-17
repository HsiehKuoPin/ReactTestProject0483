import React, {Component} from 'react';
import {
    AppRegistry,
    Text
} from 'react-native';


class ReactHelloWorld extends Component {
    constructor(props){
        super(props)
    }

    render(){
        let mainComponent = require(this.props.componentId);
        if(mainComponent){
            let _content = React.createElement(mainComponent,this.props);
            return _content;
        }else{
            return (<Text>I am the MainPage</Text>)
        }
    }
}



// 注意，这里用引号括起来的'ReactHelloWorld'必须和你init创建的项目名一致
AppRegistry.registerComponent('ReactHelloWorld', () => ReactHelloWorld);