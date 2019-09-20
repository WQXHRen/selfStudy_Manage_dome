<template>
  <div>
    <div class="wrap" @click="showDialog">
      <span v-if="!imgURL">点击选择图片</span>
      <i v-if="!imgURL" class="el-icon-plus"></i>
      <img width="200px" height="200px" :src="imgURL" alt v-if="imgURL"/>
    </div>

    <el-dialog title="上传头像" :visible.sync="dialogVisible" width="50%">
      <el-tabs v-model="activeName">
        <el-tab-pane label="上传图片" name="uploadPic">
          <!-- 上传图片 -->
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :show-file-list="false"
            :headers="headers"
            name="image"
            :on-success="uploadSuccess"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>

        <el-tab-pane label="素材库" name="sucaiku">
          <!-- 素材库 -->
          <material @toCurrentUrl ="imageUrl = $event"></material>
        </el-tab-pane>
      </el-tabs>

      <span slot="footer" class="dialog-footer">
        <el-button @click="ulCencel">取 消</el-button>
        <el-button type="primary" @click="uploadOk">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import material from "./material"
export default {
    name:"cover",
    components:{
        material
    },
    props:['imgURL'],
    model:{
      prop:"imgURL",
      event:"coverChange"
    },
  data() {
    return {
      dialogVisible: false,
      upLoadType: "上传",
      imageUrl: "",
      activeName:"uploadPic",
      headers:{
          Authorization:`Bearer ${this.$store.state.form.token}`
      }
    };
  },
  methods: {
    //   点击取消
    ulCencel(){
        this.dialogVisible = false
        this.imageUrl = ""
    },
    //   点击确定
    uploadOk(){
        this.dialogVisible = false
        this.imgURL = this.imageUrl;
        this.$emit('coverChange',this.imgURL)
    },
    //   上传成功钩子
    uploadSuccess(res){
        window.console.log(res)
        this.imageUrl = res.data.url
    },

    showDialog() {
      this.dialogVisible = true;
      this.imageUrl = this.imgURL
    }
  }
};
</script>

<style scoped>
.wrap {
  width: 200px;
  height: 200px;
  border: 1px solid #ccc;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
}
.el-icon-plus {
  font-size: 40px;
}
</style>