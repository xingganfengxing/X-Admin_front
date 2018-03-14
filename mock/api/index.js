let express = require('express');
let routers = express.Router();

// 引入api路由
let testRouters = require('./test');
let adminRouters = require('./admin');
let verifyRouters = require('./verify');
let userRouters = require('./user');

// 添加路由使用
routers.use('/', testRouters);
routers.use('/admin', adminRouters);
routers.use('/verify', verifyRouters);
routers.use('/user', userRouters);

module.exports = routers;

