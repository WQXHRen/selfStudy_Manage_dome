<template>
  <div id="setting">
    <el-container class="setting_container">
      <el-aside width="700px" class="setting_aside">
        <el-form ref="form" :rules="rules" :model="form">
          <el-form-item label="媒体名称" prop="name">
            <el-input v-model="form.name" size="small"></el-input>
          </el-form-item>

          <el-form-item label="媒体简介">
            <el-input type="textarea" autosize v-model="form.intro"></el-input>
          </el-form-item>

          <el-form-item label="头条号id">
            <el-input v-model="form.id" disabled size="small"></el-input>
          </el-form-item>

          <el-form-item label="绑定手机号">
            <el-input v-model="form.mobile" disabled size="small"></el-input>
          </el-form-item>

          <el-form-item label="邮箱" prop="email">
            <el-input v-model="form.email" size="small"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" size="small" @click="saveSetting">保存更新</el-button>
          </el-form-item>
        </el-form>
      </el-aside>
      <el-main class="setting_main">
        <!-- 上传图片 -->
        <el-upload
          class="avatar-uploader"
          action="http://ttapi.research.itcast.cn/mp/v1_0/user/photo"
          :show-file-list="false"
          :http-request="reset_request"
        >
          <img v-if="form.photo" :src="form.photo" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        email: "",
        intro: "",
        photo:"",
        mobile: "",
        id: ""
      },
      rules: {
        name: [{ required: true, message: "请输入媒体名称", trigger: "blur" }],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱",
            trigger: ["blur", "change"]
          }
        ]
      },
      imageUrl: ""
    };
  },
  methods: {

    reset_request(config) {
      let fd = new FormData();
      fd.append("photo", config.file);
    //   window.console.log(fd.get("file"));

      this.$axios
        .patch("/mp/v1_0/user/photo", fd)
        .then(res => {
        //   window.console.log(res);
          this.form.photo=res.data.data.photo;
          this.$store.commit('changeUserInfo',res.data.data)
        })
        .catch();
      //   window.console.log(config);
    },

    saveSetting() {
        window.console.log(this.form)
      this.$axios
        .patch("/mp/v1_0/user/profile", this.form)
        .then(res => {
            // window.console.log(res);
          this.$store.commit('changeUserInfo',res.data.data)
          this.$message.success("修改成功!");
        })
        .catch();
    }
  },
  created() {
    this.$axios
      .get("/mp/v1_0/user/profile")
      .then(res => {
        //   window.console.log(res);
        this.form = res.data.data;
        this.$store.commit('changeUserInfo',res.data.data)
        this.form.id = res.data.data.id.toString();
      })
      .catch();
  }
};
</script>

<style>
#setting {
  height: 100%;
}
.setting_container {
  height: 100%;
}
.setting_aside {
  /* background-color: coral; */
  padding: 20px;
}

/* 上传组件样式 */
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px !important;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>