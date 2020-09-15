// 获取菜单列表！
import { getUser,getTotal } from "@/request/user"
export default {
    namespaced: true,
    // size每页数量
    // page页码。从1开始
    state: {
        userlist: [], // 角色列表
        // 分页
        page: 1,// 页码数
        size: 1,// 每页数量
        total:0//总条数
        
    },
    getters: {
        userlist: state => state.userlist,
        // 分页
        page: state => state.page,
        size: state => state.size,
        total: state => state.total
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
    }
};