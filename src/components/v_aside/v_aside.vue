<!-- 侧边栏组建 -->
<template>
  <el-menu
    :default-active="activeMenuItem"
    :default-openeds="activeSubMenu"
    background-color="#545c64"
    text-color="#fff"
    style="border: none;"
    :collapse="isCollapse"
    @select="select"
    unique-opened
    router>
    <li @click="collapse" class="el-menu-item v-menu-item">
      <i v-if="!isCollapse" class="el-icon-d-arrow-left"></i>
      <i v-else-if="isCollapse" class="el-icon-d-arrow-right"></i>
      <span v-if="!isCollapse" slot="title">收起菜单</span>
      <span v-else-if="isCollapse" slot="title">展开菜单</span>
    </li>
    <el-submenu index="1">
      <template slot="title">
        <i class="v-icon-common v-icon-user"></i>
        <span>用户管理</span>
      </template>
      <el-menu-item index="1-1" :route="{ path: '/user/online' }">在线用户</el-menu-item>
      <el-menu-item index="1-2" :route="{ path: '/user/list' }">用户信息</el-menu-item>
      <el-menu-item index="1-3">权限分配</el-menu-item>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title">
        <i class="v-icon-common v-icon-auth"></i>
        <span>权限管理</span>
      </template>
      <el-menu-item index="2-1">权限配置</el-menu-item>
      <el-menu-item index="2-2">角色配置</el-menu-item>
      <el-menu-item index="2-3">资源配置</el-menu-item>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">
        <i class="v-icon-common v-icon-sys"></i>
        <span>字典管理</span>
      </template>
      <el-menu-item index="3-1">字典配置</el-menu-item>
      <el-menu-item index="3-2">字典查询</el-menu-item>
    </el-submenu>
    <el-submenu index="4">
      <template slot="title">
        <i class="v-icon-common v-icon-sql"></i>
        <span>SQL管理</span>
      </template>
      <el-menu-item index="4-1">SQL配置</el-menu-item>
      <el-menu-item index="4-2">慢查询</el-menu-item>
    </el-submenu>
    <el-submenu index="5">
      <template slot="title">
        <i class="v-icon-common v-icon-api"></i>
        <span>API管理</span>
      </template>
      <el-menu-item index="5-1">API配置</el-menu-item>
      <el-menu-item index="5-2">API查询</el-menu-item>
      <el-menu-item index="5-3">更新历史</el-menu-item>
    </el-submenu>
    <el-submenu index="6">
      <template slot="title">
        <i class="v-icon-common v-icon-log"></i>
        <span>日志管理</span>
      </template>
      <el-menu-item index="6-1">日志配置</el-menu-item>
      <el-menu-item index="6-2">用户日志</el-menu-item>
      <el-menu-item index="6-3">管理员日志</el-menu-item>
      <el-menu-item index="6-4">系统日志</el-menu-item>
    </el-submenu>
    <el-submenu index="7">
      <template slot="title">
        <i class="v-icon-common v-icon-sms"></i>
        <span>短信管理</span>
      </template>
      <el-menu-item index="7-1">短信配置</el-menu-item>
      <el-menu-item index="7-2">短信查询</el-menu-item>
      <el-menu-item index="7-3">短信发送</el-menu-item>
    </el-submenu>
    <el-submenu index="8">
      <template slot="title">
        <i class="v-icon-common v-icon-mail"></i>
        <span>邮件管理</span>
      </template>
      <el-menu-item index="8-1">邮件配置</el-menu-item>
      <el-menu-item index="8-2">邮件查询</el-menu-item>
      <el-menu-item index="8-3">邮件发送</el-menu-item>
    </el-submenu>
    <el-submenu index="9">
      <template slot="title">
        <i class="v-icon-common v-icon-notice"></i>
        <span>公告管理</span>
      </template>
      <el-menu-item index="9-1">公告查询</el-menu-item>
      <el-menu-item index="9-2">公告新增</el-menu-item>
      <el-menu-item index="9-3">公告删除</el-menu-item>
      <el-menu-item index="9-4">公告修改</el-menu-item>
    </el-submenu>
    <el-submenu index="10">
      <template slot="title">
        <i class="v-icon-common v-icon-task"></i>
        <span>任务管理</span>
      </template>
      <el-menu-item index="10-1">任务查询</el-menu-item>
      <el-menu-item index="10-2">任务新增</el-menu-item>
      <el-menu-item index="10-3">任务删除</el-menu-item>
      <el-menu-item index="10-4">其他操作</el-menu-item>
    </el-submenu>
    <el-submenu index="11">
      <template slot="title">
        <i class="v-icon-common v-icon-admin"></i>
        <span>管理员管理</span>
      </template>
      <el-menu-item index="11-1">在线管理员</el-menu-item>
      <el-menu-item index="11-2">管理员信息</el-menu-item>
      <el-menu-item index="11-3">权限分配</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script type="text/ecmascript-6">
  import * as constants from '../../common/js/global_constants'
  import { mapGetters } from 'vuex'

  const COMPONENT_NAME = 'v_aside';
  export default {
    name: COMPONENT_NAME,
    data() {
      return {

      }
    },
    methods: {
      select(index, indexPath) {
        // 更新激活子菜单
        this.$store.dispatch('updateActiveSubMenu', indexPath);
        // 更新激活菜单项
        this.$store.dispatch('updateActiveMenuItem', index);
      },
      collapse() {
        // 修改侧边栏宽度
        if (this.isCollapse) { // 展开状态
          this.$store.dispatch('updateAsideWidth', constants.ASIDE_ON);
        } else { // 收起状态
          this.$store.dispatch('updateAsideWidth', constants.ASIDE_OFF);
        }
      }
    },
    computed: {
      ...mapGetters(['isCollapse', 'activeMenuItem', 'activeSubMenu']),

    },
    components: {}
  }
</script>

<style scoped lang="less" type="text/less" rel="stylesheet/less">
  @import "../../common/styles/index";
  .v-icon-common {
    font-size: 22px;
    margin-right: 8px;
  }
  .v-menu-item {
    padding-left: 20px;
    color: @font-color;
    background-color: @background-color;
    &:hover {
      background-color: @active-background-color;
    }
  }
</style>
