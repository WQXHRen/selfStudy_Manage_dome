<template>
  <div id="login">
    <div class="form-wrap">
      <div class="header">
        <img src="./images/login_logo.png" alt />
      </div>

      <el-form :model="ruleForm" :rules="rules" ref="loginForm" class="demo-ruleForm">
        <el-form-item placeholder="请输入正确手机号" prop="mobile">
          <el-input v-model="ruleForm.mobile"></el-input>
        </el-form-item>
        <el-form-item placeholder="请输入验证码" prop="code">
          <el-row>
            <el-col :span="12">
              <el-input v-model="ruleForm.code"></el-input>
            </el-col>
            <el-col :span="10" :offset="2">
              <el-button plain :disabled="isDisabled" @click="getCode">{{codeText}}</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item prop="agree">
          <el-checkbox v-model="ruleForm.agree"></el-checkbox>
          <span>
            我已阅读并同意
            <a href="javascript:void(0)">用户协议</a>和
            <a href="javascript:void(0)">隐私条款</a>
          </span>
        </el-form-item>
        <el-form-item>
          <el-button
            class="loginBtn"
            type="primary"
            @click="submitForm('loginForm')"
            :loading="isLoading"
          >登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        mobile: "18801185985",
        code: "",
        agree: false
      },
      isLoading: false,
      isDisabled: false,
      codeText: "获取验证码",
      rules: {
        mobile: [
          { required: true, message: "请输入正确手机号", trigger: "blur" },
          {
            pattern: /0?(13|14|15|18)[0-9]{9}/,
            message: "请输入正确的手机号",
            trigger: "blur"
          }
        ],
        code: [
          { required: true, message: "请输入正确验证码", trigger: "blur" },
          { len: 6, message: "请输入正确验证码", trigger: "blur" }
        ],
        agree: [{ pattern: /true/, message: "请勾选我同意", trigger: "click" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.isLoading = true;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .post("/mp/v1_0/authorizations", this.ruleForm)
            .then(bd => {
              window.localStorage.setItem(
                "userInfo",
                JSON.stringify(bd.data.data)
              );
              this.$message.success("登录成功！");
              this.$router.push("/home");
            })
            .catch(err => {
              this.isLoading = false;
              this.$message.warning("账号密码错误!");
            });
        } else {
          this.isLoading = false;
          return false;
        }
      });
    },
    getCode() {
      this.isDisabled = true;
      let sec = 60;
      let timerId = setInterval(() => {
        sec--;
        this.codeText = `${sec}秒后可再获取`;

        if (sec == 58) {
          this.ruleForm.code = "246810";
        }
        if (sec == 0) {
          clearInterval(timerId);
          this.isDisabled = false;
          this.codeText = "获取验证码";
        }
      }, 1000);
    }
  }
};
</script>

<style lang='scss' scoped>
#login {
  height: 100%;
  background: url("./images/login_bg.jpg") no-repeat center / cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .form-wrap {
    width: 300px;
    height: 300px;
    background-color: white;
    padding: 40px;
    .header {
      text-align: center;
      margin-bottom: 15px;
      img {
        width: 170px;
      }
    }
    .loginBtn {
      width: 100%;
    }
  }
}
</style>