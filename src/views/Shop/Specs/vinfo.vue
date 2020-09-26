<template>
  <el-dialog
    :title="info.isAdd ? '添加规格':'修改规格'"
    @close="cancel"
    :visible.sync="info.isShow"
    width="40%"
  >
    <!-- 表单 -->
    <el-form :model="forminfo" ref="form" :rules="rules" label-width="140px">
      <el-form-item label="规格名称" prop="specsname">
        <el-input v-model="forminfo.specsname" placeholder="请输入规格名称"></el-input>
      </el-form-item>

      <el-form-item label="属性值">
        <label v-for="(item,index) in list" :key="index">
          <el-input
            style="display:inline-block;width:160px;margin-bottom:10px;"
            v-model="item.value"
            placeholder="请输入规格属性值"
          ></el-input>
          <!-- 下标为0时添加 -->
          <el-button v-if="index==0" type="primary" @click="addAttrs">添加属性</el-button>
          <!-- 根据下标删除 -->
          <el-button v-else type="danger" @click="delAttrs(index)">删除属性</el-button>
        </label>
      </el-form-item>
      <el-form-item label="管理员状态">
        <el-switch v-model="forminfo.status" :active-value="1" :inactive-value="2"></el-switch>
      </el-form-item>
      <el-form-item label>
        <el-button type="primary" @click="sumbit">提交</el-button>
        <el-button type="warning" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
// 导入  添加和修改的 请求封装方法！
import { addSpecs, editSpecs } from "@/request/specs";
import { mapGetters, mapActions } from "vuex";
let defaultItem = {
  specsname: "",
  attrs: "",
  status: 1, // 状态1正常2禁用
};
let resetItem = { ...defaultItem };
export default {
  props: {
    info: {
      type: Object,
      default() {
        return {
          isAdd: true,
          isShow: false,
        };
      },
    },
  },
  data() {
    return {
      forminfo: { ...defaultItem },
      rules: {},
      //   空数组对象！！！
      list: [{ value: "" }],
    };
  },
  //   computed: {
  //     ...mapGetters({
  //       rolelist: "role/rolelist",
  //     }),
  //   },
  //   mounted() {
  //     if (!this.spaceslist.length) {
  //       this.get_sapces_list();
  //     }
  //   },
  methods: {
    ...mapActions({
      get_specs_list: "specs/get_specs_list",
    }),
    // 添加一个空
    addAttrs() {
      this.list.push({ value: "" });
    },
    delAttrs(idx) {
      this.list.splice(idx, 1);
    },
    setinfo(val) {
        // 修改时？？？
      this.list = val.attrs.map((v) => ({
        value: v,
      }));
        // 将数据赋给默认defaultItem; 赋给表单
      defaultItem = { ...val };
      this.forminfo = { ...val };
    },
    async sumbit() {
      //   规格提交时，条件有空不提交
      if (!this.list.every((val) => val.value)) {
        this.$message.warning("请输入规格值");
        return;
      }
      // 获取的值赋值给attrs,且用逗号分割
      this.forminfo.attrs = this.list.map((val) => val.value);
      this.forminfo.attrs = this.forminfo.attrs.join(",");
      // 表单验证！
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          // 如果验证通过！
          let res;
          if (this.info.isAdd) {
            // 添加还是修改！
            res = await addSpecs(this.forminfo);
          } else {
            res = await editSpecs(this.forminfo);
          }
          if (res.code == 200) {
            this.$message.success(res.msg);
            this.info.isShow = false;
            this.get_specs_list(); // 重新获取角色列表！
            this.cancel();
          } else {
            this.$message.error(res.msg);
          }
        }
      });
    },
    reset() {
      if (this.info.isAdd) {
        // 添加时候的重置！
        this.forminfo = { ...resetItem };
      } else {
        // 修改时候的重置！
        this.setinfo({ ...defaultItem });
      }
    },
    cancel() {
      this.forminfo = { ...resetItem };
    //   关闭后初始化
       this.list = [{value:''}]
    },
  },
  components: {},
};
</script>
<style scoped>
</style>