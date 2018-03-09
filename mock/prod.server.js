let express = require('express');
let bodyParser = require('body-parser');
let Mock = require('mockjs');
let config = require('../config/index');
let utils = require('./utils');

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


// 配置首页路由
let indexRouter = express.Router();
indexRouter.get('/', (req, resp, next) => {
  req.url = './index.html';
  next();
});
app.use(indexRouter);

// 配置api路由(包括数据文件api和mock数据api)
let apiRouters = express.Router();
let appData = require('./data');

// 0. Mock数据api
apiRouters.get('/test', (req, resp) => {
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

// 1. 管理员登录
apiRouters.post('/admin/login', (req, resp) => {
  let data = req.body.data;
  let admin = appData.admin;
  if (data.username === admin.name && data.password === admin.pass) {
    resp.json(Mock.mock(utils.success(admin)));
  } else {
    resp.json(Mock.mock(utils.fail()));
  }
});

// 2. 验证码验证
apiRouters.post('/verify/valid', (req, resp) => {
  let data = req.body.data;
  let code = appData.code;
  if (data.code === code) {
    resp.json(Mock.mock(utils.success(true)));
  } else {
    resp.json(Mock.mock(utils.success(false)));
  }
});

// 3. 生成验证码
apiRouters.post('/verify/generate', (req, resp) => {
  resp.json(Mock.mock({
    "status": 1,
    "message": "success",
    "result|4": /[0-9a-zA-Z]/
  }));
});

app.use(apiRouters);


// express启动目录
app.use(express.static('./dist'));

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




