// 引导程序&路由配置 2018-08
import React, {Component} from 'react';
import {
  View,
  Dimensions,
  StatusBar,
  StyleSheet
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import axios from 'axios';
import Mask from './app/libs/mask/mask';
import Stack from './router/router';
const { height } = Dimensions.get('window');

// axios全局配置
axios.defaults.baseURL = '/';
axios.defaults.timeout = 30 * 1000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 添加请求拦截器
const baseurl = '';
axios.interceptors.request.use(async function (config) {
  global.mask.show(); // 显示mask
  let url = `${baseurl}${config.url}`;
  if (config.method === 'get' && config.data) {
    url += '?';
    let keys = Object.keys(config.data)
    for (let key of keys) {
      url += `${key}=${encodeURIComponent(config.data[key])}&`
    }
    url = url.substring(0, url.length - 1)
  }
  return {...config, url}
}, function (error) {
  return Promise.reject(error)
});

// 添加相应拦截器
axios.interceptors.response.use(function (res) {
  setTimeout(() => {
    global.mask.hide();
  }, 2000);
  return res
}, function (error) {
  global.mask.hide();
  return Promise.reject(error.response.data)
});

export default class App extends Component<{}> {
  constructor(props){
    super(props);
    this.state = {
      showLoading: true
    }
  }

  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    return (
      <View style={styles.container}>
        <Stack/>
        <Mask ref={(ref) => { global.mask = ref; }}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    height: height - StatusBar.currentHeight,
    position: 'relative'
  }
});
