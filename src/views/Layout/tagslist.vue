<template>
  <div class="tagslist">
    <!-- 滚动条 -->
    <el-scrollbar class="sroll-bar">
      <!-- 标签遍历 type标签样式-->

      <el-tag
        v-for="(tag, index) in taglist"
        :key="index"
        closable
        :type="ischange(tag.fpath) ? '' : 'info'"
        effect="dark"
        class="tags"
        size="small"
        @close="deleSingele(tag.fpath,index)"
      >
        <router-link :to="tag.fpath">{{ tag.tit }}</router-link>
      </el-tag>
    </el-scrollbar>
    <!-- 下拉触发元素呈现为按钮组 split-button-->
    <el-dropdown split-button class="tagaction" size="mini" type="primary">
      标签操作
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="DEL_ALL">关闭所有</el-dropdown-item>
        <el-dropdown-item @click.native="DEL_OTHER($route.fullPath)">关闭其他</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      // list: [111, 22, 33, 44, 55, 66],
    };
  },
  computed: {
    ...mapGetters({
      taglist: "tagsview/taglist",
    }),
  },
  watch: {
    $route: {
      immediate: true,
      deep: true,
      handler(newval) {
        // 路由信息
        console.log(newval);
        // 传入地址信息，加入标签数组
        this.SET_TAGS(newval);
      },
    },
  },
  methods: {
    ...mapMutations({
      SET_TAGS: "tagsview/SET_TAGS",
      DEL_TAGES:"tagsview/DEL_TAGES",
      DEL_ALL:"tagsview/DEL_ALL",
      DEL_OTHER:"tagsview/DEL_OTHER"
    }),
    // 活动的为主题色，其他为info
    ischange(path) {
      return path == this.$route.fullPath;
    },
    // 删除某一个
    deleSingele(path,index){
      if(this.$route.fullPath==path){
          // 删除激活
          this.DEL_TAGES({index,ischange:true})
      }else{
        // 删除灰色按钮的
          this.DEL_TAGES({index})
      }
    } 
  },
};
</script>
<style scoped>
.tagslist {
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  height: 40px;
  background-color: #fff;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.3);
  padding: 0 10px;
  box-sizing: border-box;
}
.tagslist .tags {
  margin: 6px 4px 0;
}
.tagslist .tags a {
  text-decoration: none;
  color: inherit;
  padding: 6px;
}
.tagaction {
  position: absolute;
  right: 10px;
  top: 6px;
}
</style>