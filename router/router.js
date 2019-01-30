// 路由
import React, {Component} from 'react';
import {
  Easing,
  Animated
} from 'react-native';

import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer
} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import Buy from '../app/page/buy/buy'; // 购物 --
import Discount from '../app/page/discount/discount'; // 打折券
import Personal from '../app/page/personal/personal'; // 个人中心 --
import Discover from '../app/page/discover/discover';  // 发现 --
import GoodsDetail from '../app/page/goods/goods'; // 商品详情页--
import OrderList from '../app/page/order/order'; // 订单列表 --
import OrderDetail from '../app/page/order/detail/detail'; // 订单详情
import OrderConfirm from '../app/page/order/confirm/confirm'; // 确认订单 --
import OrderPay from '../app/page/order/pay/pay'; // 支付 --
import ObtainDiscount from '../app/page/discount/obtain/obtain'; // 获取打折券
import Account from '../app/page/personal/account/account'; // 账号 --
import MyDiscount from '../app/page/personal/discount/discount'; // 我的打折券 --
import Address from '../app/page/personal/address/address'; // 收货地址 --
import AddressSelect from '../app/page/personal/address/select/select'; // 地址选择 --
import About from '../app/page/personal/about/about'; // 关于 --
import Set from '../app/page/personal/set/set'; // 设置 --
import Password from '../app/page/iam/pwd/pwd'; // 修改登录密码 --
import Login from '../app/page/iam/login/login'; // 登录 --
import Register from '../app/page/iam/register/register'; // 用户注册 --
import Forget from '../app/page/iam/forget/forget'; // 忘记密码 --
import Demo from '../app/page/test/demo';
import Demo5 from '../app/page/test/demo5';
import Demo2 from '../app/page/test/demo2';
import Authorize from '../app/page/authorize/authorize'; // 品牌授权

const getIcon = (icon, tintColor) => {
  return <Icon name={icon} color={tintColor} size={25}/>
};

/*下面的这四个中括号可以简化 - 写一个mirror*/
const Tab = createBottomTabNavigator(
  {
    Demo: {
      screen: Demo,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: '打折券',
        tabBarIcon: ({tintColor}) => { return getIcon('logo-apple', tintColor) }
      })
    },
    Authorize: {
      screen: Authorize,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: '品牌授权',
        tabBarIcon: ({tintColor}) => { return getIcon('ios-people', tintColor) }
      })
    },
    Discover: {
      screen: Discover,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: '发现',
        tabBarIcon: ({tintColor}) => { return getIcon('ios-chatboxes', tintColor) }
      })
    },
    Personal: {
      screen: Personal,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: '个人中心',
        tabBarIcon: ({tintColor}) => { return getIcon('ios-notifications', tintColor) }
      })
    }
  },
  {
    tabBarOptions: {
      activeTintColor: '#000', // 当前选中的tab bar的文本颜色和图标颜色
      inactiveTintColor: 'rgb(204, 204, 204)', // 当前未选中的tab bar的文本颜色和图标颜色
      activeBackgroundColor: '#FFF',
      showIcon: true, // 是否显示tab bar的图标，默认是false
      showLabel: true, // showLabel - 是否显示tab bar的文本，默认是true
      style: { // tab bar的样式
        backgroundColor: '#F7F7F7',
        elevation: 0,
        height: 52,
        borderTopWidth: 1 / 3,
        borderTopColor: '#D2D2D2'
      },
      labelStyle: { // tab bar的文本样式
        fontSize: 12
      },
      tabStyle: {
        paddingTop: 5,
        paddingBottom: 5
      }
    }
  }
);

const AppNavigator = createStackNavigator(
  {
    Tab: Tab,
    OrderList: OrderList, // 订单列表
    OrderDetail: OrderDetail, // 订单详情
    GoodsDetail: GoodsDetail, // 商品详情页
    OrderConfirm: OrderConfirm, // 确认订单
    OrderPay: OrderPay, // 支付
    ObtainDiscount: ObtainDiscount, // 获取打折券
    Account: Account, // 账号
    MyDiscount: MyDiscount, // 我的打折券
    Address: Address, // 收货地址
    AddressSelect: AddressSelect, // 地址选择
    About: About, // 关于
    Password: Password, // 修改登录密码
    Set: Set, // 设置
    Login: Login, // 登录
    Register: Register, // 用户注册
    Forget: Forget, // 忘记密码
    Demo5: Demo5,
    Buy: Buy,
    Demo2: Demo2
  },
  {
    mode: 'none',
    headerMode: 'none'
  }
);

export default createAppContainer(AppNavigator);
