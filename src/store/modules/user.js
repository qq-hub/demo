// 获取菜单列表！
import { getUser, getTotal, Login } from "@/request/user"
// 登入成功弹出信息
import {Message} from "element-ui"
import router from "../../router";
// 如果本地有数据，转化，否则为空
let userinfo = localStorage.getItem("userinfo") ? JSON.parse(localStorage.getItem("userinfo")): {}
export default {
    namespaced: true,
    // size每页数量
    // page页码。从1开始
    state: {
        userlist: [], // 角色列表
        // 分页
        page: 1,// 页码数
        size: 1,// 每页数量
        total:0,//总条数
        userinfo: userinfo
    },
    getters: {
        userlist: state => state.userlist,
        // 分页
        page: state => state.page,
        size: state => state.size,
        total: state => state.total,
        // menus权限
        menus: state => state.userinfo.menus,
        menus_url: state => state.userinfo.menus_url,
        username: state => state.userinfo.username
    },
    mutations: {
        SET_LIST(state,data){
            state.userlist = data;
        },
        // 分页
        SET_PAGE(state,data){
            state.page = data;
        },
        SET_SIZE(state, data){
            state.size = data;
        },
        SET_TOTAL(state, data) {
            state.total = data;
        },
        // 登录页所需用户
        SET_USERINFO(state, data) { 
            // 存入本地,数据持久化
            localStorage.setItem('userinfo', JSON.stringify(data));
            // 存入vuex是为了各组件方便直接拿取数据
            state.userinfo = data;
        },
        // 退出
        QUIT(state) { 
            // 移出本地
            localStorage.removeItem("userinfo");
            // vuex为空
            state.userinfo = {};
            router.push("/login")
        }

    },
    actions: {
        // 请求菜单列表的数据！
        async get_user_list({commit,state,dispatch}){
            let res = await getUser(state.page,state.size);  
            commit('SET_LIST', res)
             // 请求数量
            dispatch('get_user_total')
        },
        // 分页
        async get_user_total({commit}) { 
            let res = await getTotal();
            commit('SET_TOTAL',res)
        },
        set_page({ commit,dispatch }, data){
            commit('SET_PAGE',data)
            dispatch('get_user_list')
        },
        set_size({ commit, dispatch},data){
            commit('SET_SIZE', data)
            dispatch('get_user_list')
        },
        // 登录
        async login({ commit},data) { 
            let res = await Login(data);
            if (res.code == 200) {
                commit('SET_USERINFO', res.list)
                Message.success('登录成功')
                // 跳转到后台首页
                router.push("/")
            } else { 
                Message.error(res.msg) 
            }
        },

    }
};