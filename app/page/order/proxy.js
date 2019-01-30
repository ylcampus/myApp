import HttpRequest from '../../libs/httpRequest/httpRequest';
// 获取订单列表
module.exports.fetchOrderListDataForApp = (data) => {
  return new Promise((resolve) => {
    resolve({
      code: 0,
      data: [
        {
          orderId: '10000',
          numIid: '581236916123',
          shopName: '耐克官方体验店',
          status: '1',
          pic: require('../../assets/img/home/003.jpg'),
          goodsName: 'ASICS亚瑟士稳定跑鞋跑步鞋运动鞋女款T699N-1978',
          amount: '1280',
          address: '董纪国,18205185737,南京市鼓楼区汉口路22号'
        },
        {
          orderId: '10001',
          numIid: '581236916123',
          shopName: '耐克官方体验店',
          status: '1',
          pic: require('../../assets/img/home/004.jpg'),
          goodsName: 'ASICS亚瑟士稳定跑鞋跑步鞋运动鞋女款T699N-1978',
          amount: '1280',
          address: '董纪国,18205185737,南京市鼓楼区汉口路22号'
        },
        {
          orderId: '10002',
          numIid: '581236916123',
          shopName: '耐克官方体验店',
          status: '1',
          pic: require('../../assets/img/home/005.jpg'),
          goodsName: 'ASICS亚瑟士稳定跑鞋跑步鞋运动鞋女款T699N-1978',
          amount: '1280',
          address: '董纪国,18205185737,南京市鼓楼区汉口路22号'
        },
        {
          orderId: '10003',
          numIid: '581236916123',
          shopName: '耐克官方体验店',
          status: '1',
          pic: require('../../assets/img/home/006.jpg'),
          goodsName: 'ASICS亚瑟士稳定跑鞋跑步鞋运动鞋女款T699N-1978',
          amount: '1280',
          address: '董纪国,18205185737,南京市鼓楼区汉口路22号'
        },
        {
          orderId: '10004',
          numIid: '581236916123',
          shopName: '耐克官方体验店',
          status: '3',
          pic: require('../../assets/img/home/007.jpg'),
          goodsName: 'ASICS亚瑟士稳定跑鞋跑步鞋运动鞋女款T699N-1978',
          amount: '1280',
          address: '董纪国,18205185737,南京市鼓楼区汉口路22号'
        }
      ]
    })
  });
};
// 删除订单
module.exports.deleteOrderForApp = () => {
  return new Promise((resolve) => {
    resolve({
      code: 0,
      data: null
    })
  });
};
// 确认收货
module.exports.confirmForApp = () => {
  return new Promise((resolve) => {
    resolve({
      code: 0,
      data: null
    })
  })
};
// 取消订单
module.exports.cancelOrderApp = () => {
  return new Promise((resolve) => {
    resolve({
      code: 0,
      data: null
    })
  })
};

// 获取订单详情
module.exports.fetchOrderDetailDataForApp = () => {
  return new Promise((resolve) => {
    resolve({
      code: 0,
      data: {
        orderId: '10000',
        status: 1,
        amount: '640.00',
        shopName: '阿迪达斯官方体验店',
        shopId: '10001',
        createAt: '',
        payMentAt: '',
        goodsMsg: {
          numIid: '',
          title: '',
          picUrl: '',
          orginalPrice: '1280.00',
          spec: '数量：1，尺码：XL,颜色：红黑'
        },
        address: '董纪国,18205185737,江苏省南京市鼓楼区汉口路22号'
      },
      success: true,
      message: null
    })
  })
};
// 支付
module.exports.paymentForApp = () => {
  return new Promise((resolve) => {
    resolve({
      code: 0,
      data: null
    })
  })
};
// 获取收货地址数据
module.exports.fetchAddressData = () => {
  return new Promise((resolve) => {
    resolve({
      code: 0,
      data: {
        linkman: '董纪国',
        telephone: '18205185737',
        provinceId: '320000',
        cityId: '320100',
        schoolId: '320101',
        campusId: '3201011'
      }
    })
  })
};
// 通过sukId获取商品详情详情数据
module.exports.fetchGoodsDetailDataBySkuIdForApp = (data) => {
  return HttpRequest.get('http://api.onebound.cn/taobao/api_call.php', {body: data})
};
// 提交订单
module.exports.submitOrder = () => {
  return new Promise((resolve) => {
    resolve({
      code: 0,
      data: null,
      success: true,
      message: null
    })
  })
};
