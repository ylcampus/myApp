// 客服中心 2018-10
import React,{ Component } from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import MainHeader from '../../libs/mainHeader/mainHeader';
import Gird from '../../libs/gird/gird';
import commonStyle from '../../assets/commonStyle'; // 公共样式
import {message} from "../../libs/util";
import { Button, Avatar, ListItem, Badge, Divider, Header, Icon, Input, Overlay, Tooltip} from 'react-native-elements';
type props = {}

class Authority extends Component<props>{
  constructor(props){
    super(props);
  }

  async componentDidMount() {
    // 考虑一下应该怎样来设计
  }

  render(){
    return (
      <View style={styles.container}>
        <MainHeader title='品牌授权'/>
        <ListItem
          containerStyle={{
            height: 60,
            padding: 0,
            alignItems: 'center',
            paddingLeft: 16
          }}
          contentContainerStyle={{
            borderBottomWidth: 1,
            borderBottomColor: '#D9D9D9'
          }}
          leftIcon={{
            name: 'bookmark',
            type: 'font-awesome',
            color: '#47B34F',
            size: 22,
          }}
          rightElement={() => {
            return (
              <View style={{
                flex: 1,
                flexDirection:'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottomWidth: 1 / 3,
                borderBottomColor: '#D9D9D9',
                height: 60,
                paddingRight: 16
              }}>
                <Text style={{
                  backgroundColor: 'transparent',
                  fontFamily: 'sans-serif',
                  fontSize: 16.5,
                  color: '#353535'
                }}>阿迪达斯</Text>
                <Icon
                  iconStyle={{
                    fontSize: 20,
                    color: '#D1D1D6',
                    backgroundColor: 'transparent',
                    fontFamily: 'Materiallcons'
                  }}
                  name='rowing' />
              </View>
            )
          }}
          // rightContentContainerStyle={{
          //   borderWidth: 1 / 3,
          //   borderColor: 'red'
          // }}
          // onPress={() => {
          //   alert()
          // }}
          // rightSubtitleStyle={{
          //   color: '#999999',
          //   fontSize: 12
          // }}
          // chevronColor="white"
          // badge={{ value: 3}}
          // disabled={false}
          // disabledStyle={{
          //   backgroundColor: '#F0F0F0'
          // }}
          // chevron={{ name: 'rowing', size: 20 }}
        />
        <ListItem
          containerStyle={{
            height: 60,
            padding: 0,
            alignItems: 'center',
            paddingLeft: 16
          }}
          contentContainerStyle={{
            borderBottomWidth: 1,
            borderBottomColor: '#D9D9D9'
          }}
          leftIcon={{
            name: 'wifi',
            type: 'font-awesome',
            color: '#1EA5FF',
            size: 22,
          }}
          rightElement={() => {
            return (
              <View style={{
                flex: 1,
                flexDirection:'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottomWidth: 1 / 3,
                borderBottomColor: '#D9D9D9',
                height: 60,
                paddingRight: 16
              }}>
                <Text style={{
                  backgroundColor: 'transparent',
                  fontFamily: 'sans-serif',
                  fontSize: 16.5,
                  color: '#353535'
                }}>阿迪达斯</Text>
                <Icon
                  iconStyle={{
                    fontSize: 20,
                    color: '#D1D1D6',
                    backgroundColor: 'transparent',
                    fontFamily: 'Materiallcons'
                  }}
                  name='rowing' />
              </View>
            )
          }}
          // rightContentContainerStyle={{
          //   borderWidth: 1 / 3,
          //   borderColor: 'red'
          // }}
          // onPress={() => {
          //   alert()
          // }}
          // rightSubtitleStyle={{
          //   color: '#999999',
          //   fontSize: 12
          // }}
          // chevronColor="white"
          // badge={{ value: 3}}
          // disabled={false}
          // chevron={{ name: 'rowing', size: 20 }}
          {/*<Input*/}
          {/*placeholder='INPUT WITH ERROR MESSAGE'*/}
          {/*errorStyle={{ color: 'red' }}*/}
          {/*errorMessage={null}*/}
          {/*inputStyle={{*/}
          {/*backgroundColor: '#ddd',*/}
          {/*height: 40,*/}
          {/*paddingVertical: 0,*/}
          {/*marginLeft: 0,*/}
          {/*fontSize: 14,*/}
          {/*color: '#353535'*/}
          {/*}}*/}
          {/*containerStyle={{*/}
          {/*borderWidth: 1 / 3,*/}
          {/*borderColor: '#FFF',*/}
          {/*marginLeft: 0,*/}
          {/*marginRight: 0,*/}
          {/*paddingLeft: 0,*/}
          {/*paddingRight: 0,*/}
          {/*width: '100%'*/}
          {/*}}*/}
          {/*value={'我是董纪国'}*/}
          {/*editable={false}*/}
          {/*labelStyle={{ width: 200 }}*/}
          {/*label={'账号'}*/}
          {/*/>*/}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDEDED',
  }
});

export default Authority;
