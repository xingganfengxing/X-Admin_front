<!--  悬浮球组件 -->
<template>
  <div class="fixed-float-ball" :style="positionStyles">
    <label @click="skip" :title="title" :style="ballStyles">
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
      title: {
        type: String,
        default: ''
      },
      position: {
        type: String,
        default: 'right-bottom'
      },
      distance: {
        type: String,
        default: '30px'
      },
      backgroundColor: {
        type: String,
        default: '#409eff'
      },
      color: {
        type: String,
        default: '#fff'
      },
      link: Object
    },
    computed: {
      /**
       * 计算圆球样式
       *
       * @returns {{}}
       */
      ballStyles() {
        const styles = {};
        styles['background-color'] = this.backgroundColor;
        styles['color'] = this.color;
        return styles;
      },
      /**
       * 计算位置样式
       *
       * @returns {{}}
       */
      positionStyles() {
        const styles = {};
        let pArray = this.position.split('-');
        styles[pArray[0]] = this.distance;
        styles[pArray[1]] = this.distance;
        return styles;
      }
    },
    methods: {
      skip() {
        if (this.link) {
          let path = this.link['path'];
          let replace = this.link['replace'];
          console.log(replace)
          if (replace) {
            this.$router.replace({ path : path });
          } else {
            this.$router.push({ path: path });
          }
        }
        !this.link && this.$emit('on-click');
      }
    },
    components: {}
  }
</script>

<style scoped lang="less" type="text/less" rel="stylesheet/less">
  @import "../../common/styles/index";

  @ball-size: 50px;

  .fixed-float-ball {
    position: fixed;
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
