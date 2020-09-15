<template>
  <div class="header">
    <div class="lt">
      <!-- 按钮 -->
      <!-- 1.伸缩 按钮状态/切换 -->
      <el-button
        v-if="iscollapse"
        type="primary"
        size="small"
        icon="el-icon-s-unfold"
        @click="TOGGLE"
      ></el-button>
      <el-button v-else type="primary" size="small" icon="el-icon-s-fold" @click="TOGGLE"></el-button>
      <!-- 面包屑 -->
      <!-- 三、根据标题 -->
      <el-breadcrumb separator="/" class="mbx">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{$route.meta.title}}</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 返回按钮 -->
      <!-- 二、地址不是首页，有返回按钮;是首页不要返回按钮-->
      <el-button
        circle
        icon="el-icon-back"
        size="small"
        v-if="$route.path!='/index'"
        @click="$router.back()"
      ></el-button>
    </div>
    <div>
      <el-dropdown>
        <span class="el-dropdown-link">
          欢迎您
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <i class="el-icon-full-screen"></i> 全屏操作
          </el-dropdown-item>
          <el-dropdown-item>
            <i class="el-icon-switch-button"></i> 退出登录
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {};
  },
  created() {},
  computed: {
    ...mapState(["iscollapse"]),
  },
  methods: {
    ...mapMutations(["TOGGLE"]),
  },
  components: {},
};
</script>
<style scoped>
.header {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header .lt {
  display: flex;
  align-items: center;
}
.mbx {
  margin: 0 20px;
}
</style>