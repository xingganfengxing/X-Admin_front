let express = require('express');
let routers = express.Router();
let appData = require('../data/data');
let utils = require('../utils/index');
let Mock = require('mockjs');


/**
 * 获取角色列表
 */
routers.get('/getAll', (req, resp) => {
  Mock.Random.cword(5, 10);
  Mock.Random.csentence(20, 35);
  resp.json(Mock.mock({
    "status": 1,
    "message": "success",
    "result|12": [{
      "id|15": /[0-9]/,
      "name": '@cword(5, 10)',
      "desc": '@csentence(20, 35)',
      "type": /[0-1]/
    }]
  }));
});

/**
 * 获取指定类型角色列表
 */
routers.get('/getList', (req, resp) => {
  let type = req.query.type;
  Mock.Random.cword(5, 10);
  Mock.Random.csentence(20, 35);
  resp.json(Mock.mock({
    "status": 1,
    "message": "success",
    "result|12": [{
      "id|15": /[0-9]/,
      "name": '@cword(5, 10)',
      "desc": '@csentence(20, 35)',
      "type": type
    }]
  }));
});

module.exports = routers;
