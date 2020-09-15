<template>
  <div>
    <!-- visible.sync是否显示(默认不显示) -->
    <el-dialog :title="info.isAdd?'添加菜单':'修改菜单'" @click="cancel()" :visible.sync="info.isShow" width="40%">
      <!-- 表单 forminfo-->
      <!-- 表单验证 -->
      <el-form :model="forminfo" ref="form" :rules="rules" label-width="130px">
        <el-form-item label="表单类型">
          <!-- 单选组 -->
          <el-radio-group v-model="forminfo.type">
            <el-radio :label="1">目录</el-radio>
            <el-radio :label="2">菜单</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 为菜单添加选择器 -->
        <el-form-item label="上级目录" v-if="forminfo.type==2">
          <el-select v-model="forminfo.pid" placeholder="请选择">
            <el-option label="顶级目录" :value="0"></el-option>
            <!-- 遍历菜单列表 id, -->
            <!-- v-if过滤:只能显示目录 -->
            <!-- 报错是因为消耗了性能，不是语法错误 -->
            <el-option
              v-for="item in menulist"
              v-if="item.type==1"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <!-- 判断目录类型 -->
        <el-form-item :label="forminfo.type==1?'目录名称':'菜单名称'" prop="title">
          <el-input v-model="forminfo.title" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="图标" prop="icon">
          <el-input v-model="forminfo.icon" placeholder="请输入图标class"></el-input>
        </el-form-item>
        <!-- 类型是2,显示菜单地址 -->
        <el-form-item label="菜单地址" prop="url" v-if="forminfo.type==2">
          <el-input v-model="forminfo.url"></el-input>
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
import { addMenu, editMenu } from "@/request/menu";
// 导入模板
import { mapGetters, mapActions } from "vuex";
 // 弹窗中菜单参数(接口文档)post
let defaultItem={
   pid:0,  
    title:"",
    icon:"", 
    type:1,  // 1目录2菜单
    url:"",
    status:1    // 状态1正常2禁用
}
// bug2重定义一个空数据
let resetItem = {...defaultItem}
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
       forminfo:{...defaultItem},
      //  验证规则，必填项
      rules:{  // 验证规则对象！
                title:[{required:true,message:"必填！",trigger:'blur'}],
                // icon:[{required:true,message:"必填！",trigger:'blur'}],
                url:[{required:true,message:"必填！",trigger:'blur'}]
            }
     
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
    }),
    // bug1重置按钮(回显,保留值)
    setinfo(val){
      // 将数据赋给默认defaultItem; 赋给表单
      defaultItem={...val};
      this.forminfo={...val}
    },
    async submit() {
        // 表单验证！
      this.$refs.form.validate(async valid=> {
          if (valid) {
             //   添加删除均执行,code=200
            let res;
            //   添加还是修改
            if (this.info.isAdd) {
              res = await addMenu(this.forminfo);
            } else {
              res = await editMenu(this.forminfo);
            }
            if (res.code == 200) {
              this.$message.success(res.msg);
              // 无论添加还是修改,保持数据更新
              this.get_menu_list();
              //   关闭弹窗
              this.info.isShow = false;
              // 拷贝数据
              // this.forminfo={...resetItem}
              // bug2无论是修改成功还是添加成功，都应该让表单为空！
              this.forminfo={...resetItem}
            } else {
              this.$message.error(res.msg);
            }
          }
        })
     
    },
    reset() {
        if(this.info.isAdd){ // 添加时候的重置！
                this.forminfo = {...resetItem}
            }else{ // 修改时候的重置！
                this.setinfo({...defaultItem})
            }
    },
    // 无论是修改成功还是添加成功，都应该让表单为空！或者弹框关闭的时候！
     cancel(){   
            this.forminfo = {...resetItem}
        }
  },
  components: {},
};
</script>
<style scoped>
</style>