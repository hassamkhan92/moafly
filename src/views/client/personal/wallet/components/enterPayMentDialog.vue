<template>
  <MoaflyDialog class="enter-pay-ment-dialog" top="100px" :visible.sync="visible" title="Enter payment details">
    <el-form class="form-box" ref="form" :rules="rules" label-position="top" :model="form">
      <MFormItem class="card-form-item" label="Card information" prop="cardNumber">
        <MInput class="visa-input" suffix maxlength="16" :width="520" oninput="value = value.replace(/[^0-9]/g, '');" v-model="form.cardNumber">
          <img slot="suffix" :src="require('@/assets/images/wallet/wallet-visa.png')" alt="" />
        </MInput>
      </MFormItem>
      <el-row :gutter="20">
        <el-col :span="8">
          <MFormItem prop="month" label="Expiraion date">
            <MSelect v-model="form.month" :isSlot="true" class="input-card" placeholder="Month" width="100%">
              <el-option v-for="item in months" :key="item" :label="item" :value="item"> </el-option>
            </MSelect>
          </MFormItem>
        </el-col>
        <el-col :span="8">
          <MFormItem prop="year" label="year" class="year-form-item">
            <MSelect v-model="form.year" :isSlot="true" class="input-card" placeholder="Year" width="100%">
              <el-option v-for="item in years" :key="item" :label="item" :value="item"> </el-option>
            </MSelect>
          </MFormItem>
        </el-col>
        <el-col :span="8">
          <MFormItem prop="cvc" label="CVC">
            <MInput maxlength="3" v-number="{ max: 1000, min: 1, toFixed: 0 }" class="input-cvc" width="100%" v-model="form.cvc" placeholder="CVC"> </MInput>
          </MFormItem>
        </el-col>
      </el-row>
      <MFormItem label="Billing address" prop="country">
        <MSelect :width="520" :isSlot="true" filterable v-model="form.country">
          <el-option v-for="(item, idx) in options" :key="idx" :label="item.CountryName" :value="item.Code"> </el-option>
        </MSelect>
      </MFormItem>
      <MFormItem label="City" prop="city">
        <MInput :width="520" v-model="form.city"> </MInput>
      </MFormItem>
      <MFormItem label="Line1" prop="line1">
        <MInput :width="520" v-model="form.line1"> </MInput>
      </MFormItem>
      <MFormItem label="Line2">
        <MInput :width="520" v-model="form.line2"> </MInput>
      </MFormItem>
      <MFormItem label="Zip code" prop="postalCode">
        <MInput :width="520" v-model="form.postalCode"> </MInput>
      </MFormItem>
      <div class="btn-box">
        <WButton class="profile" v-throttle radius="6px" :text="btnTitle" v-loading="btnLoad" @handleClick="handlerSbmit" width="520px" height="48px"></WButton>
      </div>
    </el-form>
  </MoaflyDialog>
</template>

<script>
import MFormItem from '@/views/client/sell/components/MFormItem.vue';
import MSelect from '@/views/client/sell/components/MSelect.vue';
import MInput from '@/views/client/sell/components/MInput.vue';
import MoaflyDialog from '@/components/MoaflyDialog';
import WButton from '@/components/Button';
import { mapGetters } from 'vuex';
import countyJson from '/public/assets/data/county.json';
import { validateCardNumber, validateMonth, validateYear, validateCVC } from '@/util/validate.js';
import { getMonths, getYears } from './index';
import * as api from '@/api';
export default {
  name: 'enterPayMentDialog',
  components: {
    MoaflyDialog,
    MFormItem,
    MSelect,
    MInput,
    WButton
  },
  props: {
    btnTitle: {
      type: String,
      default: 'Confirm'
    }
  },
  data() {
    return {
      btnLoad: false,
      options: countyJson,
      visible: false,
      months: getMonths(),
      years: getYears(),
      rules: {
        // cardNumber: [{ required: true, validator: validateCardNumber, trigger: 'blur' }],
        // month: [{ required: true, validator: this.validateMonth, trigger: 'change' }],
        // year: [{ required: true, validator: this.validateYear, trigger: 'change' }],
        // cvc: [{ required: true, validator: validateCVC, trigger: 'blur' }]
        cardNumber: [{ required: true, validator: validateCardNumber, trigger: 'blur' }],
        month: [{ required: true, validator: this.validateMonth, trigger: 'change' }],
        year: [{ required: true, validator: this.validateYear, trigger: 'change' }],
        cvc: [{ required: true, validator: validateCVC, trigger: 'blur' }],
        country: [{ required: true, message: 'Country is required', trigger: 'change' }],
        city: [{ required: true, message: 'City is required', trigger: 'blur' }],
        line1: [{ required: true, message: 'Line1 is required', trigger: 'blur' }],
        // line2: [{ required: true, message: 'Line2 is required', trigger: 'blur' }],
        postalCode: [{ required: true, message: 'PostalCode is required', trigger: 'blur' }]
      },
      form: {
        date: '',
        cardNumber: '',
        expMonth: '',
        expYear: '',
        cvc: '',
        city: '',
        country: '',
        line1: '',
        line2: '',
        postalCode: '',
        state: ''
      }
    };
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    /**
     * 验证月份 两位数
     * @param {*} rule
     * @param {*} value
     * @param {*} callback
     */
    validateMonth(rule, value, callback) {
      let reg = /^(0[1-9]|1[0-2])$/;
      if (!value) {
        callback(new Error('Please enter the month'));
      } else if (!reg.test(value)) {
        callback(new Error('Invalid month'));
      } else {
        if (this.form.year) {
          let date = this.form.year + '-' + this.form.month;
          let checkDate = new Date(date);
          let currentDate = new Date();
          console.log(date, checkDate, currentDate, currentDate - checkDate);
          if (currentDate - checkDate > 0) {
            callback(new Error('Invalid month'));
          } else {
            callback();
          }
        } else {
          callback();
        }
      }
    },
    /**
     * 验证年份
     * @param {*} rule
     * @param {*} value
     * @param {*} callback
     */
    validateYear(rule, value, callback) {
      let reg = /^(0[1-9]|1[0-2])$/;
      if (!value) {
        callback(new Error('Please enter the year'));
      } else if (typeof value !== 'number') {
        callback(new Error('Invalid year'));
      } else {
        if (this.form.month) {
          let date = this.form.year + '-' + this.form.month;
          let checkDate = new Date(date);
          let currentDate = new Date();
          console.log(date, checkDate, currentDate, currentDate - checkDate);
          if (currentDate - checkDate > 0) {
            callback(new Error('Invalid year'));
          } else {
            callback();
          }
        } else {
          callback();
        }
      }
    },
    init() {
      this.visible = true;
    },
    handlerClose() {
      this.visible = false;
    },
    //验证日期格式
    handlerValidDate(e) {
      let value = e.target.value;
      if (!regTestCardPeriod(value)) {
        this.$message.warn('Incorrect validity period format');
        this.form.date = '';
      }
    },
    //提交
    handlerSbmit() {
      this.$refs.form.validate().then(success => {
        if (success) {
          this.btnLoad = true;
          let data = {
            cardNumber: this.form.cardNumber,
            expMonth: this.form.month,
            expYear: this.form.year,
            cvc: this.form.cvc,
            country: this.form.country,
            city: this.form.city,
            line1: this.form.line1,
            line2: this.form.line2,
            postalCode: this.form.postalCode,
            state: this.form.state
          };

          api.pay
            .addPayMethod(data)
            .then(res => {
              if (res.code === 'K-000000') {
                this.$message.success('Congratulations on your first request post!');
                this.btnLoad = false;
                this.handlerClose();
              } else {
                this.btnLoad = false;
                this.$message.error(res.message || 'error');
              }
            })
            .catch(error => {
              this.$message.error(error);
              this.btnLoad = false;
            });
        } else {
          console.log('验证不通过');
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.enter-pay-ment-dialog {
  /deep/.el-dialog {
    max-width: 600px;
    width: 100%;
    min-height: 650px;
    .input-card {
      .el-input__inner {
        // padding-left: 85px;
      }
    }
    .card-form-item {
      .el-form-item__error {
        left: auto;
        right: 0;
        top: auto;
        bottom: 100%;
      }
    }
    .year-form-item {
      .el-form-item__label {
        visibility: hidden;
      }
    }
    .visa-input {
      .el-input__suffix {
        .flex();
      }
    }
  }
  .form-box {
    padding: 0 20px;
    .btn-box {
      width: 100%;
      margin-top: 20px;
      .flex();
    }
  }
}
</style>
