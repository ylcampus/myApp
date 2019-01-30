// 提交订单 2018-09
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
import Address from './address/address';
import {fetchAddressData, submitOrder, fetchGoodsDetailDataBySkuIdForApp} from '../proxy';
import {message} from '../../../libs/util';

export default class OrderConfirm extends Component<props>{
  constructor(props){
    super(props);
    this.state = {
      skuId: null, // skuId
      ticketId: null, // 打折券Id
      numIid: null, // 商品Id
      title: '',  // 商品名称
      shopId: null, // 店铺Id
      specTxt: '--', // 规则
      picUrl: null, // 商品图片
      orginalPrice: '--', // 吊牌价
      addressData: '--', // 收货地址
      hasAddress: false,  // 是否设置了收货地址
      discount: '0.00', // 优惠
      amount: '0.00', // 应付总额
      address: null // 收货信息
    };
  }

  async componentDidMount() { // 之后要尝试加入遮罩层
    try {
      const {params} = this.props.navigation.state;
      const paramsMap = {
        num_iid: params.numIid,
        sku_id: params.skuId,
        api_name: 'item_sku',
        key: 'ulexy.com'
      };
      const goodsRes = await fetchGoodsDetailDataBySkuIdForApp(paramsMap);
      const {
        name: specTxt,
        img: picUrl,
        orginal_price: orginalPrice,
        title
      } = goodsRes.item;
      // 获取收货地址数据
      const addressRes = await fetchAddressData();
      let addressData ={};
      let hasAddress = true;
      if (+addressRes.code === 0 && addressRes.data) {
        addressData = {...addressRes.data}
      } else {
        hasAddress = true;
      }
      // 计算优惠价格与应付总额
      const price = Math.ceil(parseInt(orginalPrice, 10) / 2)
      this.setState({
        skuId: params.skuId,
        ticketId: params.ticketId,
        numIid: params.numIid,
        title: title,
        shopId: params.shopId,
        specTxt: specTxt,
        picUrl: 'https:' + picUrl,
        orginalPrice: orginalPrice,
        addressData: addressData,
        hasAddress: hasAddress,
        discount: price + '.00',
        amount: parseInt(orginalPrice, 10) - price + '.00'
      })
    } catch(err) {
      alert(2)
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <SubHeader
          style={{backgroundColor: '#FFF'}}
          onBack={() => {
            this.props.navigation.navigate('GoodsDetail');
          }}
          title="确认订单"/>
        <ScrollList>
          <Address
            data={this.state.addressData}
            hasAddress={this.state.hasAddress}
            navigation={this.props.navigation}
            onAddress = {(address) => {
              this.setState({address: address})
            }}/>
          <View style={styles.goodsPart}>
            <View style={styles.goodsRow}>
              <Image source={{uri: this.state.picUrl}} style={styles.goodsPic}/>
              <View style={styles.proMsg}>
                <View>
                  <Text numberOfLines={2} style={styles.goodsTitle}>{this.state.title}</Text>
                  <Text numberOfLines={2} style={styles.colorSize}>{this.state.specTxt}</Text>
                </View>
                <View style={styles.pricePart}>
                  <Text style={styles.goodsPrice}>￥{this.state.orginalPrice}</Text>
                  <Text style={styles.goodsNumber}>x1</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.cellBox}>
            <Text style={styles.cellKey}>发票</Text>
            <Text style={styles.cellVal}>普通发票</Text>
          </View>
          <View style={styles.totalBox}>
            <View style={styles.totalRow}>
              <Text style={styles.totalKey}>吊牌价</Text>
              <Text style={[styles.totalVal, {color: '#b4282d', fontSize: 14}]}>￥{this.state.orginalPrice}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalKey}>优惠（五折券）</Text>
              <Text style={styles.totalVal}>-￥{this.state.discount}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalKey}>配送费用</Text>
              <Text style={styles.totalVal}>+￥0.00</Text>
            </View>
          </View>
        </ScrollList>
        <View>
          <View style={styles.opaPart}>
            <View style={styles.amountArea}>
              <Text style={styles.amountTxt}>应付总额：</Text>
              <Text style={styles.amountMoney}>￥{this.state.amount}</Text>
            </View>
            {
              !this.state.hasAddress && (
                <View>
                  <Text onPress={() => {

                  }} style={styles.submitDisabled}>提交订单</Text>
                </View>
              )
            }
            {
              this.state.hasAddress && (
                <TouchableOpacity onPress={async () => {
                  if (!this.state.hasAddress) {
                    message('请先添加收货地址')
                    return
                  }
                  const params = {
                    ticketId: this.state.ticketId,
                    skuId: this.state.skuId,
                    numIid: this.state.numIid,
                    shopId: this.state.shopId,
                    address: '董纪国,18205185737,江苏省南京市鼓楼区汉口路22号'
                  };
                  const res = await submitOrder(params);
                  if (+res.code === 0) {
                    const orderId = '123456';
                    this.props.navigation.navigate('OrderPay', {
                      address: this.state.address,
                      amount: this.state.amount,
                      orderId: orderId
                    })
                  }
                }}>
                  <Text style={styles.submitBtn}>提交订单</Text>
                </TouchableOpacity>
              )
            }
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ticksWarp: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    position: 'relative',
    flexDirection:'column',
    justifyContent: 'space-between'
  },
  goodsPart: {
    backgroundColor: '#FFF',
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 15,
    marginTop: 5
  },
  goodsRow: {
    flexDirection:'row',
    justifyContent: 'space-between',
    paddingVertical: 5
  },
  goodsPic: {
    width: 110,
    height: 110
  },
  proMsg: {
    flex: 1,
    height: 100,
    marginLeft: 10,
    flexDirection:'column',
    justifyContent: 'space-between',
  },
  goodsTitle: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500'
  },
  colorSize: {
    fontSize: 12,
    color: '#000',
    height: 30,
    lineHeight: 30
  },
  pricePart: {
    flex: 1,
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  goodsPrice: {
    color: '#b4282d',
    fontSize: 16,
    fontWeight: '500'
  },
  goodsNumber: {
    fontSize: 14,
    color: '#303133'
  },
  cellBox: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingHorizontal: 15
  },
  cellKey:{
    fontSize: 13,
    color: '#000'
  },
  cellVal:{
    fontSize: 13,
    color: '#303133',
    fontWeight: '500'
  },
  lightCellVal: {
    fontWeight: '200'
  },
  totalBox: {
    marginTop: 5,
    backgroundColor: '#FFF',
    paddingHorizontal: 15,
    paddingTop: 15,
    marginBottom: 20,
    paddingBottom: 30
  },
  totalRow: {
    height: 30,
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  totalKey: {
    fontSize: 13,
    color: '#000'
  },
  totalVal: {
    fontSize: 14,
    color: '#000',
    flex: 1,
    textAlign: 'right',
    fontWeight: '500'
  },
  opaPart: {
    height: 50,
    backgroundColor: '#FFF',
    paddingLeft: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  amountArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  amountTxt: {
    fontSize: 14,
    color: '#303133',
    fontWeight: '500'
  },
  amountMoney: {
    fontSize: 16,
    color: '#ca151e',
    fontWeight: '500',
    fontFamily: 'tmall_price_font_bold',
  },
  submitBtn: {
    backgroundColor: 'rgba(202,21,30,.75)',
    color: '#FFF',
    height: 50,
    lineHeight: 50,
    paddingHorizontal: 40,
    fontSize: 16
  },
  submitDisabled: {
    backgroundColor: '#aaa',
    color: '#FFF',
    height: 50,
    lineHeight: 50,
    paddingHorizontal: 40,
    fontSize: 16
  }
});
