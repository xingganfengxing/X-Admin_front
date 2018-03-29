<template>
  <v-main>
    <template slot="main">
      <router-view></router-view>
    </template>
  </v-main>
</template>

<script type="text/ecmascript-6">
  import VMain from '../../components/v_main/v_main'

  let COMPONENT_NAME = 'index';
  export default {
    name: COMPONENT_NAME,
    components: {
      VMain
    }
  }
</script>

<style lang="less" type="text/less" rel="stylesheet/less">
  @import "../../common/styles/index";

  .left-wrapper, .right-wrapper {
    height: calc(~"100vh - (@{breadcrumb-bottom-padding} * 3 + @{breadcrumb-height} + @{header-height})");
  }
</style>
