let express = require('express');
let routers = express.Router();
let appData = require('../data/data');
let utils = require('../utils/index');
let Mock = require('mockjs');

/**
 * 获取权限列表
 */
routers.get('/getAll', (req, resp) => {
  let current = req.query.current;
  let size = req.query.size;
  Mock.Random.cword(4, 8);
  Mock.Random.csentence(8, 10);
  if (current === '1') {
    resp.json(Mock.mock({
      "status": 1,
      "message": "success",
      "result|12": [{
        "id|15": /[0-9]/,
        "name": '@cword(4, 8)',
        "desc": '@csentence(8, 10)',
        "type": /[0-1]/
      }]
    }));
  } else if (current === '2') {
    resp.json(Mock.mock({
      "status": 1,
      "message": "success",
      "result|8": [{
        "id|15": /[0-9]/,
        "name": '@cword(4, 8)',
        "desc": '@csentence(8, 10)',
        "type": /[0-1]/
      }]
    }));
  } else {
    resp.json(Mock.mock(utils.response.fail()))
  }

});

/**
 * 获取权限分页信息
 */
routers.get('/getPageInfo', (req, resp) => {
  let pageInfo = appData.pageInfo;
  resp.json(utils.response.success(pageInfo));
});

module.exports = routers;
