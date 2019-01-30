const uuid = require('uuid')
import axios from 'axios'
// 获取手机验证码
module.exports.fetchGoodsDetailDataForApp = (data) => {
  return axios.get('http://api.onebound.cn/taobao/api_call.php', {data: {...data}})
};
// 获取秒杀列表
module.exports.fetchSecKillListData = (data) => {
  return new Promise((resolve) => {
    resolve({
      code: 0,
      data: {
        rows: [
          {
            shopId: uuid.v4(),
            shopName: '美津浓官方体验店',
            brand: '美津浓',
            logo: require('../../assets/img/discount/mizuno_logo.jpg'),
            banner: require('../../assets/img/discount/mizuno_banner.jpg'),
            ticketType: [5],
            ticketNumber: 10,
            grantType: '2',
            grantDate: '23',
            grantTime: '20:00:00'
          },
          {
            shopId: uuid.v4(),
            shopName: '阿迪达斯官方体验店',
            brand: '阿迪达斯',
            logo: require('../../assets/img/discount/adidas_logo.png'),
            banner: require('../../assets/img/discount/adidas_banner.jpg'),
            ticketType: [5],
            ticketNumber: 10,
            grantType: '2',
            grantDate: '04',
            grantTime: '20:00:00'
          },
          {
            shopId: uuid.v4(),
            shopName: 'Vans官方体验店',
            brand: 'Vans',
            logo: require('../../assets/img/discount/vans_logo.jpg'),
            banner: require('../../assets/img/discount/vans_baner.jpg'),
            ticketType: [5],
            ticketNumber: 10,
            grantType: '1',
            grantDate: '04',
            grantTime: '20:00:00'
          }
        ],
        total: 5
      },
      success: true,
      message: null
    })
  })
};

// 获取秒杀数据
module.exports.fetchSecKillData = (flag) => {
  return new Promise((resolve) => {
    resolve({
      code: 0,
      data: {
        shopId: uuid.v4(),
        shopName: 'Asics官方体验店',
        ticketType: [5],
        ticketNumber: 10,
        grantType: 2,
        grantDate: '28',
        grantTime: '18:07:00',
        remainder: flag ? 100 : 0
      }
    })
  })
};

// 打折券秒杀
module.exports.secKillAction = (flag) => {
  return new Promise((resolve) => {
    resolve({
      code: 0,
      data: null
    })
  })
};
