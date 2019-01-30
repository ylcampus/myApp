// 搜索框 2018-10
import React,{ Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground
} from 'react-native';

export default class Header extends Component<props>{
  constructor(props){
    super(props);
  }

  static defaultProps = {
    orders: '--',
    tickets: '--',
    nickName: '--',
    isLogin: false,
    onLogin: null
  };

  render(){
    return (
      <ImageBackground
        style={styles.headerBox}>
        <View style={styles.boxInner}>
          {
            this.props.isLogin ? (
              <View style={styles.hasLogin}>
                <View style={styles.basicPart}>
                  <Text style={styles.account}>{this.props.nickName}</Text>
                  <View style={styles.numWarp}>
                    <Text style={styles.order}>订单:{this.props.orders}</Text>
                    <Text style={styles.order}>打折券:{this.props.tickets}张</Text>
                  </View>
                </View>
              </View>
            ) : (
              <View style={styles.noLoginWarp}>
                <Text style={styles.noLoginMsg}>您还没有登陆，您可以</Text>
                <TouchableOpacity onPress = {() => {
                  this.props.onLogin && this.props.onLogin()
                }} style={styles.boxBtn}>
                  <Text style={styles.tagTxt}>去登陆</Text>
                </TouchableOpacity>
              </View>
            )
          }
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  headerBox: {
    position: 'relative',
    backgroundColor: '#757575'
  },
  boxInner: {
    height: 70,
    paddingHorizontal: 30,
    flexDirection: 'row',
    alignItems: 'center'
  },
  hasLogin: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  basicPart: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  account: {
    fontSize: 18,
    color: '#fff'
  },
  numWarp: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5
  },
  order: {
    fontSize: 10,
    color: '#FFF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#111',
    borderRadius: 2,
    fontWeight: '500',
    marginRight: 5
  },
  noLoginWarp: {
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  noLoginMsg: {
    fontSize: 12,
    color: '#fff',
    marginBottom: 5
  },
  boxBtn: {
    paddingHorizontal: 10,
    backgroundColor: '#111',
    borderRadius: 2,
    paddingVertical: 3
  },
  tagTxt: {
    fontSize: 12,
    color: '#47B34F',
    fontWeight: '500'
  },
});
