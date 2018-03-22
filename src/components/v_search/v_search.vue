<!-- 定制搜索组件 -->
<template>
  <div class="v-search">
    <label class="v-search-icon-container">
      <i class="el-icon-search"></i>
    </label>
    <div v-if="isShowInput" class="v-search-input-container">
      <label for="searchInput" class="v-search-input-label">
        <input id="searchInput" name="searchInput" v-model="value" class="v-search-input" />
        <i class="el-icon-back"></i>
      </label>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const COMPONENT_NAME = 'v_search';
  export default {
    name: COMPONENT_NAME,
    data() {
      return {
        value: '',
        isShowInput: true
      }
    },
    components: {

    },
    computed: {

    },
    props: {
    }
  }
</script>

<style scoped lang="less" type="text/less" rel="stylesheet/less">
  @import "../../common/styles/index";

  .v-search {

  }
</style>
