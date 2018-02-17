<template>
  <div class="header-area">
    <div class="header-logo-area">
      <router-link :to="{ path: '/' }">
        <img src="../../common/img/logo.png" />
      </router-link>
      <span>X-Admin后台管理系统</span>
    </div>

    <el-menu
      default-active="1"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b" style="float: right;">
      <el-menu-item index="1">人员管理</el-menu-item>
      <el-menu-item index="2">任务调度</el-menu-item>
      <el-submenu index="3">
        <template slot="title">
          <img src="../../common/img/avatar.png" class="avatar-area" />
          <span>管理员</span>
        </template>
        <el-menu-item index="3-1">修改信息</el-menu-item>
        <el-menu-item index="3-2">退出登录</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script type="text/ecmascript-6">
  const COMPONENT_NAME = 'v_header';

  export default {
    name: COMPONENT_NAME,
    data() {
      return {

      }
    },
    methods: {}
  }
</script>

<style scoped lang="less" type="text/less" rel="stylesheet/less">
  @import "../../common/styles/index";

  .header-area {
    display: flex;
    justify-content: space-between;
    background-color: #545c64;
    height: @header-height;
    .header-logo-area {
      display: flex;
      justify-content: center;
      align-items: center;
      a {
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
      }
    }
  }

  .avatar-area {
    display: inline-block;
    width: @header-height - 10px;
    height: @header-height - 10px;
  }
</style>
