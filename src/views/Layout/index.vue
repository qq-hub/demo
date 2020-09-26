<template>
  <div>
      <!-- 3.伸缩：侧边栏 -->
    <el-container class="page">
      <el-aside :width="iscollapse?'64px':'220px'" class="page-nav">
        <!-- Aside content -->
        <left />
      </el-aside>
      <el-container class="page-content">
        <el-header  class="page-header" >
          <top />
          <!-- Header content -->
        </el-header>
        <el-main >
          <tagslist/>
          <router-view />
          <!-- Main content -->
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import top from "./Top";
import left from "./Left";
// 引入滚动条
import tagslist from "./tagslist"
import {mapState} from "vuex"
export default {
  data() {
    return {};
  },
  created() {},
  methods: {},
  computed:{
      ...mapState(['iscollapse'])
  },
  components: {
    top,
    left,
    tagslist
  },
};
</script>
<style scoped>
.page{
    width: 100vw;
    height: 100vh;
}
.page-nav{
    height: 100%;
    background-color: #444;
}
.page-content{
      height: 100%;
    background-color: #f7f7f7;
}
.page-header{
    background-color: #fff;
    box-shadow:  0 0 4px 0 rgba(0,0,0,.3);
    /* 强制修改默认 */
    height: 40px!important;
}


</style>