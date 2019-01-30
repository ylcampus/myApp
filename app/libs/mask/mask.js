// 搜索列表-页头 2018-10
import React, { Component } from 'react';
import {View} from 'react-native';
import Spinner from 'react-native-spinkit'
export default class Header extends Component {
  constructor(props){
    super(props);
    this.state = {
      visible: false
    }
  }

  static defaultProps = {
    opacity: 1
  };

  show = () => { this.setState({visible: true}) };
  hide = () => { this.setState({visible: false}) };


  render() {
    return this.state.visible ? (
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: `rgba(255, 255, 255, ${this.props.opacity})`,
        zIndex: 9999
      }}>
        <Spinner isVisible={this.state.visible} size={36} type='ChasingDots' color="#000"/>
      </View>
    ) : null
  }
}
