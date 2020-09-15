<template>
  <div class="table-bg">
    <!-- prop渲染字段 -->
    <!-- label每一列标题 -->
    <!-- 表格：row-key="id"树形数据与懒加载 -->

    <el-table
      :data="menulist"
      row-key="id"
      :tree-props="{children: 'children'}"
      border
      style="width: 100%"
    >
      <el-table-column prop="id" label="ID" align="center"></el-table-column>
      <el-table-column prop="title" label="菜单名称" align="center"></el-table-column>
      <el-table-column prop="url" label="菜单地址" align="center"></el-table-column>
      <!-- 图标 -->
      <el-table-column label="图标">
        <template slot-scope="scope">
          <i :class="scope.row.icon"></i>
        </template>
      </el-table-column>

      <!-- 目录类型 -->
      <el-table-column label="类型">
        <!-- 作用域插槽，使用其他组件内部数据 -->
        <template slot-scope="scope">
          <!-- 两个按钮 -->
          <el-tag type="success" v-if="scope.row.type==1">目录</el-tag>
          <el-tag type="warning" v-if="scope.row.type==2">菜单</el-tag>
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
import { delMenu } from "@/request/menu";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      menulist: "menu/menulist",
    }),
  },
  mounted() {
    if (!this.menulist.length) {
      // 获取列表！
      this.get_menu_list();
    }
  },
  methods: {
    ...mapActions({
      get_menu_list: "menu/get_menu_list",
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
          let res = await delMenu(id);
          console.log(res);
          if (res.code == 200) {
            this.$message.success(res.msg);
            // 重新获取列表！
            this.get_menu_list();
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