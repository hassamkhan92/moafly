<template>
  <div class="login-container common-con">
    <div class="login-header">First Time Here?</div>
    <div class="login-body">
      <el-form ref="ruleForm" :rules="rules" :model="form" class="login-form">
        <el-form-item prop="nickName" label="Name" class="username-con">
          <el-input v-model="form.nickName" class="signEmailIpt input" type="text" placeholder="Enter User Name" @input="onInput" />
        </el-form-item>
        <el-form-item prop="email" label="Email" class="username-con">
          <el-input v-model="form.email" class="signEmailIpt input" type="text" placeholder="Enter Email" @input="onInput" />
        </el-form-item>
        <el-form-item prop="password" class="password-con" label="Password">
          <el-input v-model="form.password" class="signPassIpt input" :type="flag ? 'text' : 'password'" placeholder="Password" @keyup.enter.native="doLogin" @input="onInput">
            <i slot="suffix" class="icon" :class="['iconfont', flag ? 'icon-yanjing' : 'icon-yanjing1']" autocomplete="auto" @click="flag = !flag" />
          </el-input>
        </el-form-item>
        <el-form-item prop="confirmPassword" class="password-con" label="Confirm your password">
          <el-input v-model="form.confirmPassword" class="signPassIpt input" :type="flag ? 'text' : 'password'" placeholder="Confirm Password" @keyup.enter.native="doLogin" @input="onInput">
            <i slot="suffix" class="icon" :class="['iconfont', flag ? 'icon-yanjing' : 'icon-yanjing1']" autocomplete="auto" @click="flag = !flag" />
          </el-input>
        </el-form-item>
        <el-form-item class="sign-btn-con">
          <WButton text="Sign up" width="100%" radius="4px" :bgColor="bgColor" @handleClick="doLogin" v-loading="isLoading"></WButton>
        </el-form-item>
        <el-form-item class="create-account-con">
          <el-divider></el-divider>
          <p class="forget-title">I already have an account, <router-link to="/login" tag="a">log in now</router-link></p>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import WButton from '@/components/Button';
import { getuserData } from '@/util/auth';
import { isPhone, validPassword, validateEamail1, isPassword } from '@/util/validate';
import * as api from '@/api';
import rsa from '@/util/rsa.js';
export default {
  components: { WButton },
  data() {
    return {
      rules: {
        name: [{ required: true, trigger: 'blur' }],
        email: [
          { required: true, message: 'Please enter your email address', trigger: 'blur' },
          { type: 'email', message: 'Please enter the correct email address', trigger: ['blur', 'change'] }
        ],
        password: [{ required: true, trigger: 'blur' }],
        confirmPassword: [{ required: true, trigger: 'blur' }]
      },
      isLoading: false,
      iconShow: false,
      bgColor: '#ddd',
      form: {
        nickName: '',
        email: '',
        password: '',
        confirmPassword: '',
        roleId: 1
      },
      flag: false
    };
  },
  mounted() {
    if (this.form.email && this.form.password) {
      this.bgColor = ' #353F62';
    } else {
      this.bgColor = ' #ddd';
    }
  },
  methods: {
    // 值改变 事件
    onInput() {
      if (this.form.email && this.form.password && this.form.confirmPassword) {
        this.bgColor = ' #353F62';
      } else {
        this.bgColor = ' #ddd';
      }
    },
    doLogin() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.isLoading = true;
          let passd = rsa.encrypt(this.form.confirmPassword);
          api.user
            .signup({
              customerConfirmPwd: passd,
              customerPassword: passd,
              nickName: this.form.nickName,
              customerUsername: this.form.email,
              roleId: this.form.roleId
            })
            .then(res => {
              if (res.code == 'K-000000') {
                this.$router.push('/login');
              } else {
                this.$message.error(res.message);
              }
            })
            .catch(err => {})
            .finally(msg => {
              setTimeout(() => {
                this.isLoading = false;
              }, 1000);
            });
        } else {
          return false;
        }
      });
    },
    //
    goRegister() {
      this.$router.push('/signup');
    }
  }
};
</script>
<style scoped lang="less">
@import './index.less';
#app {
  display: none !important;
}
</style>
