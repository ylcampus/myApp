const uuid = require('uuid');
// 获取个人信息
module.exports.fetchPersonalData = (data) => {
  return new Promise((resolve) => {
    resolve({
      code: 0,
      data: {
        account: '182****5737',
        telephone: '',
        nickName: '星火燎原',
        sex: 1,
        tickets: 7,
        orders: 3
      },
      success: true,
      message: null
    })
  })
};
// 提交个人信息
module.exports.submitPersonalData = (data) => {
  return new Promise((resolve) => {
    resolve({
      code: 0,
      data: null,
      success: true,
      message: null
    })
  })
};
// 获取收货地址
module.exports.fetchAddressData = () => {
  return new Promise((resolve) => {
    resolve({
      code: 0,
      data: {
        linkman: '董纪国', // 联系人
        telephone: '18205185737', // 联系电话
        provinceId: '320000', // 省
        cityId: '320100', // 市
        schoolId: '320101', // 学校
        campusId: '3201011' // 校区
      }
    })
  });
};

// 保存收货地址
module.exports.submitAddressData = () => {
  return new Promise((resolve) => {
    resolve({
      code: 0,
      data: null
    })
  });
};
// 登出
module.exports.logoutForApp = (data) => {
  return new Promise((resolve) => {
    resolve({
      code: 0,
      data: null
    })
  })
};

// 获取打折券列表
module.exports.fetchTicketsListDataForApp = (data) => {
  return new Promise((resolve) => {
    resolve({
      code: 0,
      data: [
        {
          ticketId: uuid.v4(),
          shopId: '100001',
          shopName: '阿迪达斯官方体验店',
          status: '1',
          creatAt: '2018-11-07T06:54:54.174Z'
        },
        {
          ticketId: uuid.v4(),
          shopId: '100002',
          shopName: '阿迪达斯官方体验店',
          status: '1',
          creatAt: '2018-11-07T06:54:54.174Z'
        },
        {
          ticketId: uuid.v4(),
          shopId: '1000055',
          shopName: '阿迪达斯官方体验店',
          status: '2',
          creatAt: '2018-11-07T06:54:54.174Z'
        },
        {
          ticketId: uuid.v4(),
          shopId: '100003',
          shopName: '阿迪达斯官方体验店',
          status: '2',
          creatAt: '2018-11-07T06:54:54.174Z'
        },
        {
          ticketId: uuid.v4(),
          shopId: '100004',
          shopName: '阿迪达斯官方体验店',
          status: '2',
          creatAt: '2018-11-07T06:54:54.174Z'
        },
        {
          ticketId: uuid.v4(),
          shopId: '100005',
          shopName: '阿迪达斯官方体验店',
          status: '2',
          creatAt: '2018-11-07T06:54:54.174Z'
        }
      ]
    })
  })
};
