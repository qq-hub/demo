import router from "@/router"
// 本地是否有数据
let taglist=localStorage.getItem('taglist')?JSON.parse(localStorage.getItem('taglist')):[]
export default {
    namespaced:true,
    state: {
        taglist:taglist
    },
    getters: {
        taglist: state => state.taglist
    },
    // state仓库数据，第二个参数调用这个方法传入的数据
    mutations: {
        // 设置标签
        SET_TAGS(state, route) {
            // 所有已存在
            let isExist = state.taglist.some(val => val.fpath == route.fullPath)
            // console.log(isExist);
            console.log(state.taglist);
            // 不存在添加
            if (!isExist) { 
                state.taglist.push({
                    tit: route.meta.title,
                    fpath:route.fullPath
                })
            }
            // 数据持久化
            localStorage.setItem('tagslist',JSON.stringify(state.taglist))
        },
        // 删除某一个，传入两个数据
        DEL_TAGES(state, {index,ischange}) { 
             // 1.删除的是否是激活
            if (ischange) { 
                console.log(ischange);
                // 往前跳转
                state.taglist.splice(index, 1)
                // 2.删除时是否还有值
                if (state.taglist.length) {
                    // 3.删除的是第一个还是其他
                    if (index==0) { 
                        // 删除的是第一个，向后跳转,，但是其实还是index下标这个，因为数组已经发生变化了
                        router.push(state.taglist[index].fpath)
                    } else {
                         // 删除的不是第一个，那么就展示前面一个
                        router.push(state.taglist[index-1].fpath)
                    }
                } else { 
                    // 删除完跳转回首页
                    router.push("/")
                }
            } else { 
                // 不是激活的，删除当前的
                state.taglist.splice(index,1)
            }
        },
        DEL_ALL(state) {
            state.taglist = [],
            router.push("/")
            localStorage.removeItem("taglist")
        },
        DEL_OTHER(state,path) { 
            // 展示触发的那一个(过滤出符合条件的)
            state.taglist = state.taglist.filter(val => val.fpath === path)
            // localStorage.setItem("属性名(键名)","属性值(键值)");
            localStorage.setItem("taglist",JSON.stringify(state.taglist))
        }
       
        
    },
};