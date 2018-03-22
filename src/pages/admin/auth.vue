<template>
  <div>
    <div class="v-breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>管理员管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/user/list' }">权限分配</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-row :gutter="20">
      <el-col :span="17">
        <div class="left-wrapper">
          <v-box title="管理员列表信息">
            <template slot="main">
              <el-table
                :data="tableData"
                border
                size="medium"
                :highlight-current-row="true"
                @row-click="rowClick"
                ref="table">
                <el-table-column
                  prop="name"
                  label="管理员名"
                  align="center"
                  sortable>
                </el-table-column>
                <el-table-column
                  prop="type"
                  label="类型"
                  align="center"
                  :filters="[{ text: '一级', value: '一级' }, { text: '二级', value: '二级' }, { text: '三级', value: '三级' }]"
                  :filter-method="filterType">
                  <template slot-scope="scope">
                    <el-tag
                      :type="scope.row.type === '一级' ? 'info' : scope.row.type === '二级' ? 'warning' : 'success'"
                      close-transition>{{ scope.row.type }}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="status"
                  label="状态"
                  align="center"
                  :filters="[{ text: '正常', value: '正常' }, { text: '无效', value: '无效' }]"
                  :filter-method="filterStatus">
                  <template slot-scope="scope">
                    <el-tag
                      :type="scope.row.status === '正常' ? 'success' : 'danger'"
                      close-transition>{{ scope.row.status }}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="lastLoginTime"
                  label="最近登录时间"
                  align="center"
                  sortable>
                </el-table-column>
              </el-table>
              <el-row>
                <el-col>
                  <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="pageInfo.total"
                    :page-size="pageInfo.size"
                    :current-page.sync="currentPage"
                    @current-change="getAll(currentPage, pageInfo.size)"
                    style="text-align: center;padding-top: 20px">
                  </el-pagination>
                </el-col>
              </el-row>
            </template>
          </v-box>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="right-wrapper">
          <div>
            <v-box :title="currentRow.name + '角色列表'" header-bg-color="#67C23A" :is-show-add="true" @on-add-click="addRoleDialogFormVisible = true;addRoleForm.region = '';">
              <template slot="main">
                <el-table
                  :data="currentRoles"
                  border
                  height="100%"
                  :show-header="false"
                  size="mini">
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
                        title="删除角色"
                        @click="roleRemove(scope.$index, scope.row)">
                        <i class="el-icon-remove-outline"></i>
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </template>
            </v-box>
          </div>
          <div>
            <v-box :title="currentRow.name + '权限列表'" header-bg-color="#E6A23C">
              <template slot="main">
                <el-table
                  :data="currentPerms"
                  border
                  height="100%"
                  :show-header="false"
                  size="mini">
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
          <div>
            <v-box :title="currentRow.name + '资源列表'" header-bg-color="#909399">
              <template slot="main">
                <el-table
                  :data="currentResources"
                  border
                  height="100%"
                  :show-header="false"
                  size="medium">
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
  import VMain from '../../components/v_main/v_main'
  import VBox from '../../components/v_box/v_box'

  const COMPONENT_NAME = 'auth';
  export default {
    name: COMPONENT_NAME,
    data() {
      return {
        tableData: [],
        currentPage: 1,
        pageInfo: {},
        currentRow: {},
        currentRoles: [],
        currentPerms: [],
        currentResources: [],
        addRoleDialogFormVisible: false,
        roles: [],
        addRoleForm: {
          region: ''
        }
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
      loadRoles() {
        this.$http.get("/role/getList", {
          params: {
            type: 2
          }
        }).then((result) => {
          this.roles = result;
        }).catch(() => {
          this.$message.error('加载角色列表错误!');
        });
      },
      getAllPageInfo() {
        this.$http.get("/admin/getPage").then((result) => {
          this.pageInfo = result;
          this.getAll(this.currentPage, this.pageInfo.size);
        }).catch(() => {
          this.$message.error('加载分页数据错误!');
        });
      },
      getAll(current, size) {
        this.$http.get("/user/getAll", {
          params: {
            current: current,
            size: size
          }
        }).then((result) => {
          this.tableData = result;
          if (this.tableData.length !== 0) {
            this.currentRow = this.tableData[0];
            this.updateRolePermResource();
          }
        }).catch(() => {
          this.$message.error('加载数据错误!');
        });
      },
      rowClick(row, event) {
        this.currentRow = row;
        // 请求相关角色、权限、资源
        this.roleRequest(row);
        this.permRequest(row);
        this.resourceRequest(row);
      },
      filterType(value, row) {
        return row.type === value;
      },
      filterStatus(value, row) {
        return row.status === value;
      },
      roleAdd(){
        if (this.addRoleForm.region !== '') {
          this.$http.put("/admin/addRole", {
            data: {
              userId: this.currentRow.id,
              roleId: this.addRoleForm.region
            }
          }).then((result) => {
            if (result) {
              this.$message({type: 'success', message: '添加成功!'});
              this.updateRolePermResource();
            } else {
              this.$message({type: 'error', message: '添加失败!'});
            }
          });
        }
        this.addRoleDialogFormVisible = false;
      },
      roleRemove(index, row) {
        this.$confirm('你确定删除管理员' + this.currentRow.name + '的"' + row.name + '"角色吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.delete("/admin/removeRole", {
            data: {
              userId: this.currentRow.id,
              roleId: row.id
            }
          }).then((result) => {
            if (result) {
              this.$message({type: 'success', message: '删除成功!'});
              // this.currentRoles.splice(index, 1);
              this.updateRolePermResource();
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

      },
      updateRolePermResource() {
        this.roleRequest(this.currentRow);
        this.permRequest(this.currentRow);
        this.resourceRequest(this.currentRow);
      },
      roleRequest(row) {
        this.$http.get("/admin/getRoles", {
          params: {
            id: row.id
          }
        }).then((result) => {
          this.currentRoles = result;
        }).catch(() => {
          this.$message.error('加载角色数据错误!');
        });
      },
      permRequest(row) {
        this.$http.get("/admin/getPerms", {
          params: {
            id: row.id
          }
        }).then((result) => {
          this.currentPerms = result;
        }).catch(() => {
          this.$message.error('加载权限数据错误!');
        });
      },
      resourceRequest(row) {
        this.$http.get("/admin/getResources", {
          params: {
            id: row.id
          }
        }).then((result) => {
          this.currentResources = result;
        }).catch(() => {
          this.$message.error('加载资源数据错误!');
        });
      },
    },
    components: {
      VMain,
      VBox
    }
  }
</script>

<style scoped lang="less" type="text/less" rel="stylesheet/less">
  @import "../../common/styles/index";

  .left-wrapper, .right-wrapper {
    height: calc(~"100vh - (@{breadcrumb-bottom-padding} * 3 + @{breadcrumb-height} + @{header-height})");
  }
  .right-wrapper {
    margin-top: -10px;
    margin-bottom: -10px;
  }
  .right-wrapper > div {
    height: calc(~"(100% - 40px) / 3");
    padding-top: 10px;
    padding-bottom: 10px;
  }
</style>
