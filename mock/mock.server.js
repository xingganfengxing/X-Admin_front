let express = require('express');
let bodyParser = require('body-parser');
let config = require('../config/index');

let port = process.env.PORT || config.build.port;
let app = express();

// 添加json解析
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// express中间处理跨域问题
app.use(function(req, resp, next) {
  resp.header("Access-Control-Allow-Origin", "http://localhost:8080");
  resp.header('Access-Control-Allow-Credentials', 'true');
  resp.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  resp.header("Access-Control-Allow-Methods","PUT, POST, GET, DELETE, OPTIONS");
  next();
});

// 配置api路由
let apiRouters = require('./api/index');
app.use(apiRouters);

module.exports = app.listen(port, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Listening at http://localhost:' + port + '\n');
});

/**
 * 运行命令:
 *
 * node prod.server.js
 */




