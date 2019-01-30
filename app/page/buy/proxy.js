import HttpRequest from '../../libs/httpRequest/httpRequest';
// 通过淘（苗）口令获取商品Id
module.exports.getGoodsDetailDataByWardForApp = (data) => {
  return HttpRequest.get('http://api.onebound.cn/taobao/api_call.php', {body: data})
};
