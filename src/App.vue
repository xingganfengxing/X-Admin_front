<template>
  <div id="app" class="clear" ref="app">
    <transition name="el-fade-in-linear">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {}
</script>

<style lang="less" type="text/less" rel="stylesheet/less">
  @import "common/styles/index";
  @import "common/css/style.css";

  #app {
    height: 100%;
  }
</style>
