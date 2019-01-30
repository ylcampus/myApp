// 打折券抢购页 2018-10
import React,{ Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import SubHeader from '../../../libs/subHeader/subHeader';
import Timer from './timer/timer';
import Grab from './grab/grab';
import {fetchSecKillData} from "../fetch";
import {getGrantTime} from '../../../libs/util';
type props = {}

export default class Obtain extends Component<props>{
  constructor(props){
    super(props);
    this.state = {
      shopId: null, // 店铺Id
      shopName: null, // 店铺名称
      ticketType: [], // 打折券类型
      ticketNumber: 0, // 本期发放打折券数量
      grantType: 1, // 打折券发放类型
      grantDate: '00', // 发放日期
      grantTime: '00:00:00', // 发放时间
      remainder: 0, // 剩余打折券数量
      grantTimeStr: ''
    }
  }

  componentDidMount() {
    this.loadData();
  }

  loadData (flag) {
    return fetchSecKillData(flag).then(res => {
      if (res.code * 1 === 0 && res.data) {
        const {
          shopId,
          shopName,
          ticketType,
          ticketNumber,
          grantDate,
          grantTime,
          grantType,
          remainder
        } = res.data || {};
        const target = getGrantTime(grantDate, grantTime, grantType);
        const grantTimeStr = target.year + '年' + target.month + '月' + target.day + '日' + target.hour + ':' + target.minute + ':' + target.second;
        this.setState({
          shopId: shopId || null,
          shopName: shopName || null,
          ticketType: ticketType || [],
          ticketNumber: ticketNumber || 0,
          grantType: grantType || 1,
          grantDate: grantDate || '00',
          grantTime: grantTime || '00:00:00',
          remainder: remainder || 5,
          grantTimeStr: grantTimeStr
        });
      }
    })
  }

  render(){
    return (
      <View style={styles.container}>
        <SubHeader
          style={{backgroundColor: '#FFF'}}
          navigation={this.props.navigation} onBack={() => { this.props.navigation.navigate('Personal') }}
          icon={require('../../../assets/img/discount/secKill.png')} title="秒杀"/>
        <View style={styles.pageWarp}>
          <View style={styles.remindTimeWarp}>
            <Text style={styles.remindTime}>剩余时间</Text>
            <TouchableOpacity onPress={() => {
              this.loadData(true).then(() => {})
            }} style={styles.refreshBtn}>
              <Text style={styles.refreshTxt}>刷新</Text>
            </TouchableOpacity>
          </View>
          <Timer
            onEnd={() => { this.loadData(true) }}
            grantType={this.state.grantType}
            grantDate={this.state.grantDate}
            grantTime={this.state.grantTime}/>
          <View style={styles.shopMsg}>
            <View style={styles.leftPart}>
              <Text style={styles.shopName}>{this.state.shopName}</Text>
              <Text style={styles.numTxt}>发售时间:{this.state.grantTimeStr}</Text>
              <Text style={styles.numTxt}>本期发放<Text style={styles.darkTxt}>{this.state.ticketNumber}</Text>张打折券</Text>
              <View style={styles.remainderWarp}>
                <Text style={styles.numTxt}>剩余</Text>
                <Text style={styles.remainder}>{this.state.remainder}</Text>
                <Text style={styles.numTxt}>张打折券</Text>
              </View>
            </View>
            <View style={[styles.rightPart]}>
              <View style={styles.ticketType}>
                <Text style={styles.ticketNumber}>伍</Text>
                <Text style={styles.typeTxt}>折券</Text>
              </View>
            </View>
          </View>
          <Grab remainder={this.state.remainder}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#F4F4F4'
  },
  pageWarp: {
    flex: 1,
    paddingHorizontal: 10,
    borderTopWidth: 1 / 3,
    borderTopColor: '#B6B6B6'
  },
  remindTimeWarp: {
    height: 40,
    borderBottomColor: '#E6E6E6',
    borderBottomWidth: 1 / 3,
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    paddingHorizontal: 5
  },
  remindTime: {
    color: '#000',
    fontSize: 14
  },
  refreshBtn: {
    flexDirection: 'row',
    paddingHorizontal: 1
  },
  refreshTxt: {
    height: 30,
    backgroundColor: '#EBEBEB',
    borderRadius: 2,
    lineHeight: 30,
    color: '#000',
    fontSize: 10,
    fontWeight: '500',
    width: 50,
    textAlign: 'center'
  },
  shopMsg: {
    paddingLeft: 10,
    paddingRight: 5,
    flexDirection:'row',
    justifyContent: 'space-between',
    borderTopColor: '#E6E6E6',
    borderTopWidth: 1 / 3,
    backgroundColor: '#FFF',
    paddingTop: 5,
    paddingBottom: 40
  },
  leftPart: {
    flex:1,
    flexDirection:'column',
    justifyContent: 'flex-start',
  },
  shopName: {
    fontSize: 14,
    color: '#000'
  },
  numTxt: {
    fontSize: 11,
    color: '#909399'
  },
  remainderWarp: {
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  remainder: {
    fontSize: 28,
    color: '#b4282d',
    fontWeight: '500',
    marginHorizontal: 5
  },
  darkTxt: {
    fontSize: 22,
    color: '#303133',
    fontWeight: '500',
    paddingHorizontal: 2
  },
  rightPart: {
    width: 80
  },
  ticketType: {
    width: 80,
    height: 80,
    position: 'relative',
    backgroundColor: '#EBEBEB',
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  ticketNumber: {
    fontSize: 32,
    color: '#303133'
  },
  typeTxt: {
    fontSize: 10,
    color: '#909399',
    position: 'absolute',
    bottom: 4,
    right: 4
  }
});
