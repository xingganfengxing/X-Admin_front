<!-- 顶部组件 -->
<template>
  <div class="v-header-area">
    <router-link :to="{ path: '/' }" class="v-header-logo-area" title="首页">
      <div>
        <img src="../../common/img/logo.png" />
      </div>
      <span>X-Admin后台管理系统</span>
    </router-link>

    <el-menu
      default-active="4"
      mode="horizontal"
      background-color="#545c64"
      active-text-color="#409eff"
      text-color="#fff"
      style="float: right;">
      <el-menu-item index="1">
        <i class="v-icon-common v-icon-mail"></i>
        <el-badge v-if="showMail" :value="10" :max="99" style="position: absolute; left: 30px; top: -15px" ></el-badge>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="v-icon-common v-icon-notice"></i>
        <el-badge v-if="showNotice" :value="2" :max="99" style="position: absolute; left: 30px; top: -15px" ></el-badge>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="v-icon-common v-icon-setting"></i>
        <el-badge v-if="showSetting" :value="1" :max="99" style="position: absolute; left: 30px; top: -15px" ></el-badge>
      </el-menu-item>
      <el-submenu index="4">
        <template slot="title">
          <img :src="loginInfo.avatar" class="v-avatar-area" />
          <span v-text="loginInfo.name"></span>
        </template>
        <el-menu-item index="3-1" @click="update">修改信息</el-menu-item>
        <el-menu-item index="3-2" @click="exit">退出登录</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script type="text/ecmascript-6">
  import * as constants from '../../common/js/global_constants'
  import { mapGetters } from 'vuex'
  import Lockr from 'lockr'
  const COMPONENT_NAME = 'v_header';

  export default {
    name: COMPONENT_NAME,
    data() {
      return {
        mailCount: 11,
        noticeCount: 2,
        settingCount: 0,
      }
    },
    methods: {
      update() {

      },
      exit() {
        // 清空存储信息
        Lockr.rm(constants.LOGIN_INFO);
        Lockr.rm(constants.ASIDE);
        this.$router.replace({ path: '/login' })
      }
    },
    computed: {
      ...mapGetters(['loginInfo']),
      showMail() {
        return this.mailCount > 0;
      },
      showNotice() {
        return this.noticeCount > 0;
      },
      showSetting() {
        return this.settingCount > 0;
      }
    }
  }
</script>

<style scoped lang="less" type="text/less" rel="stylesheet/less">
  @import "../../common/styles/index";

  .v-icon-common {
    color: #fff;
    font-size: 25px;
  }

  .v-header-area {
    display: flex;
    justify-content: space-between;
    background-color: @background-color;
    height: @header-height;
    .v-header-logo-area {
      display: flex;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      padding: 0 25px 0 10px;
      text-decoration: none;
      div {
        font-size: 0;
        display: block;
        img {
          display: block;
          width: @header-height - 5px;
          height: @header-height - 10px;
        }
      }
      span {
        color: #fff;
        font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
      }
      &:hover {
        background-color: @active-background-color;
      }
    }
  }

  .v-avatar-area {
    display: inline-block;
    width: @header-height - 10px;
    height: @header-height - 10px;
    border-radius: 50%;
    & + span {
      color: #fff;
    }
  }
</style>
