// 动画页头 2018-09
import React,{ Component } from 'react';
import {StyleSheet, View, Image, TouchableOpacity, TextInput } from 'react-native';

export default class InputBox extends Component<props>{
  constructor(props){
    super(props);
    this.state = {
      visible: false
    }
  }

  static defaultProps = {
    value: '',
    type: 'text',
    placeholder: ''
  };

  render(){
    let {...rest} = this.props;
    return (
      <View style={styles.inputBoxWarp}>
        <TextInput
          underlineColorAndroid='transparent'
          style={styles.inputBox}
          secureTextEntry={this.props.type === 'password' && !this.state.visible}
          placeholder= {this.props.placeholder}
          {...rest}/>
        {
          this.props.type === 'password' && (
            <TouchableOpacity onPress= {() => {
              this.setState({
                visible: !this.state.visible
              })
            }} style={styles.pwdWarp}>
              <Image source={
                this.state.visible ? (require('../../assets/img/libs/kejian.png')) : (require('../../assets/img/libs/bukejian.png'))
              } style={styles.pwdLogo}/>
            </TouchableOpacity>
          )
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputBoxWarp: {
    flex: 1,
    flexDirection:'row',
    justifyContent: 'space-between',
    height: 40,
    alignItems: 'center',
  },
  inputBox: {
    flex: 1,
    color: '#606266',
    fontSize: 14,
    paddingVertical: 0,
    height: 40
  },
  pwdWarp: {
    flexDirection:'row',
    justifyContent: 'center',
    height: 40,
    alignItems: 'center',
    width: 40,
    backgroundColor: '#F4F4F4'
  },
  pwdLogo: {
    width: 20,
    height: 20
  }
});
