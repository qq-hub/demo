<template>
  <div>
    <!-- 列表组件 -->
    <!-- 自定义事件 -->
    <vlist @edit="edit" ref="list"></vlist>
     <!-- 添加/修改组件(弹窗) -->
    <valter :info="info" ref="dialog" @update="update"></valter>
  </div>
</template>
<script>
import valter from "./valter"
import vlist from "./vlist"

export default {
    data(){
        return{ 
          info:{
             isAdd:false,
             isShow:false
          },
          list:[]
         }
    },
    created(){},
    methods:{
      add(){
        this.info.isAdd=this.info.isShow=true
      },
      edit(val){
         this.info.isAdd=false,
         this.info.isShow=true
        //  弹窗有数据(数据回显)
        // console.log(this.$refs.dialog);
        // 子传父(list按钮传入数据)
        // this.$refs.dialog.forminfo=val
        // 调用组件方法
        this.$refs.dialog.setinfo(val)
      },
      // 通信更新列表数据
      update(){
        // 调用组件获取数据列表的方法
        this.$ref.list.get_list()
      }

    },
    components:{valter,vlist}
}
</script>
<style scoped>
</style>