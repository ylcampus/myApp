// 商品项 2018-10
import React,{ Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Clipboard
} from 'react-native';
import {getGoodsDetailDataByWardForApp} from '../proxy';
import {message} from '../../../libs/util';

export default class Timer extends Component {
  constructor(props){
    super(props);
    this.state = {
      numIid: null, // 商品Id
      url: null, // 商品主图片
      title: null, // 商品标题
      orginalPrice: null, // 吊牌价
      isLoadding: false // 是否正在加载
    };
  };

  render() {
    return (
      <View style={styles.wordWarp}>
        <View style={styles.wordPart}>
          {
            this.state.numIid ? (
              <View style={styles.goodsWarp}>
                <View style={styles.picWarp}>
                  <Image source={{uri: this.state.url}} style={styles.pic}/>
                </View>
                <View style={styles.goodsMsg}>
                  <View style={styles.goodsNameWarp}>
                    <Text numberOfLines={2} style={[styles.goodsName]}>{this.state.title}</Text>
                  </View>
                  <View style={styles.otherMsg}>
                    <View>
                      <Text style={styles.goodsPriceTitle}>吊牌价</Text>
                      <Text style={styles.goodsPrice}>￥{this.state.orginalPrice}</Text>
                    </View>
                    <TouchableOpacity onPress={() => {
                      this.props.navigation.navigate('GoodsDetail', {numIid: this.state.numIid});
                    }} style={styles.seeMoreWarp}>
                      <Text style={styles.seeMore}>查看详情</Text>
                      <Image source={require('../../../assets/img/buy/bianjiao.png')} style={[styles.bianjiao,styles.topLeft]}/>
                      <Image source={require('../../../assets/img/buy/bianjiao.png')} style={[styles.bianjiao, styles.topRight]}/>
                      <Image source={require('../../../assets/img/buy/bianjiao.png')} style={[styles.bianjiao, styles.bottomLeft]}/>
                      <Image source={require('../../../assets/img/buy/bianjiao.png')} style={[styles.bianjiao, styles.bottomRight]}/>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ) : (
              <View style={styles.placeWarp}>
                <Text style={styles.wordPlaceholder}>输入淘（喵）口令解析</Text>
              </View>
            )
          }
          {
            this.state.isLoadding && (
              <View style={styles.loaddingWarp}>
                <Text style={[styles.loaddingTxt]}>解析中...</Text>
              </View>
            )
          }
        </View>
        <View style={styles.btnsWarp}>
          <TouchableOpacity onPress={async () => {
            try {
              this.setState({isLoadding: true});
              const clipboardTxt = await Clipboard.getString();
              const start = clipboardTxt.toString().indexOf('http');
              const end = clipboardTxt.toString().lastIndexOf(')');
              const word = clipboardTxt.substring(start, end);
              const params = {
                word: encodeURIComponent(word),
                title: 'yes',
                api_name: 'item_password',
                lan: 'zh-CN',
                key: 'ulexy.com'
              };
              const {item} = await getGoodsDetailDataByWardForApp(params);
              if (!item.error) {
                this.setState({
                  numIid: item.num_iid,
                  url: item.pic_url,
                  title: item.title,
                  orginalPrice: item.orginal_price,
                  isLoadding: false
                })
              }
            } catch (e) {
              this.setState({isLoadding: false});
            }
          }} style={styles.analyzeBtnWarp}>
            <Text style={styles.analyzeBtn}>粘贴解析淘（喵）口令</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            this.setState({numIid: null}, () => { message('清除成功')});
          }} style={styles.clearBtnWarp}>
            <Text style={styles.clearBtn}>清除</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wordWarp: {
    // elevation: 2,
    borderBottomWidth: 0
  },
  wordPart: {
    position: 'relative',
  },
  placeWarp: {
    height: 200,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  wordPlaceholder: {
    fontSize: 13,
    color: '#C0C4CC'
  },
  goodsWarp: {
    height: 200,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5
  },
  picWarp: {
    width: 140,
    height: 140,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EBEBEB'
  },
  pic: {
    width: 136,
    height: 136
  },
  goodsMsg: {
    flex: 1,
    height: 140,
    flexDirection:'column',
    justifyContent: 'space-between',
    paddingLeft: 5,
    paddingRight: 1
  },
  goodsNameWarp: {
    height: 50,
    alignItems: 'center',
    flexDirection: 'row'
  },
  goodsName: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500'
  },
  otherMsg: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  seeMoreWarp: {
    flexDirection: 'row',
    position: 'relative'
  },
  seeMore: {
    backgroundColor: '#F0F0F0',
    fontSize: 12,
    color: '#b4282d',
    height: 90,
    lineHeight:90,
    width: 90,
    textAlign: 'center',
    fontWeight: '500'
  },
  bianjiao:{
    position: 'absolute',
    width: 22,
    height: 22,
    tintColor: '#333'
  },
  topLeft: {
    top: 0,
    left: 0,
  },
  topRight: {
    top: 0,
    right: 0,
    transform: [{rotateY:'180deg'}]
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    transform: [{rotateX:'180deg'}]
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    transform: [
      {rotateY:'180deg'},
      {rotateX:'180deg'}
    ]
  },
  goodsPriceTitle: {
    fontSize: 12,
    color: '#000'
  },
  goodsPrice: {
    fontSize: 16,
    color: '#b4282d',
    fontFamily: 'tmall_price_font_bold'
  },
  loaddingWarp: {
    position: 'absolute',
    top: 1,
    left: 1,
    right: 1,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  loaddingTxt: {
    color: '#FFF',
    fontSize: 12,
    backgroundColor: 'rgba(51, 51, 51, 0.85)',
    width: 60,
    height: 40,
    lineHeight: 40,
    textAlign: 'center',
    borderRadius: 5
  },
  btnsWarp: {
    justifyContent: 'space-between',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center'
  },
  analyzeBtnWarp: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#47B34F',
    height: 48,
  },
  analyzeBtn: {
    color: '#FFF',
    fontSize: 13
  },
  clearBtnWarp: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#757575',
    height: 48,
  },
  clearBtn: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '500'
  }
});
