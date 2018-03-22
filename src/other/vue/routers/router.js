import Vue from 'vue'
import VueRouter from 'vue-router'
import Lockr from 'lockr'
import Object from '../../../tools/object/index'

// app
import Index from '../../../pages/index'
import Login from '../../../pages/login'
import Register from '../../../pages/register'

// user
import User_Index from '../../../pages/user/index'
import User_Online from '../../../pages/user/online'
import User_List from '../../../pages/user/list'
import User_Auth from '../../../pages/user/auth'

// admin
import Admin_Index from '../../../pages/admin/index'
import Admin_Online from '../../../pages/admin/online'
import Admin_List from '../../../pages/admin/list'
import Admin_Auth from '../../../pages/admin/auth'

// auth
import Auth_Index from '../../../pages/auth/index'
import Auth_Perm from '../../../pages/auth/perm'
import Auth_Role from '../../../pages/auth/role'
import Auth_Resource from '../../../pages/auth/resource'


Vue.use(VueRouter);

const router = new VueRouter({
  // mode: 'history', // 历史模式
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
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
    },
    {
      path: '/user',
      name: 'user_index',
      component: User_Index,
      children: [
        {
          path: 'online',
          name: 'user_online',
          component: User_Online,
          requireAuth: false
        },
        {
          path: 'list',
          name: 'user_list',
          component: User_List,
          requireAuth: false
        },
        {
          path: 'auth',
          name: 'user_auth',
          component: User_Auth,
          requireAuth: false
        }
      ]
    },
    {
      path: '/admin',
      name: 'admin_index',
      component: Admin_Index,
      children: [
        {
          path: 'online',
          name: 'admin_online',
          component: Admin_Online,
          requireAuth: false
        },
        {
          path: 'list',
          name: 'admin_list',
          component: Admin_List,
          requireAuth: false
        },
        {
          path: 'auth',
          name: 'admin_auth',
          component: Admin_Auth,
          requireAuth: false
        }
      ]
    },
    {
      path: '/auth',
      name: 'auth_index',
      component: Auth_Index,
      children: [
        {
          path: 'perm',
          name: 'auth_perm',
          component: Auth_Perm,
          requireAuth: false
        },
        {
          path: 'role',
          name: 'auth_role',
          component: Auth_Role,
          requireAuth: false
        },
        {
          path: 'resource',
          name: 'auth_resource',
          component: Auth_Resource,
          requireAuth: false
        }
      ]
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
