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
            :disabled="!isExistSelection">选中清理权限</el-button>
          <el-button
            size="mini"
            type="danger"
            :disabled="!isExistSelection">选中强制注销</el-button>
        </el-col>
        <el-col :span="8">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="pageInfo.total"
            :page-size="pageInfo.size"
            :current-page.sync="currentPage"
            @current-change="getAll(currentPage)"
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
      isExistSelection() {
        return this.currentSelection.length > 0;
      }
    },
    created() {
      this.$nextTick(() => {
        this.getAllPageInfo();
        this.getAll(this.currentPage);
      });
    },
    methods: {
      getAllPageInfo(){
        this.$http.get("/user/getAllPageInfo").then((result) => {
          this.pageInfo = result;
        }).catch(() => {
          this.$message.error('加载分页数据错误!');
        });
      },
      getAll(current){
        this.$http.get("/user/getAll", {
          params: {
            current: current,
            size: 1
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

      },
      handleCleanAuth(index, row) {

      },
      handleForceLogout(index, row) {

      },
      select(selection, row) {
        this.currentSelection = selection;
      },
      selectAll(selection) {
        this.currentSelection = selection;
      }
    },
    components: {
      VMain
    }
  }
</script>

<style scoped lang="less" type="text/less" rel="stylesheet/less">
</style>
