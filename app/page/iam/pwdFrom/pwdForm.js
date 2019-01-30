// 搜索列表 2018-10
import React, { Component } from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import InputBox from '../../../libs/inputBox/inputBox';
import commonStyle from '../../../assets/commonStyle'; // 公共样式
import {checkSpecialChar, message, validatePhone, validatePwd} from '../../../libs/util';
import {getPhoneValidateCodeForApp} from '../proxy';
import {sha256} from "js-sha256";
const styles = StyleSheet.create(commonStyle.iam);
type props = {}

export default class Gird extends Component {
  constructor(props){
    super(props);
    this.timer = null; // 计时器
    this.state = {
      telephone: null, // 注册手机号
      password: null, // 密码
      validateCode: null, // 手机校验码
      verText: '',
      sendFlag: true // 是否已经发送了手机校验码
    }
  }

  static defaultProps = {
    title: null,
    onClick: null
  };

  componentWillUnmount () {
    this.timer && clearInterval(this.timer);
  }

  startTime () { // 启动计时器
    this.setState({
      sendFlag: false,
      verText: '60s后可重新发送'
    });
    let wait = 59;
    this.timer = setInterval(() => {
      if (wait > 0) {
        this.setState({verText: `${wait}s后可重新发送`});
        wait--
      } else {
        this.setState({
          sendFlag: true,
          verText: '重新发送'
        });
        clearInterval(this.timer)
      }
    }, 1000)
  }

  render() {
    return (
      <View>
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
              placeholder="请设置登录密码（不小于8位的数字字母特殊字符组合）"
              value={this.state.password}/>
          </View>
          <View style={styles.formRow}>
            <InputBox
              onChangeText={text => {
                if (checkSpecialChar(text)) {
                  return
                }
                this.setState({validateCode: text});
              }}
              maxLength={6}
              keyboardType='numeric'
              placeholder="请输入验证码(6位数字)"
              value={this.state.validateCode}/>
            {
              this.state.sendFlag ? (
                <TouchableOpacity style={styles.validCodeWarp} onPress={() => {
                  const {telephone} = this.state;
                  if (!telephone) {
                    message('请先输入注册手机号');
                    return
                  }
                  if (validatePhone(telephone)) {
                    message('请输入正确的手机号');
                    return
                  }
                  getPhoneValidateCodeForApp({telephone: this.state.telephone}).then((res) => {
                    if (+res.code === 0 && res.data) {
                      this.setState({validateCode: res.data.toString()}, () => {
                        this.startTime();
                      })
                    }
                  })
                }}>
                  <Text style={styles.validCode}>获取验证码</Text>
                </TouchableOpacity>
              ) : (
                <View style={styles.validCodeWarp}>
                  <Text style={styles.validCode}>{this.state.verText}</Text>
                </View>
              )
            }
          </View>
        </View>
        <TouchableOpacity onPress={() => {
          const {telephone, password, validateCode} = this.state;
          if (!telephone) {
            message('注册手机号不能为空');
            return
          }
          if (validatePhone(telephone)) {
            message('请输入正确的手机号');
            return
          }
          if (!password) {
            message('登录密码不能为空');
            return
          }
          if (validatePwd(password)) {
            message('登录密码不合法');
            return
          }
          if (!validateCode) {
            message('手机校验码不能为空');
            return
          }
          const params = {
            telephone: this.state.telephone,
            password: sha256(this.state.password),
            validateCode: this.state.validateCode
          };
          this.props.onClick && this.props.onClick(params);
        }} style={styles.submitBtn}>
          <Text style={styles.submitTxt}>{this.props.title}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
