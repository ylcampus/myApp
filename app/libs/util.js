import AreaData from '../libs/dictionary/area';
import {Alert} from 'react-native';
// 计算倒计时时间
const calcTime = (timeStamp) => {
  const time = parseInt(timeStamp / 1000, 10);
  const second = time % 60;
  const minute = parseInt(time / 60, 10) % 60;
  const hour = parseInt(time / (60 * 60), 10) % 24;
  const day = parseInt(time / (60 * 60 * 24), 10);
  let d = day < 10 ? '0' + day : day;
  let h = hour < 10 ? '0' + hour : hour;
  let m = minute < 10 ? '0' + minute : minute;
  let s = second < 10 ? '0' + second : second;
  return {
    day: d.toString(),
    hour: h.toString(),
    minute: m.toString(),
    second: s.toString()
  }
};
module.exports.calcTime = calcTime;

// 比例尺
const scale = (val, type, pixel) => {
  pixel = parseInt(pixel, 10) || 120;
  const scale = {
    day: 31,
    hour: 23,
    minute: 59,
    second: 59
  }[type];
  return pixel - (pixel / scale) * val;
};
module.exports.scale = scale;

// 计算计时器数据
const calcTimeMap = (timeStamp, pixel) => {
  pixel = parseInt(pixel, 10);
  let timeMap = calcTime(timeStamp);
  let day = scale(parseInt(timeMap.day, 10), 'day', pixel);
  let hour = scale(parseInt(timeMap.hour, 10), 'hour', pixel);
  let minute = scale(parseInt(timeMap.minute, 10), 'minute', pixel);
  let second = scale(parseInt(timeMap.second, 10), 'second', pixel);
  return {
    day: timeMap.day,
    dayPixel: day,
    hour: timeMap.hour,
    hourPixel: hour,
    minute: timeMap.minute,
    minutePixel: minute,
    second: timeMap.second,
    secondPixel: second
  };
};
module.exports.calcTimeMap = calcTimeMap;

// 计算时差
const calcTimeStamp = (endTime) => {
  return (new Date(endTime)).getTime() - (new Date()).getTime()
};
module.exports.calcTimeStamp = calcTimeStamp;

// 启动定时器
const startInterval = (grantDate, grantTime, grantType, tick, cb) => {
  let tickStamp = parseInt(tick, 10) || 1000;
  return setInterval(() => {
    const target = getGrantTime(grantDate, grantTime, grantType);
    let timeStamp = calcTimeStamp(target.date);
    let result = calcTimeMap(timeStamp);
    if (result.day === '00' && result.hour === '00' && result.minute === '00' && result.second === '00') {
      result['isDone'] = true
    }
    cb(result)
  }, tickStamp)
};
module.exports.startInterval = startInterval;

// 计算时间方向
const calcTimeDirection = (grantTime, grantDate, grantType) => {
  grantDate = parseInt(grantDate, 10);
  grantType = parseInt(grantType, 10);
  let direction = '';
  // 这个地方有问题
  const mirror = [7, 1, 2, 3, 4, 5, 6];
  let currentDate = (grantType === 1) ? mirror[new Date().getDay()] : new Date().getDate();
  if (grantDate > currentDate) {
    direction = 'current'
  } else if (grantDate === currentDate) {
    const timeArr = grantTime.split(':');
    let date = new Date();
    date.setHours(timeArr[0]);
    date.setMinutes(timeArr[1]);
    date.setSeconds(timeArr[2]);
    direction = (date.getTime() >= new Date().getTime()) ? 'current' : 'next'
  } else if (grantDate < currentDate) {
    direction = 'next'
  }
  return direction
};
module.exports.calcTimeDirection = calcTimeDirection;

// 获取日期时间
const getDateMap = (date) => {
  let time = new Date(date) || new Date();
  let y = time.getFullYear();
  let m = time.getMonth() + 1;
  let d = time.getDate();
  let h = time.getHours();
  let mi = time.getMinutes();
  let s = time.getSeconds();
  m = m < 10 ? '0' + m : m;
  d = d < 10 ? '0' + d : d;
  h = h < 10 ? '0' + h : h;
  mi = mi < 10 ? '0' + mi : mi;
  s = s < 10 ? '0' + s : s;
  return {
    year: y.toString(),
    month: m.toString(),
    day: d.toString(),
    hour: h.toString(),
    minute: mi.toString(),
    second: s.toString(),
    date: date
  }
};
module.exports.getDateMap = getDateMap;

// 获取打折券发放时间
const getGrantTime = (grantDate, grantTime, grantType) => {
  grantDate = parseInt(grantDate, 10);
  grantType = parseInt(grantType, 10);
  let dateMap = {};
  const timeArr = grantTime.split(':');
  const direction = calcTimeDirection(grantTime, grantDate, grantType);
  const milliseconds = 24 * 60 * 60 * 1000;
  let offset = 0;
  let date = null;
  if (grantType === 1) { // 按周
    const mirror = [7, 1, 2, 3, 4, 5, 6];
    const toDayOfWeek = new Date().getDay();
    if (direction === 'current') { // 本轮活动未过，计算本轮活动时间
      offset = (grantDate - mirror[toDayOfWeek]) * milliseconds
    } else if (direction === 'next') { // 本轮活动已过，计算下轮活动时间
      offset = (7 - mirror[toDayOfWeek] + grantDate) * milliseconds
    }
    date = new Date(new Date().getTime() + offset)
  } else if (grantType === 2) { // 按月
    date = new Date();
    date.setDate(grantDate);
    if (direction === 'next') {
      date.setMonth(date.getMonth() + 1)
    }
  }
  date.setHours(timeArr[0]);
  date.setMinutes(timeArr[1]);
  date.setSeconds(timeArr[2]);
  dateMap = {...getDateMap(date)};
  return dateMap
};
module.exports.getGrantTime = getGrantTime;

// 启动定时器
const startTimer = (date, cb) => {
  return setInterval(() => {
    const timeStamp = calcTimeStamp(date);
    let backMap = {};
    if (timeStamp <= 0) {
      backMap.isDone = true;
    }
    let timeMap = calcTime(timeStamp);
    cb({
      ...backMap,
      ...timeMap
    })
  })
};
module.exports.startTimer = startTimer;

// 获取发放时间文本
const getGrantStr = (grantDate, grantTime, grantType) => {
  grantType = parseInt(grantType, 10);
  let arr = [];
  if (grantType === 1) { // 按周发券
    const weekMirror = {
      'w00': '每周日',
      'w01': '每周一',
      'w02': '每周二',
      'w03': '每周三',
      'w04': '每周四',
      'w05': '每周五',
      'w06': '每周六',
    };
    arr.push(weekMirror['w' + grantDate]);
  } else { // 按月发放
    arr.push('每月' + grantDate + '日');
  }
  arr.push(grantTime);
  return arr.join('');
};
module.exports.getGrantStr = getGrantStr;

// 编码收货地址数据
const encodeAddressData = (codeMap) => {
  codeMap = codeMap || {};
  const province = AreaData.find((row) => {
    return row.code === codeMap.provinceId
  }).name;
  const city = AreaData.find((row) => {
    return row.code === codeMap.cityId
  }).name;
  const school = AreaData.find((row) => {
    return row.code === codeMap.schoolId
  }).name;
  const campusMap = AreaData.find((row) => {
    return row.code === codeMap.campusId
  });
  return {
    province: province,
    city: city,
    school: school,
    campus: campusMap.name,
    address: [province, city, school, campusMap.name].join('.'),
    detail: campusMap.address
  };
};
module.exports.encodeAddressData = encodeAddressData;

// 获取时间字符串
const getTimeStr = (date) => {
  const map = getDateMap(date);
  return map.year + '-' + map.month + '-' + map.day + ' ' + map.hour + ':' + map.minute + ':' + map.second
};
module.exports.getTimeStr = getTimeStr;

// 通过parentId获取区域数据
const getAreaDataByParentId = (parentId) => {
  return AreaData.filter(row => {
    return row.parentId === parentId
  })
};
module.exports.getAreaDataByParentId = getAreaDataByParentId;

// 提示信息
import Toast from 'react-native-root-toast'; // 引入类库
const message = (msg) => {
  Toast.show(msg,{
    position: Toast.positions.BOTTOM,
    shadow: true,
    backgroundColor: '#757575',
    textColor: '#FFF',
    opacity: 1,
    fontSize: 12
  })
};
module.exports.message = message;

// 验证姓名
module.exports.validateName = (rule, value, callback) => {
  if (!value && value.length > 8) {
    callback('请输入正确姓名（1-8个字符）')
  } else {
    callback()
  }
};

// 验证特殊字符
module.exports.checkSpecialChar = (value) => {
  let pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]")
  return pattern.test(value)
};

// 验证手机号
module.exports.validatePhone = (value) => {
  return !(/(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/.test(value))
};

// 验证密码
module.exports.validatePwd = (value) => {
  return !/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[~?!@+-.#$%^&*])[\da-zA-Z~?!@+-.#$%^&*]{8,16}$/.test(value)
};

// 验证账号
module.exports.validateAccount = (value) => {
  return !/^[a-zA-Z0-9_]{3,16}$/.test(value)
};

// 获取规格列表
module.exports.getSpecList = (data, key) => {
  const specs = data.filter(row => {
    return row.properties.indexOf(key) !== -1
  });
  return specs.map(row => {
    let map = {
      orginalPrice: row.orginal_price,
      quantity: row.quantity,
      skuId: row.sku_id
    };
    const propsArr = row.properties_name.split(';')
    map.spec = propsArr[0].split(':')[3];
    map.color = propsArr[1].split(':')[3];
    return map
  });
};

// 确认框
module.exports.confirm = (title, cb) => {
  Alert.alert(null,title,
    [
      {
        text:"取消",
        onPress:() => {}
      },
      {
        text:"确定",
        onPress:() => { cb() }
      }
    ]
  );
};

// 分组
const groupBy = (data, flag) => {
  let map = {};
  for (let i = 0; i < data.length; i++) {
    const mapKey = 'label' + data[i][flag];
    if (!map[mapKey]) {
      map[mapKey] = [data[i]]
    } else {
      map[mapKey].push(data[i])
    }
  }
  return map
};
module.exports.groupBy = groupBy;
