// 购物 2018-10
import React,{ Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MainHeader from '../../libs/mainHeader/mainHeader';
import Word from './word/word';

export default class Buy extends Component<props>{
  constructor(props){
    super(props);
  }

  componentDidMount() {}

  render () {
    return (
      <View style={{flex:1,backgroundColor: '#757575'}}>
        {/*<MainHeader navigation={this.props.navigation}/>*/}
        <View style={{flex: 1}}>
          <Word navigation={this.props.navigation}/>
          <View style={styles.tipsWarp}>
            {/*<View style={styles.tipsRow}>*/}
              {/*<Text style={styles.tipsTitle}>限定</Text>*/}
              {/*<View style={styles.tipsContent}>*/}
                {/*<Text>*/}
                  {/*<Text style={[styles.tipsTxt]}>优乐商城商品只限使用打折券购买，且只面向高校开放，商品也只能配送到相应高校。</Text>*/}
                  {/*<Text style={[styles.tipsTxt]}>指定打折券只限购买该品牌<Text style={styles.darkTxt}>官方旗舰店</Text>所有商品</Text>*/}
                  {/*<Text style={[styles.tipsTxt]}>商品最终销售价格以商品吊牌价位基准乘以折扣数，且永久有效,且商品详情数据以相应品牌旗舰店数据为准；</Text>*/}
                {/*</Text>*/}
              {/*</View>*/}
            {/*</View>*/}
            <View style={styles.tipsRow}>
              <Text style={styles.tipsTitle}>购物步骤</Text>
              <View style={styles.tipsContent}>
                <Text style={styles.tipsTxt}>打开<Text style={styles.darkTxt}>淘宝App客户端</Text>或
                  <Text style={styles.darkTxt}>天猫APP客户端</Text>，到
                  <Text style={styles.darkTxt}>相应品牌旗舰店</Text>
                  选中倾向购买商品，点击分享按钮->点击复制口令或复制链接->返回优乐APP-
                  <Text style={styles.darkTxt}>点击粘贴解析淘(喵)口令</Text>
                  按钮，解析商品后凭借打折券可购买该商品;具体图文指南可参考右上角
                  <Text style={styles.redTxt}>购物指南</Text></Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tipsWarp: {
    flex: 1,
    marginHorizontal: 10,
    paddingVertical: 10
  },
  tipsRow: {
    marginBottom: 10
  },
  tipsTitle: {
    height: 30,
    backgroundColor: '#EBEBEB',
    borderRadius: 2,
    lineHeight: 30,
    color: '#fff',
    fontSize: 10,
    fontWeight: '500',
    width: 50,
    textAlign: 'center'
  },
  tipsContent: {
    paddingVertical: 5,
  },
  tipsTxt: {
    fontSize: 12,
    color: '#fff'
  },
  darkTxt: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '500'
  },
  redTxt: {
    fontWeight: '500',
    color: '#b4282d'
  }
});
