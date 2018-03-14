let express = require('express');
let utils = require('../utils/index');
let routers = express.Router();
let Mock = require('mockjs');

let verifyCode = "";
/**
 * 验证码验证
 */
routers.post('/valid', (req, resp) => {
  let data = req.body.data;
  if (data.code === verifyCode) {
    resp.json(Mock.mock(utils.response.success(true)));
  } else {
    resp.json(Mock.mock(utils.response.success(false)));
  }
});

/**
 * 验证码生成
 */
routers.post('/generate', (req, resp) => {
  let random = Mock.Random;
  verifyCode = random.word(4);
  let image = random.image('116x38', random.color(), verifyCode);

  resp.json(Mock.mock({
    "status": 1,
    "message": "success",
    "result": image
  }));
});

module.exports = routers;


