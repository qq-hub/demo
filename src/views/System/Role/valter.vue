<template>
  <div>
    <!-- visible.sync是否显示(默认不显示) -->
    <el-dialog
      :title="info.isAdd?'添加角色':'修改角色'"
      @close="cancel"
      :visible.sync="info.isShow"
      width="40%"
    >
      <!-- 表单 forminfo-->
      <!-- 表单验证 -->
      <el-form :model="forminfo" ref="form" :rules="rules" label-width="130px">
        <!-- 角色名称 -->
        <el-form-item label="角色名称" prop="rolename">
          <el-input v-model="forminfo.rolename" placeholder="请输入角色名称"></el-input>
        </el-form-item>
        <!-- 角色权限树形 -->
        <el-form-item label="角色权限">
          <!-- 
             node-key="id" 解决横杠选不中问题
             default-expand-all 子集展开
              ref="tree" 获得DOM节点
          -->
          <el-tree
            default-expand-all
            node-key="id"
            ref="tree"
            :data="menulist"
            show-checkbox
            :props="{children:'children',label:'title'}"
            :check-strictly="checkStrictly"
          ></el-tree>
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
import { addRole, editRole } from "@/request/role";
// 导入模板
import { mapGetters, mapActions } from "vuex";
// 弹窗中菜单参数(接口文档)post
let defaultItem = {
   rolename:"",  
    menus:"",
    status:1    // 状态1正常2禁用
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
        rolename: [{ required: true, message: "必填！", trigger: "blur" }],
      },
      checkStrictly: false, // false表示父子关联！ true表示父子不关联！
    };
  },
  created() {
    //   当前组件对象，内含饿了么注入
    // console.log(this);
  },
  computed: {
    ...mapGetters({
      menulist: "menu/menulist",
    }),
  },
  // 挂载之后
  mounted() {
    // 菜单列表为空时请求数据
    if (!this.menulist.length) {
      this.get_menu_list();
    }
  },
  methods: {
    ...mapActions({
      get_menu_list: "menu/get_menu_list",
      get_role_list:"role/get_role_list"
    }),
    // bug1重置按钮(回显,保留值)
    setinfo(val) {
      // 将角色权限节点，回显到树中去！(分割成数组)
      let idarr=val.menus.split(',');
      // console.log(idarr);
      if(idarr[0]){
          // 打开修改时父子互不关联！
         this.checkStrictly = true; 
          // 等到节点渲染完成再做某个事情！ this.$nextTick(()=>{  等到vue把节点渲染完成再做某些事情！ })
          // setCheckedKeys：通过 keys 设置目前勾选的节点
          this.$nextTick(()=>{
            this.$refs.tree.setCheckedKeys(idarr)
             // 修改中父子关联！(解决bug)
          this.checkStrictly = false;
          })
      }
      // 将数据赋给默认defaultItem; 赋给表单
      defaultItem = { ...val };
      this.forminfo = { ...val };
    },
    async submit() {
      // console.log(this.$refs.tree.getCheckedKeys());获取id
      // getHalfCheckedKeys:若节点可被选择（即 show-checkbox 为 true），则返回目前半选中的节点所组成的数组
      // menus权限
       // 获取树形控件选中的节点！
       let idarr = this.$refs.tree.
       getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys());
       console.log(idarr);  
            if(idarr.length){
                this.forminfo.menus = idarr;  
            }else{
                this.$message.warning('请选择权限');
                return;
            }
      // 表单验证！
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          //   添加删除均执行,code=200
          let res;
          //   添加还是修改
          if (this.info.isAdd) {
            res = await addRole(this.forminfo);
          } else {
            res = await editRole(this.forminfo);
          }
          if (res.code == 200) {
            this.$message.success(res.msg);
            // 无论添加还是修改,保持数据更新
            this.get_menu_list();
            //   关闭弹窗
            this.info.isShow = false;
            // 重新获取角色列表！
             this.get_role_list(); 
            // bug2无论是修改成功还是添加成功，都应该让表单为空！
            this.forminfo = { ...resetItem };
          } else {
            this.$message.error(res.msg);
          }
        }
      });
    },
    // 添加关闭情况一致
    reset() {
        // 添加时重置
        if(this.info.isAdd){
          this.forminfo={...resetItem}
          // 且树置空
          this.$refs.tree.setCheckedKeys([])
        }else{
          // 修改重置(值不干净)
          this.setinfo({ ...defaultItem });
        }
    },
    // 关闭情况(x)
    cancel(){
       this.forminfo={...resetItem}
          // 且树置空
       this.$refs.tree.setCheckedKeys([])
    }
  },
  components: {},
};
</script>
<style scoped>
</style>