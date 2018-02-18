<template>
  <el-container direction="vertical">
    <el-header class="header-area">
      <v-header></v-header>
    </el-header>
    <el-container class="content-area">
      <el-aside class="aside-area">
        <v-aside></v-aside>
      </el-aside>
      <el-main class="main-area">Main</el-main>
    </el-container>
  </el-container>
</template>

<script type="text/ecmascript-6">
  import VHeader from '../../components/v_header/v_header'
  import VAside from '../../components/v_aside/v_aside'

  export default {
    data() {
      return {

      }
    },
    methods: {

    },
    components: {
      VHeader,
      VAside
    }
  }
</script>

<style scoped lang="less" type="text/less" rel="stylesheet/less">
  @import "../../common/styles/index";

  .header-area {
    padding: 0;
  }

  .content-area {
    height: calc(~"100vh - @{header-height}");
    .aside-area {
      background-color: @background-color;
      width: 248px!important;
    }
  }
</style>
