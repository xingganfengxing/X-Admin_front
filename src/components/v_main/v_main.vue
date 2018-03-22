<!-- 主要内容组件 -->
<template>
  <el-container direction="vertical">
    <el-header class="v-header-area">
      <v-header/>
    </el-header>
    <el-container class="v-content-area">
      <el-aside :width="asideWidth" class="v-aside-area">
        <v-aside/>
      </el-aside>
      <el-main class="v-main-area">
        <slot name="main"/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex'
  import VHeader from '../../components/v_header/v_header'
  import VAside from '../../components/v_aside/v_aside'
  const COMPONENT_NAME = 'v_main';

  export default {
    name: COMPONENT_NAME,
    data() {
      return {

      }
    },
    components: {
      VHeader,
      VAside
    },
    computed: {
      ...mapGetters(['asideWidth'])
    },
    props: {
      navNameItems: Array
    }
  }
</script>

<style lang="less" type="text/less" rel="stylesheet/less">
  @import "../../common/styles/index";

  .v-header-area {
    padding: 0;
  }

  .v-content-area {
    height: calc(~"100vh - @{header-height}");
    .v-aside-area {
      background-color: @background-color;
    }
    .v-main-area {
      background-color: #fffff4;
      .v-breadcrumb {
        padding-bottom: @breadcrumb-bottom-padding;
      }
    }
  }
</style>
