<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="comment_status" label="评论状态">
        <template slot-scope="scope">{{scope.row.comment_status?"正常":"关闭"}}</template>
      </el-table-column>
      <el-table-column prop="total_comment_count" label="评论总数"></el-table-column>
      <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
      <el-table-column label="允许评论">
        <template slot-scope="scope">
          <el-switch
            @change="Schange(scope.row)"
            v-model="scope.row.comment_status"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template>
          <el-button type="primary" size="mini" plain>修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        @size-change="pageSize"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      currentPage: 1,
      total: 0,
      per_page: 10
    };
  },
  methods: {
    handleCurrentChange(nowPage) {
      this.getData(nowPage);
    },
    pageSize(pageSize) {
      this.per_page = pageSize;
      this.getData();
    },
    Schange(row) {
      this.$axios.put(
        "/mp/v1_0/comments/status",
        {
          allow_comment: row.comment_status
        },
        {
          params: {
            article_id: row.id.toString().trim()
          }
        }
      );
    },
    getData(page = 1) {
      this.$axios
        .get("/mp/v1_0/articles", {
          params: {
            response_type: "comment",
            page: page,
            per_page: this.per_page
          }
        })
        .then(bd => {
          // window.console.log(bd);

          this.tableData = bd.data.data.results;
          this.total = bd.data.data.total_count;
        })
        .catch(err => {
          window.console.log(err);
        });
    }
  },
  created() {
    this.getData(1);
  }
};
</script>

<style>
.pagination{
  text-align: center;
}
</style>