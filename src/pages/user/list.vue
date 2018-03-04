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
          prop="name"
          label="用户名"
          sortable
          width="100">
        </el-table-column>
        <el-table-column
          prop="type"
          label="类型"
          width="100"
          :filters="[{ text: 'Y', value: 'Y' }, { text: 'N', value: 'N' }]"
          :filter-method="filterType">
          <template slot-scope="scope">
            <el-tag
              type=""
              close-transition>{{ scope.row.type }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          width="80"
          :filters="[{ text: 'Y', value: 'Y' }, { text: 'N', value: 'N' }]"
          :filter-method="filterStatus">
          <template slot-scope="scope">
            <el-tag
              type=""
              close-transition>{{ scope.row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机号"
          sortable
          width="140">
        </el-table-column>
        <el-table-column
          prop="mail"
          label="邮箱"
          sortable
          width="200">
        </el-table-column>
        <el-table-column
          prop="lastLoginTime"
          label="登录时间"
          sortable
          width="160">
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
              @click="handleSendMsg(scope.$index, scope.row)">发送短信</el-button>
            <el-button
              size="small"
              type="danger"
              @click="handleSendMail(scope.$index, scope.row)">发送邮件</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row>
        <el-col :span="8" style="text-align: left;padding-top: 20px">
          <el-button
            size="mini"
            type="warning"
            :disabled="!isExistSelection">选中发送短信</el-button>
          <el-button
            size="mini"
            type="danger"
            :disabled="!isExistSelection">选中发送邮件</el-button>
        </el-col>
        <el-col :span="8">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="tableData.length"
            style="text-align: center;padding-top: 20px">
          </el-pagination>
        </el-col>
      </el-row>
    </template>
  </v-main>
</template>

<script type="text/ecmascript-6">
  import VMain from '../../components/v_main/v_main'

  const COMPONENT_NAME = 'list';
  export default {
    name: COMPONENT_NAME,
    data() {
      return {
        currentSelection: [],
        tableData: [
          {
            id: '6621579524316',
            name: '王小虎',
            type: '一级用户',
            status: '正常',
            phone: '123******23',
            lastLoginTime: '2018-2-21 15:51:26',
            mail: '80******@qq.com'
          }, {
            id: '6621579524316',
            name: '王小虎',
            type: '一级用户',
            status: '正常',
            phone: '123******23',
            lastLoginTime: '2018-2-21 15:51:26',
            mail: '80******@qq.com'
          }, {
            id: '6621579524316',
            name: '王小虎',
            type: '一级用户',
            status: '正常',
            phone: '123******23',
            lastLoginTime: '2018-2-21 15:51:26',
            mail: '80******@qq.com'
          }, {
            id: '6621579524316',
            name: '王小虎',
            type: '一级用户',
            status: '正常',
            phone: '123******23',
            lastLoginTime: '2018-2-21 15:51:26',
            mail: '80******@qq.com'
          }, {
            id: '6621579524316',
            name: '王小虎',
            type: '一级用户',
            status: '正常',
            phone: '123******23',
            lastLoginTime: '2018-2-21 15:51:26',
            mail: '80******@qq.com'
          }, {
            id: '6621579524316',
            name: '王小虎',
            type: '一级用户',
            status: '正常',
            phone: '123******23',
            lastLoginTime: '2018-2-21 15:51:26',
            mail: '80******@qq.com'
          }, {
            id: '6621579524316',
            name: '王小虎',
            type: '一级用户',
            status: '正常',
            phone: '123******23',
            lastLoginTime: '2018-2-21 15:51:26',
            mail: '80******@qq.com'
          }, {
            id: '6621579524316',
            name: '王小虎',
            type: '一级用户',
            status: '正常',
            phone: '123******23',
            lastLoginTime: '2018-2-21 15:51:26',
            mail: '80******@qq.com'
          }
        ]
      }
    },
    computed: {
      isExistSelection() {
        return this.currentSelection.length > 0;
      }
    },
    methods: {
      filterType(value, row) {
        return row.type === value;
      },
      filterStatus(value, row) {
        return row.status === value;
      },
      handleSeeInfo(index, row) {

      },
      handleSendMsg(index, row) {

      },
      handleSendMail(index, row) {

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
