// 子页头 2018-11
import React,{ Component } from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
export default class SubHeader extends Component<props>{
  constructor(props){
    super(props);
  }

  static defaultProps = {
    title: null,
    onBack: null,
    onEnter: null,
    icon: null,
    label: '确认'
  };

  render(){
    return (
      <View style={[styles.subHeader, this.props.style]}>
        <TouchableOpacity onPress={(e) => {
          this.props.onBack && this.props.onBack(e)
        }} style={[styles.navBack, styles.navBtn]}>
          {/*<Text style={styles.txt}>返回</Text>*/}
          <Image source={require('../../assets/img/libs/navBack.png')} style={{
            width: 22,
            height: 22,
            tintColor: '#FFF'
          }}/>
        </TouchableOpacity>
        <View style={styles.titleWarp}>
          {
            this.props.icon && (
              <Image source={this.props.icon} style={styles.logo}/>
            )
          }
          <Text style={styles.title}>{this.props.title}</Text>
        </View>
        {
          this.props.onEnter ? (
            <TouchableOpacity onPress={(e) => { this.props.onEnter && this.props.onEnter(e);}} style={[styles.navEnter, styles.navBtn]}>
              <Text style={[styles.txt, styles.enterTxt]}>{this.props.label}</Text>
            </TouchableOpacity>
          ) : null
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  subHeader: {
    position: 'relative',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#F4F4F4'
  },
  titleWarp: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logo: {
    width: 22,
    height: 22,
    borderRadius: 11
  },
  title: {
    fontSize: 18,
    color: '#000',
    marginLeft:1
  },
  navBtn: {
    position: 'absolute',
    flexDirection: 'row',
    height: 30,
    width: 30,
    alignItems: 'center',
    backgroundColor: '#484848',
    borderRadius: 30,
    justifyContent: 'center',

    // flexDirection: 'row',
    // height: 30,
    // width: 30,
    // alignItems: 'center',
    // justifyContent: 'center',
    // backgroundColor: '#484848',
    // borderRadius: 30
  },
  navBack: {
    left: 10
  },
  navEnter: {
    right: 10
  },
  txt: {
    width: 50,
    color: '#333',
    fontSize: 10,
    fontWeight: '500',
    textAlign: 'center'
  },
  enterTxt: {
    color: '#47B34F'
  }
});
