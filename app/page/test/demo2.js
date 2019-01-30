import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Slider } from 'react-native';
import QRScannerView from './QRScaner';

export default class QQBrowserScreen extends Component<props>{
  constructor(props){
    super(props);
  }

  async componentDidMount() {
    // 明天开发任务-集中精力把开发环境给整理好
  }

  barcodeReceived(e) {
    alert(e.data)
  }

  render() {
    return (
      <QRScannerView
        onScanResultReceived={this.barcodeReceived.bind(this)}
        renderTopBarView = {() => {
          return (
            <View style={{
              height: 100,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.75)'
            }}>
               <Text>这顶部标题栏-董纪国</Text>
            </View>
          )
        }}
        renderBottomMenuView = {() => {
          return (
            <View>
              <Text>相册</Text>
            </View>
          )
        }}
      />
    )
  }
}
