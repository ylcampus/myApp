// 网络 2018-09
const defauHeaders = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
};

// GET请求
module.exports.get = (url, map) => {
  map = map ? map : {};
  if (map.body) {
    let paramsArray = [];
    Object.keys(map.body).forEach(key => paramsArray.push(key + '=' + map.body[key]))
    if (url.search(/\?/) === -1) {
      url += '?' + paramsArray.join('&')
    } else {
      url += '&' + paramsArray.join('&')
    }
    delete map.body
  }
  let headers = {...defauHeaders, ...map}
  return fetch(url, headers).then((response) => response.json())
};

// POST请求
module.exports.post = () => {
  alert()
};

// PUT请求
module.exports.put = () => {
  alert()
};

// PATCH请求
module.exports.patch = () => {
  alert()
};

// DELETE请求
module.exports.delete = () => {
  alert()
};
