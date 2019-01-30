// 商品项 2018-10
import React, {PureComponent, Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {startInterval } from '../../../../libs/util';

export default class Timer extends Component {
  constructor(props){
    super(props);
    this.timer = null;
    this.state = {
      day: 0,
      dayPixel: 0,
      hour: 0,
      hourPixel: 0,
      minute: 0,
      minutePixel: 0,
      second: 0,
      secondPixel: 0
    };
  };

  componentWillUpdate (nextProps, nextState) {
    if (this.props !== nextProps) {
      this.timer && clearInterval(this.timer);
      const {grantType, grantDate, grantTime} = nextProps;
      this.timer = startInterval(grantDate, grantTime, grantType, 1000, (res) => {
        this.setState({
          day: res.day,
          dayPixel: res.dayPixel,
          hour: res.hour,
          hourPixel: res.hourPixel,
          minute: res.minute,
          minutePixel: res.minutePixel,
          second: res.second,
          secondPixel: res.secondPixel,
        }, () => {
          if (res.isDone) {
            this.props.onEnd && this.props.onEnd()
          }
        });
      })
    }
  }

  componentWillUnmount () {
    this.timer && clearInterval(this.timer);
  }

  render() {
    return (
      <View style={styles.timerWarp}>
        <View style={styles.timerCell}>
          <Text style={styles.timeVal}>{this.state.day}</Text>
          <Text style={styles.valTxt}>天</Text>
          <View style={[
            styles.mask,
            { top: this.state.dayPixel},
            this.state.day === '00' && styles.greenMask,
            ]}></View>
        </View>
        <View style={styles.timerCell}>
          <Text style={styles.timeVal}>{this.state.hour}</Text>
          <Text style={styles.valTxt}>时</Text>
          <View style={[
            styles.mask,
            { top: this.state.hourPixel },
            this.state.day === '00' && this.state.hour === '00' && styles.greenMask,
          ]}></View>
        </View>
        <View style={styles.timerCell}>
          <Text style={styles.timeVal}>{this.state.minute}</Text>
          <Text style={styles.valTxt}>分</Text>
          <View style={[
            styles.mask,
            { top: this.state.minutePixel },
            this.state.day === '00' && this.state.hour === '00' && this.state.minute === '00' && styles.greenMask,
          ]}></View>
        </View>
        <View style={styles.timerCell}>
          <Text style={styles.timeVal}>{this.state.second}</Text>
          <Text style={styles.valTxt}>秒</Text>
          <View style={[
            styles.mask,
            { top: this.state.secondPixel},
            this.state.day === '00' && this.state.hour === '00' && this.state.minute === '00' && this.state.second === '00' && styles.greenMask,
          ]}></View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  timerWarp: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 4
  },
  timerCell: {
    flex: 1,
    height: 120,
    position: 'relative',
    backgroundColor: '#F4F4F4',
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 1
  },
  timeVal: {
    fontSize: 32,
    color: '#303133'
  },
  valTxt: {
    fontSize: 10,
    color: '#909399',
    position: 'absolute',
    bottom: 4,
    right: 4
  },
  mask: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,204,0,0.25)'
  },
  greenMask: {
    backgroundColor: 'rgba(103,194,58,0.25)',
    top: 0
  },
});
