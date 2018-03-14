let express = require('express');

let port = 9001;
let app = express();

// 配置首页路由
let indexRouter = express.Router();
indexRouter.get('/', (req, resp, next) => {
  req.url = './index.html';
  next();
});
app.use(indexRouter);

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




