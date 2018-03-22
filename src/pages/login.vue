<template>
  <el-container>
    <el-header height="30%" class="v-header-area">
      <router-link :to="{ path: '/' }">
        <img src="../common/img/logo.png">
      </router-link>
      <h3>登录</h3>
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
              <el-input class="verify-code-input" type="text" @keyup.enter.native="submitForm('loginForm')" v-model="loginForm.verifyCode" placeholder="请输入验证码" auto-complete="off" clearable></el-input>
              <div class="verify-code-img">
                <a href="#" title="点击更换验证码" @click="requestVerifyCode">
                  <img :src="verifyCodePic" width="116" height="38" />
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

    <v-float-ball title="前往注册页面" :link="{path : '/register'}">
      <template slot="icon">
        <i class="el-icon-arrow-right"></i>
      </template>
    </v-float-ball>

  </el-container>
</template>

<script type="text/ecmascript-6">
  import * as constants from '../common/js/global_constants'
  import Lockr from 'lockr'
  import VFloatBall from '../components/v_float_ball/v_float_ball'

  const COMPONENT_NAME = 'login';

  export default {
    name: COMPONENT_NAME,
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
        } else if (!(/^[a-zA-Z0-9]{5,15}$/).test(value)) {
          callback(new Error('请确认密码合法性'));
        } else {
          callback();
        }
      };
      let checkVerifyCode = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('验证码不能为空'));
        }
        // 请求后台判断验证码是否合法
        if (!(/^[a-zA-Z0-9]{4}$/).test(value)) {
          callback(new Error('请确认验证码合法性'));
        } else {
          setTimeout(() => {
            this.$http.post("/verify/valid", {
              data: {
                code: value
              }
            }).then((result) => {
              if (result) {
                callback();
              }
              callback(new Error('验证码错误'));
            });
          }, 1000);
        }
      };
      return {
        isSuccessfulCode: false,
        verifyCodePic: "",
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
            trigger: 'change'
          }]
        }
      };
    },
    created() {
      this.$nextTick(this.requestVerifyCode);
    },
    methods: {
      /**
       * 登录提交
       *
       * @param formName
       */
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const loading = this.$loading({lock: true, text: '登录中...'});
            // 登录请求
            this.login(this.loginForm.username, this.loginForm.password).then((value) => {
              this.$refs[formName].resetFields();
              this.loginInit(value);
              loading.close();
              this.$router.replace({ path: '/user/online' });
            }).catch(() => {
              this.$refs[formName].resetFields();
              loading.close();
              this.$notify.error({title: '系统提示', message: '用户名和密码错误，登录失败', duration: 1500});
            });
          } else {
            return false;
          }
        });
      },
      requestVerifyCode() {
        // 请求验证码
        this.$http.post("/verify/generate").then((result) => {
          this.verifyCodePic = result;
          this.$notify.success({title: '系统提示', message: '验证码请求成功', duration: 1000});
        }).catch(() => {
          this.$notify.error({title: '系统提示', message: '验证码请求失败', duration: 1000});
        });
      },
      /**
       * 登录初始化
       *
       * @param value
       */
      loginInit(value) {
        Lockr.set(constants.LOGIN_INFO, value);
        Lockr.set(constants.ASIDE, {
          asideWidth: constants.ASIDE_ON,
          activeMenuItem: constants.ACTIVE_MENU_ITEM,
          activeSubMenu: constants.ACTIVE_SUB_MENU
        });
      },
      /**
       * 登录
       *
       * @param name
       * @param pass
       */
      login(name, pass) {
        return new Promise((resolve, reject) => {
          // 后台登录请求
          this.$http.post("/admin/login", {
            data: {
              username: name,
              password: pass
            }
          }).then((result) => {
            resolve(result);
          }).catch((err) => {
            reject(err);
          });
        })
      }
    },
    components: {
      VFloatBall
    }
  }
</script>

<style scoped lang="less" type="text/less" rel="stylesheet/less">
  @import "../common/styles/index";

  @verify-code-input-width: 70%;
  @verify-code-input-height: 40px;

  .v-header-area {
    height: 100%;
    width: 100%;
    padding: 40px 20px;
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

</style>
