<!--
 * @Author: zulezhe
 * @Date: 2021-12-14 23:51:00
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-12-29 21:04:23
 * @Path: https://gitee.com/zulezhe/
 * @Description:
-->
<template>
  <div class="login-container common-con">
    <div class="login-header">Reset password</div>
    <div class="login-body">
      <el-form ref="ruleForm" :rules="rules" :model="form" class="login-form">
        <el-form-item prop="email" label="Email" class="username-con">
          <el-input v-model="form.email" class="signEmailIpt input" type="text" placeholder="Enter Your Email" @input="onInput" />
        </el-form-item>
        <el-form-item prop="code" label="Code" class="code-con">
          <el-row type="flex" justify="space-between">
            <el-col :span="16">
              <el-input v-model="form.code" class="code-input input" type="text" placeholder="Enter Code" @input="onInput" />
            </el-col>
            <el-col :span="6">
              <el-button type="primary" v-loading="codeLoading" @click="sendEmailCode" :disabled="countDown ? true : false"> {{ countDown ? countDown : 'Send' }}</el-button></el-col
            >
          </el-row>
        </el-form-item>
        <el-form-item prop="customerPassword" label="Password" class="username-con">
          <el-input v-model="form.customerPassword" class="signEmailIpt input" type="password" placeholder="Enter Password" @input="onInput" />
        </el-form-item>
        <el-form-item prop="customerConfirmPassword" label="ConfirmPassword" class="username-con">
          <el-input v-model="form.customerConfirmPassword" class="signEmailIpt input" type="password" placeholder="Enter Confirm Password" @input="onInput" />
        </el-form-item>
        <el-form-item class="sign-btn-con">
          <WButton text="Reset password" width="100%" radius="4px" :bgColor="bgColor" @handleClick="handleResetPassd" v-loading="isTrue"></WButton>
        </el-form-item>
        <el-form-item class="create-account-con">
          <el-divider></el-divider>
          <p class="forget-title"><router-link to="/login" tag="a">Never mind, I remember it now</router-link></p>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import WButton from '@/components/Button';
import { isPhone, validPassword, validateEamail1, validateSymbol, isPassword } from '@/util/validate';
import * as api from '@/api';
import rsa from '@/util/rsa.js';
import { debounce, throttle } from '@/util/index';
export default {
  components: { WButton },
  data() {
    const validaConFirmPassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error('Please enter your confirm password'));
      }
      if (this.form.customerPassword) {
        if (value !== this.form.customerPassword) {
          callback(new Error('The two inputs are inconsistent'));
        }
      }
      callback();
    };
    const validaPassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error('Please enter your password'));
      }
      if (this.form.customerConfirmPassword) {
        if (value !== this.form.customerConfirmPassword) {
          callback(new Error('The two inputs are inconsistent'));
        }
      }
      callback();
    };
    return {
      rules: {
        email: [{ required: true, validator: validateEamail1, trigger: 'blur' }],
        code: [{ required: true, validator: validateSymbol, trigger: 'blur' }],
        customerPassword: [{ required: true, validator: validaPassword, trigger: 'blur' }],
        customerConfirmPassword: [{ required: true, validator: validaConFirmPassword, trigger: 'blur' }]
      },
      codeLoading: false, // 重置密码loading
      countDown: null, //倒计时
      isTrue: false,
      iconShow: false,
      bgColor: '#ddd',
      form: {
        email: '',
        customerPassword: '',
        customerConfirmPassword: '',
        code: ''
      },
      flag: false
    };
  },
  mounted() {
    if (this.form.email && this.form.code) {
      this.bgColor = ' #353F62';
    } else {
      this.bgColor = ' #ddd';
    }
  },
  methods: {
    /**
     * 输入框值改变事件
     */
    onInput() {
      if ((this.form.email && this.form.code, this.form.customerPassword && this.form.customerConfirmPassword)) {
        this.bgColor = ' #353F62';
      } else {
        this.bgColor = ' #ddd';
      }
    },
    send() {
      console.log('测试');
    },
    /**
     * 发送邮箱验证码
     */
    sendEmailCode() {
      if (!this.form.email) {
        return this.$message.warn('Please enter email');
      }
      this.codeLoading = true;
      api.user
        .sendEmail({
          userEmail: this.form.email
        })
        .then(res => {
          if (res.code === 'K-000000') {
            this.$message.success('Verification code has been sent successfully. Please check your email');
          }
        })
        .catch(err => {
          this.$message.error(err);
        })
        .finally(msg => {
          setTimeout(() => {
            this.codeLoading = false;
            this.handleCountDown();
          }, 1000);
        });
    },

    /**
     * 重置密码确定
     */
    handleResetPassd() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.isTrue = true;
          let confirmPassd = rsa.encrypt(this.form.customerConfirmPassword);
          let data = {
            customerConfirmPassword: confirmPassd,
            customerPassword: confirmPassd,
            verificationCode: this.form.code,
            customerUsername: this.form.email
          };
          api.user
            .editPassd(data)
            .then(res => {
              if (res.code === 'K-000000') {
                this.$message.success('Password changed successfully');
                this.$router.push('/login');
              } else {
                this.$message.error(res.message);
              }
            })
            .catch(err => {
              this.$message.error(err);
            })
            .finally(msg => {
              setTimeout(() => {
                this.isTrue = false;
              }, 1000);
            });
        } else {
          return false;
        }
      });
    },
    handleCountDown() {
      this.countDown = 60;
      this.thimer = setInterval(() => {
        if (this.countDown > 0) {
          this.countDown--;
        } else {
          window.clearInterval(this.thimer);
          this.thimer = null;
        }
      }, 1000);
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
