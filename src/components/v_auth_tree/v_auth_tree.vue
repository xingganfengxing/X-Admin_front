<!-- 自定义权限树组件 -->
<template>
  <v-box title="权限树" :is-show-refresh="true" @on-refresh-click="filterText('')">
    <template slot="main">
      <div style="padding: 10px">
        <v-search placeholder="按“enter”键过滤权限信息哟~~~" @on-enter="filterText" />
        <div style="padding-top: 10px;">
          <el-tree ref="tree"
                   :data="data"
                   :props="defaultProps"
                   :default-expand-all="true"
                   :filter-node-method="filterNode"
                   @node-click="handleNodeClick"></el-tree>
        </div>
      </div>
    </template>
  </v-box>
</template>

<script type="text/ecmascript-6">
  import VSearch from '../../components/v_search/v_search'
  import VBox from '../../components/v_box/v_box'

  let COMPONENT_NAME = 'v_auth_tree';
  export default {
    name: COMPONENT_NAME,
    data() {
      return {
        data: [{
          label: '已隶属权限分类',
          children: [{
            label: '新用户角色',
            children: [{
              label: '登录权限',
            }, {
              label: '删除权限'
            }, {
              label: '添加权限'
            }]
          }]
        }, {
          label: '无隶属权限分类',
          children: [{
            label: '特殊权限1'
          }, {
            label: '特殊权限2',
          }, {
            label: '特殊权限3',
          }, {
            label: '特殊权限4',
          }, {
            label: '特殊权限5',
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    methods: {
      handleNodeClick(data) {
        console.log(data);
      },
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    },
    watch: {

    },
    components: {
      VBox,
      VSearch
    }
  }
</script>

<style scoped lang="less" type="text/less" rel="stylesheet/less">

</style>
