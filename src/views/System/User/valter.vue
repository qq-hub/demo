<template>
  <div>
    <!-- visible.sync是否显示(默认不显示) -->
    <el-dialog
      :title="info.isAdd?'添加管理员':'修改管理员'"
      @close="cancel"
      :visible.sync="info.isShow"
      width="40%"
    >
      <!-- 表单 forminfo-->
      <!-- 表单验证 -->
      <el-form :model="forminfo" ref="form" :rules="rules" label-width="130px">
        <!-- roleid下拉列表 -->
        <el-form-item label="管理员角色" prop="roleid">
          <el-select v-model="forminfo.roleid" placeholder="请选择角色">
            <el-option
              v-for="item in rolelist"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 管理员名称 -->
        <el-form-item label="管理员名称" prop="username">
          <el-input v-model="forminfo.username" placeholder="请输入管理员名称"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="管理员密码" prop="password">
           <!-- 添加时,密码留空表示不修改密码 -->
          <el-input v-model="forminfo.password" :placeholder="info.add?'请输入管理员密码':'留空表示不修改'"></el-input>
        </el-form-item>
        <!-- 开关 -->
        <el-form-item label="状态">
          <el-switch v-model="forminfo.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
        <el-form-item label>
          <el-button type="primary" @click="submit">提交</el-button>
          <el-button type="warning" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
// 弹窗操作添加,修改数据
import { addUser, editUser } from "@/request/user";
// 导入模板
import { mapGetters, mapActions } from "vuex";
// 弹窗中菜单参数(接口文档)post
let defaultItem = {
  roleid: "",
  username: "",
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
        // 验证规则对象！
        roleid: [{ required: true, message: "必填！", trigger: "blur" }],
        username: [{ required: true, message: "必填！", trigger: "blur" }],
      },
    };
  },
  created() {
    //   当前组件对象，内含饿了么注入
    // console.log(this);
  },
  computed: {
    ...mapGetters({
      rolelist: "role/rolelist",
    }),
  },
  // 挂载之后
  mounted() {
    // 菜单列表为空时请求数据
    if (!this.rolelist.length) {
      this.get_role_list();
    }
  },
  methods: {
    ...mapActions({
      get_role_list: "role/get_role_list",
      get_user_list: "user/get_user_list",
    }),
    // bug1重置按钮(回显,保留值)
    setinfo(val) {
      // 密码不显示
      val.password = ""
      // 将数据赋给默认defaultItem; 赋给表单
      defaultItem = { ...val };
      this.forminfo = { ...val };
    },
    async submit() {
      // 添加状态没有密码
      if(this.isAdd && !this.forminfo.password){
        this.$message.warning("请输入密码")
        return;
      }
      // 表单验证！
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          //   添加删除均执行,code=200
          let res;
          //   添加还是修改
          if (this.info.isAdd) {
            res = await addUser(this.forminfo);
          } else {
            res = await editUser(this.forminfo);
          }
          if (res.code == 200) {
            this.$message.success(res.msg);
            // 无论添加还是修改,保持数据更新
            this.get_user_list();
            //   关闭弹窗
            this.info.isShow = false;
            this.cancel();
          } else {
            this.$message.error(res.msg);
          }
        }
      });
    },
    // 添加关闭情况一致
    reset() {
      // 添加时重置
      if (this.info.isAdd) {
        this.forminfo = { ...resetItem };
        // 且树置空
      } else {
        // 修改重置(值不干净)
        this.setinfo({ ...defaultItem });
      }
    },
    // 关闭情况(x)
    cancel() {
      this.forminfo = { ...resetItem };
    },
  },
  components: {},
};
</script>
<style scoped>
</style>