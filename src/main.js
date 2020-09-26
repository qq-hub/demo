// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from "./store"
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';



Vue.use(ElementUI);

Vue.config.productionTip = false
// 注册过滤器(只能在模板使用)
import filterObj from "./filter"
for (let k in filterObj) { 
  Vue.filter(k,filterObj[k])
}
// 定义一个地址，可以再任意地方使用
Vue.prototype.$host = "http://localhost:3030"
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,store,
  components: { App },
  template: '<App/>'
})
