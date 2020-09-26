<template>
  <div>
     <el-button type="primary" @click="add">添加商品</el-button>
     <!-- 列表组件 -->
     <vlist @edit="edit"></vlist>
     <!-- 添加/修改组件 -->
     <valter :info="info" ref="dialog"></valter>
  </div>
</template>
<script>
import valter from "./valter"
import vlist from "./vlist"
export default {
    data(){
        return{
          info:{ // 这是组件的info变量！
            isAdd:false,
            isShow:false
          }
        }
    },
    created(){},
    methods:{
      add(){
        this.info.isAdd =  this.info.isShow = true
      },
      edit(val){
        this.info.isAdd = false;
        this.info.isShow = true;
        // 调用弹框组件的setinfo方法！
        this.$refs.dialog.setinfo(val);
      }
    },
    components:{
    valter,vlist
    }
}
</script>
<style scoped>
</style>