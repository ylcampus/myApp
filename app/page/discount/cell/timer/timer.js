// 商品项 2018-10
import React, {PureComponent} from 'react'
import {View, Text, StyleSheet } from 'react-native';
export default class Timer extends PureComponent {
  constructor(props){
    super(props);
  };

  render() {
    return (
      <View style={styles.timerWarp}>
        <View style={styles.timeCell}>
          <Text style={styles.timeVal}>00</Text>
          <Text style={styles.timeTxt}>天</Text>
        </View>
        <View style={styles.timeCell}>
          <Text style={styles.timeVal}>23</Text>
          <Text style={styles.timeTxt}>时</Text>
        </View>
        <View style={styles.timeCell}>
          <Text style={styles.timeVal}>35</Text>
          <Text style={styles.timeTxt}>分</Text>
        </View>
        <View style={styles.timeCell}>
          <Text style={styles.timeVal}>08</Text>
          <Text style={styles.timeTxt}>秒</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  timerWarp: {
    height: 50,
    flexDirection:'row',
    justifyContent: 'space-between'
  },
  timeCell: {
    position: 'relative',
    flex: 1,
    marginTop: 1,
    marginRight: 1,
    backgroundColor: '#47B34F',
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  timeVal: {
    fontSize: 20,
    color: '#fff'
  },
  timeTxt: {
    fontSize: 10,
    color: '#fff',
    position: 'absolute',
    bottom: 0,
    right: 0
  },
});
