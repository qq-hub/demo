<template>
  <div>
    <!-- visible.sync是否显示(默认不显示) -->
    <el-dialog
      :title="info.isAdd ? '添加商品' : '修改商品'"
      @close="cancel"
      :visible.sync="info.isShow"
      width="68%"
    >
      <!-- 表单 forminfo-->
      <!-- 表单验证 -->
      <el-form :model="forminfo" ref="form" :rules="rules" label-width="130px">
        <!-- 内容 -->
        <el-row>
          <!-- 居中对齐 -->
          <el-col :span="12" :offset="5">
            <!-- 活动名称 -->
            <el-form-item prop="title" label="活动名称">
              <el-input
                v-model="forminfo.title"
                placeholder="请输入活动名称"
              ></el-input>
            </el-form-item>

            <el-form-item prop="" label="活动时间">
              <div class="block">
                <el-date-picker
                  v-model="time"
                  type="datetimerange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                >
                </el-date-picker>
              </div>
            </el-form-item>
            <!-- 一级目录 -->
            <el-form-item label="一级分类" prop="first_cateid">
              <el-select
                v-model="forminfo.first_cateid"
                placeholder="请选择"
                @change="oneChange"
              >
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
            <el-form-item label="二级分类">
              <el-select
                v-model="forminfo.second_cateid"
                placeholder="请选择"
                @change="goodsChange"
              >
                <!-- 遍历显示自定义secondlist -->
                <el-option
                  v-for="item in secondlist"
                  :key="item.id"
                  :label="item.catename"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>

            <!-- 商品规格(下拉) -->
            <el-form-item label="选择商品">
              <el-select v-model="forminfo.goodsid" placeholder="请选择">
                <el-option
                  v-for="item in goodlist"
                  :key="item.id"
                  :label="item.goodsname"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 内容 -->
        <el-row>
          <el-col :span="8" :offset="7">
            <el-form-item label="状态">
              <el-switch
                v-model="forminfo.status"
                :active-value="1"
                :inactive-value="2"
              ></el-switch>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 按钮(每个选项卡都有) -->
        <el-row>
          <el-col :span="8" :offset="5">
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
import { mapGetters, mapActions } from "vuex";
// 导入模板
import { addSeck, editSeck } from "@/request/seckill";
import { getFxGoods } from "@/request/goods";
// 弹窗中菜单参数(接口文档)post
let defaultItem = {
  first_cateid: "",
  second_cateid: "",
  title: "",
  begintime: "",
  endtime: "",
  goodsid: "",
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
      // 拷贝数据，实现数据更新
      forminfo: { ...defaultItem },
      //  验证规则，必填项
      rules: {},
      //?
      list: [{ value: "" }],
      // 二级分类
      secondlist: [],
      // 商品
      goodlist: [],
      // 时间
      time: [],
    };
  },
  // 分类
  computed: {
    ...mapGetters({
      catelist: "category/catelist",
    }),
  },
  // 挂载之后
  mounted() {
    if (!this.catelist.length) {
      this.get_category_list();
    }
  },
  methods: {
    ...mapActions({
      // 分类
      get_category_list: "category/get_category_list",
    }),

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
    // 二级分类更新商品
    async goodsChange(id) {
      let res = await getFxGoods(
        this.forminfo.first_cateid,
        this.forminfo.second_cateid
      );
      console.log(res);
      this.goodlist = res;
    },
    // host（main.js准备地址）
    setinfo(val) {
      // 将数据赋给默认defaultItem; 赋给表单
      defaultItem = { ...val };
      this.forminfo = { ...val };
      // 商品一级回显
      this.catelist.forEach((ele) => {
        if (ele.id == val.first_cateid) {
          this.secondlist = val.children;
        }
      });
      // 商品二级回显
      this.goodsChange();
      // 日期回显
      this.time = [new Date(val.begintime * 1), new Date(val.endtime * 1)];
    },
    async submit() {
      console.log(this.time);
      if (!this.time.length) {
        this.$message.warning("请选择活动时间");
        return;
      }
      // 转换成时间戳
      this.forminfo.begintime = this.time[0].getTime();
      this.forminfo.endtime = this.time[1].getTime();
      console.log(this.forminfo);
      // 表单验证！
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          //   添加删除均执行,code=200
          let res;
          //   添加还是修改
          if (this.info.isAdd) {
            res = await addSeck(this.forminfo);
          } else {
            res = await editSeck(this.forminfo);
          }
          // 请求成功后
          if (res.code == 200) {
            this.$message.success(res.msg);
            // 触发update方法
            this.$parent.update();
            //   关闭弹窗
            this.info.isShow = false;
            // 拷贝数据
            this.cancel();
            // 时间清空
            this.time=[]
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
      this.list=[{value:""}]
      // 时间清空
      this.time=[]
    },
  },
  components: {},
};
</script>
<style scoped>
</style>