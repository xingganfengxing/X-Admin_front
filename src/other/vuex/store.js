import Vue from 'vue'
import Vuex from 'vuex'
import Lockr from 'lockr'
import * as types from './types'
import * as constants from '../../common/js/global_constants'

Vue.use(Vuex);

// this.$store.state
const state = {
  loginInfo: '',
  asideWidth: '',
  activeMenuItem: '',
  activeSubMenu: []
};

// 对应dispatch方法
// this.$store.dispatch
const actions = {
  saveLoginInfo({commit}, loginInfo) {
    commit(types.LOGIN_INFO, loginInfo);
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
  [types.LOGIN_INFO] (state, loginInfo) {
    state.loginInfo = loginInfo;
    Lockr.set(constants.LOGIN_INFO, loginInfo);
  },
  [types.ASIDE_WIDTH] (state, asideWidth) {
    state.asideWidth = asideWidth;
    let aside = Lockr.get(constants.ASIDE);
    aside.asideWidth = asideWidth;
    Lockr.set(constants.ASIDE, aside);
  },
  [types.ACTIVE_MENU_ITEM] (state, activeMenuItem) {
    state.activeMenuItem = activeMenuItem;
    let aside = Lockr.get(constants.ASIDE);
    aside.activeMenuItem = activeMenuItem;
    Lockr.set(constants.ASIDE, aside);
  },
  [types.ACTIVE_SUB_MENU] (state, activeSubMenu) {
    state.activeSubMenu = activeSubMenu;
    let aside = Lockr.get(constants.ASIDE);
    aside.activeSubMenu = activeSubMenu;
    Lockr.set(constants.ASIDE, aside);
  }
};

// this.$store.getters
const getters = {
  loginInfo: state => state.loginInfo !== '' ? state.loginInfo : Lockr.get(constants.LOGIN_INFO),
  asideWidth: state => state.asideWidth !== '' ? state.asideWidth : Lockr.get(constants.ASIDE).asideWidth,
  isCollapse: (state, getters) => getters.asideWidth  === constants.ASIDE_OFF,
  activeMenuItem: state => state.activeMenuItem !== '' ? state.activeMenuItem : Lockr.get(constants.ASIDE).activeMenuItem,
  activeSubMenu: state => state.activeSubMenu.length !== 0 ? state.activeSubMenu : Lockr.get(constants.ASIDE).activeSubMenu
};

export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations
});
