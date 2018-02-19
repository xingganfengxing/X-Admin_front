<!-- 侧边栏组建 -->
<template>
  <el-menu
    default-active="2"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    style="border: none;">
    <el-submenu index="1">
      <template slot="title">
        <i class="v-icon-common v-icon-user"></i>
        <span>用户管理</span>
      </template>
      <el-menu-item index="1-1">在线用户</el-menu-item>
      <el-menu-item index="1-2">用户信息</el-menu-item>
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
        <span>系统管理</span>
      </template>
      <el-menu-item-group title="字典管理">
        <el-menu-item index="3-1">字典查询</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="短信管理">
        <el-menu-item index="3-2">短信配置</el-menu-item>
        <el-menu-item index="3-3">短信查询</el-menu-item>
        <el-menu-item index="3-4">短信发送</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="邮件管理">
        <el-menu-item index="3-5">邮件配置</el-menu-item>
        <el-menu-item index="3-6">邮件查询</el-menu-item>
        <el-menu-item index="3-7">邮件发送</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="公告管理">
        <el-menu-item index="3-8">公告查询</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="任务管理">
        <el-menu-item index="3-9">任务查询</el-menu-item>
        <el-menu-item index="3-10">任务新增</el-menu-item>
        <el-menu-item index="3-11">任务删除</el-menu-item>
        <el-menu-item index="3-12">其他操作</el-menu-item>
      </el-menu-item-group>
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
      <el-menu-item index="6-1">用户日志</el-menu-item>
      <el-menu-item index="6-2">管理员日志</el-menu-item>
      <el-menu-item index="6-3">系统日志</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script type="text/ecmascript-6">
  const COMPONENT_NAME = 'v_aside';
  export default {
    name: COMPONENT_NAME,
    data() {
        return {}
    },
    methods: {},
    components: {}
  }
</script>

<style scoped lang="less" type="text/less" rel="stylesheet/less">
  .v-icon-common {
    font-size: 22px;
    margin-right: 8px;
  }
</style>
