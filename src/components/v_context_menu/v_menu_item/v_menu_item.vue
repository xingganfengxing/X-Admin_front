<!-- 定制右键菜单弹出项 -->
<template>
  <div class="v-menu-item">
    <label v-if="isShowIcon" class="v-menu-item-icon">
      <slot name="icon">
        <i class="el-icon-menu"></i>
      </slot>
    </label>

    <div class="v-menu-item-title" v-text="title"></div>

    <label class="v-menu-item-label" v-text="label"></label>
  </div>
</template>

<script type="text/ecmascript-6">
  const COMPONENT_NAME = 'v_menu_item';
  export default {
    name: COMPONENT_NAME,
    data() {
      return {

      }
    },
    computed: {

    },
    methods: {

    },
    props: {
      isShowIcon: {
        type: Boolean,
        default: true
      },
      disabled: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: '测试文字'
      },
      label: {
        type: String,
        default: '描述信息'
      }
    }
  }
</script>

<style scoped lang="less" type="text/less" rel="stylesheet/less">
  @import "../../../common/styles/index";

  @menu-item-height: 25px;

  .v-menu-item {
    width: 100%;
    display: flex;
    flex-grow: 1;
    padding: 0 5px;

    &:hover {
      background-color: #F0F0F0;
    }
    .v-menu-item-icon {
      height: @menu-item-height;
      line-height: @menu-item-height;
      text-align: center;
      font-size: 20px;
      flex-grow: 1;
      i {
        width: 20px;
        height: 20px;
      }
    }
    .v-menu-item-title {
      text-align: center;
      font-size: 14px;
      height: @menu-item-height;
      line-height: @menu-item-height;
      flex-grow: 2;
    }

    .v-menu-item-label {
      color: #A1A192;
      flex-grow: 10;
      text-align: center;
      font-size: 14px;
      height: @menu-item-height;
      line-height: @menu-item-height;

    }
  }
</style>
