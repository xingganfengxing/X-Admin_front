let express = require('express');
let Mock = require('mockjs');
let config = require('./config/index');

let port = process.env.PORT || config.build.port;
let app = express();


// express中间处理跨域问题
app.use(function(req, resp, next) {
  resp.header("Access-Control-Allow-Origin", "*");
  resp.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  resp.header("Access-Control-Allow-Headers", "X-Requested-With");
  resp.header('Access-Control-Allow-Headers', 'Content-Type');
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
// 1. 自定义数据文件api
let appData = require('./data');

// 2. Mock数据api
apiRouters.get('/test', (req, resp) => {
  resp.json(
    Mock.mock({
      "status": 200,
      "data|1-9": [{
        "name|5-8": /[a-zA-Z]/,
        "id|+1": 1,
        "value|0-500": 20
      }]
    })
  );
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




