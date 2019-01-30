import axios from 'axios'
// 获取手机验证码
module.exports.fetchGoodsDetailDataForApp = (data) => {
  return axios.get('http://api.onebound.cn/taobao/api_call.php', {data: {...data}})
};
