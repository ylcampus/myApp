// 商品项 2018-10
import React, {PureComponent} from 'react';
import {StyleSheet, Image, View, Text, TouchableOpacity, Animated, Dimensions } from 'react-native';
const {width} = Dimensions.get('window');
const pixel = width - 20;
import {secKillAction} from "../../fetch";

export default class Grab extends PureComponent {
  constructor(props){
    super(props);
    this.state = {
      progress: new Animated.Value(pixel),
      isRuning: false // 动画是否正在运行
    };
  };

  static defaultProps = {
    remainder: 0
  };

  componentDidMount() {
    // 接下来就是要处理这位了
  }

  render() {
    return (
      <View style={styles.grabBox}>
        <Image source={require('../../../../assets/img/discount/jiao.png')} style={[styles.jiao,styles.topLeft]}/>
        <Image source={require('../../../../assets/img/discount/jiao.png')} style={[styles.jiao, styles.topRight]}/>
        <Image source={require('../../../../assets/img/discount/jiao.png')} style={[styles.jiao, styles.bottomLeft]}/>
        <Image source={require('../../../../assets/img/discount/jiao.png')} style={[styles.jiao, styles.bottomRight]}/>
        {
          this.props.remainder === 0 ? (
            <View>
              <Text style={styles.notStart}>未开始</Text>
            </View>
          ) : (
            <TouchableOpacity onPress={() => {
              this.setState({isRuning: true});
              secKillAction().then((res) => { // 抢券
                if (res.code * 1 === 0) {
                  Animated.timing(
                    this.state.progress,
                    { toValue: 0, duration: 1000 * 10 }
                  ).start(() => {
                    this.setState({ isRuning: false });
                    Animated.timing( this.state.progress, { toValue: pixel, duration: 0 }).start(() => {
                      alert('恭喜您获取到阿迪达斯五折券一张.')
                    });
                  })
                }
              });
            }} style={styles.obtainWarp}>
              <Text style={styles.obtainBtn}>{
                this.state.isRuning ? '抢券中...' : '开始抢券'
              }</Text>
              <Image source={require('../../../../assets/img/discount/bianjiao.png')} style={[styles.bianjiao,styles.topLeft]}/>
              <Image source={require('../../../../assets/img/discount/bianjiao.png')} style={[styles.bianjiao, styles.topRight]}/>
              <Image source={require('../../../../assets/img/discount/bianjiao.png')} style={[styles.bianjiao, styles.bottomLeft]}/>
              <Image source={require('../../../../assets/img/discount/bianjiao.png')} style={[styles.bianjiao, styles.bottomRight]}/>
            </TouchableOpacity>
          )
        }
        {
          this.state.isRuning && (
            <View style={[styles.maskBox, styles.opacityBox]}></View>
          )
        }
        {
          (
            <Animated.View style={[
              styles.maskBox,
              styles.progressBox,
              { right: this.state.progress}
            ]}></Animated.View>
          )
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  grabBox: {
    flex:1,
    position: 'relative',
    backgroundColor: '#FFF',
    borderTopColor: '#E6E6E6',
    borderTopWidth: 1 / 3,
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  notStart: {
    fontSize: 14,
    color: '#C0C4CC'
  },
  obtainWarp: {
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EBEBEB',
    width: 120,
    height:80
  },
  obtainBtn: {
    fontSize: 20,
    color: '#909399',
    paddingVertical:5,
    borderRadius: 32,
    position: 'relative'
  },
  jiao: {
    position: 'absolute',
    width: 22,
    height: 22,
    tintColor: '#000'
  },
  bianjiao:{
    position: 'absolute',
    width: 22,
    height: 22,
    tintColor: '#47B34F'
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
  opacityBox: {
    backgroundColor: 'rgba(255,255,255,0.1)'
  },
  progressBox: {
    backgroundColor: 'rgba(103,194,58,0.25)'
  },
  maskBox: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
});
