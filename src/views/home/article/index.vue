<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-form ref="form" :model="form">
        <el-form-item label="状态">
          <el-radio-group v-model="form.status">
            <el-radio label>全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="频道">
          <channel @change="form.channel_id=$event"></channel>
        </el-form-item>
        
        <el-form-item label="时间">
          <el-date-picker
            v-model="form.date"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00']"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="filtrate(1)">筛选</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="text item">
      <p>共找到 {{total}} 条符合条件的内容</p>
    </div>
    <template>
      <el-table :data="tableData" v-loading="loading" style="width: 100%">
        <el-table-column prop="cover" label="封面">
          <template slot-scope="scope">
            <img
              height="60"
              width="60"
              v-for="(img,index) in scope.row.cover.images"
              :key="index"
              :src="img"
              alt
            />
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <el-tag>{{scope.row.status | getStatus}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="日期" width="180"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary">修改</el-button>
            <el-button size="mini" type="danger" @click="toDel(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <div class="block">
      <span class="demonstration">显示总数</span>
      <el-pagination
        :disabled="loading"
        background
        :page-size="10"
        layout="total, prev, pager, next"
        :total="total"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
      ></el-pagination>
    </div>
  </el-card>
</template>

<script>
import channel from "@/components/channel";
export default {
  name: "homeArticle",
  components: {
    channel
  },
  data() {
    return {
      loading: false,
      form: {
        status: "",
        channel_id: "",
        date: []
      },
      tableData: [],
      total: 0,
      token: "",
      currentPage: 1
    };
  },
  methods: {
    // 删除文章
    toDel(id) {
      this.$confirm("将删除文件, 是否继续?", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .delete(`/mp/v1_0/articles/${id}`, {
              headers: {
                Authorization: "Bearer " + this.token
              }
            })
            .then(bd => {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.getData(1);
            })
            .catch(err => {
              this.$message({
                type: "warning",
                message: "删除失败!"
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
          console.log(`/mp/v1_0/articles/${id}`);
          console.log(this.token);
        });
    },

    // 筛选
    filtrate(page) {
      this.getData(page);
    },
    // 页码改变
    handleCurrentChange(page) {
      this.getData(page);
    },
    // 获取数据
    getData(page) {
      this.loading = true;
      let userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
      this.token = userInfo.token;
      this.$axios
        .get("/mp/v1_0/articles", {
          headers: {
            Authorization: `Bearer ${userInfo.token}`
          },
          params: {
            status: this.form.status == "" ? undefined : this.form.status,
            channel_id:
              this.form.channel_id == "" ? undefined : this.form.channel_id,
            begin_pubdate: this.form.date[0],
            end_pubdate: this.form.date[1],
            page,
            per_page: 10
          }
        })
        .then(bd => {
          // console.log(bd);
          this.tableData = bd.data.data.results;
          this.total = bd.data.data.total_count;
          this.loading = false;
        })
        .catch(err => {});
    }
  },
  filters: {
    getStatus(val) {
      switch (val) {
        case "":
          return "草稿";
          break;
        case 1:
          return "待审核";
          break;
        case 2:
          return "审核通过";
          break;
        case 3:
          return "审核失败";
          break;
        case 4:
          return "已删除";
          break;

        default:
          return "未知";
          break;
      }
    }
  },
  created() {
    this.getData();
  }
};
</script>

<style scoped>
</style>