<template>
  <div>
    <div class="v-breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/auth/perm' }">角色配置</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="left-wrapper">
          <v-auth-tree/>
        </div>
      </el-col>
      <el-col :span="18">
        <div class="right-wrapper">
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
  import VAuthTree from '../../components/v_auth_tree/v_auth_tree'

  let COMPONENT_NAME = 'role';
  export default {
    name: COMPONENT_NAME,
    components: {
      VAuthTree
    }
  }
</script>

<style lang="less" type="text/less" rel="stylesheet/less">
  @import "../../common/styles/index";

</style>
