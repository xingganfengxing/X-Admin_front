<!--  悬浮球组件 -->
<template>
  <div class="fixed-float-ball">
    <label @click="skip" :title="hoverTitle" :style="{'background-color' : backgroundColor, 'color' : fontColor}">
      <slot name="icon">
        <i class="el-icon-arrow-right"></i>
      </slot>
    </label>
  </div>
</template>

<script type="text/ecmascript-6">
  const COMPONENT_NAME = 'v_float_ball';
  const POSITION_ARRAY = ['right-top', 'right-bottom', 'left-top', 'left-bottom'];

  export default {
    name: COMPONENT_NAME,
    data() {
        return {}
    },
    props: {
      hoverTitle: {
        type: String,
        default: ''
      },
      position: {
        type: Array,
        validator: function (val) {
          return POSITION_ARRAY[val];
        }
      },
      backgroundColor: String,
      fontColor: String,
      isLink: {
        type: Boolean,
        default: true
      }
    },
    computed: {

    },
    methods: {
      skip() {
        this.$emit('on-click');
      }
    },
    components: {}
  }
</script>

<style scoped lang="less" type="text/less" rel="stylesheet/less">
  @import "../../common/styles/index";

  @ball-size: 50px;
  @ball-position: 30px;

  .fixed-float-ball {
    position: fixed;
    bottom: @ball-position;
    right: @ball-position;
    label {
      display: block;
      width: @ball-size;
      height: @ball-size;
      border-radius: 50%;
      background-color: @theme-color;
      color: @font-color;
      text-align: center;
      line-height: @ball-size;
      cursor: pointer;
    }
  }
</style>
