// 客服中心 2018-10
import React,{ Component } from 'react';
import {StyleSheet, View, Text,TouchableOpacity} from 'react-native';
import SubHeader from '../../../libs/subHeader/subHeader';
import PwdForm from '../pwdFrom/pwdForm';
import ConfirmModal from './confirm/confirm';
import commonStyle from '../../../assets/commonStyle';
import {message} from '../../../libs/util';
import {registerForApp} from '../proxy';
const styles = StyleSheet.create(commonStyle.iam);
type props = {}

export default class Register extends Component<props>{
  constructor(props){
    super(props);
    this.state={
      visible: true // 是否显示确认框
    }
  }

  componentDidMount() {}

  render(){
    return (
      <View style={{flex: 1}}>
        <ConfirmModal visible={this.state.visible} onCancel = {() => {
          this.setState({visible: false});
          this.props.navigation.navigate('Login');
        }} onEnter={() => {
          this.setState({visible: false});
        }}/>
        <SubHeader
          onBack={() => {
            this.props.navigation.navigate('Login');
          }}
          icon={require('../../../assets/img/iam/login.png')} title="注册账号"/>
        <View style={styles.pageWarp}>
          <PwdForm onClick={(params) => {
            registerForApp().then(res => {
              if (+res.code === 0) {
                message('注册成功');
                setTimeout(() => {
                  this.props.navigation.navigate('Login');
                })
              }
            })
          }} title="立即注册"/>
          <View style={styles.tipsWarp}>
            <Text style={styles.tipsTxt}>已有账号，现在</Text>
            <TouchableOpacity onPress={() => {
              this.props.navigation.navigate('Login');
            }}>
              <Text style={styles.redTxt}>去登录</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
