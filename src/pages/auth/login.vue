<template>
  <div style="height: 100%;">
    <el-header height="30%">
      <div class="header-area">
        <router-link :to="{ path: '/' }">
          <img src="../../common/img/logo.png">
        </router-link>
        <h3>登录</h3>
      </div>
    </el-header>
    <el-main>
      <el-row type="flex">
        <el-col :span="9"></el-col>
        <el-col :span="6">
          <el-form :model="loginForm" label-position="left" status-icon :rules="loginFormRules" ref="loginForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label-width="0" prop="username">
              <el-input type="text" v-model="loginForm.username" placeholder="请输入用户名" auto-complete="off" clearable></el-input>
            </el-form-item>
            <el-form-item label-width="0" prop="password">
              <el-input type="password" v-model="loginForm.password" placeholder="请输入密码" auto-complete="off" clearable></el-input>
            </el-form-item>
            <el-form-item label-width="0" prop="verifyCode">
              <el-input class="verify-code-input" type="text" v-model="loginForm.verifyCode" placeholder="请输入验证码" auto-complete="off" clearable></el-input>
              <div class="verify-code-img">
                <a href="#" title="点击更换验证码">
                  <img src="../../common/img/verifyCode.png" />
                </a>
              </div>
            </el-form-item>
            <el-form-item label-width="0" style="text-align: center;">
              <el-button type="primary" round style="width: 100%" @click="submitForm('loginForm')">登录</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-main>

    <div class="fixed-page-skip">
      <label @click="skipRegisterPage" title="前往注册页面">
        <i class="el-icon-arrow-right"></i>
      </label>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
    export default {
      data() {
        let validateUsername = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('用户名不能为空'));
          } else if (!(/^[a-zA-Z\u4E00-\u9FA5]([a-zA-Z0-9\u4E00-\u9FA5]|[._]){3,7}$/).test(value)) {
            callback(new Error('请确认用户名合法性'));
          } else {
            callback();
          }
        };
        let validatePassword = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('密码不能为空'));
          } else if (!(/^[a-zA-Z0-9]{6,15}$/).test(value)) {
            callback(new Error('请确认密码合法性'));
          } else {
            callback();
          }
        };
        let checkVerifyCode = (rule, value, callback) => {
          if (!value) {
            return callback(new Error('验证码不能为空'));
          }
          setTimeout(() => {
            // TODO 请求后台判断验证码是否合法
            if (!(/^[a-zA-Z0-9]{4}$/).test(value)) {
              callback(new Error('请确认验证码合法性'));
            } else {
              callback();
            }
          }, 1000);
        };
        return {
          loginForm: {
            username: '',
            password: '',
            verifyCode: ''
          },
          loginFormRules: {
            username: [{
              validator: validateUsername,
              trigger: 'blur'
            }],
            password: [{
              validator: validatePassword,
              trigger: 'blur'
            }],
            verifyCode: [{
              validator: checkVerifyCode,
              trigger: 'blur'
            }]
          }
        };
      },
      methods: {
        // 提交登录表单
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              const loading = this.$loading({
                lock: true,
                text: '登录中...'
              });
              // TODO 存储登录信息，并进行页面跳转
              setTimeout(() => {
                loading.close();
              }, 2000);
            } else {
              this.$message({
                message: '校验失败，无法进行登录',
                type: 'error',
                center: true,
                duration: 1000
              });
              return false;
            }
          });
        },
        // 跳转注册页面
        skipRegisterPage() {
          this.$router.push({ path: '/register' });
        }
      }
    }
</script>

<style scoped lang="less" type="text/less" rel="stylesheet/less">
  @import "../../common/styles/index";

  @verify-code-input-width: 70%;
  @verify-code-input-height: 40px;
  @fixed-page-skip-size: 50px;

  .header-area {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    a {
      display: block;
      font-size: 0;
    }
    h3 {
      text-align: center;
      font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
      margin-top: 10px;
      font-size: 25px;
      letter-spacing: 2px;
      color: @theme-color;
    }
  }

  .verify-code-input {
   width: @verify-code-input-width - 5%;
  }

  .verify-code-img {
    float: right;
    width: 100% - @verify-code-input-width;
    height: @verify-code-input-height;
    a {
      display: block;
      font-size: 0;
      height: 100%;
      width: 100%;
      img {
        display: block;
        height: 100%;
        width: 100%;
      }
    }
  }

  .fixed-page-skip {
    position: fixed;
    bottom: 30px;
    right: 30px;
    label {
      display: block;
      width: @fixed-page-skip-size;
      height: @fixed-page-skip-size;
      border-radius: 50%;
      background-color: @theme-color;
      color: #fff;
      text-align: center;
      line-height: @fixed-page-skip-size;
      cursor: pointer;
    }
  }

</style>
