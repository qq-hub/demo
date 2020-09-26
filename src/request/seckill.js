// 导入axios
import $axios from "@/common/http"


// 获取方式以及接口地址
// 获取请求列表??
export async function getSeck() {
    let res = await $axios.get("/secklist")
    // code既要为200,list存在
    if (res.code == 200 && res.list) {
        return res.list
    } else { 
        return []
    }
}

// 添加数据
export function addSeck(data) {
    return $axios.post("/seckadd", data)
}


// 修改数据
export function editSeck(data) {
    return $axios.post("/seckedit", data)
}

// 删除id  {id:id}
export function delSeck(id) {
    return $axios.post("/seckdelete", { id })
}
