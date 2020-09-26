// 导入axios
import $axios from "@/common/http"


// 获取方式以及接口地址
// 获取请求列表??
export async function getBanner() {
    let res = await $axios.get("/bannerlist")
    // code既要为200,list存在
    if (res.code == 200 && res.list) {
        return res.list
    } else { 
        return []
    }
}

// 添加数据
export function addBanner(data) {
    return $axios.post("/banneradd", data)
}


// 修改数据
export function editBanner(data) {
    return $axios.post("/banneredit", data)
}

// 删除id  {id:id}
export function delBanner(id) {
    return $axios.post("/bannerdelete", { id })
}
