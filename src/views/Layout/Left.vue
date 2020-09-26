<template>
  <div>
    <h3 class="logo">小U商城后台</h3>
    <!-- 菜单组件 -->
    <!-- index唯一标识，拒绝联动 (跳转路径)-->

    <!-- 
      background-color与侧边栏背景颜色保持一致 
      default-active 激活当前菜单 (注意写法)
      collapse 是否水平折叠收起菜单
       2.伸缩：文字
    -->
    <el-menu
     class="page-menu"
      background-color="#444"
      text-color="#fff"
      router
       :default-active="$route.path"
       :collapse=iscollapse
     
    >
      <!-- 菜单(直接打开) -->
      <!-- 折叠:标题span包裹才能折叠(只留下标题) -->
      <el-menu-item index="/index"><i class="el-icon-house"></i><span slot="title">后台首页</span></el-menu-item>
      <!-- 目录 -->
      <!-- (登录后根据权限渲染目录) -->
      <template v-for="(item,index) in menus">
        <!-- 2菜单 -->
        <el-menu-item :index="item.url" v-if="item.type==2">
          <i :class="item.icon"></i>
          <span slot="title">{{item.title}}</span>
        </el-menu-item>
        <!-- 子集 -->
        <el-submenu v-else :index="index+''">
          <template slot="title">
            <i :class="item.icon"></i>
            <span slot="title">{{item.title}}</span>
          </template>
          <el-menu-item 
             v-for="(val,idx) in item.children"
            :index="val.url"
            :key="idx"  
            >
            {{val.title}}
          </el-menu-item>
        </el-submenu>                             
      </template>
      <!-- <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span slot="title">系统设置</span>
        </template>
        <el-menu-item index="/menu">菜单管理</el-menu-item>
        <el-menu-item index="/role">角色管理</el-menu-item>
        <el-menu-item index="/user">管理员管理</el-menu-item>
      </el-submenu> -->

    </el-menu>
  </div>
</template>

<script>
import {mapState,mapGetters} from "vuex"
export default {
    data(){
        return{
          
        }
    },
    created(){},
    computed:{
      ...mapState(["iscollapse"]),
      ...mapGetters({menus:"user/menus"})
    },
    methods:{},
    components:{}
}

</script>
<style scoped>
/* 侧边栏标题 */
  .logo{
     /* 与右边头部高度一致 */
      line-height: 40px;
      text-align: center;
      color: #fff;
      background-color: #666;
      /* 伸缩时强制不换行并溢出隐藏 */
      white-space: nowrap;
      overflow: hidden;
  }
  /* 去掉ul(el-menu)多余边框线 */
  .page-menu{
  border-right: none;
}
</style>