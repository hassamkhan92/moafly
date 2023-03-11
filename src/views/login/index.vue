<template>
  <div class="login-container common-con">
    <div class="login-header">Welcome Back!</div>
    <div class="login-body">
      <el-form ref="ruleForm" :rules="rules" :model="user" class="login-form">
        <el-form-item prop="userEmail" label="Email" class="username-con">
          <el-input v-model="user.userEmail" class="signEmailIpt input" type="text" placeholder="Enter Email" @input="onInput" />
        </el-form-item>
        <el-form-item prop="password" label="Password" class="password-con">
          <el-input v-model="user.password" class="signPassIpt input" :type="flag ? 'text' : 'password'" placeholder="Password" @keyup.enter.native="doLogin" @input="onInput">
            <i slot="suffix" class="icon" :class="['iconfont', flag ? 'icon-yanjing' : 'icon-yanjing1']" autocomplete="auto" @click="flag = !flag" />
          </el-input>
        </el-form-item>
        <el-form-item class="sign-btn-con">
          <WButton text="Log in" width="100%" radius="4px" :bgColor="bgColor" @handleClick="doLogin" v-loading="isTrue"></WButton>
          <p class="forget-title"><router-link to="/resetPassword" tag="a" class="text">Forgot password?</router-link></p>
        </el-form-item>
        <el-form-item class="create-account-con">
          <el-divider></el-divider>
          <p class="forget-title">First Time Here?&nbsp;<router-link to="/signup" tag="a"> Create Your Free Account…</router-link></p>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import WButton from '@/components/Button';
import rsa from '@/util/rsa.js';
import * as api from '@/api';
let redirectUrl;
// 不重定向白名单，比如从注册跳转到登录，登录之后应该到首页而不是回到注册页
const whiteList = ['/signup', '/login', '/resetPassword'];
function checkIfTokenValid() {
  return new Promise((resolve, reject) => {
    api.user
      .checkIfTokenValid()
      .then(res => {
        if (res.code === 'K-000000') {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(err => {
        resolve(false);
      });
  });
}
export default {
  components: { WButton },
  data() {
    return {
      rules: {
        userEmail: [
          { required: true, message: 'Please enter your email address', trigger: 'blur' },
          { type: 'email', message: 'Please enter the correct email address', trigger: ['blur', 'change'] }
        ],
        password: [{ required: true, trigger: 'blur' }]
      },
      isTrue: false,
      iconShow: false,
      bgColor: '#ddd',
      user: {
        userEmail: '',
        password: ''
      },
      flag: false
    };
  },
  mounted() {
    if (this.user.userEmail && this.user.password) {
      this.bgColor = 'rgb(220, 86, 116)';
    } else {
      this.bgColor = ' #ddd';
    }
  },
  // async created() {
  //   let isLogin = await checkIfTokenValid();
  //   console.log('判断登录是否有效===>', isLogin);
  //   if (isLogin) {
  //     let url = whiteList.indexOf(redirectUrl) === -1 ? redirectUrl : '/';
  //     this.$router.push(url);
  //   }
  // },
  beforeRouteEnter(to, from, next) {
    if (to.query && to.query.redirect) {
      redirectUrl = to.query.redirect;
    } else {
      redirectUrl = from.fullPath;
    }
    next();
  },
  methods: {
    // 值改变 事件
    onInput() {
      if (this.user.userEmail && this.user.password) {
        this.bgColor = 'rgb(220, 86, 116)';
      } else {
        this.bgColor = ' #ddd';
      }
    },
    doLogin() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.isTrue = true;
          api.user
            .login({
              customerPassword: rsa.encrypt(this.user.password),
              customerUsername: this.user.userEmail
            })
            .then(res => {
              if (res.code === 'K-000000') {
                if (res.context.roleId === 1) {
                  this.$store.dispatch('doLogin', res.context);
                  let url = whiteList.indexOf(redirectUrl) === -1 ? redirectUrl : '/';
                  this.$router.push(url);
                  this.isTrue = true;
                } else {
                  this.$message.error('The account or password is incorrect');
                }
              } else if (res.code === 'K-000098') {
                this.$message.error('Service errors');
              } else if (res.code === 'K-000004') {
                this.isTrue = false;
                this.$message.error('The account or password is incorrect');
              }
            })
            .finally(msg => {
              this.isTrue = false;
            });
        } else {
          return false;
        }
      });
    },
    /**
     * 跳转到注册界面
     */
    goRegister() {
      this.$router.push('/signup');
    }
  }
};
</script>
<style scoped lang="less">
.login-container,
.common-con {
  width: 100%;
  height: 100%;
  padding-top: 80px;
  display: flex;
  flex-direction: column;
  .login-header {
    width: 100%;
    height: 100px;
    background-color: #353f62;
    color: #fff;
    font-size: 40px;
    font-weight: 600;
    .flex();
  }
  .login-body {
    width: 100%;
    height: calc(100% - 100px);
    .login-form {
      max-width: 380px;
      width: calc(100% - 80px);
      height: 400px;
      border: 2px solid #dddddd;
      box-shadow: 0px 0px 7px 0px rgba(146, 152, 148, 0.35);
      border-radius: 4px;
      padding: 40px;
      background-color: #fff;
      margin: 30px auto;
      /deep/.el-form-item__content {
        width: 100%;
      }
      .el-form-item {
        width: 100%;
        height: 22%;
        margin-bottom: 20px;
      }
      .forget-title {
        width: 100%;
        font-size: 12px;
        font-weight: 400;
        a {
          color: #353f62;
        }
      }
      .sign-btn-con {
        margin-top: 35px;
        .forget-title {
          text-align: right;
        }
      }
      .create-account-con {
        height: 10%;
        .el-divider {
          margin: 15px 0;
        }
        .forget-title {
          .flex();
        }
      }
      /deep/.el-input {
        .el-input__inner {
          background-color: rgba(0, 0, 0, 0);
          &:focus {
            outline: none;
            border-color: #aaa;
            box-shadow: 0 0 8px #c1d0de;
          }
        }
      }
    }
  }
}
</style>
