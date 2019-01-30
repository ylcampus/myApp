// 用户登录 2018-10
import React,{ Component } from 'react';
import {StyleSheet, View, Text,TouchableOpacity} from 'react-native';
import {sha256} from 'js-sha256'
import SubHeader from '../../../libs/subHeader/subHeader';
import InputBox from '../../../libs/inputBox/inputBox';
import commonStyle from '../../../assets/commonStyle';
import {checkSpecialChar, message, validatePhone, validatePwd} from "../../../libs/util"; // 公共样式
import {loginInForApp} from '../proxy';
const styles = StyleSheet.create(commonStyle.iam);
type props = {}

export default class Login extends Component<props>{
  constructor(props){
    super(props);
    this.state = {
      telephone: null, // 注册手机号
      password: null // 密码
    }
  }

  componentDidMount() {}

  render(){
    return (
      <View style={{flex: 1}}>
        <SubHeader
          onBack={() => {
            this.props.navigation.goBack();
          }}
          style={{backgroundColor: '#757575'}}
          icon={require('../../../assets/img/iam/login.png')}
          title="账号登录"/>
        <View style={styles.pageWarp}>
          <View style={styles.formArea}>
            <View style={styles.formRow}>
              <InputBox
                onChangeText={text => {
                  if (checkSpecialChar(text)) {
                    return
                  }
                  this.setState({telephone: text});
                }}
                maxLength={11}
                keyboardType='numeric'
                placeholder="请输入注册手机号码"
                value={this.state.telephone}/>
            </View>
            <View style={styles.formRow}>
              <InputBox
                type="password"
                onChangeText={text => {
                  this.setState({password: text})
                }}
                maxLength={16}
                keyboardType='default'
                placeholder="请输入登录密码"
                value={this.state.password}/>
            </View>
          </View>
          <TouchableOpacity onPress = {() => {
            const {telephone, password} = this.state;
            if (!telephone) {
              message('注册手机号不能为空');
              return
            }
            if (!password) {
              message('登录密码不能为空');
              return
            }
            if (validatePhone(telephone)) {
              message('请输入正确的手机号');
              return
            }
            if (validatePwd(password)) {
              message('请输入正确的登录密码');
              return
            }
            const params = {
              telephone: this.state.telephone,
              password: sha256(this.state.password)
            };
            alert(JSON.stringify(params))
            loginInForApp(params).then(res => {
              if (+res.code === 0) {
                this.props.navigation.navigate('Personal', {refresh: true});
              }
            });
          }} style={styles.submitBtn}>
            <Text style={styles.submitTxt}>马上登录</Text>
          </TouchableOpacity>
          <View style={styles.navWarp}>
            <TouchableOpacity onPress={() => {
              this.props.navigation.navigate('Register');
            }}>
              <Text style={styles.navTxt}>快速注册</Text>
            </TouchableOpacity>
            <Text style={styles.navLine}>|</Text>
            <TouchableOpacity onPress={() => {
              this.props.navigation.navigate('Forget');
            }}>
              <Text style={styles.navTxt}>重置密码</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
