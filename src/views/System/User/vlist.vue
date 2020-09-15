<template>
  <div class="table-bg">
    <!-- prop渲染字段 -->
    <!-- label每一列标题 -->
    <!-- 表格：row-key="id"树形数据与懒加载 -->

    <el-table :data="userlist">
      <el-table-column prop="uid" label="UID" width="320" align="center"></el-table-column>
      <!-- 名称 -->
      <el-table-column prop="username" label="管理员名称" align="center"></el-table-column>
      <!-- 管理员角色 -->
      <el-table-column label="管理员角色" align="center">
        <template slot-scope="scope">
          <!-- 角色名称 -->
          <el-tag type="success">{{scope.row.rolename}}</el-tag>
        </template>
      </el-table-column>
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
            @click="del(scope.row.uid)"
            circle
            icon="el-icon-delete"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="set_size"
      @current-change="set_page"
      :current-page="page"
      :page-sizes="[1, 2, 3, 4]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
// 导入仓库数据以及请求数据
import { mapGetters, mapActions, mapMutations } from "vuex";
// 导入删除方法
import { delUser } from "@/request/user";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      userlist: "user/userlist",
      // 分页
      page: "user/page",
      size: "user/size",
      total: "user/total",
    }),
  },
  mounted() {
    if (!this.userlist.length) {
      // 获取列表！
      this.get_user_list();
    }
  },
  methods: {
    ...mapMutations({
      SET_PAGE: "user/SET_PAGE",
    }),
    ...mapActions({
      get_user_list: "user/get_user_list",
      set_page: "user/set_page",
      set_size: "user/set_size",
    }),
    // 修改功能
    edit(val) {
      // console.log(val);
      // 打开弹窗(触发事件[自定义事件，实参])
      this.$emit("edit", { ...val });
    },
    //  delMenu返回promise
    // 删除按钮功能
    async del(uid) {
      // 弹框-确认消息
      this.$confirm("确认删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          // 获取数据
          let res = await delUser(uid);
          console.log(res);
          if (res.code == 200) {
            this.$message.success(res.msg);
            // 分页
            // 如果本页只有1条数据！且不是第1页！
            if (this.userlist.length == 1 && this.page != 1) {
              this.SET_PAGE(this.page - 1);
            }
            // 重新获取列表！
            this.get_user_list();
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch(() => {});
    },
  },

  components: {},
};
</script>
<style scoped>
</style>