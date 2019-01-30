// 商品搜索列表
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView
} from 'react-native';
import ScrollableTabView, {DefaultTabBar, ScrollableTabBar} from 'react-native-scrollable-tab-view';
import ReactPage from './reactPage';
import FlowPage from './flowPage';
import JestPage from './jestPage'
import Icon from 'react-native-vector-icons/Ionicons';
import FacebookTabBar from './FacebookTabBar';

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <ScrollableTabView
          style={{paddingTop: 20, }}
          initialPage={1}
          renderTabBar={() => <FacebookTabBar backgroundColor='rgba(255, 255, 255, 0.7)'/>}
        >
          <ScrollView tabLabel="ios-paper" style={styles.tabView}>
            <Icon name='logo-apple' color='black' size={300} style={styles.icon} />
            <Icon name='ios-phone-portrait' color='black' size={300} style={styles.icon} />
            <Icon name='logo-apple' color='#DBDDDE' size={300} style={styles.icon} />
            <Icon name='ios-phone-portrait' color='#DBDDDE' size={300} style={styles.icon} />
          </ScrollView>
          <ScrollView tabLabel="ios-people" style={styles.tabView}>
            <View style={styles.card}>
              <Text>Friends</Text>
            </View>
          </ScrollView>
          <ScrollView tabLabel="ios-chatboxes" style={styles.tabView}>
            <Icon name='logo-android' color='#A4C639' size={300} style={styles.icon} />
            <Icon name='logo-android' color='black' size={300} style={styles.icon} />
            <Icon name='logo-android' color='brown' size={300} style={styles.icon} />
          </ScrollView>
          <ScrollView tabLabel="ios-notifications" style={styles.tabView}>
            <View style={styles.card}>
              <Text>Notifications</Text>
            </View>
          </ScrollView>
          <ScrollView tabLabel="ios-list" style={styles.tabView}>
            <View style={styles.card}>
              <Text>Other nav</Text>
            </View>
          </ScrollView>
        </ScrollableTabView>
      </View>

    )
  }
}
const styles = StyleSheet.create({
  scene: {
    flex: 1,
    borderWidth: 1 / 3,
    borderColor: 'red'
  },
  icon: {
    width: 300,
    height: 300,
    alignSelf: 'center',
  },
  tabView: {
    flex: 1,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.01)',
  },
  card: {
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.1)',
    margin: 5,
    height: 150,
    padding: 15,
    shadowColor: '#ccc',
    shadowOffset: { width: 2, height: 2, },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  }
});
export default Demo
