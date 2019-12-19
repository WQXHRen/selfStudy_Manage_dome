<template>
  <div id="div" style="height:100%;overflow: hidden;">
    <el-container style="height:100%;overflow: hidden;">
      <!-- 旁边 -->
      <el-aside width="200px" class="aside">
        <el-container class="leftContainer">
          <!-- 左 头部 -->
          <el-header class="leftHeader">
            <img
              class="leftHeaderIcon"
              src="//mat1.gtimg.com/pingjs/ext2020/qqindex2018/dist/img/qq_logo_2x.png"
              alt
            />
          </el-header>

          <!-- 左 内容 -->
          <el-main class="leftMain">
            <el-menu
              :router="true"
              default-active="1"
              class="el-menu-vertical-demo"
              background-color="#353b4e"
              text-color="#fff"
              active-text-color="#ffd04b"
              :unique-opened="true"
              
            >
              <el-menu-item index="1">
                <i class="el-icon-menu"></i>
                <span slot="title">账户信息</span>
              </el-menu-item>

              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-document"></i>
                  <span>内容管理</span>
                </template>
                <el-menu-item index="/publish">发布文章</el-menu-item>
                <el-menu-item index="/article">内容列表</el-menu-item>
                <el-menu-item index="/comment">评论列表</el-menu-item>
                <el-menu-item index="/material">素材管理</el-menu-item>
              </el-submenu>

              <el-submenu index="3">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>粉丝管理</span>
                </template>
                <el-menu-item index="/graphic">粉丝概况</el-menu-item>
                <el-menu-item index="3-2">粉丝画像</el-menu-item>
                <el-menu-item index="3-3">粉丝列表</el-menu-item>
              </el-submenu>

              <el-menu-item index="/setting">
                <i class="el-icon-setting"></i>
                <span slot="title">账户信息</span>
              </el-menu-item>
            </el-menu>
          </el-main>
        </el-container>
      </el-aside>

      <el-container class="rightContainer">
        <!-- 右 头部 -->
        <el-header class="rightHeader">
          <span>萨克带回家按实际</span>

          <el-dropdown trigger="click" @command="handleCommand">
            <span class="el-dropdown-link">
              <img :src="$store.state.form.photo" alt id="photo" />
              {{$store.state.form.name}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="info">个人信息</el-dropdown-item>
              <el-dropdown-item command="gitAddre">git地址</el-dropdown-item>
              <el-dropdown-item command="exit">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
        <!-- 右 内容 -->
        <el-main class="rightMain">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {
        photo: "",
        name: ""
      }
    };
  },
  created() {
    let userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
    this.$store.commit('changeUserInfo',userInfo);
  },
  methods: {
    handleCommand(command) {
      if (command == "exit") {
        window.localStorage.removeItem("userInfo");
        this.$router.push("/");
      } else if (command == "gitAddre") {
        window.open("https://github.com/WQXHRen/toplineproject");
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.aside {
  overflow: hidden;
  .leftContainer {
    overflow: hidden;
    height: 100%;
    .leftHeader {
      overflow: hidden;
      background-color: #2e2f32;
      display: flex;
      justify-content: center;
      align-items: center;
      .leftHeaderIcon {
        width: 150px;
      }
    }
    .leftMain {
      overflow: hidden;
      padding: 0;
      background-color: #323745;
      .el-menu-vertical-demo{
        border-right: none;
      }
      span {
        color: #fff;
      }
    }
  }
}
.rightContainer {
  .rightHeader {
    background-color: cadetblue;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .el-dropdown-link {
      display: flex;
      align-items: center;
      #photo {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 10px;
      }
    }
  }
  .rightMain {
    background-color: white;
    // padding: 10px;
  }
}
</style>