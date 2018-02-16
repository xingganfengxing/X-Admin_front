import Vue from 'vue'
import Vuex from 'vuex'
import Lockr from 'lockr'
import * as types from './types'

Vue.use(Vuex);

const state = {
  contextPath: 'http://localhost:8080/',
  loginInfo: {}
};

const actions = {
  storeLoginInfo({commit}, res) {
    commit(types.STORE_LOGIN_INFO, res);
  }
};

const mutations = {
  [types.STORE_LOGIN_INFO] (state, res) {
    state.loginInfo = res;
  }
};

const getters = {
  contextPath: state => state.contextPath,
  loginInfo: state => state.loginInfo !== '' ? state.loginInfo : Lockr.get(types.STORE_LOGIN_INFO)
};

export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations
});
