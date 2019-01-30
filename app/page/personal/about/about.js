// 关于 2018-10
import React,{ Component } from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text
} from 'react-native';
import SubHeader from '../../../libs/subHeader/subHeader';
type props = {}

export default class About extends Component<props>{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <View style={{flex: 1}}>
        <SubHeader
          style={{backgroundColor: '#FFF'}}
          navigation={this.props.navigation} onBack={() => { this.props.navigation.navigate('Personal') }}
          icon={require('../../../assets/img/personal/about.png')} title="关于"/>
        <View style={styles.pageWarp}>
          <View style={styles.appMsgBox}>
            <Image source={require('../../../assets/img/personal/logo.png')} style={styles.logoIcon}/>
            <View style={styles.versionMsg}>
              <Text style={styles.vLabel}>当前版本</Text>
              <Text style={styles.version}>v1.0.0</Text>
            </View>
          </View>
          <View style={styles.footerMsg}>
            <View style={styles.bookBox}>
              <Text style={styles.bookTxt}>版权所有 ©2018</Text>
            </View>
            <Text style={styles.stateTxt}>南京优乐校园电子商务有限公司保留一切权利</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pageWarp: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  appMsgBox: {
    flex: 1,
    flexDirection:'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EBEBEB'
  },
  logoIcon: {
    width: 70,
    height: 70,
    borderRadius: 5
  },
  versionMsg: {
    height: 36,
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  vLabel: {
    fontSize: 12,
    color: '#000'
  },
  version: {
    fontSize: 14,
    color: '#000',
    marginLeft: 5
  },
  footerMsg: {
    height: 60,
    flexDirection:'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF'
  },
  bookBox: {
    flexDirection:'row',
    justifyContent: 'center'
  },
  bookTxt: {
    fontSize: 12,
    color: '#909399'
  },
  stateTxt: {
    fontSize: 11,
    lineHeight: 15,
    color: '#909399'
  }
});
