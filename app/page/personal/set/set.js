// 客服中心 2018-10
import React,{ Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import SubHeader from '../../../libs/subHeader/subHeader';
import {logoutForApp} from '../proxy';
type props = {}

export default class Set extends Component<props>{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <View style={styles.container}>
        <SubHeader style={{backgroundColor: '#FFF'}} onBack={() => {
          this.props.navigation.goBack();
        }}
         icon={require('../../../assets/img/personal/set.png')} title="设置"/>
        <View style={{marginTop: 10}}>
          <View style={styles.rowWarp}>
            <TouchableOpacity onPress={() => {
              this.props.navigation.navigate('Password')
            }} style={[styles.logoutBox, styles.lineBottom]}>
              <Text style={styles.logoutTxt}>修改密码</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              logoutForApp().then(res => {
                this.props.navigation.navigate('Personal', {refresh: true});
              })
            }} style={styles.logoutBox}>
              <Text style={styles.logoutTxt}>退出登录</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#F0F0F0'
  },
  rowWarp: {
    paddingHorizontal: 15,
    backgroundColor: '#FFF'
  },
  lineBottom: {
    borderBottomColor: '#E6E6E6',
    borderBottomWidth: 1 / 3
  },
  logoutBox: {
    backgroundColor: '#FFF'
  },
  logoutTxt: {
    fontSize: 14,
    color: '#000',
    height: 50,
    lineHeight: 50,
    textAlign: 'center'
  }
});
