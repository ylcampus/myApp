// 我的打折券 2018-10
import React, {PureComponent} from 'react'
import {
  StyleSheet,
  View,
  Text,
  Clipboard,
  TouchableOpacity
} from 'react-native';
import {message} from '../../../../libs/util';

export default class Cell extends PureComponent {
  constructor(props){
    super(props);
    this.state = {}
  };

  componentDidMount() {};

  render() {
    let {info} = this.props;
    return (
      <View style={styles.discountBox}>
        <View style={styles.topArea}>
          <View style={styles.leftPart}>
            <Text style={styles.shopTxt}>{info.shopName}</Text>
            <View style={styles.noPart}>
              <Text style={styles.discountIdTxt}>{info.ticketId}</Text>
              <TouchableOpacity onPress={async () => {
                await Clipboard.setString(info.ticketId);
                message('复制成功')
              }}>
                <Text style={styles.copyTxt}>复制</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            {
              info.status === '1' ? (
                <Text style={[styles.ticketStatus, styles.tickNoUse]}>未使用</Text>
              ) : (
                <Text style={[styles.ticketStatus, styles.tickUsed]}>已经使用</Text>
              )
            }
          </View>
        </View>
        <TouchableOpacity onPress = {() => {
          this.props.onPress && this.props.onPress(info)
        }} style={styles.bottomArea}>
          <View style={styles.ticketType}>
            <Text style={styles.ticketNumber}>伍</Text>
            <Text style={styles.numTxt}>折券</Text>
          </View>
          <View style={styles.descPart}>
            <View style={styles.descTopPart}>
              <Text style={styles.descRowTxt}>期限：永久有效</Text>
              <Text style={styles.descRowTxt}>适用范围：全品类</Text>
            </View>
            <View style={styles.descBottomPart}>
              <Text style={styles.descTxt}>打折券折扣数为以商品吊牌价为基准,适用于关联品牌所有在售商品且永久有效。</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    )
  };
};

const styles = StyleSheet.create({
  discountBox: {
    backgroundColor: '#FFF',
    paddingBottom: 15,
    marginHorizontal: 5,
    borderRadius: 5,
    marginBottom: 5
  },
  topArea: {
    flexDirection:'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1 / 3,
    borderBottomColor: '#CCC',
  },
  leftPart: {
    flex: 1,
    justifyContent: 'space-between',
  },
  shopTxt: {
    fontSize: 13,
    color: '#000'
  },
  discountIdTxt: {
    fontSize: 12,
    color: '#262626',
    lineHeight: 20
  },
  noPart: {
    flexDirection:'row',
    alignItems: 'center'
  },
  copyTxt: {
    fontSize: 10,
    backgroundColor: '#E6E6E6',
    borderRadius: 15,
    marginLeft: 10,
    paddingHorizontal: 5,
    color: '#000'
  },
  ticketStatus: {
    color: '#EEE',
    fontSize: 13,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 2
  },
  tickNoUse: {
    backgroundColor: '#67C23A',
  },
  tickUsed: {
    backgroundColor: '#666'
  },
  bottomArea: {
    flexDirection:'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 5
  },
  ticketType: {
    width: 70,
    height: 70,
    position: 'relative',
    backgroundColor: '#F0F0F0',
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  ticketNumber: {
    fontSize: 32,
    color: '#303133'
  },
  numTxt: {
    fontSize: 10,
    color: '#909399',
    position: 'absolute',
    bottom: 4,
    right: 4
  },
  descPart:{
    flex: 1,
    flexDirection:'column',
    justifyContent: 'space-between',
    paddingLeft: 10
  },
  descTopPart: {},
  descRowTxt: {
    fontSize: 12,
    color: '#000'
  },
  descBottomPart: {},
  descTxt: {
    fontSize: 10,
    color: '#909399'
  }
});
