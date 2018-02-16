<template>
  <div style="height: 100%;">
    <el-header height="30%">
      <div class="header-area">
        <router-link :to="{ path: '/' }">
          <img src="../../common/img/logo.png">
        </router-link>
        <h3>注册</h3>
      </div>
    </el-header>
    <el-main>
      <el-row type="flex">
        <el-col :span="9"></el-col>
        <el-col :span="6"></el-col>
      </el-row>
    </el-main>

    <div class="fixed-page-skip">
      <label @click="skipLoginPage" title="返回登录页面">
        <i class="el-icon-arrow-left"></i>
      </label>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    methods: {
      // 返回登录页面
      skipLoginPage() {
        this.$router.push({ path: '/login' });
      }
    }
  }
</script>

<style scoped lang="less" type="text/less" rel="stylesheet/less">
  @import "../../common/styles/index";

  @verify-code-input-width: 70%;
  @verify-code-input-height: 40px;
  @fixed-page-skip-size: 50px;

  .header-area {
    height: 100%;
    width: 100%;
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

  .fixed-page-skip {
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
