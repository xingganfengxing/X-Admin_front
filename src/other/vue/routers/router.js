import Vue from 'vue'
import VueRouter from 'vue-router'
import Lockr from 'lockr'
import Object from '../../../tools/object/index'

// index
import Index from '../../../pages/index'

// home
import Home_Login from '../../../pages/home/login'
import Home_Register from '../../../pages/home/register'

// user
import User_Online from '../../../pages/user/online'
import User_List from '../../../pages/user/list'
import User_Auth from '../../../pages/user/auth'

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
      name: 'home_login',
      component: Home_Login,
      requireAuth: false
    },
    {
      path: '/register',
      name: 'home_register',
      component: Home_Register,
      requireAuth: false
    },
    {
      path: '/user/online',
      name: 'user_online',
      component: User_Online,
      requireAuth: false
    },
    {
      path: '/user/list',
      name: 'user_list',
      component: User_List,
      requireAuth: false
    },
    {
      path: '/user/auth',
      name: 'user_auth',
      component: User_Auth,
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
