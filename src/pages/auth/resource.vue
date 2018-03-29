<template>
  <div>
    <div class="v-breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/auth/perm' }">资源配置</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-row :gutter="20">
      <el-col :span="17">
        <div class="left-wrapper">
          <v-box title="资源列表">
          </v-box>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="right-wrapper">
          <div>
            <v-box title="允许角色列表" :header-bg-color="defaultColors[1]" :is-show-add="true" @on-add-click="">

            </v-box>
          </div>
          <div>
            <v-box title="允许权限列表" :header-bg-color="defaultColors[2]" :is-show-add="true" @on-add-click="">

            </v-box>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
  import VBox from '../../components/v_box/v_box'
  import * as constants from '../../common/js/global_constants'

  let COMPONENT_NAME = 'resource';
  export default {
    name: COMPONENT_NAME,
    data() {
      return {
        defaultColors: constants.DEFAULT_COLORS
      }
    },
    components: {
      VBox
    }
  }
</script>

<style scoped lang="less" type="text/less" rel="stylesheet/less">
  @import "../../common/styles/index";

  .right-wrapper {
    margin-top: -10px;
    margin-bottom: -10px;
  }

  .right-wrapper > div {
    height: calc(~"(100% - 20px) / 2");
    padding-top: 10px;
    padding-bottom: 10px;
  }
</style>
