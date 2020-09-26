import Vue from 'vue'
import Router from 'vue-router'
// 解决同级路由跳转
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
import store from '../store'


Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      component: () => import("@/views/Layout"),
      meta: { title: "管理系统" },
      redirect: "/index",
      // 数组包裹一个个对象
      children: [{
        path: '/index',
        component: () => import("@/views/Index"),
        meta: { title: "后台首页" }
      },
      {
        path: '/menu',
        component: () => import("@/views/System/Menu"),
        meta: { title: "菜单管理" }
      },
      {
        path: '/role',
        component: () => import("@/views/System/Role"),
        meta: { title: "角色管理" }
      },
      {
        path: '/user',
        component: () => import("@/views/System/User"),
        meta: { title: "管理员管理" }
        },
        {
          path: '/category',
          component: () => import("@/views/Shop/Category"),
          meta: { title: "商品分类管理" }
        },
        {
          path: '/specs',
          component: () => import("@/views/Shop/Specs"),
          meta: { title: "商品规格管理" }
        },
        {
          path: '/goods',
          component: () => import("@/views/Shop/Goods"),
          meta: { title: "商品管理" }
        },
        {
          path: '/member',
          component: () => import("@/views/Shop/Member"),
          meta: { title: "会员管理" }
        },
        {
          path: '/banner',
          component: () => import("@/views/Shop/Banner"),
          meta: { title: "轮播图管理" }
        },
        {
          path: '/seckill',
          component: () => import("@/views/Shop/Seckill"),
          meta: { title: "秒杀管理" }
        }
      ]
    },

    {
      path: "/login",
      component: () => import("@/views/Login"),
      meta: { title: "登录" }
    }
  ]
})
// 路由守卫
// 作用:阻止用户通过地址池，访问权限之外的页面
// 判断路由地址是否是登录页面
router.beforeEach((to, from, next) => { 
  // 登录页面
  if (to.path=="/login") {
    document.title = to.meta.title
    next()
  }
  // 非登录页面,是否登录
  else {
    // 登录了可以访问
    if (localStorage.getItem("userinfo")) {
      // 白名单(获取可以访问路由)
      let whiteList = store.getters['user/menus_url']
      // 追加到主页页面
      whiteList.push("/index")
      // 去的地址在 该用户可以访问的地址池中！
      if (whiteList.includes(to.path)) { 
        document.title = to.meta.title
        next()
      }
    }
    // 没有登录想访问去登录页
    else { 
      next("/login")
    }
  }
  // document.title=to.meta.title
  // next();
})

export default router