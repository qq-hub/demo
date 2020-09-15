<template>
  <div class="table-bg">
    <!-- prop渲染字段 -->
    <!-- label每一列标题 -->
    <!-- 表格：row-key="id"树形数据与懒加载 -->

    <el-table :data="rolelist">
      <el-table-column prop="id" label="ID" align="center"></el-table-column>
      <!-- 角色名称 -->
      <el-table-column prop="rolename" label="角色名称" align="center"></el-table-column>
      <!-- 状态 -->
      <el-table-column label="类型">
        <!-- 作用域插槽，使用其他组件内部数据 -->
        <template slot-scope="scope">
          <!-- 两个按钮 -->
          <el-tag type="success" v-if="scope.row.status==1">启用</el-tag>
          <el-tag type="warning" v-if="scope.row.status==2">禁用</el-tag>
        </template>
      </el-table-column>

      <!-- 操作按钮 -->
      <el-table-column label="操作">
        <!-- 模板 -->
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            @click="edit(scope.row)"
            circle
            icon="el-icon-edit"
          ></el-button>
          <el-button
            type="danger"
            size="small"
            @click="del(scope.row.id)"
            circle
            icon="el-icon-delete"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// 导入仓库数据以及请求数据
import { mapGetters, mapActions } from "vuex";
// 导入删除方法
import { delRole} from "@/request/role";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      rolelist: "role/rolelist",
    }),
  },
  mounted() {
    if (!this.rolelist.length) {
      // 获取列表！
      this.get_role_list();
    }
  },
  methods: {
    ...mapActions({
      get_role_list: "role/get_role_list",
    }),
    // 修改功能
    edit(val){
      // console.log(val);
      // 打开弹窗(触发事件[自定义事件，实参])
      this.$emit('edit',{...val})
    },
    //  delMenu返回promise
    // 删除按钮功能
    async del(id) {
      // 弹框-确认消息
      this.$confirm("确认删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
          // 获取数据
          let res = await delRole(id);
          console.log(res);
          if (res.code == 200) {
            this.$message.success(res.msg);
            // 重新获取列表！
            this.get_role_list();
          } else {
            this.$message.error(res.msg);
          }
        }) .catch(() => {});    
    }
  },
  

  components: {},
};
</script>
<style scoped>
</style>