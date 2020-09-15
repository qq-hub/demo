import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// 导入模块！
import menu from "@/store/modules/menu"
import role from "@/store/modules/role"
import user from "@/store/modules/user"
let store = new Vuex.Store({
    state: {
        iscollapse: false  // 是否折叠，默认不折叠！
    },
    mutations: {
        TOGGLE(state) {
            state.iscollapse = !state.iscollapse
        }
    },
    modules: {
        menu,role,user   }
})

export default store;