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
  admin.avatar = Mock.Random.image('50x50', Mock.Random.color(), admin.name);
  if (data.username === admin.name && data.password === admin.pass) {
    resp.json(utils.response.success(admin));
  } else {
    resp.json(utils.response.fail());
  }
});

/**
 * 获取在线管理员数据
 */
routers.get('/online/getAll', (req, resp) => {
  let current = req.query.current;
  let size = req.query.size;
  // 生成测试数据
  Mock.Random.datetime('yyyy-MM-dd HH:mm:ss');
  Mock.Random.ip();
  Mock.Random.boolean();
  Mock.Random.last();
  if (current === '1') {
    resp.json(Mock.mock({
      "status": 1,
      "message": "success",
      "result|12": [{
        "sessionId|15": /[0-9]/,
        "id|15": /[0-9]/,
        "name": "@last",
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
        "id|15": /[0-9]/,
        "name": "@last",
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
 * 获取在线管理员数据分页信息
 *
 */
routers.get('/online/getPage', (req, resp) => {
  let pageInfo = appData.pageInfo;
  resp.json(utils.response.success(pageInfo));
});

/**
 * 获取指定管理员信息
 *
 */
routers.get('/getInfo', (req, resp) => {
  let id = req.query.id;
  let avatar = Mock.Random.image('50x50', Mock.Random.color(), id);
  Mock.Random.integer(18, 65);
  Mock.Random.csentence(20, 35);
  Mock.Random.last();
  resp.json(Mock.mock({
    "status": 1,
    "message": "success",
    "result": {
      "id": id,
      "name": "@last",
      "avatar": avatar,
      "age": '@integer(18, 65)',
      "sex|1": /[男女]/,
      "desc": '@csentence(20, 35)',
    }
  }));
});

/**
 * 获取所有管理员信息
 *
 */
routers.get('/getAll', (req, resp) => {
  let current = req.query.current;
  // 生成测试数据
  Mock.Random.datetime('yyyy-MM-dd HH:mm:ss');
  Mock.Random.email();
  Mock.Random.last();
  if (current === '1') {
    resp.json(Mock.mock({
      "status": 1,
      "message": "success",
      "result|12": [{
        "id|15": /[0-9]/,
        "name": "@last",
        "type": /[一二三]级/,
        "status": /正常|无效/,
        "phone": /^1[34578]\d{9}$/,
        "email": '@email',
        "lastLoginTime": '@datetime("yyyy-MM-dd HH:mm:ss")'
      }]
    }))
  } else if (current === '2') {
    resp.json(Mock.mock({
      "status": 1,
      "message": "success",
      "result|8": [{
        "id|15": /[0-9]/,
        "name": "@last",
        "type": /[一二三]级/,
        "status": /正常|无效/,
        "phone": /^1[34578]\d{9}$/,
        "email": '@email',
        "lastLoginTime": '@datetime("yyyy-MM-dd HH:mm:ss")'
      }]
    }))
  } else {
    resp.json(Mock.mock(utils.response.fail()))
  }
});

/**
 * 获取全部管理员分页信息
 */
routers.get('/getPage', (req, resp) => {
  let pageInfo = appData.pageInfo;
  resp.json(utils.response.success(pageInfo));
});

/**
 * 加载指定管理员角色列表
 */
routers.get('/getRoles', (req, resp) => {
  let id = req.query.id;
  Mock.Random.cword(5, 10);
  Mock.Random.csentence(20, 35);
  resp.json(Mock.mock({
    "status": 1,
    "message": "success",
    "result|12": [{
      "id|15": /[0-9]/,
      "name": '@cword(5, 10)',
      "desc": '@csentence(20, 35)',
      "type": 1
    }]
  }));
});

/**
 * 移除指定角色
 */
routers.delete('/removeRole', (req, resp) => {
  let data = req.body;
  console.log(data);
  Mock.Random.boolean();
  resp.json(Mock.mock({
    "status": 1,
    "message": "success",
    "result": "@boolean"
  }));
});

/**
 * 指定管理员添加角色
 */
routers.put('/addRole', (req, resp) => {
  let data = req.body.data;
  console.log(data);
  Mock.Random.boolean();
  resp.json(Mock.mock({
    "status": 1,
    "message": "success",
    "result": "@boolean"
  }));
});


/**
 * 加载指定管理员权限列表
 */
routers.get('/getPerms', (req, resp) => {
  let id = req.query.id;
  Mock.Random.cword(5, 10);
  Mock.Random.csentence(20, 35);
  resp.json(Mock.mock({
    "status": 1,
    "message": "success",
    "result|12": [{
      "id|15": /[0-9]/,
      "name": '@cword(5, 10)',
      "desc": '@csentence(20, 35)',
      "type": 1
    }]
  }));
});


/**
 * 加载指定管理员资源列表
 */
routers.get('/getResources', (req, resp) => {
  let id = req.query.id;
  Mock.Random.cword(5, 10);
  Mock.Random.csentence(20, 35);
  Mock.Random.url('http','52zzu.com');
  resp.json(Mock.mock({
    "status": 1,
    "message": "success",
    "result|12": [{
      "id|15": /[0-9]/,
      "name": '@cword(5, 10)',
      "path": '@url("http", "52zzu.com")',
      "desc": '@csentence(20, 35)',
      "type": /[0-4]/
    }]
  }));
});

/**
 * 清理管理员权限缓存
 *
 */
routers.post('/cleanAuth', (req, resp) => {
  let data = req.body.data;
  let result = data.id.length !== 0;
  resp.json(utils.response.success(result));
});

/**
 * 强制管理员退出登录
 *
 */
routers.post('/forceLogout', (req, resp) => {
  let data = req.body.data;
  let result = data.id.length !== 0;
  resp.json(utils.response.success(result));
});

module.exports = routers;
