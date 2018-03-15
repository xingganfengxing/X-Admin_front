let express = require('express');
let routers = express.Router();
let appData = require('../data/data');
let utils = require('../utils/index');
let Mock = require('mockjs');

/**
 * 获取在线用户数据
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
    resp.json(Mock.mock(utils.response.fail()))
  }
});

/**
 * 获取在线用户数据分页信息
 *
 */
routers.get('/getAllPageInfo', (req, resp) => {
  let pageInfo = appData.pageInfo;
  resp.json(utils.response.success(pageInfo));
});

/**
 * 获取用户信息
 *
 */
routers.get('/getUserInfo', (req, resp) => {
  let name = req.query.name;
  let avatar = Mock.Random.image('50x50', Mock.Random.color(), name);
  Mock.Random.integer(18, 65);
  Mock.Random.csentence(20, 35);
  resp.json(Mock.mock({
    "status": 1,
    "message": "success",
    "result": {
      "id|15": /[0-9]/,
      "name": name,
      "avatar": avatar,
      "age": '@integer(18, 65)',
      "sex|1": /[男女]/,
      "desc": '@csentence(20, 35)',
    }
  }));
});


module.exports = routers;
