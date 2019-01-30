// 支付 2018-10
import React,{ Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image
} from 'react-native';
import SubHeader from '../../../libs/subHeader/subHeader';
import ScrollList from '../../../libs/scrollList/scrollList';
import {paymentForApp} from '../proxy';
import {message} from '../../../libs/util';

export default class OrderPay extends Component<props>{
  constructor(props){
    super(props);
  }

  componentDidMount() {}

  render () {
    const {params} = this.props.navigation.state;
    return (
      <View style={styles.container}>
        <SubHeader title='优乐收银台' onBack={() => {
          this.props.navigation.goBack()
        }}/>
        <ScrollList>
          <View>
            <View style={styles.paySection}>
              <View style={styles.payArea}>
                <Text style={styles.darkTxt}>付款金额</Text>
                <Text style={styles.payVal}>￥{params.amount}</Text>
              </View>
              <View style={styles.addressArea}>
                <Text style={styles.darkTxt}>收货信息</Text>
                <Text style={styles.normalTxt}>{params.address}</Text>
              </View>
            </View>
            <View>
              <Text style={styles.selTxt}>请选择支付方式</Text>
              <TouchableOpacity onPress={async () => {
                const {code} = await paymentForApp({orderId: params.orderId});
                if (+code === 0) {
                  message('执行支付操作')
                }
              }} style={styles.payCell}>
                <View style={styles.leftArea}>
                  <Image source={require('../../../assets/img/order/weixin.png')} style={styles.payIcon}/>
                  <Text style={styles.payTxt}>微信</Text>
                </View>
                <View>
                  <Image source={require('../../../assets/img/order/navMore.png')} style={styles.navMoreIcon}/>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollList>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    position: 'relative',
    flexDirection:'column',
    justifyContent: 'space-between'
  },
  paySection: {
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingTop: 5,
    paddingBottom: 15
  },
  payArea: {
    height: 40,
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  payVal: {
    color: '#b4282d',
    fontSize: 16,
    fontWeight: '500'
  },
  addressArea: {
    marginBottom: 5
  },
  darkTxt: {
    fontSize: 13,
    color: '#333',
    fontWeight: '500'
  },
  normalTxt: {
    fontSize: 13,
    color: '#909399'
  },
  selTxt: {
    height: 30,
    lineHeight: 30,
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
    paddingHorizontal: 20
  },
  payCell: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    justifyContent: 'space-between'
  },
  leftArea: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  payIcon: {
    width: 24,
    height: 24
  },
  payTxt: {
    color: '#000',
    fontSize: 14,
    marginLeft: 5
  },
  navMoreIcon: {
    width: 22,
    height: 22,
    tintColor: '#000'
  }
});
