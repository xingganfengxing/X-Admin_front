let express = require('express');
let utils = require('../utils/index');
let appData = require('../data/data');
let routers = express.Router();
let Mock = require('mockjs');

/**
 * 管理员登录
 *
 */
routers.post('/login', (req, resp) => {
  let data = req.body.data;
  let admin = appData.admin;
  let random = Mock.Random;
  admin.avatar = random.image('50x50', random.color(), admin.name);
  if (data.username === admin.name && data.password === admin.pass) {
    resp.json(utils.response.success(admin));
  } else {
    resp.json(utils.response.fail());
  }
});

/**
 * 获取在线管理员信息
 *
 */
routers.get('/getAll', (req, resp) => {
  let current = req.query.current;
  // 生成测试数据
  Mock.Random.datetime('yyyy-MM-dd HH:mm:ss');
  Mock.Random.ip();
  Mock.Random.boolean();
  if (current === '1') {
    resp.json(Mock.mock({
      "status": 1,
      "message": "success",
      "result|12": [{
        "sessionId|15": /[0-9]/,
        "name|4-8": /[0-9a-zA-Z]/,
        "loginTime": '@datetime("yyyy-MM-dd HH:mm:ss")',
        "recentRequestTime": '@datetime("yyyy-MM-dd HH:mm:ss")',
        "loginIP": '@ip',
        "isForceLogout": '@boolean'
      }]
    }))
  } else if (current === '2') {
    resp.json(Mock.mock({
      "status": 1,
      "message": "success",
      "result|8": [{
        "sessionId|15": /[0-9]/,
        "name|4-8": /[0-9a-zA-Z]/,
        "loginTime": '@datetime("yyyy-MM-dd HH:mm:ss")',
        "recentRequestTime": '@datetime("yyyy-MM-dd HH:mm:ss")',
        "loginIP": '@ip',
        "isForceLogout": '@boolean'
      }]
    }))
  } else {
    resp.json(utils.response.fail());
  }
});

/**
 * 获取在线管理员数据分页信息
 */
routers.get('/getAllPageInfo', (req, resp) => {
  let pageInfo = appData.pageInfo;
  resp.json(utils.response.success(pageInfo));
});

module.exports = routers;
