// 忘记密码 2018-10
import React,{ Component } from 'react';
import {StyleSheet, View} from 'react-native';
import SubHeader from '../../../libs/subHeader/subHeader';
import PwdForm from '../pwdFrom/pwdForm';
import commonStyle from '../../../assets/commonStyle';
import {message} from '../../../libs/util';
import {forgetPwdForApp} from "../proxy";
const styles = StyleSheet.create(commonStyle.iam);
type props = {}

export default class Forget extends Component<props>{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <View style={{flex: 1}}>
        <SubHeader
          onBack={() => {
            this.props.navigation.navigate('Login');
          }}
          icon={require('../../../assets/img/iam/login.png')}
          title="重置登录密码"/>
        <View style={styles.pageWarp}>
          <PwdForm onClick={(params) => {
            alert(JSON.stringify(params))
            forgetPwdForApp(params).then(res => {
              if (+res.code === 0) {
                message('重置登录密码成功')
              }
            })
          }} title="重置登录密码"/>
        </View>
      </View>
    );
  }
}
