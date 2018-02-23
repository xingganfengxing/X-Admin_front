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
      default-active="1"
      mode="horizontal"
      background-color="#545c64"
      active-text-color="#409eff"
      text-color="#fff"
      style="float: right;">
      <el-submenu index="1">
        <template slot="title">
          <img src="../../common/img/avatar.png" class="v-avatar-area" />
          <span v-text="loginInfo.name"></span>
        </template>
        <el-menu-item index="3-1" @click="update">修改信息</el-menu-item>
        <el-menu-item index="3-2" @click="exit">退出登录</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapGetters } from 'vuex'
  import Lockr from 'lockr'
  const COMPONENT_NAME = 'v_header';

  export default {
    name: COMPONENT_NAME,
    data() {
      return {

      }
    },
    methods: {
      update() {

      },
      exit() {
        Lockr.flush();
        this.$router.replace({ path: '/login' })
      }
    },
    computed: {
      ...mapGetters(['loginInfo'])
    }
  }
</script>

<style scoped lang="less" type="text/less" rel="stylesheet/less">
  @import "../../common/styles/index";

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
    & + span {
      color: #fff;
    }
  }
</style>
