<template>
  <div>
    <!-- visible.sync是否显示(默认不显示) -->
    <el-dialog
      :title="info.isAdd?'添加商品':'修改商品'"
      @close="cancel"
      :visible.sync="info.isShow"
      width="68%"
    >
      <!-- 表单 forminfo-->
      <!-- 表单验证 -->
      <el-form :model="forminfo" ref="form" :rules="rules" label-width="130px">
        <!-- tabs标签页，tab切换 -->
        <el-tabs v-model="activeName">
          <el-tab-pane label="基本信息" name="first">
            <!-- 内容 -->
            <el-row>
              <!-- 居中对齐 -->
              <el-col :span="12" :offset="5">
                <!-- 一级目录 -->
                <el-form-item label="一级分类" prop="first_cateid">
                  <el-select v-model="forminfo.first_cateid" placeholder="请选择" @change="oneChange">
                    <!-- 规格 -->
                    <el-option
                      v-for="item in catelist"
                      :key="item.id"
                      :label="item.catename"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                  <!-- 二级目录 -->
                </el-form-item>
                <el-form-item label="二级分类" prop="second_cateid">
                  <el-select v-model="forminfo.second_cateid" placeholder="请选择">
                    <!-- 遍历显示自定义secondlist -->
                    <el-option
                      v-for="item in secondlist"
                      :key="item.id"
                      :label="item.catename"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <!-- 商品名称 -->
                <el-form-item prop="goodsname" label="商品名称">
                  <el-input v-model="forminfo.goodsname" placeholder="请输入分类名称"></el-input>
                </el-form-item>
                <!-- 商品价格 -->
                <el-form-item prop="price" label="商品价格">
                  <el-input v-model="forminfo.price" placeholder="请输入分类名称"></el-input>
                </el-form-item>
                <!-- 市场价格 -->
                <el-form-item prop="market_price" label="市场价格">
                  <el-input v-model="forminfo.market_price" placeholder="请输入分类名称"></el-input>
                </el-form-item>
                <!-- 商品图片 -->
                <el-form-item label="图片">
                  <el-upload
                    action
                    list-type="picture-card"
                    :on-preview="see"
                    :on-change="change"
                    :on-remove="remove"
                    :limit="1"
                    :auto-upload="false"
                    :file-list="filelist"
                  >
                    <i slot="default" class="el-icon-plus"></i>
                  </el-upload>
                  <el-dialog :visible.sync="dialogVisible" title="查看图片" :append-to-body="true">
                    <img width="100%" :src="dialogImageUrl" alt />
                  </el-dialog>
                </el-form-item>
                <!-- 商品规格(下拉) -->
                <el-form-item label="商品规格" prop="specsid">
                  <el-select v-model="forminfo.specsid" placeholder="请选择" @change="specsChange">
                    <el-option
                      v-for="item in specslist"
                      :key="item.id"
                      :label="item.specsname"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <!-- 商品属性值(下拉且多选) -->
                <el-form-item label="商品属性值" prop="specsattr">
                  <el-select v-model="forminfo.specsattr" multiple placeholder="请选择">
                    <el-option v-for="item in attrslist" :key="item" :label="item" :value="item"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8"></el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="详情描述" name="second" >
            <!-- 内容 -->
            <el-row>
              <el-col :span="8">
                <!-- 是否新品 -->
                <el-form-item label="是否新品">
                  <el-switch v-model="forminfo.isnew" :active-value="1" :inactive-value="2"></el-switch>
                </el-form-item>
              </el-col>
              <!-- 是否热卖 -->
              <el-col :span="8">
                <el-form-item label="是否热卖">
                  <el-switch v-model="forminfo.ishot" :active-value="1" :inactive-value="2"></el-switch>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="状态">
                  <el-switch v-model="forminfo.status" :active-value="1" :inactive-value="2"></el-switch>
                </el-form-item>
              </el-col>
              <!-- 富文本 -->
              <el-col>
                <!-- uploadImgUrl="#"  自动上传本地图片 -->
                <vue-wangeditor id="editor" width="100%" height="400" ref="wangeditor"></vue-wangeditor>
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
        <!-- 按钮(每个选项卡都有) -->
        <el-row>
          <el-col :span="8" :offset="7">
            <el-form-item>
              <el-button type="primary" @click="submit">提交</el-button>
              <el-button type="warning" @click="reset">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
// 导入富文本插件
import vueWangeditor from "vue-wangeditor";

// 弹窗操作添加,修改数据
import { addGoods, editGoods } from "@/request/goods";
// 导入模板
import { mapGetters, mapActions } from "vuex";

// 弹窗中菜单参数(接口文档)post
let defaultItem = {
  first_cateid: "",
  second_cateid: "",
  goodsname: "",
  price: "",
  market_price: "",
  img: "",
  description: "",
  specsid: "",
  specsattr: [],
  isnew: 2,
  ishot: 2,
  status: 1, // 状态1正常2禁用
};
// bug2重定义一个空数据
let resetItem = { ...defaultItem };
export default {
  props: {
    info: {
      type: Object,
      default() {
        return {
          isAdd: true,
          isShow: false,
        };
      },
    },
  },
  data() {
    return {
      // 图片不可见，地址为空
      dialogVisible: false,
      dialogImageUrl: "",
      filelist: [],
      // 拷贝数据，实现数据更新
      forminfo: { ...defaultItem },
      //  验证规则，必填项
      rules: {
          first_cateid:[{required:true,message:"必填！",trigger:'blur'}],
          second_cateid:[{required:true,message:"必填！",trigger:'blur'}],
          goodsname:[{required:true,message:"必填！",trigger:'blur'}],
         
          specsid:[{required:true,message:"必填！",trigger:'blur'}],
          specsattr:[{required:true,message:"必填！",trigger:'blur'}]
      },
      // 商品显示
      activeName: "first",
      // 二级分类
      secondlist: [],
      // 规格值列表
      attrslist: [],
    };
  },

  computed: {
    ...mapGetters({
      // 分类与规格
      catelist: "category/catelist",
      specslist: "specs/specslist",
    }),
  },
  // 挂载之后
  mounted() {
    // 菜单列表为空时请求数据
    if (!this.catelist.length) {
      this.get_category_list();
    }
    if (!this.specslist.length) {
      this.get_specs_list();
    }
  },
  methods: {
    ...mapActions({
      // 分类，规格，商品
      get_category_list: "category/get_category_list",
      get_specs_list: "specs/get_specs_list",
      get_goods_list: "goods/get_goods_list",
    }),
    see(file) {
      console.log(file);
      this.dialogVisible = true;
      // JS 生成的预览地址！
      this.dialogImageUrl = file.url;
    },
    change(file, filelist) {
      // file.raw 是原生文件信息！
      this.forminfo.img = file.raw;
    },
    // 监听删除
    remove(file, fileList) {
      this.forminfo.img = "";
    },
    // 一级分类变化
    oneChange(id) {
      // 功能：二级分类遍历一级分类的id，获取二级的children,将内容给二级列表
      // 1.每次改变置空
      this.secondlist = [];
      this.forminfo.second_cateid = "";
      // 遍历分类列表
      this.catelist.forEach((val) => {
        // id为当前选中
        // val.id一级分类id
        if (val.id == id) {
          this.secondlist = val.children;
        }
      });
    },
    specsChange(id) {
      // 规格置空
      this.attrslist = [];
      this.forminfo.specsattr = [];
      //  遍历规格列表
      this.specslist.forEach((val) => {
        if (val.id == id) {
          this.attrslist = val.attrs;
        }
      });
    },
    // 修改(图片的回显)
    // host（main.js准备地址）
    setinfo(val) {
      // 判断是否有图片
      if (val.img) {
        this.filelist = [
          {
            name: val.catename,
            url: this.$host + val.img,
          },
        ];
      }
      // 不需要children
      val.children ? delete val.children : "";
      // 商品二级下拉回显
      this.oneChange(val.first_cateid);
      // 属性值下拉回显
      this.specsChange(val.specsid);
      // 删除列表提交时传过来的多余数据,不允许出现这个属性值
      "firstcatename" in val ? delete val.firstcatename : "";
      "secondcatename" in val ? delete val.secondcatename : "";
      // 手动回显编辑器内容
      this.$nextTick(()=>{
                this.$refs.wangeditor.setHtml(val.description);
            })
      // 将数据赋给默认defaultItem; 赋给表单
      defaultItem = { ...val };
      this.forminfo = { ...val };
    },
    async submit() {
      // 获取富文本正文内容
      this.forminfo.description = this.$refs.wangeditor.getHtml();
      // 获取富文本内容：this.$refs.wangeditor.getHtml();
      // 表单验证！
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          //   添加删除均执行,code=200
          let res;
          // 提交FormData类型(虚拟创建了一个表单)
          // append(后台要求的字段名，该字段数据)
          let fd = new FormData();
          console.log(fd);
          for (let k in this.forminfo) {
            fd.append(k, this.forminfo[k]);
          }
          //   添加还是修改
          if (this.info.isAdd) {
            res = await addGoods(fd);
          } else {
            res = await editGoods(fd);
          }
          if (res.code == 200) {
            this.$message.success(res.msg);
            // 无论添加还是修改,保持数据更新
            this.get_goods_list();
            //   关闭弹窗
            this.info.isShow = false;
            // 拷贝数据
             this.cancel();
          } else {
            this.$message.error(res.msg);
          }
        }
      });
    },
    reset() {
      if (this.info.isAdd) {
        // 添加时候的重置！
        this.forminfo = { ...resetItem };
      } else {
        // 修改时候的重置！
        this.setinfo({ ...defaultItem });
      }
    },
    // 无论是修改成功还是添加成功，都应该让表单为空！或者弹框关闭的时候！
    cancel() {
      this.forminfo = { ...resetItem };
      // 设为空，就没有了！
      this.filelist = [];
      // 关闭时手动情况富文本
      this.$refs.wangeditor.setHtml('');
    },
  },
  components: {
    vueWangeditor,
  },
};
</script>
<style scoped>
</style>