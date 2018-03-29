<!-- 定制搜索组件 -->
<template>
  <div class="v-search">
    <label class="v-search-icon-prefix">
      <i class="el-icon-search"></i>
    </label>
    <div v-if="isShowInput" class="v-search-input-container">
      <label>
        <input name="searchInput" :placeholder="placeholder" v-model="currentValue" @keyup.enter="enter" class="v-search-input"/>
      </label>
    </div>
    <label class="v-search-icon-suffix">
      <i class="el-icon-circle-close" @click="clean" title="清空"></i>
    </label>
  </div>
</template>

<script type="text/ecmascript-6">
  const COMPONENT_NAME = 'v_search';
  export default {
    name: COMPONENT_NAME,
    data() {
      return {
        currentValue: '',
        isShowInput: true
      }
    },
    components: {

    },
    computed: {
    },
    props: {
      placeholder: {
        type: String,
        default: '按“enter”键过滤信息哟~~~'
      }
    },
    methods: {
      clean() {
        this.currentValue = '';
        this.$emit('on-clean');
      },
      enter() {
        this.currentValue !== '' && this.$emit('on-enter', this.currentValue);
        this.currentValue = '';
      }
    }
  }
</script>

<style scoped lang="less" type="text/less" rel="stylesheet/less">
  @import "../../common/styles/index";

  @search-height: 40px;
  @search-icon-width: 40px;

  .v-search {
    border: 1px solid #409EFF;
    border-radius: 20px;
    overflow: hidden;
    height: @search-height;
    display: flex;
    justify-content: center;
    align-content: center;

    .v-search-icon-prefix, .v-search-icon-suffix {
      display: inline-block;
      width: @search-icon-width;
      height: @search-height;
      box-sizing: border-box;
      text-align: center;
      i {
        line-height: @search-icon-width;
        font-size: 25px;
        color: #409EFF;
      }
    }
    .v-search-icon-suffix i {
      color: #333;
      cursor: pointer;
    }

    .v-search-input-container {
      box-sizing: border-box;
      display: inline-block;
      width: calc(~"100% - (@{search-icon-width} * 2)");
      .v-search-input {
        display: inline-block;
        width: 100%;
        height: @search-height;
        outline: none;
        font-size: @search-height / 2.5;
      }
    }
  }
</style>
