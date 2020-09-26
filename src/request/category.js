// 导入axios
import $axios from "@/common/http"


// 获取方式以及接口地址
// 获取请求列表??
export async function getCategory() {
    let res = await $axios.get("/catelist?istree=1 ")
    // code既要为200,list存在
    if (res.code == 200 && res.list) {
        return res.list
    } else { 
        return []
    }
}

// 添加数据
export function addCategory(data) {
    return $axios.post("/cateadd", data)
}


// 修改数据
export function editCategory(data) {
    return $axios.post("/cateedit", data)
}

// 删除id  {id:id}
export function delCategory(id) {
    return $axios.post("/catedelete", { id })
}
