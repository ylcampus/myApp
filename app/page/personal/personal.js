// 个人中心 2018-10
import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Dimensions,
  Modal,
  Text,
  Image
} from 'react-native';
import {fetchPersonalData} from './proxy';
const {width} = Dimensions.get('window');
import {ListCell} from '../../libs/listCell/listCell';
import ListItemGroup from '../../libs/listItemGroup/listItemGroup';
import { Button, Avatar, ListItem, Badge, Divider, Header, Icon, Input, Overlay, Tooltip} from 'react-native-elements';
import ImageViewer from 'react-native-image-zoom-viewer';
export default class Personal extends Component<props> {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      modalVisible: false,
      isLogin: false, // 是否已登录
      nickName: '--', // 昵称
      orders: '--', // 订单数
      tickets: '--' // 打折券数
    }
  }

  componentWillReceiveProps (nextProps) {
    let {params} = nextProps.navigation.state;
    params.refresh && this.loadData()
  }

  componentDidMount() {
    // this.loadData()
  }

  loadData () {
    fetchPersonalData().then((res) => {
      if (res.code * 1 === 0) {
        if (res.data) {
          const {account, nickName, orders, tickets} = res.data;
          this.setState({
            isLogin: false,
            nickName: nickName || account,
            orders: orders || '--',
            tickets: tickets || '--'
          })
        } else {
          this.setState({isLogin: false})
        }
      }
    })
  }

  render(){
    const Images = [{
      url: 'http://icdn.apigo.cn/myinfo/wchat-pay.png'
    }]
    return (
      <View style={styles.container}>
        <Modal
          visible={this.state.modalVisible}
          transparent={true}
          onRequestClose={() => this.setState({modalVisible: false})}>
          <Text style={{
            height: 46,
            backgroundColor: '#EDEDED',
            color: '#000',
            fontSize: 16,
            fontFamily: 'sans-serif',
            lineHeight: 46,
            paddingHorizontal: 30,
            borderBottomWidth: 1 / 3,
            borderBottomColor: '#CACACA',
          }}>二维码名片</Text>
          <View style={{
            flex: 1,
            backgroundColor: '#FFF',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Image source={require('../../assets/img/discount/a46.png')} style={{
              width: 100,
              height: 100
            }}/>
          </View>
        </Modal>
        <Header
          containerStyle={styles.containerStyle}
          statusBarProps={{backgroundColor: '#FFF'}}
          barStyle={'dark-content'}
          leftComponent={() => null}
          rightComponent={{ icon: 'angle-right', color: '#353535', type: 'font-awesome'}}
          centerComponent={() => {
            return (
              <View style={{
                width: width - 32
              }}>
                <ListItem
                  title='星火燎原'
                  titleStyle={{
                    fontSize: 22,
                    color: '#191919'
                  }}
                  onPress={() => {
                    this.setState({modalVisible: true})
                  }}
                  subtitle='优乐账号：xinghuo2013d'
                  leftAvatar={{
                    source: require('../../assets/img/discount/a46.png'),
                    size: 60,
                    rounded: false,
                    avatarStyle: {
                      backgroundColor: '#EDEDED'
                    }
                  }}
                />
              </View>
            )
          }}
        />
        <View style={styles.listWarp}>
          <ListItemGroup marginBottom={10}>
            <ListCell leftIcon={{name: 'shopping-cart', color: '#47B34F'}} title="订单" num={6} border={false}/>
          </ListItemGroup>
          <ListItemGroup marginBottom={10}>
            <ListCell leftIcon={{name: 'cc-stripe'}} title="打折券"  num={2} bottomDivider/>
            <ListCell leftIcon={{name: 'cc-stripe'}} title="收藏" bottomDivider/>
            <ListCell leftIcon={{name: 'anchor'}} title="关于"  border={false}/>
          </ListItemGroup>
          <ListItemGroup marginBottom={10}>
            <ListCell leftIcon={{name: 'behance-square'}} title="设置" border={false}/>
          </ListItemGroup>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDEDED'
  },
  containerStyle: {
    backgroundColor: '#FFF',
    justifyContent: 'flex-start',
    paddingTop: 20,
    paddingHorizontal: 16,
    borderBottomColor: '#CACACA',
    borderBottomWidth: 1 / 3,
    paddingBottom: 20,
    height: 'auto',
    marginBottom: 10
  },
  listWarp: {
    flex: 1,
    backgroundColor: '#EDEDED'
  },
});
