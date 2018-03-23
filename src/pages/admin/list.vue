<template>
  <div>
    <div class="v-breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>管理员管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/user/list' }">管理员列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
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
        label="管理员名"
        sortable
        width="120">
      </el-table-column>
      <el-table-column
        prop="type"
        label="类型"
        width="100"
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
        width="80"
        :filters="[{ text: '正常', value: '正常' }, { text: '无效', value: '无效' }]"
        :filter-method="filterStatus">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.status === '正常' ? 'success' : 'danger'"
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
        prop="email"
        label="邮箱"
        sortable
        width="250">
      </el-table-column>
      <el-table-column
        prop="lastLoginTime"
        label="最近登录时间"
        sortable
        width="180">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="small"
            type="warning"
            @click="handleSeeInfo(scope.$index, scope.row)">查看信息</el-button>
          <el-button
            size="small"
            type="success"
            @click="handleSendMsg(scope.$index, scope.row)">发送短信</el-button>
          <el-button
            size="small"
            type="success"
            @click="handleSendMail(scope.$index, scope.row)">发送邮件</el-button>
          <el-button
            size="small"
            type="danger"
            :disabled="scope.row.status !== '正常'"
            @click="handleLockAdmin(scope.$index, scope.row)">锁定管理员</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row>
      <el-col :span="8" style="text-align: left;padding-top: 20px">
        <el-button
          size="mini"
          type="success"
          :disabled="!isHasSelection"
          @click="selectSendMsg(currentSelection)">选中发送短信</el-button>
        <el-button
          size="mini"
          type="success"
          :disabled="!isHasSelection"
          @click="selectSendMail(currentSelection)">选中发送邮件</el-button>
        <el-button
          size="mini"
          type="danger"
          :disabled="!isHasSelection"
          @click="selectLockAdmin(currentSelection)">锁定选中管理员</el-button>
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
  </div>
</template>

<script type="text/ecmascript-6">
  import VMain from '../../components/v_main/v_main'

  const COMPONENT_NAME = 'list';
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
      getAllPageInfo() {
        this.$http.get("/admin/getPage").then((result) => {
          this.pageInfo = result;
          this.getAll(this.currentPage, this.pageInfo.size);
        }).catch(() => {
          this.$message.error('加载分页数据错误!');
        });
      },
      getAll(current, size) {
        this.$http.get("/admin/getAll", {
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
      filterType(value, row) {
        return row.type === value;
      },
      filterStatus(value, row) {
        return row.status === value;
      },
      handleSeeInfo(index, row) {
        this.seeInfoRequest(row).then((result) => {
          // 弹窗提示管理员信息
          let html = "<img src='" + result.avatar + "' width='100' height='100' style='border-radius: 50%'/>" +
            "<p>编号:" + result.id + "</p>" +
            "<p>昵称:" + result.name + "</p>" +
            "<p>年龄:" + result.age + "</p>" +
            "<p>性别:" + result.sex + "</p>" +
            "<p>介绍:" + result.desc + "</p>";
          this.$alert(html, '管理员' + row.name + '个人信息', {
            dangerouslyUseHTMLString: true,
            center: true,
            showConfirmButton: false
          });
        });
      },
      handleSendMsg(index, row) {
        this.$notify.warning({title: '系统提示', message: '发送短信功能暂未开放!', duration: 1500, position: 'bottom-right'});
      },
      handleSendMail(index, row) {
        this.$notify.warning({title: '系统提示', message: '发送邮件功能暂未开放!', duration: 1500, position: 'bottom-right'});
      },
      handleLockAdmin(index, row) {
        this.$notify.warning({title: '系统提示', message: '锁定管理员功能暂未开放!', duration: 1500, position: 'bottom-right'});
      },
      selectSendMsg(selection) {
        this.$notify.warning({title: '系统提示', message: '发送短信功能暂未开放!', duration: 1500, position: 'bottom-right'});
        this.cleanSelection();
      },
      selectSendMail(selection) {
        this.$notify.warning({title: '系统提示', message: '发送邮件功能暂未开放!', duration: 1500, position: 'bottom-right'});
        this.cleanSelection();
      },
      selectLockAdmin(selection) {
        this.$notify.warning({title: '系统提示', message: '锁定管理员功能暂未开放!', duration: 1500, position: 'bottom-right'});
        this.cleanSelection();
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
          this.$http.get("/admin/getInfo", {
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
    },
    components: {
      VMain
    }
  }
</script>

<style scoped lang="less" type="text/less" rel="stylesheet/less">
</style>
