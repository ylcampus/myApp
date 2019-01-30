// 打折券列表 2018-10
import React,{ Component } from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import ScrollableTabView, {ScrollableTabBar, DefaultTabBar} from 'react-native-scrollable-tab-view';
import { Button, Avatar, ListItem, Badge, Divider, Header, Icon, Input, Overlay, Tooltip} from 'react-native-elements';
import Cell from './cell/cell';
import MainHeader from '../../libs/mainHeader/mainHeader';
import {fetchSecKillListData} from "./fetch";
import {fetchGoodsDetailDataForApp} from "../test/proxy";
const step = 1000 * 5;

export default class DiscountList extends Component<props>{
  constructor(props){
    super(props);
    this.timer = null;
    this.state = {
      dataList: [],
      beat: 0, // 心跳信号
      refreshState: RefreshState.Idle,
      initialPage: 0
    };
  }

  async componentDidMount() {
    // this.props.navigation.navigate('Demo', {
    //   ticketId: '123456',
    //   skuId: '3888356317487',
    //   numIid: '581236916123',
    //   shopId: '63975641'
    // });
    this.loadData(true);
    if (this.timer) return;
    this.timer = setInterval(() => { // 启动心跳函数
      this.setState({
        beat: new Date().getTime()
      })
    }, step);
    try {
      const params = { // 557550203718
        num_iid: '557550203718',
        is_promotion: '1',
        api_name: 'item_get',
        key: 'ulexy.com'
      };
      const {code, data} = await fetchGoodsDetailDataForApp(params);
      this.setState({
        initialPage: 2
      })
    } catch (e) {}
  }

  componentWillUnmount () {
    this.timer && clearInterval(this.timer);
  }

  loadData (isReload: boolean, refreshState: number) {
    refreshState && this.setState({ refreshState: refreshState });
    fetchSecKillListData().then(res => {
      if (res.code * 1 === 0 && res.data) {
        let result = res.data.rows || [];
        this.setState({
          dataList: isReload ? [...result] : [...this.state.dataList, ...result],
          refreshState: RefreshState.NoMoreData
        });
      }
    })
  }

  render () {
    const list = [
      {
        name: '美津浓mizuno',
        avatar_url: require('../../assets/img/discount/mizuno_logo.jpg'),
        subtitle: '每周四22:00:00发券'
      },
      {
        name: '阿迪达斯addias',
        avatar_url: require('../../assets/img/discount/adidas_logo.png'),
        subtitle: '每周四21:00:00发券'
      },
      {
        name: '亚瑟士asics',
        avatar_url: require('../../assets/img/discount/asics_logo.jpg'),
        subtitle: '每周四22:30:00发券'
      },
      {
        name: '美津浓mizuno',
        avatar_url: require('../../assets/img/discount/mizu.png'),
        subtitle: '每周一22:00:00发券'
      },
      {
        name: '万斯vans',
        avatar_url: require('../../assets/img/discount/vans_logo.jpg'),
        subtitle: '每周日22:00:00发券'
      }
    ]
    return (
      <View style={styles.container}>
        <ScrollableTabView
          style={{flex: 1,}}
          scrollWithoutAnimation={true}
          renderTabBar={() => <ScrollableTabBar style={{height: 44, borderWidth: 0}} tabStyle={{height: 44}}/>}
          tabBarActiveTextColor='#000'
          tabBarBackgroundColor='#EDEDED'
          tabBarTextStyle={{fontSize: 14, color: '#000'}}
          tabBarUnderlineStyle={{height:0}}
          initialPage={this.state.initialPage}>
          <View tabLabel='全部（25）'style={{
            backgroundColor: '#FFF',
            flex: 1
          }}>
            {
              list.map((l, i) => (
                <ListItem
                  key={i}
                  leftAvatar={{ source: l.avatar_url }}
                  title={l.name}
                  titleStyle={{
                    color: '#353535',
                    fontSize: 16
                  }}
                  subtitleStyle={{
                    color: '#999999',
                    fontSize: 14
                  }}
                  onPress={() => {
                    alert()
                  }}
                  rightSubtitleStyle={{
                    /*borderWidth: 1 / 3,
                    borderColor: 'red'*/
                    color: '#999999',
                    fontSize: 12
                  }}
                  //rightTitle='剩余3'
                  // rightSubtitle='剩余（3）'
                  bottomDivider={true}
                  chevronColor="white"
                  badge={{ value: 3}}
                  disabled={false}
                  disabledStyle={{
                    backgroundColor: '#F0F0F0'
                  }}
                  chevron={{ name: 'rowing', size: 20 }}
                  subtitle={l.subtitle}
                />
              ))
            }
          </View>
          <View tabLabel='即将开始(3)'style={styles.discountList}>
            <View style={{flex: 1}}>
              {/*<RefreshListView*/}
                {/*refreshState={this.state.refreshState}*/}
                {/*data={this.state.dataList}*/}
                {/*keyExtractor={(item: Object) => {*/}
                  {/*return item.shopId.toString()*/}
                {/*}}*/}
                {/*renderItem={(info: Object) => {*/}
                  {/*return <Cell*/}
                    {/*navigation={this.props.navigation}*/}
                    {/*beat={this.state.beat}*/}
                    {/*info={info.item} />*/}
                {/*}}*/}
                {/*onLoadData={(isReload: boolean, refreshState: number) => {*/}
                  {/*this.loadData(isReload, refreshState);*/}
                {/*}}*/}
                {/*showsVerticalScrollIndicator={false}*/}
              {/*/>*/}
            </View>
          </View>
        </ScrollableTabView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  discountList: {
    flex: 1
  }
});
