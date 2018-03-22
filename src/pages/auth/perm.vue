<template>
  <v-search />
</template>

<script type="text/ecmascript-6">
  import VSearch from '../../components/v_search/v_search'

  let COMPONENT_NAME = 'perm';
  export default {
    name: COMPONENT_NAME,
    components: {
      VSearch
    }
  }
</script>

<style lang="less" type="text/less" rel="stylesheet/less">
  @import "../../common/styles/index";

</style>
