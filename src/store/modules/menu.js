// 获取菜单列表！
import { getMenu } from "@/request/menu"
export default {
    // 命名空间
    namespaced: true,
    state: { 
        menulist: []
    }, 
    getters: {
        menulist:state=>state.menulist
    },
    mutations: {
        SET_LIST(state, data) {
            state.menulist=data
        }
    },
    actions: {
        // 请求菜单列表的数据！
        async get_menu_list({commit}) {
            let res = await getMenu();
            commit('SET_LIST', res)
            console.log(res);
        }
    }
}