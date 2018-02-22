import Vue from 'vue'
import Vuex from 'vuex'
import Lockr from 'lockr'
import * as types from './types'
import * as constants from '../../common/js/global_constants'

Vue.use(Vuex);

// this.$store.state
const state = {
  contextPath: 'http://localhost:8080/',
  loginInfo: {},
  asideWidth: constants.ASIDE_ON,
  activeMenuItem: '1-1',
  activeSubMenu: ['1']
};

// 对应dispatch方法
// this.$store.dispatch
const actions = {
  storeLoginInfo({commit}, loginInfo) {
    commit(types.STORE_LOGIN_INFO, loginInfo);
  },
  updateAsideWidth({commit}, asideWidth) {
    commit(types.ASIDE_WIDTH, asideWidth);
  },
  updateActiveMenuItem({commit}, activeMenuItem) {
    commit(types.ACTIVE_MENU_ITEM, activeMenuItem);
  },
  updateActiveSubMenu({commit}, activeSubMenu) {
    commit(types.ACTIVE_SUB_MENU, activeSubMenu);
  }
};

// 对应commit方法
// this.$store.commit
const mutations = {
  [types.STORE_LOGIN_INFO] (state, loginInfo) {
    state.loginInfo = loginInfo;
  },
  [types.ASIDE_WIDTH] (state, asideWidth) {
    state.asideWidth = asideWidth;
  },
  [types.ACTIVE_MENU_ITEM] (state, activeMenuItem) {
    state.activeMenuItem = activeMenuItem;
  },
  [types.ACTIVE_SUB_MENU] (state, activeSubMenu) {
    state.activeSubMenu = activeSubMenu;
  }
};

// this.$store.getters
const getters = {
  contextPath: state => state.contextPath,
  loginInfo: state => state.loginInfo !== '' ? state.loginInfo : Lockr.get(types.STORE_LOGIN_INFO),
  asideWidth: state => state.asideWidth,
  isCollapse: state => state.asideWidth !== constants.ASIDE_ON,
  activeMenuItem: state => state.activeMenuItem,
  activeSubMenu: state => state.activeSubMenu
};

export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations
});
