import $axios from "@/common/http"  // 导入封装好的axios!

/**
 * 获取管理员列表
 */
export async function getGoods(page = 1,size=10) {
    let res = await $axios.get("/goodslist",{
        params: {
            page,
            size
        }
    })
    if(res.code==200 && res.list){
        return res.list
    }else{
        return [];
    }
}
/**
 * 
 * @param {*} fid 一级分类
 * @param {*} sid 二级分类
 */
export async function getFxGoods(fid,sid) {
    let res = await $axios.get("/goodslist",{
        params: {
            fid,
            sid
        }
    })
    if(res.code==200 && res.list){
        return res.list
    }else{
        return [];
    }
}
/**
 * 添加管理员
 * @param {*} data  添加的数据
 */
export function addGoods(data) {
    console.log(data);
    return  $axios.post("/goodsadd",data)
}
/**
 * 修改管理员
 * @param {*} data  修改的数据
 */
export function editGoods(data) {
    return $axios.post("/goodsedit", data)
}
/**
 * 删除管理员
 * @param {*} id  删除的用户uid
 */
export function delGoods(id) {
    return $axios.post("/goodsdelete", {id})
}
// 获取管理个数(分页)
export async  function getTotal() {
    let res = await $axios.get("/goodscount")
    return res.list[0].total
}
