<!-- 定制盒子组件 -->
<template>
  <div class="v-box-area box-shadow">
    <div class="v-box-header" :style="headerStyles">
      <span class="v-box-header-title" v-text="title"></span>
      <el-badge class="v-box-header-badge" v-if="isShowBadge" :value="badgeValue" ></el-badge>
      <div class="v-box-header-icon-wrapper">
        <label v-if="isShowAdd"  class="v-box-header-icon">
          <i @click="clickAdd" class="el-icon-circle-plus-outline" title="添加"></i>
        </label>
        <label v-if="isShowRefresh"  class="v-box-header-icon">
          <i @click="clickRefresh" class="el-icon-refresh" title="刷新"></i>
        </label>
      </div>
    </div>
    <div :class="['v-box-main', isShowFooter ? 'v-box-main_1' : 'v-box-main_2']">
      <slot name="main">
      </slot>
    </div>

    <div v-show="isShowFooter" class="v-box-footer">
      <slot name="footer">
      </slot>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const COMPONENT_NAME = 'v_box';
  export default {
    name: COMPONENT_NAME,
    data() {
      return {

      }
    },
    computed: {
      headerStyles() {
        let styles = {};
        if (this.isRandomColor) {
          styles['background-color'] = this.getRandomColor2();
        } else {
          styles['background-color'] = this.headerBgColor;
        }
        return styles;
      }
    },
    methods: {
      /**
       * 方法暂废弃
       *
       * @returns {string}
       */
      getRandomColor1(){
        return "#" + ("00000" + ((Math.random() * 16777215 + 0.5) >> 0).toString(16)).slice(-6);
      },
      getRandomColor2(){
        let colorArrays = ['#409EFF', '#67C23A', '#E6A23C', '#F56C6C', '#909399'];
        return colorArrays[Math.floor(Math.random() * colorArrays.length)];
      },
      clickAdd() {
        this.isShowAdd && this.$emit('on-add-click');
      },
      clickRefresh () {
        this.isShowRefresh && this.$emit('on-refresh-click');
      }
    },
    props: {
      title: {
        type: String,
        default: ''
      },
      headerBgColor: {
        type: String,
        default: '#409EFF'
      },
      isRandomColor: {
        type: Boolean,
        default: false
      },
      isShowBadge: {
        type: Boolean,
        default: false
      },
      badgeValue: {
        type: String,
        default: '0'
      },
      isShowAdd: {
        type: Boolean,
        default: false
      },
      isShowRefresh: {
        type: Boolean,
        default: false
      },
      isShowFooter: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style scoped lang="less" type="text/less" rel="stylesheet/less">
  @import "../../common/styles/index";

  @box-header-height: 40px;
  @box-border-radius: 10px;
  @box-footer-height: 50px;

  .v-box-area {
    width: 100%;
    height: 100%;
    background-color: #fff;
    border-radius: @box-border-radius;
    overflow: hidden;
    position: relative;
  }
  .v-box-header {
    position: relative;
    height: @box-header-height;
    line-height: @box-header-height;
    border-top-left-radius: @box-border-radius;
    border-top-right-radius: @box-border-radius;
    text-align: center;
    .v-box-header-title {
      color: #fff;
      font-size: 16px;
    }
    .v-box-header-badge {
      position: relative;
      top: -10px;
      left: -5px;
    }

    .v-box-header-icon-wrapper {
      position: absolute;
      height: @box-header-height;
      top: 0;
      right: 10px;
    }
    .v-box-header-icon {
      float: right;
      height: @box-header-height;
      padding-top: 3px;
      i {
        cursor: pointer;
        padding: 5px;
        color: #fff;
        font-size: 25px;
      }
    }
  }

  .v-box-main {
    border-bottom-left-radius: @box-border-radius;
    border-bottom-right-radius: @box-border-radius;
    background-color: #fff;
    overflow: hidden;
  }

  .v-box-main_1 {
    height: calc(~"100% - (@{box-header-height} + @{box-footer-height})");
  }

  .v-box-main_2 {
    height: calc(~"100% - (@{box-header-height})");
  }

  .v-box-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: @box-footer-height;
    background-color: #fff;
    line-height: @box-footer-height;
    text-align: center;
  }
</style>
