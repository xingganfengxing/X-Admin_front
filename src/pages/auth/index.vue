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

<style scoped lang="less" type="text/less" rel="stylesheet/less">
  @import "../../common/styles/index";
</style>
