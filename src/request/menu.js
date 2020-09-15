// 导入axios
import $axios from "@/common/http"


// 获取方式以及接口地址
// 获取请求列表??
export async function getMenu() {
    let res = await $axios.get("/menulist?istree=1 ")
    // code既要为200,list存在
    if (res.code == 200 && res.list) {
        return res.list
    } else { 
        return []
    }
}

// 添加数据
export function addMenu(data) {
    return $axios.post("/menuadd", data)
}


// 修改数据
export function editMenu(data) {
    return $axios.post("/menuedit", data)
}

// 删除id  {id:id}
export function delMenu(id) {
    return $axios.post("/menudelete", { id })
}
