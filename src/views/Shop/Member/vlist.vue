<template>
  <div class="table-bg">
    <!-- prop渲染字段 -->
    <!-- label每一列标题 -->
    <!-- 表格：row-key="id"树形数据与懒加载 -->

    <el-table :data="list" row-key="id" border style="width: 100%">
      <el-table-column
        prop="uid"
        label="用户ID"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="nickname"
        label="昵称"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="phone"
        label="手机号"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="addtime"
        label="注册日期"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.addtime|getTime }}
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
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// 导入方法
import { delMember, getMember } from "@/request/member";
export default {
  data() {
    return {
      list:[]
    };
  },
  mounted() {
    this.get_list();
  },
  methods: {
    // 修改功能
    edit(val) {
      // console.log(val);
      // 打开弹窗(触发事件[自定义事件，实参])
      this.$emit("edit", { ...val });
    },
    // res返回的数据
    async get_list() {
      let res = await getMember();
      this.list = res;
    },
    // 删除
    async del(id) {
      this.$confirm("确认删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await delMember(id);
          if (res.code == 200) {
            this.$message.success(res.msg);
            this.get_list(); // 重新获取列表！
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