<template>
  <div class="table-bg">
    <!-- prop渲染字段 -->
    <!-- label每一列标题 -->
    <!-- 表格：row-key="id"树形数据与懒加载 -->

    <el-table
      :data="bannerlist"
      row-key="id"
      border
      style="width: 100%"
    >
      <el-table-column prop="id" label="ID" align="center"></el-table-column>
      <el-table-column prop="title" label="轮播图名称" align="center"></el-table-column>
      <el-table-column label="分类图片">
        <template slot-scope="scope">
          <img v-if="scope.row.img" style="width:80px" :src="scope.row.img | pixImg" alt="">
          <span v-else>暂无图片</span>
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
// 导入删除方法
import { delBanner,getBanner } from "@/request/banner";
export default {
  data() {
    return {
      bannerlist:[]
    };
  },
  mounted() {
      // 获取列表！
      this.getlist() 
  },
  methods: {
    // 调用请求层的方法，获取数据
    async getlist(){
      let res=await getBanner()
      // 获取的数据传给表单
      this.bannerlist=res
    },
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
          let res = await delBanner(id);
          console.log(res);
          if (res.code == 200) {
            this.$message.success(res.msg);
            // 重新获取列表！
            this.getlist();
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