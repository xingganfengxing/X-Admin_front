import Vue from 'vue'
import VueRouter from 'vue-router'
import Lockr from 'lockr'
import Object from '../../../tools/object/index'

import Index from '../../../pages/index'
import Login from '../../../pages/auth/login'
import Register from '../../../pages/auth/register'

Vue.use(VueRouter);

const router = new VueRouter({
  // mode: 'history', // 历史模式
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      requireAuth: false
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      requireAuth: false
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      requireAuth: false
    }
  ]
});

// 全局导航钩子(进行全局权限验证)
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if(!Object.isNotEmptyObject(Lockr.get('user'))) {
      next();
    } else {
      next({
        path: '/auth/login',
        query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next();
  }
});

export default router;
