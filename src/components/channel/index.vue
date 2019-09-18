<template>
  <div id="channel_wrap">
    <el-form-item>
      <el-select placeholder="请选择" v-model="channel_id" @change="$emit('change',channel_id)">
        <el-option value label="全部资讯"></el-option>
        <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
    </el-form-item>
  </div>
</template>

<script>
export default {
  name: "channel",
  data(){
      return{
          options:[],
      }
  },
  props:['channel_id']
  ,
  model:{
    prop:"channel_id",
    event:"change"
  },
  created() {
    this.$axios
      .get("/mp/v1_0/channels")
      .then(bd => {
        this.options = bd.data.data.channels;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style>
</style>