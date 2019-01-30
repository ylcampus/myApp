// 订单详情 2018-10
import React,{ Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import SubHeader from '../../../libs/subHeader/subHeader';
import Style from './style';
import {fetchOrderDetailDataForApp} from '../proxy';
const styles = StyleSheet.create(Style);

export default class OrderDetail extends Component<props>{
  constructor(props){
    super(props);
    this.state = {
      orderId: null, // 订单Id
      status: null, // 订单状态
      amount: '0.00', // 总金额
      shopName: '--', // 店铺名称
      shopId: null, // 店铺Id
      createAt: '--', // 创建时间
      payMentAt: '--', // 支付时间
      goodsMsg: { // 商品信息
        numIid: null, // 商品Id
        title: '--', // 商品标题
        picUrl: null, // 图片
        orginalPrice: '--', // 吊牌价
        spec: '--' // 规格信息
      },
      address: '--', // 收货地址 - 联系人与联系电话
      addressDetail: '--' // 详细收货地址
    };
  }

  async componentDidMount() {
    const {code, data} = await fetchOrderDetailDataForApp();
    alert(JSON.stringify(data))
    // 接下来就是来处理这位了
    // 估计是需要重新设计
  }

  render(){
    return (
      <View style={styles.container}>
        <SubHeader title='订单详情' style={{backgroundColor: '#FFF'}} onBack={() => {
          alert()
        }}/>
        <View style={styles.bodyPart}>
          <View style={styles.tipsWarp}>
            <Image source={require('../../../assets/img/order/ling.png')} style={styles.tipsIcon}/>
            <Text style={styles.tipsTxt}>虚拟商品、售后商品、处方药品不支持转卖，点击查看，可到“限制管家”管理发布的商品</Text>
            <TouchableOpacity onPress={() => {
              alert('删除提示')
            }}>
              <Image source={require('../../../assets/img/order/del.png')} style={styles.tipsIcon}/>
            </TouchableOpacity>
          </View>
          <ScrollView style={{flex: 1}}>
            <View style={styles.goodsPart}>
              <View style={styles.headerPart}>
                <Image source={require('../../../assets/img/order/shop.png')} style={styles.shopIcon}/>
                <Text style={styles.shopTxt}>达尔优京东自营旗舰店</Text>
              </View>
              <View style={styles.goodsBodyPart}>
                <View style={styles.goodsImgWarp}>
                  <Image source={require('../../../assets/img/008.jpg')} style={styles.goodsPic}/>
                </View>
                <View style={styles.otherBodyPart}>
                  <Text numberOfLines={1} style={styles.goodsTitle}>ASICS亚瑟士稳定跑鞋跑步鞋运动鞋女款T699N-1978</Text>
                  <Text numberOfLines={1} style={styles.specTxt}>数量：1，颜色：DK100【87无光黑轴】</Text>
                  <View style={styles.pricePart}>
                    <Text style={styles.goodsPrice}>￥99.00</Text>
                    <View style={styles.moreBox}>
                      <TouchableOpacity style={styles.btnWarp}>
                        <Text style={styles.btnTxt}>再次购买</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.linkPart}>
                <Image source={require('../../../assets/img/order/server.png')} style={styles.linkPic}/>
                <Text style={styles.linkTxt}>联系客服</Text>
              </View>
            </View>
            <View style={styles.listPart}>
              <View style={styles.cellRow}>
                <Text style={styles.cellKey}>发票类型:</Text>
                <View style={styles.cellVal}>
                  <Text style={styles.cellValTxt}>电子普通发票</Text>
                  <TouchableOpacity style={styles.btnWarp}>
                    <Text style={styles.btnTxt}>查看发票</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.cellRow}>
                <Text style={styles.cellKey}>发票抬头:</Text>
                <View style={styles.cellVal}>
                  <Text style={styles.cellValTxt}>个人</Text>
                </View>
              </View>
              <View style={styles.cellRow}>
                <Text style={styles.cellKey}>发票内容:</Text>
                <View style={styles.cellVal}>
                  <Text style={styles.cellValTxt}>商品明细</Text>
                </View>
              </View>
              <View style={styles.cellRow}>
                <Text style={styles.cellTips}>电子发票与纸质发票具有同等法律效力，可作为用户维权，保修的有效凭据</Text>
              </View>
            </View>
            <View style={styles.listPart}>
              <View style={styles.cellRow}>
                <Text style={styles.cellKey}>订单编号:</Text>
                <View style={styles.cellVal}>
                  <Text style={styles.cellValTxt}>82955201620</Text>
                  <TouchableOpacity style={styles.btnWarp}>
                    <Text style={styles.btnTxt}>复制</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.cellRow}>
                <Text style={styles.cellKey}>下单时间:</Text>
                <View style={styles.cellVal}>
                  <Text style={styles.cellValTxt}>2019-01-05 15:27:37</Text>
                </View>
              </View>
              <View style={styles.cellRow}>
                <Text style={styles.cellKey}>支付方式:</Text>
                <View style={styles.cellVal}>
                  <Text style={styles.cellValTxt}>在线支付</Text>
                </View>
              </View>
              <View style={styles.cellRow}>
                <Text style={styles.cellKey}>支付时间:</Text>
                <View style={styles.cellVal}>
                  <Text style={styles.cellValTxt}>2019-01-05 15:27:37</Text>
                </View>
              </View>
              <View style={styles.cellRow}>
                <Text style={styles.cellKey}>配送方式:</Text>
                <View style={styles.cellVal}>
                  <Text style={styles.cellValTxt}>普通快递</Text>
                </View>
              </View>
            </View>
            <View style={styles.addreddPart}>
              <Image source={require('../../../assets/img/order/dingwei.png')} style={styles.addressPic}/>
              <View style={styles.cellAddress}>
                <Text style={styles.topTxt}>董纪国，182****5737</Text>
                <Text numberOfLines={2} style={styles.bottomTxt}>地址：浙江杭州市滨江区阡陌路555号区阡陌路555号区阡陌路555号海康威视</Text>
              </View>
            </View>
            <View style={styles.totalPart}>
              <View style={styles.totalPartList}>
                <View style={[styles.cellRow, styles.totalVal]}>
                  <Text style={styles.cellKey}>商品总额:</Text>
                  <Text style={[styles.cellValTxt, styles.darkTxt]}>￥1499.00</Text>
                </View>
                <View style={[styles.cellRow, styles.totalVal]}>
                  <Text style={styles.cellKey}>优惠:</Text>
                  <Text style={[styles.cellValTxt, styles.darkTxt]}>-745</Text>
                </View>
                <View style={[styles.cellRow, styles.totalVal]}>
                  <Text style={styles.cellKey}>运费:</Text>
                  <Text style={[styles.cellValTxt, styles.darkTxt]}>+0.00</Text>
                </View>
              </View>
              <View style={styles.totalArea}>
                <Text style={styles.totalTitle}>实付款：</Text>
                <Text style={styles.totalPrice}>￥1499.00</Text>
              </View>
            </View>
          </ScrollView>
        </View>
        <View style={styles.opaPart}>
          <View style={styles.statusPart}>
            <Text style={styles.statusTxt}>待付款</Text>
          </View>
          <View style={styles.opaInnerPart}>
            <TouchableOpacity style={styles.btnWarp}>
              <Text style={styles.btnTxt}>去付款</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnWarp}>
              <Text style={styles.btnTxt}>取消订单</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnWarp}>
              <Text style={styles.btnTxt}>删除订单</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
