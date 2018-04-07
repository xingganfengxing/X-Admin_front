<!-- 定制右键弹出组件 -->
<template>
  <div class="v-context-menu-container" :style="styles">
    <v-menu-item/>
  </div>
</template>

<script type="text/ecmascript-6">
  import VMenuItem from './v_menu_item/v_menu_item'

  const COMPONENT_NAME = 'v_context_menu';
  export default {
    name: COMPONENT_NAME,
    data() {
      return {

      }
    },
    computed: {
      styles() {
        let styles = {};
        styles['position'] = 'fixed';
        styles['top'] = this.y + 'px';
        styles['left'] = this.x + 'px';
        return styles;
      }
    },
    methods: {

    },
    props: {
      x: {
        type: Number,
        default: 0
      },
      y: {
        type: Number,
        default: 0
      }
    },
    components: {
      VMenuItem
    }
  }
</script>

<style scoped lang="less" type="text/less" rel="stylesheet/less">
  @import "../../common/styles/index";

  .v-context-menu-container {
    background-color: #fff;
    border: 1px solid #BABABA;
    padding: 5px 0;
    overflow: hidden;
    width: 200px;
    box-shadow: 2px 2px 5px 0 rgba(0, 0, 0, .6);
  }

</style>
