<template>
  <el-container>
    <el-header style="padding: 0">
      <v-header></v-header>
    </el-header>
    <div class="content-area">
      <el-aside>
        <v-aside></v-aside>
      </el-aside>

      <el-main style="background-color: #000"></el-main>
    </div>

  </el-container>
</template>

<script type="text/ecmascript-6">
  import VHeader from '../../components/v_header/v_header'
  import VAside from '../../components/v_aside/v_aside'

  export default {
    data() {
      return {

      }
    },
    methods: {

    },
    components: {
      VHeader,
      VAside
    }
  }
</script>

<style scoped lang="less" type="text/less" rel="stylesheet/less">
  .content-area {
    display: inline-flex;
  }
</style>
