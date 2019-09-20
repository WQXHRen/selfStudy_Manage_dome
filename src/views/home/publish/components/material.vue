<template>
  <el-card class="box-card">
    <!-- 卡片头部 -->
    <div slot="header" class="clearfix">
      <el-radio-group v-model="picType" size="medium" @change="collectChange">
        <el-radio-button label="全部"></el-radio-button>
        <el-radio-button label="收藏"></el-radio-button>
      </el-radio-group>
    </div>

    <!-- 卡片内容 -->
    <el-row :gutter="20" v-loading="loading">
      <el-col class="my_col" :span="8" v-for="ele in picList">
        <el-card :body-style="{ padding: '0px' }">
          <div @click="savePicUrl(ele.url)" class="imgDiv">
            <div class :class="{chooseDiv:currentUrl==ele.url}"></div>
            <img :src="ele.url" class="image" />
          </div>
          <div></div>
        </el-card>
      </el-col>
    </el-row>

    <div class="my_pagination">
      <el-pagination
        background
        @current-change="changePage"
        :page-size="12"
        layout="prev, pager, next"
        :total="total"
        :disabled="loading"
        :current-page.sync="currentPage"
      ></el-pagination>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "material",
  data() {
    return {
      headers: {
        Authorization: `Bearer ${this.$store.state.form.token}`
      },
      currentUrl: "",
      picType: "全部",
      picList: [],
      total: 1,
      loading: false,
      currentPage: 1
    };
  },
  created() {
    this.getData();
    this.currentUrl="";
  },
  methods: {
    //   保存当前选中的图片url
    savePicUrl(url) {
      this.currentUrl = url;
      this.$emit('toCurrentUrl',this.currentUrl)
    },
    //   切换收藏 或全部
    collectChange() {
      this.getData(1);
    },

    //   页码改变事件
    changePage(page) {
      this.getData(page);
    },
    getData(page = 1) {
      this.loading = true;
      this.$axios
        .get("/mp/v1_0/user/images", {
          params: {
            collect: this.picType == "收藏",
            page,
            per_page: 6
          }
        })
        .then(res => {
          //   console.log(res);
          this.picList = res.data.data.results;
          this.total = res.data.data.total_count;
          this.loading = false;
        })
        .catch();
    }
  }
};
</script>

<style>
.imgDiv {
  position: relative;
  cursor: pointer;
  /* background-color: black; */
}
.chooseDiv {
  width: 100%;
  height: 200px;
  position: absolute;
  background: url('data:image/png;base64,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') no-repeat right top;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 10;
}
.upload-demo {
  float: right;
}
.btnClass {
  background-color: #f4f5f6;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.image {
  height: 200px;
  display: block;
  margin: 0 auto;
}
.my_col {
  margin-bottom: 20px;
}
.my_pagination {
  text-align: center;
}
</style>