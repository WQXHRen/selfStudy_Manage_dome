<template>
  <div id="publish_warp">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="form.title" placeholder="请输入标题"></el-input>
      </el-form-item>

      <el-form-item label="内容">
        <quillEditor v-model="form.content"></quillEditor>
      </el-form-item>

      <el-form-item label="头像">
        <el-radio-group v-model="form.cover.type">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>

        <el-row :gutter="20" v-if="form.cover.type>0">
          <el-col v-for="(item,index) in form.cover.type" :span="4">
            <cover
              :imgURL="form.cover.images[index]"
              @coverChange="form.cover.images[index]=$event"
            ></cover>
          </el-col>
        </el-row>
      </el-form-item>

      <!-- 频道 -->
      <el-form-item label="频道">
        <channel v-model="form.channel_id"></channel>
      </el-form-item>

      <el-form-item>
        <!-- 按钮 -->
        <el-button size="small" @click="sendaArticle">发布</el-button>
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
import cover from "./components/cover";

import { quillEditor } from "vue-quill-editor";

export default {
  name: "publish",
  components: {
    quillEditor,
    channel,
    cover
  },
  data() {
    return {
      form: {
        title: "",
        channel_id: "",
        cover: {
          type: 1,
          images: []
        },
        content: ""
      },
      oldform: {
        title: "",
        channel_id: "",
        cover: {
          type: 0,
          images: []
        },
        content: ""
      }
    };
  },
  methods: {
    sendaArticle() {
      this.$axios
        .post("/mp/v1_0/articles", this.form)
        .then(bd => {
          // console.log(bd);
          this.$message.success("发布成功!");
          this.oldform = this.form;
          this.$router.push("/article");
        })
        .catch(err => {
          this.$message.warning("发布失败!");
          // console.log(err);
        });
    },
    getData() {
      let id = this.$route.params.id;
      this.$axios
        .get("/mp/v1_0/articles/" + id)
        .then(bd => {
          // console.log(bd);
          this.form.title = bd.data.data.title;
          this.form.content = bd.data.data.content;
          this.form.channel_id = bd.data.data.channel_id;
          this.form.cover.type = bd.data.data.cover.type;
          this.form.cover.images = bd.data.data.cover.images;

          this.oldform.title = this.form.title;
          this.oldform.content = this.form.content;
          this.oldform.channel_id = this.form.channel_id;
          this.oldform.cover.type = this.form.cover.type;
          this.oldform.cover.images[0] = this.form.cover.images[0];
          this.oldform.cover.images[1] = this.form.cover.images[1];
          this.oldform.cover.images[2] = this.form.cover.images[2];
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    if (this.$route.name == "edit") {
      this.getData();
    } else {
      this.oldform.title = this.form.title;
      this.oldform.content = this.form.content;
      this.oldform.channel_id = this.form.channel_id;
      this.oldform.cover.type = this.form.cover.type;
      this.oldform.cover.images[0] = this.form.cover.images[0];
      this.oldform.cover.images[1] = this.form.cover.images[1];
      this.oldform.cover.images[2] = this.form.cover.images[2];
    }
  },
  watch: {
    "$route.params.id"() {
      if (this.$route.name == "edit") {
        this.getData();
      } else {
        this.form.title = "";
        this.form.content = "";
        this.form.channel_id = "";
        this.form.cover = {
          type: 1,
          images: []
        };

        this.oldform.title = "";
        this.oldform.content = "";
        this.oldform.channel_id = "";
        this.oldform.cover = {
          type: 1,
          images: []
        };
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    if (
      this.oldform.title == this.form.title &&
      this.oldform.content == this.form.content &&
      this.oldform.channel_id == this.form.channel_id &&
      this.oldform.cover.type == this.form.cover.type &&
      this.oldform.cover.images[0] == this.form.cover.images[0] &&
      this.oldform.cover.images[1] == this.form.cover.images[1] &&
      this.oldform.cover.images[2] == this.form.cover.images[2]
    ) {
      next();
    } else {
      // 导航离开该组件的对应路由时调用
      // 可以访问组件实例 `this`
      this.$confirm("有更改的内容,是否退出?", "是否离开", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          next();
        })
        .catch(() => {});
    }
  }
};
</script>

<style>
#publish_warp {
  padding: 30px 30px 0px 0px;
}
.ql-editor {
  height: 300px !important;
}
</style>