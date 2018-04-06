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
          <v-box title="资源列表" :is-show-footer="true" :is-show-refresh="true" @on-refresh-click="pageInit">
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
                  :filters="[{ text: 'all', value: 'all' }, { text: 'post', value: 'post' }, { text: 'get', value: 'get' }, { text: 'delete', value: 'delete' }, { text: 'put', value: 'put' }]"
                  :filter-method="filterType">
                  <template slot-scope="scope">
                    <el-tag
                      :type="scope.row.type === 'all' ? '' : scope.row.type === 'post' ? 'success' : scope.row.type === 'get' ? 'info' : scope.row.type === 'delete' ? 'warning' : 'danger'"
                      close-transition>{{ scope.row.type }}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="资源名"
                  align="center"
                  sortable>
                </el-table-column>
                <el-table-column
                  prop="path"
                  label="资源路径"
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
      <el-col :span="7">
        <div class="right-wrapper">
          <div>
            <v-box title="允许角色列表" :header-bg-color="defaultColors[1]" :is-show-add="true" @on-add-click="addRoleDialogFormVisible = true;addRoleForm.region = '';">
              <template slot="main">
                <el-table
                  :data="currentRoles"
                  border
                  height="100%"
                  :show-header="false"
                  size="mini">
                  <el-table-column
                    prop="id"
                    label="编号"
                    align="center"
                    sortable>
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="角色名"
                    align="center"
                    sortable>
                  </el-table-column>
                  <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                      <el-button
                        size="small"
                        type="danger"
                        title="移除角色"
                        @click="roleRemove(scope.$index, scope.row)">
                        移除角色
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </template>
            </v-box>
          </div>
          <div>
            <v-box title="允许权限列表" :header-bg-color="defaultColors[2]">
              <template slot="main">
                <el-table
                  :data="currentPerms"
                  border
                  height="100%"
                  :show-header="false"
                  size="mini">
                  <el-table-column
                    prop="id"
                    label="编号"
                    align="center"
                    sortable>
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="权限名"
                    align="center"
                    sortable>
                  </el-table-column>
                </el-table>
              </template>
            </v-box>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-dialog title="添加角色" :visible.sync="addRoleDialogFormVisible" width="30%" center>
      <el-form :model="addRoleForm" :inline="true" style="text-align: center;">
        <el-form-item label="角色列表">
          <el-select v-model="addRoleForm.region" placeholder="请选择角色">
            <el-option v-for="item in roles" :key="item.index" :label="item.name" :value="item.id" ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="roleAdd">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
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
        tableData: [],
        currentPage: 1,
        currentRow: {},
        currentRoles:[],
        currentPerms: [],
        pageInfo: {},
        addRoleDialogFormVisible: false,
        roles: [],
        addRoleForm: {
          region: ''
        },
        defaultColors: constants.DEFAULT_COLORS
      }
    },
    created() {
      this.$nextTick(() => {
        this.pageInit();
      });
    },
    methods: {
      pageInit() {
        this.getAllPageInfo();
        this.loadRoles();
      },
      getAllPageInfo() {
        this.$http.get("/resource/getPage").then((result) => {
          this.pageInfo = result;
          this.getAll(this.currentPage, this.pageInfo.size);
        }).catch(() => {
          this.$message.error('加载分页数据错误!');
        });
      },
      getAll(current, size) {
        this.$http.get("/resource/getAll", {
          params: {
            current: current,
            size: size
          }
        }).then((result) => {
          this.tableData = result;
          if (this.tableData.length !== 0) {
            this.currentRow = this.tableData[0];
            this.getRolesAndPerms();
          }
        }).catch(() => {
          this.$message.error('加载数据错误!');
        });
      },
      loadRoles() {
        this.$http.get("/role/getList", {
          params: {
            type: 1
          }
        }).then((result) => {
          this.roles = result;
        }).catch(() => {
          this.$message.error('加载角色列表错误!');
        });
      },
      getRolesAndPerms() {
        this.$http.get("/resource/getInfoRoleAndPerm", {
          params: {
            resourceId: this.currentRow.id
          }
        }).then((result) => {
          this.currentRoles = result.roleList;
          this.currentPerms = result.permList;
        }).catch(() => {
          this.$message.error('加载资源角色和权限列表错误!');
        });
      },
      rowClick(row, event) {
        this.currentRow = row;
        this.getRolesAndPerms();
      },
      filterType(value, row) {
        return row.type === value;
      },
      roleAdd() {
        if (this.addRoleForm.region !== '') {
          this.$http.put("/resource/addRoleOrPerm", {
            data: {
              resourceId: this.currentRow.id,
              roleId: this.addRoleForm.region
            }
          }).then((result) => {
            if (result) {
              this.$message({type: 'success', message: '添加成功!'});
              this.getRolesAndPerms();
            } else {
              this.$message({type: 'error', message: '添加失败!'});
            }
          });
        }
        this.addRoleDialogFormVisible = false;
      },
      roleRemove(index, row) {
        this.$confirm('你确定删除资源' + this.currentRow.name + '的"' + row.name + '"角色吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.delete("/resource/removeRoleOrPerm", {
            data: {
              userId: this.currentRow.id,
              roleId: row.id
            }
          }).then((result) => {
            if (result) {
              this.$message({type: 'success', message: '删除成功!'});
              this.getRolesAndPerms();
            } else {
              this.$message({type: 'error', message: '删除失败!'});
            }
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
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
