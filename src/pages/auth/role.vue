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
          <v-box title="角色列表" :is-show-footer="true" :header-bg-color="defaultColors[1]" :is-show-add="true" :is-show-refresh="true" @on-refresh-click="" @on-add-click="">
            <template slot="main">
              <el-table
                :data="tableData"
                border
                size="medium"
                :highlight-current-row="true"
                @row-click="rowClick"
                ref="table">
                <el-table-column
                  prop="id"
                  label="编号"
                  align="center"
                  sortable>
                </el-table-column>
                <el-table-column
                  prop="type"
                  label="类型"
                  align="center"
                  :filters="[{ text: '一级', value: '一级' }, { text: '二级', value: '二级' }]"
                  :filter-method="filterType">
                  <template slot-scope="scope">
                    <el-tag
                      :type="scope.row.type === '一级' ? 'info' : 'warning'"
                      close-transition>{{ scope.row.type }}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="角色名"
                  align="center"
                  sortable>
                </el-table-column>
                <el-table-column
                  prop="desc"
                  label="描述信息"
                  align="center"
                  sortable>
                </el-table-column>
              </el-table>
            </template>
            <template slot="footer">
              <el-pagination
                background
                layout="prev, pager, next"
                :total="pageInfo.total"
                :page-size="pageInfo.size"
                :current-page.sync="currentPage"
                @current-change="getAll(currentPage, pageInfo.size)"
                style="padding: 0">
              </el-pagination>
            </template>
          </v-box>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
  import VAuthTree from '../../components/v_auth_tree/v_auth_tree'
  import VBox from '../../components/v_box/v_box'
  import * as constants from '../../common/js/global_constants'

  let COMPONENT_NAME = 'role';
  export default {
    name: COMPONENT_NAME,
    data() {
      return {
        tableData: [],
        currentPage: 1,
        pageInfo: {},
        defaultColors: constants.DEFAULT_COLORS
      }
    },
    methods: {
      rowClick() {

      },
      filterType(value, row) {
        return row.type === value;
      },
      getAll(current, size) {

      }
    },
    components: {
      VAuthTree,
      VBox
    }
  }
</script>

<style lang="less" type="text/less" rel="stylesheet/less">
  @import "../../common/styles/index";

</style>
