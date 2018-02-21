<!-- 在线用户列表 -->
<template>
  <v-main>
    <template slot="nav">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>在线用户</el-breadcrumb-item>
      </el-breadcrumb>
    </template>
    <template slot="main">
      <el-table
        :data="tableData"
        border
        stripe
        class="v-table"
        style="width: 100%">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="type"
          label="类型"
          width="100"
          :filters="[{ text: '用户', value: '用户' }, { text: '管理员', value: '管理员' }]"
          :filter-method="filterType">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.type === '用户' ? 'success' : 'danger'"
              close-transition>{{scope.row.type}}</el-tag>
          </template>
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
          prop="loginIp"
          label="登录IP"
          sortable
          width="140">
        </el-table-column>
        <el-table-column
          prop="isForceLogout"
          label="是否强制注销"
          width="120"
          :filters="[{ text: 'Y', value: 'Y' }, { text: 'N', value: 'N' }]"
          :filter-method="filterForceLogout">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.isForceLogout === 'Y' ? 'danger' : 'success'"
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
              :disabled="scope.row.isForceLogout === 'Y'"
              @click="handleCleanAuth(scope.$index, scope.row)">清理权限</el-button>
            <el-button
              size="small"
              type="danger"
              :disabled="scope.row.isForceLogout === 'Y'"
              @click="handleForceLogout(scope.$index, scope.row)">强制注销</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row>
        <el-col :span="8" style="text-align: left;padding-top: 20px">
          <el-button
            size="small"
            type="warning">选中清理权限</el-button>
          <el-button
            size="small"
            type="danger">选中强制注销</el-button>
        </el-col>
        <el-col :span="8">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="1000"
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
        tableData: [
          {
            name: '王小虎',
            loginTime: '2018-2-21 15:51:26',
            recentRequestTime: '2018-2-21 15:51:26',
            loginIp: '192.168.1.1',
            isForceLogout: 'Y',
            type: '用户'
          }, {
            name: '王小虎',
            loginTime: '2018-2-21 15:51:26',
            recentRequestTime: '2018-2-21 15:51:26',
            loginIp: '192.168.1.1',
            isForceLogout: 'Y',
            type: '管理员'
          }, {
            name: '王小虎',
            loginTime: '2018-2-21 15:51:26',
            recentRequestTime: '2018-2-21 15:51:26',
            loginIp: '192.168.1.1',
            isForceLogout: 'N',
            type: '用户'
          }, {
            name: '王小虎',
            loginTime: '2018-2-21 15:51:26',
            recentRequestTime: '2018-2-21 15:51:26',
            loginIp: '192.168.1.1',
            isForceLogout: 'N',
            type: '管理员'
          }, {
            name: '王小虎',
            loginTime: '2018-2-21 15:51:26',
            recentRequestTime: '2018-2-21 15:51:26',
            loginIp: '192.168.1.1',
            isForceLogout: 'N',
            type: '用户'
          }, {
            name: '王小虎',
            loginTime: '2018-2-21 15:51:26',
            recentRequestTime: '2018-2-21 15:51:26',
            loginIp: '192.168.1.1',
            isForceLogout: 'Y',
            type: '用户'
          }, {
            name: '王小虎',
            loginTime: '2018-2-21 15:51:26',
            recentRequestTime: '2018-2-21 15:51:26',
            loginIp: '192.168.1.1',
            isForceLogout: 'N',
            type: '管理员'
          }, {
            name: '王小虎',
            loginTime: '2018-2-21 15:51:26',
            recentRequestTime: '2018-2-21 15:51:26',
            loginIp: '255.255.255.255',
            isForceLogout: 'Y',
            type: '用户'
          }
        ]
      }
    },
    methods: {
      filterType(value, row) {
        return row.type === value;
      },
      filterForceLogout(value, row) {
        return row.isForceLogout === value;
      }
    },
    components: {
      VMain
    }
  }
</script>

<style scoped lang="less" type="text/less" rel="stylesheet/less">
  .v-table {
  }
</style>
