<template>
  <div style="height: 100%;">
    <el-header height="30%" class="v-header-area">
      <router-link :to="{ path: '/' }">
        <img src="../common/img/logo.png">
      </router-link>
      <h3>X-Admin后台管理系统</h3>
    </el-header>

    <el-main class="v-main-area">
      <el-button type="primary" round @click="projectDetail">详情介绍</el-button>
      <el-button type="primary" round @click="skipLoginPage">前往登录</el-button>
      <el-button type="primary" round @click="skipRegisterPage">前往注册</el-button>
    </el-main>

  </div>
</template>

<script type="text/ecmascript-6">
    export default {
      methods: {
        projectDetail() {
          this.$alert('本项目是为了快速开发中小型后台管理系统而提供的模板，' +
            '提供后台管理系统需要的基本功能，后期会考虑提供自动生成个性化配置。' +
            '目前项目尚在开发过程中，预计耗时3个月左右，欢迎小伙伴进行交流学习...',
            '项目介绍', {
            center: true
          }).then(() => {
          }).catch(() => {

          });
        },
        skipLoginPage() {
          this.$router.push({ path: '/login' });
        },
        skipRegisterPage() {
          this.$router.push({ path: '/register' });
        }
      }
    }
</script>

<style scoped lang="less" type="text/less" rel="stylesheet/less">
  @import "../common/styles/index";

  .v-header-area {
    height: 100%;
    width: 100%;
    display: flex;
    padding: 40px 20px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    a {
      display: block;
      font-size: 0;
    }
    h3 {
      text-align: center;
      font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
      margin-top: 10px;
      font-size: 25px;
      letter-spacing: 2px;
      color: @theme-color;
    }
  }

  .v-main-area {
    text-align: center;
  }
</style>
