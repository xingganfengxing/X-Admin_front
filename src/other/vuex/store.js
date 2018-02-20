import Vue from 'vue'
import Vuex from 'vuex'
import Lockr from 'lockr'
import * as types from './types'

Vue.use(Vuex);

// this.$store.state
const state = {
  contextPath: 'http://localhost:8080/',
  loginInfo: {},
  asideWidth: "248px"
};

// 对应dispatch方法
// this.$store.dispatch
const actions = {
  storeLoginInfo({commit}, loginInfo) {
    commit(types.STORE_LOGIN_INFO, loginInfo);
  },
  updateAsideWidth({commit}, asideWidth) {
    commit(types.ASIDE_WIDTH, asideWidth);
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
  }
};

// this.$store.getters
const getters = {
  contextPath: state => state.contextPath,
  loginInfo: state => state.loginInfo !== '' ? state.loginInfo : Lockr.get(types.STORE_LOGIN_INFO),
  asideWidth: state => state.asideWidth
};

export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations
});
