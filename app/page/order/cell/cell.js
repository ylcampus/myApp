// 商品项 2018-09
import React, {PureComponent} from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {message, confirm} from "../../../libs/util";
import {confirmForApp, cancelOrderApp, deleteOrderForApp} from '../proxy';

export default class Cell extends PureComponent {

  componentDidMount() {}

  render() {
    let {info} = this.props;
    const mirrorArr = ['', '待付款', '待确认收货', '已完成', '已取消'];
    return (
      <TouchableOpacity style={{flex: 1}} onPress={() => { this.props.onPress(info) }}>
        <View style={styles.rowCell}>
          <View style={styles.titleArea}>
            <View style={styles.shopNamePart}>
              <Text style={styles.shopNameTxt}>{info.shopName}</Text>
            </View>
            <View style={styles.statusPart}>
              <Text style={styles.statusTxt}>{mirrorArr[info.status]}</Text>
            </View>
          </View>
          <View style={styles.goodsMsg}>
            <View style={styles.msgPart}>
              <Image source={info.pic} style={styles.goodsIcon} />
              <Text numberOfLines={3} style={styles.goodsTitle}>ASICS亚瑟士稳定跑鞋跑步鞋运动鞋女款T699N-1978</Text>
            </View>
            <View style={styles.totalPart}>
              <Text style={styles.totalTxt}>共1件商品 应付款：￥<Text style={styles.priceTXt}>1699.00</Text></Text>
            </View>
          </View>
          <View style={styles.footPart}>
            {
              info.status === '1' && (
                <TouchableOpacity onPress = {() => {
                  this.props.navigation.navigate('OrderPay', {
                    address: info.address,
                    amount: info.amount,
                    orderId: info.orderId
                  })
                }} style={styles.opaPart}>
                  <Text  style={[styles.opaTag, {backgroundColor: '#47B34F'}]}>去付款</Text>
                </TouchableOpacity>
              )
            }
            {
              info.status === '1' && (
                <TouchableOpacity onPress = {() => {
                  confirm('确定要取消订单吗', () => {
                    cancelOrderApp({orderId: info.orderId}).then(res => {
                      if (+res.code === 0) {
                        message('操作成功')
                        this.props.onRefresh && this.props.onRefresh()
                      }
                    })
                  })
                }} style={styles.opaPart}>
                  <Text  style={[styles.opaTag, {backgroundColor: '#E6A23C'}]}>取消订单</Text>
                </TouchableOpacity>
              )
            }
            {
              (['2'].indexOf(info.status) !== -1) && (
                <TouchableOpacity onPress = {() => {
                  confirm('确定要执行确认收货操作码', () => {
                    confirmForApp({orderId: info.orderId}).then(res => {
                      if (+res.code === 0) {
                        message('操作成功')
                        this.props.onRefresh && this.props.onRefresh()
                      }
                    })
                  })
                }} style={styles.opaPart}>
                  <Text style={[styles.opaTag, {backgroundColor: '#1EA5FF'}]}>确认收货</Text>
                </TouchableOpacity>
              )
            }
            {
              (['3', '4'].indexOf(info.status) !== -1) && (
                <TouchableOpacity onPress = {() => {
                  confirm('确定要删除该订单吗？', () => {
                    deleteOrderForApp({orderId: info.orderId}).then(res => {
                      if (+res.code === 0) {
                        message('删除订单成功')
                        this.props.onRefresh && this.props.onRefresh()
                      }
                    })
                  })
                }} style={styles.opaPart}>
                  <Text style={styles.opaTag}>删除订单</Text>
                </TouchableOpacity>
              )
            }
            {
              (['3', '4'].indexOf(info.status) !== -1) && (
                <TouchableOpacity onPress = {() => {
                  this.props.navigation.navigate('GoodsDetail', { numIid: info.numIid });
                }} style={styles.opaPart}>
                  <Text style={[styles.opaTag, {backgroundColor: '#666'}]}>再次购买</Text>
                </TouchableOpacity>
              )
            }
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  rowCell: {
    backgroundColor: '#FFF',
    marginBottom: 10,
    borderRadius: 10
  },
  titleArea: {
    height: 40,
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderBottomColor: '#DDD',
    borderBottomWidth: 1 / 3
  },
  shopNamePart: {
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  shopNameTxt: {
    color: '#333',
    fontSize: 14,
    marginLeft: 3,
    fontWeight: '500'
  },
  statusPart: {
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  goodsMsg: {},
  msgPart: {
    flexDirection:'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    paddingHorizontal: 15,
    alignItems: 'center',
    backgroundColor: '#f0f0f0'
  },
  totalPart: {
    height: 40,
    alignItems: 'center',
    flexDirection:'row',
    justifyContent: 'flex-end',
    borderBottomWidth: 1 / 3,
    borderBottomColor: '#ddd',
    paddingHorizontal: 15,
  },
  goodsIcon: {
    width: 80,
    height: 80,
    marginLeft: 5
  },
  goodsTitle: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    paddingHorizontal: 10
  },
  totalTxt: {
    color: '#333',
    fontSize: 13,
    fontWeight: '500'
  },
  priceTXt: {
    color: '#333',
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'tmall_price_font_bold'
  },
  footPart: {
    flexDirection:'row',
    justifyContent: 'flex-end',
    height: 40,
    alignItems: 'center',
    marginHorizontal: 15
  },
  opaPart: {
    flexDirection:'row'
  },
  opaTag: {
    color: '#FFF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    fontSize: 12,
    backgroundColor: '#b4282d',
    borderRadius: 10,
    marginHorizontal: 2
  },
  statusTxt: {
    fontSize: 13,
    marginRight: 3,
    color: '#333',
    fontWeight: '500'
  }
});
