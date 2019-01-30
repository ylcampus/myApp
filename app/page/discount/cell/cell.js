// 商品项 2018-10
import React, {PureComponent} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native';
import {Divider} from 'react-native-elements';
import Timer from './timer/timer';
import {
  calcTimeStamp,
  getGrantTime,
  calcTime,
  getGrantStr
} from "../../../libs/util";

export default class Row extends PureComponent {
  constructor(props){
    super(props);
    this.state = {
      day: '00',
      hour: '00',
      minute: '00',
      second: '00'
    };
  };

  componentWillUpdate (nextProps, nextState) {
    const {info} = this.props;
    const result = getGrantTime(info.grantDate, info.grantTime, info.grantType);
    const timeStamp = calcTimeStamp(result.date);
    const timeMap = calcTime(timeStamp)
    this.setState({
      day: timeMap.day || '00',
      hour: timeMap.hour || '00',
      minute: timeMap.minute || '00',
      second: timeMap.second || '00'
    })
  }

  componentDidMount() {};

  render() {
    let {info} = this.props;
    const grantTime = getGrantStr(info.grantDate, info.grantTime, info.grantType)
    return (
      <View>
        <TouchableOpacity onPress={() => {
          this.props.navigation.navigate('ObtainDiscount')
        }} style={styles.rowLine}>
          <View style={styles.picWarp}>
            <Image source={info.logo} style={styles.pic}/>
          </View>
          <View style={styles.contentArea}>
            <View style={styles.shopTitleWarp}>
              <Text style={styles.shopTitle}>{info.brand}官方体验店</Text>
            </View>
            <Timer/>
            <View style={styles.bottomLineWarp}></View>
          </View>
          <View style={styles.dot}></View>
          <Image source={require('../../../assets/img/discount/jiao.png')} style={styles.bianjiao}/>
        </TouchableOpacity>
        <Divider/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  rowLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF'
  },
  picWarp: {
    width: 120,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 140
  },
  pic: {
    width: 85,
    height: 85
  },
  contentArea: {
    flex: 1,
    height: 140,
    flexDirection:'column',
    justifyContent: 'space-between'
  },
  shopTitleWarp: {
    paddingHorizontal: 5
  },
  shopTitle: {
    color: '#353535',
    fontSize: 16,
    height: 40,
    lineHeight: 40
  },
  bottomLineWarp: {
    flex: 1
  },
  bianjiao: {
    position: 'absolute',
    width: 22,
    height: 22,
    bottom: 0,
    left: 0,
    transform: [{rotateX:'180deg'}],
    tintColor: '#000'
  },
  dot: {
    position: 'absolute',
    top: 92,
    height: 20,
    width: 20,
    backgroundColor: '#EBEBEB',
    borderRadius: 20,
    zIndex:9999,
    right: -10
  }
});
