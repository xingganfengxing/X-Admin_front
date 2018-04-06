let express = require('express');
let routers = express.Router();

// 引入api路由
let testRouters = require('./test');
let adminRouters = require('./admin');
let verifyRouters = require('./verify');
let userRouters = require('./user');
let roleRouters = require('./role');
let resourceRouters = require('./resource');
let permRouters = require('./perm');

// 添加路由使用
routers.use('/', testRouters);
routers.use('/admin', adminRouters);
routers.use('/verify', verifyRouters);
routers.use('/user', userRouters);
routers.use('/role', roleRouters);
routers.use('/resource', resourceRouters);
routers.use('/perm', permRouters);

module.exports = routers;

