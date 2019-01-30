import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar
} from 'react-native';

import FacebookTabBar from './FacebookTabBar';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import ScollTabs from '../../libs/scollTabs/scollTabs';
import {fetchOrderListDataForApp} from "../order/proxy";
import {groupBy, message} from "../../libs/util";
import {fetchGoodsDetailDataForApp} from "./proxy";
import { Button, Avatar, ListItem, Badge, Divider, Header, Icon, Input, Overlay, Tooltip} from 'react-native-elements';
export default class Demo extends Component<props>{
  // static navigationOptions = ({navigation}) => {
  //   return {
  //     headerTitle: 'cdsf'
  //   }
  // };

  constructor(props){
    super(props);
    this.state = {
      vals: [3, 12, 25],
      rows: [
        { key: 1, label: '即将开始', rows: [1, 2, 3, 4] },
        { key: 2, label: '明天', rows: [] },
        { key: 3, label: '全部', rows: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16] }
      ]
    }
  }

  async componentDidMount() {
    // this._navListener = this.props.navigation.addListener('didFocus', () => {
    //   StatusBar.setBarStyle('light-content');
    //   StatusBar.setBackgroundColor('rgb(59,89,152)');
    // });
    /*try {
      const params = { // 557550203718
        num_iid: '557550203718',
        is_promotion: '1',
        api_name: 'item_get',
        key: 'ulexy.com'
      };
      const {code, data} = await fetchGoodsDetailDataForApp(params);
      const {rows} = this.state;
      rows[0].rows = [1, 2, 3, 4];
      rows[2].rows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
      this.setState({
        rows: rows
      })
    } catch (e) {}*/
  }

  render(){
    return (
      <ScollTabs vals={this.state.vals} rows={this.state.rows} render={(cell, key) => {
        return <ListItem
          key={cell}
          leftAvatar={{ source: require('../../assets/img/discount/adidas_logo.png'), rounded: false, size: 44 }}
          title='阿迪达斯'
          titleStyle={{
            color: '#353535',
            fontSize: 16.5
          }}
          subtitleStyle={{
            color: '#999',
            fontSize: 13
          }}
          onPress={() => {
            this.props.navigation.navigate('Demo5', {
              a: Math.random() * 10000
            })
          }}
          rightSubtitleStyle={{
            color: '#999999',
            fontSize: 12
          }}
          bottomDivider={true}
          chevronColor="white"
          badge={{ value: 3}}
          disabled={false}
          disabledStyle={{
            backgroundColor: '#F0F0F0'
          }}
          chevron={{ name: 'rowing', size: 20 }}
          subtitle='每周四21:00:00发券'
        />
      }}/>
    );
  }
}
// 考虑一下接下来的封装方法
const styles = StyleSheet.create({
  tabView: {
    flex: 1,
    padding: 10,
    // backgroundColor: 'rgba(0,0,0,0.01)',
    backgroundColor: '#fff',
  }
});
