<template>
  <el-card class="box-card">
    <!-- 卡片头部 -->
    <div slot="header" class="clearfix">
      <el-radio-group v-model="picType" size="medium" @change="collectChange">
        <el-radio-button label="全部"></el-radio-button>
        <el-radio-button label="收藏"></el-radio-button>
      </el-radio-group>

      <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/">
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
    </div>

    <!-- 卡片内容 -->
    <el-row :gutter="20" v-loading="loading">
      <el-col class="my_col" :span="4" v-for="ele in picList">
        <el-card :body-style="{ padding: '0px' }">
          <div>
            <img :src="ele.url" class="image" />
          </div>
          <div>
            <div class="btnClass">
                <el-tooltip :content="`${ele.is_collected?'取消收藏':'收藏'}`" placement="top">
              <el-button type="text" @click="collectPic(ele)" :icon="`el-icon-star-${ele.is_collected?'on':'off'}`"> </el-button>
              </el-tooltip>
              <el-tooltip content="删除" placement="top">
              <el-button type="text" @click="delPic(ele)" icon="el-icon-delete"> </el-button>
              </el-tooltip>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <div class="my_pagination" >
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
  data() {
    return {
      picType: "全部",
      picList: [],
      total: 1,
      loading:false,
      currentPage:1
    };
  },
  created() {
    this.getData();
  },
  methods: {
    //   删除图片
      delPic(ele){
          this.$axios.delete(`/mp/v1_0/user/images/${ele.id}`)
          .then(res=>{
            //   console.log(res);
              this.$message.success('删除成功!')
              this.getData(this.currentPage)
          })
          .catch(err=>{
              this.$message.error('删除失败!')
          })
      },
    //   收藏和取消收藏
      collectPic(ele){
          ele.is_collected = !ele.is_collected
          this.$axios.put(`/mp/v1_0/user/images/${ele.id}`,{
               collect:ele.is_collected
          })
          .then(res=>{
            //   console.log(res);
            this.getData()
          })
          .catch(err=>{


          })
      },

    //   切换收藏 或全部
      collectChange(){  
        this.getData(1);
      },

    //   页码改变事件
    changePage(page) {
      this.getData(page);
    },
    getData(page = 1) {
        this.loading =true;
      this.$axios
        .get("/mp/v1_0/user/images", {
          params: {
            collect: this.picType == "收藏",
            page,
            per_page: 12
          }
        })
        .then(res => {
        //   console.log(res);
          this.picList = res.data.data.results;
          this.total = res.data.data.total_count;
          this.loading =false;
        })
        .catch();
    }
  }
};
</script>

<style>
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