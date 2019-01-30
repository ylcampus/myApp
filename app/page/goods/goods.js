import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';
import SubHeader from '../../libs/subHeader/subHeader';
import SpecBox from './spec/spec';
import Mask from '../../libs/mask/mask';
import {
  fetchGoodsDetailDataForApp,
  fetchTicketDataForApp
} from './proxy';
import {getSpecList, message} from '../../libs/util';

export default class GoodsDetail extends Component {
  state: {
    dataList: Array<any>,
    refreshState: number
  };

  constructor(props) {
    super(props);
    this.state = {
      skuId: null,
      itemImgs: [], // 模态框图片
      nick: '--', // 品牌
      numIid: null, // 商品Id
      orginalPrice: '--', // 商品吊牌价
      picUrl: null, // 商品主图片
      shopId: null, // 店铺Id
      title: '--', // 商品标题
      propsImg: [], // 颜色图片
      specs: [], // 规格列表
      skus: [], // sku列表
      activeKey: null, // 活动图片Id
      showLoading: true,
      ticketId: null // 打折券Id
    }
  }

  async componentDidMount() {
    const {params} = this.props.navigation.state;
    alert(params.numIid);
    const paramsMap = { // 557550203718
      num_iid: '557550203718',
      is_promotion: '1',
      api_name: 'item_get',
      key: 'ulexy.com'
    };
    try {
      this.setState({ showLoading: true})
      const res = await fetchGoodsDetailDataForApp(paramsMap);
      if (res.error) {
        return new Error()
      }
      const {
        item_imgs: itemImgs,
        nick,
        num_iid: numIid,
        orginal_price: orginalPrice,
        pic_url: picUrl,
        props_img: propsImg,
        shop_id: shopId,
        skus,
        title
      } = res.item;
      let propsArr = [];
      for (let key in propsImg) {
        propsArr.push({
          key: key,
          val: 'https:' + propsImg[key]
        })
      }
      // 下面应该从这个地方开始了
      // 获取规格数据
      const keys = Object.keys(propsImg);
      let specsArr = [];
      let activeKey = null;
      if (keys.length) {
        activeKey = keys[0];
        specsArr = getSpecList(skus.sku, keys[0]);
      }
      this.setState({
        itemImgs: itemImgs || [],
        nick: nick.replace('旗舰店', '体验店'),
        numIid: numIid,
        orginalPrice: orginalPrice,
        picUrl: picUrl,
        propsImg: propsArr,
        shopId: shopId,
        skus: skus.sku,
        title: title,
        specs: specsArr,
        activeKey: activeKey,
        showLoading: false
      })
    } catch(err) {
      this.setState({ showLoading: false})
    }
  }

  render() {
    return (
      <View style={{flex: 1,position:'relative'}}>
        {
          this.state.showLoading ? (
            <Mask/>
          ) : null
        }
        <SubHeader
          navigation={this.props.navigation}
          style={{backgroundColor: '#FFF'}}
          onBack={() => {
            this.props.navigation.navigate('Personal')
          }}
          icon={{uri: this.state.picUrl}}
          title="商品详情"/>
        <View style={styles.pageWarp}>
          <View style={styles.bodyPart}>
            <View style={styles.goodsWarp}>
              <TouchableOpacity style={styles.picWarp}>
                <Image source={{uri: this.state.picUrl}} style={styles.pic}/>
              </TouchableOpacity>
              <View style={styles.goodsMsg}>
                <View style={styles.shopNameWarp}>
                  <Text style={styles.shopNameTxt}>{this.state.nick}</Text>
                </View>
                <View style={styles.bodyWarp}>
                  <View style={styles.pricePart}>
                    <Text style={styles.priceTitle}>吊牌价</Text>
                    <Text style={styles.goodsPrice}>￥{this.state.orginalPrice}</Text>
                  </View>
                  <View style={styles.ticketPart}>
                    {
                      this.state.ticketId ? (
                        <Text style={[styles.ticketTxt, styles.ticketTxtRed]}>美津浓官方体验店五折券X1</Text>
                      ) : (
                        <TouchableOpacity onPress={async () => {
                          const res = await fetchTicketDataForApp({shopId: this.state.shopId});
                          if (+res.code * 1 === 0 && res.data) {
                            this.setState({ ticketId: res.data})
                          }
                        }}>
                          <Text style={[styles.ticketTxt, styles.ticketTxtGreen]}>使用打折券</Text>
                        </TouchableOpacity>
                      )
                    }
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.goodsNameWarp}>
              <Text numberOfLines={2} style={styles.goodsName}>{this.state.title}</Text>
            </View>
            <SpecBox
              propsImg={this.state.propsImg}
              specs={this.state.specs}
              skus={this.state.skus}
              activeKey={this.state.activeKey}
              onSkuId={(skuId) => {
                skuId && this.setState({skuId: skuId})
              }}
              onPropsImg={(img) => {
                img && this.setState({picUrl: img})
              }}/>
          </View>
          <View style={styles.submitPart}>
            <Text style={styles.discountTxt}>优惠:(未选择打折券)</Text>
            <TouchableOpacity onPress={() => {
              if (!this.state.ticketId) {
                message('请选择打折券')
                return
              }
              if (!this.state.skuId) {
                message('请选择商品属性')
                return
              }
              this.props.navigation.navigate('OrderConfirm', {
                ticketId: this.state.ticketId,
                skuId: this.state.skuId,
                numIid: this.state.numIid,
                shopId: this.state.shopId
              })
            }}>
              <Text style={[
                styles.buyNow,
                (this.state.ticketId && this.state.skuId) && styles.buyNowActive
              ]}>立即购买</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  pageWarp: {
    flex: 1,
    flexDirection:'column',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    borderTopWidth: 1 / 3,
    borderTopColor: '#B6B6B6'
  },
  bodyPart: {
    flex: 0
  },
  goodsWarp: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 4,
      height: 4
    },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 10,
    borderWidth: 0,
    borderColor: '#FFF'
  },
  picWarp: {
    paddingHorizontal: 5,
    paddingVertical: 5
  },
  pic: {
    width: 160,
    height: 160
  },
  goodsMsg: {
    flex: 1,
    height: 160,
    flexDirection:'column',
    justifyContent: 'space-between'
  },
  shopNameWarp: {
    paddingHorizontal: 5,
    backgroundColor: 'rgba(103,194,58,0.25)'
  },
  shopNameTxt: {
    color: '#333',
    fontSize: 14,
    fontWeight: '500',
    height: 40,
    lineHeight: 40
  },
  bodyWarp: {
    flex: 1,
    flexDirection:'row',
  },
  pricePart: {
    width: 80,
    flex: 0,
    margin: 1,
    marginRight: 0,
    paddingHorizontal: 5,
    backgroundColor: 'rgba(103,194,58,0.25)'
  },
  priceTitle: {
    fontSize: 12,
    color: '#000',
    lineHeight: 22
  },
  goodsPrice: {
    fontSize: 16,
    color: '#b4282d',
    fontFamily: 'tmall_price_font_bold',
    lineHeight: 22
  },
  ticketPart: {
    flex:1,
    margin: 1,
    backgroundColor: 'rgba(103,194,58,0.25)',
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5
  },
  ticketTxt: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500'
  },
  ticketTxtGreen: {
    color: '#000'
  },
  ticketTxtRed: {
    color: '#b4282d',
  },
  goodsNameWarp: {
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderTopWidth: 1 / 3,
    borderTopColor: '#B6B6B6'
  },
  goodsName: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  submitPart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#EBEBEB',
    paddingLeft: 20
  },
  discountTxt: {
    fontSize:13,
    color: '#333',
    fontWeight: '500',
    fontFamily: 'tmall_price_font_bold',
  },
  buyNow:{
    backgroundColor: '#aaa',
    color: '#FFF',
    height: 50,
    lineHeight: 50,
    paddingHorizontal: 40,
    fontSize: 16
  },
  buyNowActive: {
    backgroundColor: '#b4282d',
  }
});
