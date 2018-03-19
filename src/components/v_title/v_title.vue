<!-- 定制标题组件 -->
<template>
  <div class="v-title-outer-area">
    <div class="v-title-inner-area clear">
      <span class="v-title" v-text="title"></span>
      <div class="v-buttons-area">
        <slot name="buttons">
          <el-button
            size="small"
            type="success">按钮1</el-button>
          <el-button
            size="small"
            type="warning">按钮2</el-button>
          <el-button
            size="small"
            type="danger">按钮3</el-button>
        </slot>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const COMPONENT_NAME = 'v_title';
  export default {
    name: COMPONENT_NAME,
    data() {
      return {

      }
    },
    components: {
    },
    computed: {
    },
    props: {
      title: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style scoped lang="less" type="text/less" rel="stylesheet/less">
  @import "../../common/styles/index";

  .v-title-outer-area {
    padding: 10px 20px 10px 20px;
  }
  .v-title {
    line-height: 32px;
    font-size: 18px;
  }
  .v-title-inner-area {
    padding: 10px 10px 10px 20px;
    border-left: 4px solid #3a8ee6;
    background-color: #fff;
  }
  .v-buttons-area {
    float: right;
  }
</style>
