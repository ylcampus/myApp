// 商品搜索列表
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text
} from 'react-native';

export default class FlowPage extends Component<props>{
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Text>页面一</Text>
      </View>

    )
  }
}
const styles = StyleSheet.create({
  scene: {
    flex: 1,
    borderWidth: 1 / 3,
    borderColor: 'red'
  }
});
