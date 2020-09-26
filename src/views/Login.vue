<template>
<!-- 行 -->
 <el-row class="login-bg">
   <!-- 列 -->
   <el-col :span="8" class="login-box">
      <!-- 登录内容区 -->
      <h3>小U商城管理系统</h3>
      <!-- 表单 model绑定(参考接口文档)-->
      <el-form :model="forminfo" ref="form" :rules="rules">
        <el-form-item >
          <!-- 账号输入框 -->
          <el-input v-model="forminfo.username" placeholder="请输入账号">
              <template slot="prepend">
                <!-- 图标 -->
                <i class="el-icon-user"></i>
              </template>
          </el-input>
        </el-form-item>
         <el-form-item >
          <!-- 密码输入框 -->
          <!-- show-password 密码可视 -->
          <el-input v-model="forminfo.password" show-password placeholder="请输入密码">
              <template slot="prepend">
                <!-- 图标 -->
                <i class="el-icon-lock"></i>
              </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="login-btn" type="primary" @click="submit">登录</el-button>
        </el-form-item>
      </el-form>
      
   </el-col>
 </el-row>
 
  
</template>

<script>
import { mapActions } from 'vuex'
export default {
    data(){
        return{

        forminfo:{
            username:"小丽",
            password:"123"
          },
        rules:{
          // 账号密码必填
            username:[{required:true,message:"必填！",trigger:'blur'}],
            password:[{required:true,message:"必填！",trigger:'blur'}],
        }
        }
        
    },
    created(){},
    methods:{
      ...mapActions({login:"user/login"}),
      submit(){
         this.$refs.form.validate(valid=>{
           if(valid){
             this.login(this.forminfo)
           }
         })
      }
    },

    components:{}
}

</script>
<style scoped>
.login-bg{
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("../assets/img/bg.jpg");
  /* 图片铺满屏幕 */
  background-size: 100% 100%;
}
.login-box{
  background-color: #fff;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0,.2);
  padding: 30px 40px;
  border-radius: 5px;
  border: 1px solid #eee;
}
.login-box h3{
  line-height: 40px;
  text-align: center;
  margin-bottom: 20px;
}
/* 实现通栏 */
.login-btn{
display: block;
width: 100%;
}
</style>