<!-- 在线用户列表 -->
<template>
  <v-main :nav-name-items="['用户管理', '用户信息']">
    <template slot="main">
      <el-table
        :data="tableData"
        border
        stripe
        style="width: 100%"
        @select="select"
        @select-all="selectAll"
        ref="table">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="sessionId"
          label="会话编号"
          sortable
          width="200">
        </el-table-column>
        <el-table-column
          prop="name"
          label="用户名"
          sortable
          width="100">
        </el-table-column>
        <el-table-column
          prop="loginTime"
          label="登录时间"
          sortable
          width="160">
        </el-table-column>
        <el-table-column
          prop="recentRequestTime"
          label="最近请求时间"
          sortable
          width="160">
        </el-table-column>
        <el-table-column
          prop="loginIP"
          label="登录IP"
          sortable
          width="140">
        </el-table-column>
        <el-table-column
          prop="isForceLogout"
          label="是否强制注销"
          width="120"
          :filters="[{ text: true, value: true }, { text: false, value: false }]"
          :filter-method="filterForceLogout">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.isForceLogout ? 'danger' : 'success'"
              close-transition>{{scope.row.isForceLogout}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="small"
              type="success"
              @click="handleSeeInfo(scope.$index, scope.row)">查看信息</el-button>
            <el-button
              size="small"
              type="warning"
              :disabled="scope.row.isForceLogout"
              @click="handleCleanAuth(scope.$index, scope.row)">清理权限</el-button>
            <el-button
              size="small"
              type="danger"
              :disabled="scope.row.isForceLogout"
              @click="handleForceLogout(scope.$index, scope.row)">强制注销</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row>
        <el-col :span="8" style="text-align: left;padding-top: 20px">
          <el-button
            size="mini"
            type="warning"
            :disabled="!isHasSelection"
            @click="selectCleanAuth(currentSelection)">选中清理权限</el-button>
          <el-button
            size="mini"
            type="danger"
            :disabled="!isHasSelection"
            @click="selectForceLogout(currentSelection)">选中强制注销</el-button>
        </el-col>
        <el-col :span="8">
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
  </v-main>
</template>

<script type="text/ecmascript-6">
  import VMain from '../../components/v_main/v_main'

  const COMPONENT_NAME = 'online';

  export default {
    name: COMPONENT_NAME,
    data() {
      return {
        currentSelection: [],
        tableData: [],
        currentPage: 1,
        pageInfo: {}
      }
    },
    computed: {
      isHasSelection() {
        return this.currentSelection.length > 0;
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
      },
      getAllPageInfo(){
        this.$http.get("/user/online/getPage").then((result) => {
          this.pageInfo = result;
          this.getAll(this.currentPage, this.pageInfo.size);
        }).catch(() => {
          this.$message.error('加载分页数据错误!');
        });
      },
      getAll(current, size){
        this.$http.get("/user/online/getAll", {
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
      filterForceLogout(value, row) {
        return row.isForceLogout === value;
      },
      handleSeeInfo(index, row) {
        this.seeInfoRequest(row).then((result) => {
          // 弹窗提示用户信息
          let html = "<img src='" + result.avatar + "' width='100' height='100' style='border-radius: 50%'/>" +
            "<p>编号:" + result.id + "</p>" +
            "<p>昵称:" + result.name + "</p>" +
            "<p>年龄:" + result.age + "</p>" +
            "<p>性别:" + result.sex + "</p>" +
            "<p>介绍:" + result.desc + "</p>";
          this.$alert(html, '用户' + row.name + '个人信息', {
            dangerouslyUseHTMLString: true,
            center: true,
            showConfirmButton: false
          });
        });
      },
      handleCleanAuth(index, row) {
        this.cleanAuthRequest(row.name).then((result) => {
          if (result) {
            this.$notify.success({title: '系统提示', message: '清理' + row.name + '权限缓存成功!', duration: 1500, position: 'bottom-right'});
          } else {
            this.$notify.error({title: '系统提示', message: '清理' + row.name + '权限缓存失败!', duration: 1000, position: 'bottom-right'});
          }
        });
      },
      handleForceLogout(index, row) {
        this.forceLogoutRequest(row.name).then((result) => {
          if (result) {
            row.isForceLogout = true;
            this.$notify.success({title: '系统提示', message: '强制' + row.name + '退出成功!', duration: 1500, position: 'bottom-right'});
          } else {
            this.$notify.error({title: '系统提示', message: '强制' + row.name + '退出失败!', duration: 1000, position: 'bottom-right'});
          }
        });
      },
      selectCleanAuth(selection) {
        let name = [];
        selection.forEach((item) => {
          name.push(item.name);
        });
        this.cleanAuthRequest(name).then((result) => {
          if (result) {
            this.$notify.success({title: '系统提示', message: '清理所选用户权限缓存成功!', duration: 1500, position: 'bottom-right'});
            this.cleanSelection();
          } else {
            this.$notify.error({title: '系统提示', message: '清理所选用户权限缓存失败!', duration: 1000, position: 'bottom-right'});
          }
        })
      },
      selectForceLogout(selection) {
        let name = [];
        selection.forEach((item) => {
          if (!item.isForceLogout) {
            name.push(item.name);
          }
        });
        this.forceLogoutRequest(name).then((result) => {
          if (result) {
            selection.forEach((item) => {
              if (!item.isForceLogout) {
                item.isForceLogout = true;
              }
            });
            this.cleanSelection();
            this.$notify.success({title: '系统提示', message: '强制所选用户退出成功!', duration: 1500, position: 'bottom-right'});
          } else {
            this.$notify.error({title: '系统提示', message: '强制所选用户退出失败!', duration: 1000, position: 'bottom-right'});
          }
        });
      },
      cleanSelection() {
        this.$refs['table'].clearSelection();
        this.currentSelection = [];
      },
      select(selection, row) {
        this.currentSelection = selection;
      },
      selectAll(selection) {
        this.currentSelection = selection;
      },
      seeInfoRequest(row) {
        return new Promise((resolve, reject) => {
          this.$http.get("/user/getInfo", {
            params: {
              id: row.id
            }
          }).then((result) => {
            resolve(result);
          }).catch((err) => {
            reject(err);
          });
        })
      },
      cleanAuthRequest(name) {
        return new Promise((resolve, reject) => {
          this.$http.post("/admin/cleanAuth", {
            data: {
              name: name
            }
          }).then((result) => {
            resolve(result);
          }).catch((err) => {
            reject(err);
          });
        });
      },
      forceLogoutRequest(name) {
        return new Promise((resolve, reject) => {
          this.$http.post("/admin/forceLogout", {
            data: {
              name: name
            }
          }).then((result) => {
            resolve(result);
          }).catch((err) => {
            reject(err);
          });
        });
      }
    },
    components: {
      VMain
    }
  }
</script>

<style scoped lang="less" type="text/less" rel="stylesheet/less">
</style>
