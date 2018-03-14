let express = require('express');
let routers = express.Router();
let Mock = require('mockjs');

/**
 * Mock测试数据
 */
routers.get('/', (req, resp) => {
  resp.json(
    Mock.mock({
      "status": 1,
      "message": "success",
      "result|1-9": [{
        "name|5-8": /[a-zA-Z]/,
        "id|+1": 1,
        "value|0-500": 20
      }]
    })
  );
});

module.exports = routers;
