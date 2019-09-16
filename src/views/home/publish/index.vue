<template>
  <div id="publish_warp">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="form.title" placeholder="请输入标题"></el-input>
      </el-form-item>

      <el-form-item label="内容">
        <quillEditor></quillEditor>
      </el-form-item>

      <el-form-item label="头像">
        <p>先占个位置</p>
      </el-form-item>

      <!-- 频道 -->
      <el-form-item label="频道">
        <channel @change="form.channel_id=$event"></channel>
      </el-form-item>

      <el-form-item>
        <!-- 按钮 -->
        <el-button size="small">发布</el-button>
        <el-button size="small" type="primary">存为草稿</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import channel from "../../../components/channel/index.vue";

import { quillEditor } from "vue-quill-editor";
export default {
  name:"publish",
  components: {
    quillEditor,
    channel
  },
  data() {
    return {
      form: {
        title: "",
        channel_id:""
      }
    };
  }
};
</script>

<style>
#publish_warp{
  padding: 30px 30px 0px 0px;
}
.ql-editor {
  height: 300px !important;
}
</style>