<template>
  <div>
    <!-- visible.sync是否显示(默认不显示) -->
    <el-dialog
      :title="info.isAdd?'添加轮播':'修改轮播'"
      @close="cancel"
      :visible.sync="info.isShow"
      width="40%"
    >
      <!-- 表单 forminfo-->
      <!-- 表单验证 -->
      <el-form :model="forminfo" ref="form" :rules="rules" label-width="130px">
     

        <!-- 分类名称 -->
        <el-form-item prop="title" label="轮播图名称">
          <el-input v-model="forminfo.title" placeholder="请输入轮播图名称"></el-input>
        </el-form-item>
        <!-- 图片 -->
        <!-- on-preview已上传 -->
        <!-- file-list 上传的文件列表  -->
        <el-form-item label="图片">
          <el-upload
            action=""
            list-type="picture-card"
            :on-preview="see"
            :on-change="change"
            :on-remove="remove"
            :limit="1"
            :auto-upload="false"
            :file-list="filelist"
          >
            <i slot="default"  class="el-icon-plus"></i>
          </el-upload>

          <!-- 对话框:append-to-body="true" -->
          <el-dialog :visible.sync="dialogVisible" title="查看图片" :append-to-body="true">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </el-form-item>
        <!-- 开关 -->
        <el-form-item label="状态">
          <el-switch v-model="forminfo.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
        <el-form-item >
          <el-button type="primary" @click="submit">提交</el-button>
          <el-button type="warning" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
// 弹窗操作添加,修改数据
import { addBanner, editBanner } from "@/request/banner";

// 弹窗中菜单参数(接口文档)post
let defaultItem = {
  id:0,
  title:"",
  img:"",
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
      // 图片不可见，地址为空
      dialogVisible:false,
      dialogImageUrl:"",
      filelist:[],
      // 拷贝数据，实现数据更新
      forminfo: { ...defaultItem },
      //  验证规则，必填项
      rules: {
         catename:[{required:true,message:"必填！",trigger:'blur'}]
      },

    };
  },
  methods: {
    see(file){
      console.log(file);
       this.dialogVisible=true;
       // JS 生成的预览地址！
       this.dialogImageUrl=file.url;   
    },
    change(file,filelist){
      // file.raw 是原生文件信息！
      this.forminfo.img=file.raw
    },
    // 监听删除
    remove(file,fileList){
       this.forminfo.img =''
    },
    // 修改(图片的回显)
    // host（main.js准备地址）
    setinfo(val) {
      // 判断是否有图片
      if(val.img){
        this.filelist=[{
          name:val.title,
          url:this.$host+val.img
        }]
      }
      // 不需要children
      val.children?delete val.children:''
      // 将数据赋给默认defaultItem; 赋给表单
      defaultItem = { ...val };
      this.forminfo = { ...val };
    },
    async submit() {
      // 表单验证！
      this.$refs.form.validate(async valid => {
        if (valid) {
          //   添加删除均执行,code=200
          let res;
          // 提交FormData类型(虚拟创建了一个表单)
           let fd = new FormData();
           console.log(fd);
          for(let k in this.forminfo){
            fd.append(k,this.forminfo[k])
                    }
          //   添加还是修改
          if (this.info.isAdd) {
            res = await addBanner(fd);
          } else {
            res = await editBanner(fd);
          }
          if (res.code == 200) {
            this.$message.success(res.msg);
            //   关闭弹窗
            this.info.isShow = false;
            // 调用父组件的update方法，去更新列表
            this.$parent.update()
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
    // 无论是修改成功还是添加成功，都应该让表单为空！或者弹框关闭的时候！
    cancel() {
      this.forminfo = { ...resetItem };
      // 设为空，就没有了！
      this.filelist = [];
    },
  },
  components: {},
};
</script>
<style scoped>
</style>