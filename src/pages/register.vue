<template>
  <el-container>
    <el-header height="30%" class="v-header-area">
      <router-link :to="{ path: '/' }">
        <img src="../common/img/logo.png">
      </router-link>
      <h3>注册</h3>
    </el-header>
    <el-main>
    </el-main>

    <v-float-ball position="left-bottom" title="返回登录页面" :link="{path : '/login'}">
      <template slot="icon">
        <i class="el-icon-arrow-left"></i>
      </template>
    </v-float-ball>
  </el-container>
</template>

<script type="text/ecmascript-6">
  import VFloatBall from '../components/v_float_ball/v_float_ball'
  const COMPONENT_NAME = 'register';

  export default {
    name: COMPONENT_NAME,
    methods: {},
    components: {
      VFloatBall
    }
  }
</script>

<style scoped lang="less" type="text/less" rel="stylesheet/less">
  @import "../common/styles/index";

  @verify-code-input-width: 70%;
  @verify-code-input-height: 40px;
  @fixed-page-skip-size: 50px;

  .v-header-area {
    height: 100%;
    width: 100%;
    padding: 40px 20px;
    display: flex;
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

  .verify-code-input {
    width: @verify-code-input-width - 5%;
  }

  .verify-code-img {
    float: right;
    width: 100% - @verify-code-input-width;
    height: @verify-code-input-height;
    a {
      display: block;
      font-size: 0;
      height: 100%;
      width: 100%;
      img {
        display: block;
        height: 100%;
        width: 100%;
      }
    }
  }

  .fixed-float-ball {
    position: fixed;
    bottom: 30px;
    left: 30px;
    label {
      display: block;
      width: @fixed-page-skip-size;
      height: @fixed-page-skip-size;
      border-radius: 50%;
      background-color: @theme-color;
      color: #fff;
      text-align: center;
      line-height: @fixed-page-skip-size;
      cursor: pointer;
    }
  }

</style>
