let express = require('express');
let routers = express.Router();
let appData = require('../data/data');
let utils = require('../utils/index');
let Mock = require('mockjs');

/**
 * 获取全部资源列表
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
        "type": /all|get|post|delete|put/,
        "name": '@cword(4, 8)',
        "path": /^\/(role|rsource|user|admin|verify|perm)\/[a-z]{4,8}$/,
        "desc": '@csentence(8, 10)'
      }]
    }));
  } else if (current === '2') {
    resp.json(Mock.mock({
      "status": 1,
      "message": "success",
      "result|8": [{
        "id|15": /[0-9]/,
        "type": /all|get|post|delete|put/,
        "name": '@cword(4, 8)',
        "path": /^\/(role|rsource|user|admin|verify|perm)\/[a-z]{4,8}$/,
        "desc": '@csentence(8, 10)'
      }]
    }));
  } else {
    resp.json(Mock.mock(utils.response.fail()))
  }
});

/**
 * 获取全部资源分页信息
 *
 */
routers.get('/getPage', (req, resp) => {
  let pageInfo = appData.pageInfo;
  resp.json(utils.response.success(pageInfo));
});

/**
 * 获取指定资源信息
 *
 */
routers.get('/getInfo', (req, resp) => {
  let resourceId = req.query.reourceId;
  Mock.Random.cword(5, 10);
  Mock.Random.csentence(20, 35);
  resp.json(Mock.mock({
    "status": 1,
    "message": "success",
    "result": {
      "id": resourceId,
      "type": /all|get|post|delete|put/,
      "name": '@cword(5, 10)',
      "path": /\/role|rsource|user|admin|verify|perm\/[a-z]{4,8}/,
      "desc": '@csentence(20, 35)'
    }
  }));
});

routers.get('/getInfoRoleAndPerm', (req, resp) => {
  let resourceId = req.query.reourceId;
  Mock.Random.cword(5, 10);
  Mock.Random.cword(5, 8);
  Mock.Random.cword(3, 4);
  Mock.Random.csentence(20, 35);
  resp.json(Mock.mock({
    "status": 1,
    "message": "success",
    "result": {
      "resourceInfo": {
        "id": resourceId,
        "type": /all|get|post|delete|put/,
        "name": '@cword(5, 10)',
        "path": /\/role|rsource|user|admin|verify|perm\/[a-z]{4,8}/,
        "desc": '@csentence(20, 35)'
      },
      "roleList|18": [
        {
          "id|+1": 544213131354584,
          "name": "@cword(3, 4)",
          "desc": "@cword(5, 8)",
          "type": /[1-2]/
        }
      ],
      "permList|18": [
        {
          "id|+1": 124213156986584,
          "name": "@cword(3, 4)",
          "desc": "@cword(5, 8)",
          "type": /[1-2]/
        }
      ]
    }
  }));
});

/**
 * 添加指定资源权限或角色
 */
routers.put('/addRoleOrPerm', (req, resp) => {
  let data = req.body.data;
  console.log(data);
  resp.json(Mock.mock({
    "status": 1,
    "message": "success",
    "result": true
  }));
});

/**
 * 删除指定资源权限或角色
 */
routers.delete('/removeRoleOrPerm', (req, resp) => {
  let data = req.body;
  console.log(data);
  resp.json(Mock.mock({
    "status": 1,
    "message": "success",
    "result": true
  }));
});

module.exports = routers;
