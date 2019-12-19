<template>
  <div class="big_box">
    <div class="my_box">
      <!-- 顶部 -->
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="账号:" label-width="80px">
            <el-input v-model="formInline.user" placeholder="输入账号模糊查询"></el-input>
          </el-form-item>

          <el-form-item label="性别:" label-width="80px">
            <el-select v-model="formInline.gender" placeholder="请选择性别查询" style="width:350px">
              <el-option label="男" value="shanghai"></el-option>
              <el-option label="女" value="beijing"></el-option>
            </el-select>
          </el-form-item>

          <!-- 隐藏 -->
          <span v-show="ensconce">
            <el-form-item label="邮箱:" label-width="70px">
              <el-input v-model="formInline.user" placeholder="请输入邮箱查询"></el-input>
            </el-form-item>

            <el-form-item label="手机号码:" label-width="80px">
              <el-input v-model="formInline.cellphone" placeholder="请输入手机号码查询"></el-input>
            </el-form-item>

            <el-form-item label="状态:" label-width="80px">
              <el-select v-model="formInline.Status" placeholder="请选择性别查询" style="width:350px">
                <el-option label="请选择用户状态" value="shanghai"></el-option>
                <el-option label="正常" value="beijing"></el-option>
                <el-option label="解冻" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </span>

          <el-form-item>
            <el-button type="primary">
              <i class="el-icon-search"></i> 查询
            </el-button>
            <el-button type="primary">
              <i class="el-icon-refresh-right"></i> 重置
            </el-button>
          </el-form-item>

          <span class="unfold" @click="onUnfold" v-show="hide_unfold">
            展开
            <i class="el-icon-arrow-down"></i>
          </span>

          <span class="unfold" @click="onpack" v-show="hide_pack">
            收起
            <i class="el-icon-arrow-up"></i>
          </span>
        </el-form>
      </div>

      <button class="Button_derive">
        <svg
          t="1574411162775"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="7851"
          width="10"
          height="10"
        >
          <path
            d="M843.773346 886.273102H170.70353A67.173863 67.173863 0 0 0 102.403277 954.470956c0 34.098927 25.599795 68.197854 68.197854 68.197855h681.773746c34.098927 0 68.197854-25.599795 68.197854-68.197855-8.601531-34.098927-34.098927-68.197854-76.799385-68.197854z m-383.484932-85.196119c25.599795 25.599795 68.197854 34.098927 93.797649 0l187.390501-187.3905c25.599795-25.599795 34.201326-68.300254 0-93.79765-25.497396-25.599795-68.095455-34.098927-93.69525 0l-76.696987 76.696986V68.206046A67.173863 67.173863 0 0 0 502.988872 0.008192a67.173863 67.173863 0 0 0-68.197854 68.197854v519.880641l-68.197855-68.197854c-25.599795-25.599795-68.197854-34.098927-93.797649 0-25.599795 25.599795-33.996528 68.197854 0 93.69525l187.4929 187.4929z"
            fill="#e6e6e6"
            p-id="7852"
          />
        </svg>
        导出
      </button>

      <button class="Button_toLead">
        <label>
          <svg
            t="1574412488430"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="1134"
            width="11"
            height="11"
          >
            <path
              d="M625.777778 56.888889l227.555555 227.555555h-227.555555z"
              fill="#ffffff"
              p-id="1135"
            />
            <path
              d="M170.666667 910.222222V113.777778h399.189333v226.816H796.444444v179.882666h56.888889V283.704889h-226.588444V56.888889H113.777778v910.222222h376.604444v-56.888889H170.666667z m625.777777-389.688889h56.888889V283.648h-226.588444V56.888889H113.777778v910.222222h376.604444v-56.888889H170.666667V113.777778h399.189333v226.816H796.444444v179.882666z"
              fill="#ffffff"
              p-id="1136"
            />
            <path
              d="M657.408 683.52h257.592889v113.777778h-230.798222l68.096 68.096-77.312 77.312-208.839111-208.896 0.568888-0.568889-6.826666-6.826667 213.617778-213.560889 77.255111 77.255111-93.354667 93.411556z"
              fill="#ffffff"
              p-id="1137"
            />
          </svg>
          导入
          <input type="file" class="toLead" />
        </label>
      </button>

      <!-- 中部 -->
      <div class="middle_box">
        <p>
          <span>
            已选择&nbsp;
            <a href="javascript:void(0)" class="egg_style">{{selection}}</a>项
          </span>
          <a href="javascript:void(0)" class="empty_style" @click="toggleSelection()">清空</a>
        </p>
      </div>

      <!-- 底部表格 -->
      <el-table
        ref="multipleTable"
        :data="tableylse"
        style="width: 98%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="用户账号" width="120">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column prop="name" label="真实姓名" width="150"></el-table-column>
        <el-table-column prop="address" label="头像" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="o_gender" label="性别" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column prop="o_birthday" label="生日" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="o_phone" label="手机号码" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="o_Email" label="邮箱" show-overflow-tooltip width="350"></el-table-column>
        <el-table-column prop="o_state" label="状态" show-overflow-tooltip width="150"></el-table-column>
        <el-table-column prop="o_operation" label="操作" show-overflow-tooltip width="301">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit()">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete()">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 底部页码 -->
      <div class="block">
        <el-pagination
          :current-page="obj.page"
          :page-sizes="[10,20]"
          :page-size="obj.pageSize"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          layout="total, sizes, prev, pager, next, jumper"
          :total="obj.total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      // 双向绑定已选择
      selection: "0",
      //存放多选里面的值
      multipleSelection: [],
      formInline: {
        //账号
        user: "",
        //性别
        gender: "",
        //邮箱
        Email: "",
        //手机号码
        cellphone: "",
        //状态
        Status: ""
      },
      //隐藏部分输入框内容
      ensconce: false,
      //展开隐藏
      hide_unfold: true,
      //收起隐藏
      hide_pack: false,
      //更多隐藏
      box_Gxd: false,

      // 页码部分
      obj: {
        // 总条数
        total: 20,
        // 页容量
        pageSize: 10,
        // 当前页
        page: 1
      },
      // 页码数组一显示页面
      tableylse: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: (
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          ),
          o_gender: "男",
          o_birthday: "2018-12-05",
          o_phone: "13911111111",
          o_Email: "1064582035@qq.com",
          o_state: "正常"
        },
        {
          date: "2016-05-03",
          name: "吴大哥",
          address: (
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          ),
          o_gender: "男",
          o_birthday: "2018-12-05",
          o_phone: "13911111111",
          o_Email: "1064582035@qq.com",
          o_state: "正常"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: (
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          ),
          o_gender: "男",
          o_birthday: "2018-12-05",
          o_phone: "13911111111",
          o_Email: "1064582035@qq.com",
          o_state: "正常"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: (
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          ),
          o_gender: "男",
          o_birthday: "2018-12-05",
          o_phone: "13911111111",
          o_Email: "1064582035@qq.com",
          o_state: "正常"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: (
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          ),
          o_gender: "男",
          o_birthday: "2018-12-05",
          o_phone: "13911111111",
          o_Email: "1064582035@qq.com",
          o_state: "正常"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: (
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          ),
          o_gender: "男",
          o_birthday: "2018-12-05",
          o_phone: "13911111111",
          o_Email: "1064582035@qq.com",
          o_state: "正常"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: (
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          ),
          o_gender: "男",
          o_birthday: "2018-12-05",
          o_phone: "13911111111",
          o_Email: "1064582035@qq.com",
          o_state: "正常"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: (
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          ),
          o_gender: "男",
          o_birthday: "2018-12-05",
          o_phone: "13911111111",
          o_Email: "1064582035@qq.com",
          o_state: "正常"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: (
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          ),
          o_gender: "男",
          o_birthday: "2018-12-05",
          o_phone: "13911111111",
          o_Email: "1064582035@qq.com",
          o_state: "正常"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: (
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          ),
          o_gender: "男",
          o_birthday: "2018-12-05",
          o_phone: "13911111111",
          o_Email: "1064582035@qq.com",
          o_state: "正常"
        }
      ],

      // 页码数组二显示页面
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: (
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          ),
          o_gender: "男",
          o_birthday: "2018-12-05",
          o_phone: "13911111111",
          o_Email: "1064582035@qq.com",
          o_state: "正常"
        },
        {
          date: "2016-05-03",
          name: "吴大哥",
          address: (
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          ),
          o_gender: "男",
          o_birthday: "2018-12-05",
          o_phone: "13911111111",
          o_Email: "1064582035@qq.com",
          o_state: "正常"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: (
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          ),
          o_gender: "男",
          o_birthday: "2018-12-05",
          o_phone: "13911111111",
          o_Email: "1064582035@qq.com",
          o_state: "正常"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: (
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          ),
          o_gender: "男",
          o_birthday: "2018-12-05",
          o_phone: "13911111111",
          o_Email: "1064582035@qq.com",
          o_state: "正常"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: (
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          ),
          o_gender: "男",
          o_birthday: "2018-12-05",
          o_phone: "13911111111",
          o_Email: "1064582035@qq.com",
          o_state: "正常"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: (
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          ),
          o_gender: "男",
          o_birthday: "2018-12-05",
          o_phone: "13911111111",
          o_Email: "1064582035@qq.com",
          o_state: "正常"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: (
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          ),
          o_gender: "男",
          o_birthday: "2018-12-05",
          o_phone: "13911111111",
          o_Email: "1064582035@qq.com",
          o_state: "正常"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: (
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          ),
          o_gender: "男",
          o_birthday: "2018-12-05",
          o_phone: "13911111111",
          o_Email: "1064582035@qq.com",
          o_state: "正常"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: (
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          ),
          o_gender: "男",
          o_birthday: "2018-12-05",
          o_phone: "13911111111",
          o_Email: "1064582035@qq.com",
          o_state: "正常"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: (
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          ),
          o_gender: "男",
          o_birthday: "2018-12-05",
          o_phone: "13911111111",
          o_Email: "1064582035@qq.com",
          o_state: "正常"
        }
      ],

      // 页码数组三显示页面
      page_SZ: [
        {
          date: "2222",
          name: "2222",
          address: (
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          ),
          o_gender: "男22",
          o_birthday: "2012225",
          o_phone: "13911222111111",
          o_Email: "106458222035@qq.com",
          o_state: "正常"
        },
        {
          date: "2222",
          name: "2222",
          address: (
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          ),
          o_gender: "男22",
          o_birthday: "2012225",
          o_phone: "13911222111111",
          o_Email: "106458222035@qq.com",
          o_state: "正常"
        },
        {
          date: "2222",
          name: "2222",
          address: (
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          ),
          o_gender: "男22",
          o_birthday: "2012225",
          o_phone: "13911222111111",
          o_Email: "106458222035@qq.com",
          o_state: "正常"
        },
        {
          date: "2222",
          name: "2222",
          address: (
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          ),
          o_gender: "男22",
          o_birthday: "2012225",
          o_phone: "13911222111111",
          o_Email: "106458222035@qq.com",
          o_state: "正常"
        },
        {
          date: "2222",
          name: "2222",
          address: (
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          ),
          o_gender: "男22",
          o_birthday: "2012225",
          o_phone: "13911222111111",
          o_Email: "106458222035@qq.com",
          o_state: "正常"
        },
        {
          date: "2222",
          name: "2222",
          address: (
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          ),
          o_gender: "男22",
          o_birthday: "2012225",
          o_phone: "13911222111111",
          o_Email: "106458222035@qq.com",
          o_state: "正常"
        },
        {
          date: "2222",
          name: "2222",
          address: (
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          ),
          o_gender: "男22",
          o_birthday: "2012225",
          o_phone: "13911222111111",
          o_Email: "106458222035@qq.com",
          o_state: "正常"
        },
        {
          date: "2222",
          name: "2222",
          address: (
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          ),
          o_gender: "男22",
          o_birthday: "2012225",
          o_phone: "13911222111111",
          o_Email: "106458222035@qq.com",
          o_state: "正常"
        },
        {
          date: "2222",
          name: "2222",
          address: (
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          ),
          o_gender: "男22",
          o_birthday: "2012225",
          o_phone: "13911222111111",
          o_Email: "106458222035@qq.com",
          o_state: "正常"
        },
        {
          date: "2222",
          name: "2222",
          address: (
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          ),
          o_gender: "男22",
          o_birthday: "2012225",
          o_phone: "13911222111111",
          o_Email: "106458222035@qq.com",
          o_state: "正常"
        }
      ]
    };
  },
  methods: {
    //展开
    onUnfold() {
      //显示部分输入框内容
      this.ensconce = true;
      //展开隐藏
      this.hide_unfold = false;
      this.hide_pack = true;
    },
    //收起
    onpack() {
      this.hide_unfold = true;
      //隐藏部分输入框内容
      this.ensconce = false;
      this.hide_pack = false;
    },
    // 触发多选
    handleSelectionChange(val) {
      this.selection = val.length;
      this.multipleSelection = val;
    },
    // 清空多选
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    // 删除
    handleDelete() {
      this.tableylse.splice(0, 1);
      this.$message.success("删除成功");

      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })

        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });

        // this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        //   confirmButtonText: '确定',
        //   cancelButtonText: '取消',
        //   type: 'warning',
        //   center: true
        // }).then(() => {
        //   this.$message({
        //     type: 'success',
        //     message: '删除成功!'
        //   });
        // }).catch(() => {
        //   this.$message({
        //     type: 'info',
        //     message: '已取消删除'
        //   });
        // });
    },
    // 页容量发生改变时候触发
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      if (pageSize === 10) {
        this.tableylse = this.tableData;
        this.obj.total = this.obj.total;
        this.obj.pageSize = this.obj.pageSize;
        this.obj.page = this.obj.page;
      } else if (pageSize === 20) {
        this.tableylse = this.page_SZ;
        this.obj.total = this.obj.total;
        this.obj.pageSize = this.obj.pageSize;
        this.obj.page = this.obj.page;
      }
    },
    //页码改变事件
    handleCurrentChange(page) {
      if (page === 1) {
        this.tableylse = this.tableData;
        this.obj.total = this.obj.total;
        this.obj.pageSize = this.obj.pageSize;
        this.obj.page = this.obj.page;
      } else if (page === 2) {
        this.tableylse = this.page_SZ;
        this.obj.total = this.obj.total;
        this.obj.pageSize = this.obj.pageSize;
        this.obj.page = this.obj.page;
      }
    }
  }
};
</script>
<style scoped  lang="less">
.big_box {
  width: 100%;
  height: 1000px;
  background-color: #eef0f3;
}
.my_box {
  width: 97%;
  background-color: #fff;
  position: relative;
  top: 20px;
  left: 20px;
  right: 20px;
  bottom: 20px;
  padding: 20px;
}
/* 顶部 */

/* 输入框尺寸调节 */
.el-input {
  width: 350px;
}

/*展开与收起字体  */
span.unfold {
  color: #198dfc;
  height: 20px;
  cursor: pointer;
  font-size: 16px;
  position: relative;
  top: 10px;
  right: 0px;
}

/* 导入 */
.Button_toLead {
  width: 100px;
  height: 32px;
  background: #178ffd;
  color: #fff;
  cursor: pointer;
  border-radius: 8%;
}
/* 隐藏input导入 */
.toLead {
  display: none;
}
/* 导出 */
.Button_derive {
  margin-left: 35px;
  width: 100px;
  height: 32px;
  background: #178ffd;
  color: #fff;
  cursor: pointer;
  border-radius: 8%;
  margin-right: 10px;
}

/* 中部 */
.middle_box {
  margin-top: 15px;
  margin-left: 35px;
  font-size: 16px;
  height: 50px;
  width: 98%;
  background-color: #e6f7ff;
  border: 1px solid #b8e4ff;
  border-radius: 7px;
  padding: 15px;
}
/* 字体修改颜色 */
.empty_style {
  color: #2a99ff;
  margin-left: 25px;
}
.egg_style {
  color: #2a99ff;
}

/* 底部框 */
.el-table {
  border: 1px solid #e8e8e8;
  margin: 20px 0px 0px 37px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
  z-index: 999px;
}

.el-table th > .cell {
  text-align: center;
}
.el-table .cell {
  text-align: center;
}
/* 页码 */
.el-pagination {
  margin-left: 50px;
  margin-top: 30px;
}
.el-table__body tbody > tr > td {
  border-right: 1px solid #e8e8e8;
}
thead > tr > th {
  border-right: 1px solid #e8e8e8;
}
</style>