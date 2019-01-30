import HttpRequest from '../../libs/httpRequest/httpRequest';
// 获取商品详情数据
module.exports.fetchGoodsDetailDataForApp = (data) => {
  return HttpRequest.get('http://api.onebound.cn/taobao/api_call.php', {body: data})
};

// 获取打折券
module.exports.fetchTicketDataForApp = (data) => {
  return new Promise((resolve) => {
    resolve({
      code: 0,
      data: '123456'
    })
  })
};
