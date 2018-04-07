<template>
  <div>
    <div class="v-breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/auth/perm' }">权限配置</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="left-wrapper">
          <v-auth-tree ref="tree"/>
        </div>
      </el-col>
      <el-col :span="18">
        <div class="right-wrapper">
          <v-box title="权限列表" :is-show-footer="true" :header-bg-color="defaultColors[1]" :is-show-add="true" :is-show-refresh="true" @on-refresh-click="pageInit" @on-add-click="addDialogFormVisible = true">
            <template slot="main">
              <el-table
                :data="tableData"
                border
                size="medium"
                :highlight-current-row="true"
                @row-click="rowClick"
                @row-contextmenu="rowContextMenu"
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
                  :filters="[{ text: '用户权限', value: '1' }, { text: '管理员权限', value: '2' }]"
                  :filter-method="filterType">
                  <template slot-scope="scope">
                    <el-tag
                      :type="scope.row.type === '1' ? 'success' : 'danger'"
                      close-transition>{{ scope.row.type === '1' ? '用户权限' : scope.row.type === '2' ? '管理员权限' : ''}}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="权限名"
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
    <el-dialog title="添加权限" :visible.sync="addDialogFormVisible" width="30%" center>
      <el-form ref="addDialogForm" :model="addDialogForm" :rules="rules" label-position="right" label-width="80px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="addDialogForm.name"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-select v-model="addDialogForm.type" placeholder="请选择权限类型">
            <el-option label="用户权限" value="1"></el-option>
            <el-option label="管理员权限" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述信息" prop="desc">
          <el-input type="textarea" v-model="addDialogForm.desc" :rows="4" resize="none"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="add">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import VSearch from '../../components/v_search/v_search'
  import VAuthTree from '../../components/v_auth_tree/v_auth_tree'
  import VBox from '../../components/v_box/v_box'
  import * as constants from '../../common/js/global_constants'

  let COMPONENT_NAME = 'perm';
  export default {
    name: COMPONENT_NAME,
    data() {
      return {
        tableData: [],
        currentPage: 1,
        pageInfo: {},
        addDialogFormVisible: false,
        addItems: [],
        addDialogForm: {
          name: '',
          type: '',
          desc: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入权限名称', trigger: 'blur' },
            { max: 10, message: '最多可输入 10 个字符', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '请选择权限类型', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写描述信息', trigger: 'blur' },
            { max: 50, message: '最多可输入 50 个字符', trigger: 'blur' }
          ]
        },
        defaultColors: constants.DEFAULT_COLORS
      }
    },
    created() {
      this.$nextTick(() => {
        this.pageInit();
      })
    },
    methods: {
      pageInit() {
        this.getAllPageInfo();
      },
      getAllPageInfo() {
        this.$http.get("/perm/getPage").then((result) => {
          this.pageInfo = result;
          this.getAll(this.currentPage, this.pageInfo.size);
        }).catch(() => {
          this.$message.error('加载分页数据错误!');
        });
      },
      getAll(current, size) {
        this.$http.get("/perm/getAll", {
          params: {
            current: current,
            size: size
          }
        }).then((result) => {
          this.tableData = result;
        }).catch(() => {
          this.$message.error('加载数据错误!');
        });
      },
      rowClick(row, event, column) {
        this.$refs.tree.filterText(row.name);
      },
      filterType(value, row) {
        return row.type === value;
      },
      rowContextMenu(row, event) {
        console.log(event);
        // 阻止默认事件
        event.preventDefault();
      },
      add() {
        this.$refs.addDialogForm.validate((valid) => {
          if (valid) {
            this.$http.put("/perm/add", {
              data: {
                name: this.addDialogForm.name,
                type: this.addDialogForm.type,
                desc: this.addDialogForm.desc,
              }
            }).then((result) => {
              if (result) {
                this.$message({type: 'success', message: '添加成功!'});
              } else {
                this.$message({type: 'error', message: '添加失败!'});
              }
            });
            this.addDialogFormVisible = false;
            this.addDialogFormInit();
            this.getAllPageInfo();
          }
        });

      },
      cancel() {
        this.addDialogFormVisible = false;
        this.addDialogFormInit();
      },
      addDialogFormInit() {
        this.$refs['addDialogForm'].clearValidate();
        this.$refs['addDialogForm'].resetFields();
      }
    },
    components: {
      VSearch,
      VAuthTree,
      VBox
    }
  }
</script>

<style lang="less" type="text/less" rel="stylesheet/less">
  @import "../../common/styles/index";

</style>
