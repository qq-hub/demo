<template>
  <!-- visible.sync是否显示(默认不显示) -->
  <el-dialog
    title="修改信息"
    @close="cancel"
    :visible.sync="info.isShow"
    width="40%"
  >
    <!-- 表单 forminfo-->
    <!-- 表单验证 -->
    <el-form :model="forminfo" ref="form" :rules="rules" label-width="130px">
      <!-- 分类名称 -->
      <el-form-item prop="nickname" label="昵称">
        <el-input
          v-model="forminfo.nickname"
          placeholder="请输入昵称"
        ></el-input>
      </el-form-item>
      <el-form-item prop="phone" label="手机号">
        <el-input
          v-model="forminfo.phone"
          placeholder="请输入手机号"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password" label="密码">
        <el-input
          v-model="forminfo.password"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item label="会员状态">
        <el-switch
          v-model="forminfo.status"
          :active-value="1"
          :inactive-value="2"
        ></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">提交</el-button>
        <el-button type="warning" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
// 弹窗操作添加,修改数据
import { editMember } from "@/request/member";
// 导入模板
import { mapGetters, mapActions } from "vuex";

// 弹窗中菜单参数(接口文档)post
let defaultItem = {
  // uid: 0,
  nickname: "",
  phone: "",
  password: "",
  status: 1, // 状态1正常2禁用
};
// bug2重定义一个空数据
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
      // 拷贝数据，实现数据更新
      forminfo: { ...defaultItem },
      //  验证规则，必填项
      rules: {
        nickname: [{ required: true, message: "必填！", trigger: "blur" }],
      },
    };
  },
  methods: {
    setinfo(val) {
      // 回显时密码不能要
      this.password = "";
      defaultItem = { ...val };
      this.forminfo = { ...val };
    },
    async submit() {
      // 表单验证！
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          //   添加删除均执行,code=200
          let res;
          res = await editMember(this.forminfo);
          if (res.code == 200) {
            this.$message.success(res.msg);
            //   关闭弹窗
            this.info.isShow = false;
            // 提示数据更新
            this.$emit("update");
            this.cancel();
          } else {
            this.$message.error(res.msg);
          }
        }
      });
    },
    reset() {
      this.setinfo({ ...defaultItem });
    },
    // 无论是修改成功还是添加成功，都应该让表单为空！或者弹框关闭的时候！
    cancel() {
      this.forminfo = { ...resetItem };
    },
  },
  components: {},
};
</script>
<style scoped>
</style>