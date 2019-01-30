// 客服中心 2018-10
import React,{ Component } from 'react';
import {StyleSheet, View} from 'react-native';
import SubHeader from '../../../libs/subHeader/subHeader';
import PwdForm from '../pwdFrom/pwdForm';
import commonStyle from '../../../assets/commonStyle'; // 公共样式
import {message} from '../../../libs/util';
import {changePwdForApp} from '../proxy';
const styles = StyleSheet.create(commonStyle.iam);
type props = {}

export default class Password extends Component<props>{
  constructor(props){
    super(props);
  }

  componentDidMount() {}

  render(){
    return (
      <View style={{flex: 1}}>
        <SubHeader
          onBack={() => {
            this.props.navigation.navigate('Personal')
          }}
          icon={require('../../../assets/img/iam/login.png')} title="修改密码"/>
        <View style={styles.pageWarp}>
          <PwdForm onClick={(params) => {
            changePwdForApp().then(res => {
              if (+res.code === 0) {
                message('修改密码成功')
              }
            })
          }} title="修改密码"/>
        </View>
      </View>
    );
  }
}
