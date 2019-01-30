// 客服中心 2018-10
import React,{ Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert
} from 'react-native';
import SubHeader from '../../../libs/subHeader/subHeader';
import InputBox from '../../../libs/inputBox/inputBox';
import {fetchPersonalData, submitPersonalData} from '../proxy';
import {checkSpecialChar, message} from "../../../libs/util";
type props = {}

export default class Account extends Component<props>{
  constructor(props){
    super(props);
    this.state = {
      account: '--', // 用户名
      telephone: '--', // 手机号
      nickName: '--', // 昵称
      sex: 0, // 性别 0 保密 1 男 2 女
      sexTxt: '保密'
    };
  }

  componentDidMount() {
    fetchPersonalData().then(res => {
      if (res.code * 1 === 0 && res.data) {
        const {account, telephone, nickName, sex} = res.data;
        const mirror = ['保密', '男生', '女生'];
        this.setState({
          account: account || '--',
          telephone: telephone || '--',
          nickName: nickName || '--',
          sex: parseInt(sex, 10) || '--',
          sexTxt: mirror[sex] || '保密'
        })
      }
    })
  }

  render(){
    return (
      <View style={styles.container}>
        <SubHeader
          style={{backgroundColor: '#FFF'}}
          onBack={() => { this.props.navigation.goBack();}}
          onEnter={() => {
            let params = {
              sex: this.state.sex
            };
            if (this.state.nickName) {
              params['nickName'] = this.state.nickName
            }
            submitPersonalData(params).then(res => {
              if (+res.code === 0) {
                message('保存数据成功')
              }
            });
          }}
          label="保存"
          icon={require('../../../assets/img/iam/login.png')}
          title="个人信息"/>
        <View style={styles.pageWarp}>
          <View style={styles.cellBox}>
            <Text style={styles.cellKey}>用户名</Text>
            <View style={styles.valBox}>
              <Text style={styles.valTxt}>{this.state.account}</Text>
            </View>
          </View>
          <View style={styles.cellBox}>
            <Text style={styles.cellKey}>手机号</Text>
            <View style={styles.valBox}>
              <Text style={styles.valTxt}>{this.state.telephone}</Text>
            </View>
          </View>
          <View style={styles.cellBox}>
            <Text style={styles.cellKey}>昵称</Text>
            <View style={styles.valBox}>
              <InputBox
                onChangeText={text => {
                  if (checkSpecialChar(text)) { // 对特殊字符的处理
                    return
                  }
                  this.setState({nickName: text})
                }}
                maxLength={16}
                keyboardType='default'
                placeholder="请输入昵称"
                value={this.state.nickName}/>
            </View>
          </View>
          <View style={[styles.cellBox, styles.lastBox]}>
            <Text style={styles.cellKey}>性别</Text>
            <TouchableOpacity onPress={() => {
              Alert.alert(null,'请选择性别',
                [
                  {text:"保密", onPress:() => {
                    this.setState({
                      sex: 0,
                      sexTxt: '保密'
                    }, () => {
                      message('保密')
                    })
                  }},
                  {text:"男生", onPress:() => {
                    this.setState({
                      sex: 1,
                      sexTxt: '男生'
                    }, () => {
                      message('男生')
                    })
                  }},
                  {text:"女生", onPress:() => {
                    this.setState({
                      sex: 2,
                      sexTxt: '女生'
                    }, () => {
                      message('女生')
                    })
                  }},
                ]
              );
            }} style={styles.valBox}>
              <Text style={styles.valTxt}>{this.state.sexTxt}</Text>
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
  pageWarp: {
    paddingHorizontal: 20,
    backgroundColor: '#FFF',
    paddingTop: 10,
    borderTopWidth: 1 / 3,
    borderTopColor: '#B6B6B6'
  },
  cellBox: {
    borderBottomColor: '#E6E6E6',
    borderBottomWidth: 1 / 3,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  cellKey: {
    fontSize: 14,
    color: '#000',
    width: 50
  },
  valBox: {
    flex: 1,
    height: 48,
    flexDirection: 'row',
    marginLeft: 5,
    alignItems: 'center'
  },
  valTxt: {
    fontSize: 13,
    color: '#666'
  },
  lastBox: {
    borderBottomWidth: 0,
  },
});
