<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
*{margin:0;padding: 0;}
/* 弹窗线 */
.el-dialog__header{
  border:1px solid #ddd;
  padding: 13px 20px 10px!important;
}
/* 表格 */
.table-bg{
  background-color: #fff;
  padding: 20px;
  margin:  15px 0;
}
.el-form-item{
  margin-bottom: 13px!important;

}
</style>
