<template>
  <el-form class="sell-more-detail-container" :model="form" :rules="rules" ref="form">
    <div class="title">
      <div class="text">Advance details.</div>
      <p class="small-text">Please tell us more about your property</p>
    </div>
    <div class="content">
      <div class="form-content">
        <MFormItem label="HOA Fee(Monthly)" prop="hoaFee">
          <MInput prefix :width="314" v-model="form.hoaFee" @input="onInput">
            <span class="unit" slot="prefix">$</span>
          </MInput>
        </MFormItem>
        <MFormItem label="Buyer Agency Comp" prop="buyerAgencyComp">
          <MInput append :width="314" v-model="form.buyerAgencyComp" utilVal="%">
            <span slot="append">%</span>
          </MInput>
        </MFormItem>
        <MFormItem label="High School District">
          <MInput :width="314" v-model="form.heightSchoolDistrict"></MInput>
        </MFormItem>
        <!-- 手机号 -->
        <MFormItem label="Seller phone number" prop="sellerPhone">
          <VuePhoneNumberInput class="phone-number" v-model="form.sellerPhone" :clearable="true" default-country-code="US" :no-example="true" :error="phoneNumberError" @update="phoneNumberUpdate" />
        </MFormItem>
        <MFormItem label="Green Validation">
          <MSelect :width="314" :isSlot="true" v-model="form.greenValidation">
            <el-option v-for="(item, idx) in systemList.GreenValidation" :key="idx" :label="item" :value="item"> </el-option>
          </MSelect>
        </MFormItem>
        <MFormItem label="Power Production">
          <MSelect :width="314" :isSlot="true" v-model="form.powerProduction">
            <el-option v-for="(item, idx) in systemList.PowerProduction" :key="idx" :label="item" :value="item"> </el-option>
          </MSelect>
        </MFormItem>
        <MFormItem label="Start Showing Date" prop="startShowDate">
          <!-- :picker-options="pickerOptionsS" -->
          <MDate type="date" :width="314" v-model="form.startShowDate" ></MDate>
        </MFormItem>
      </div>
      <div class="footer">
        <WButton radius="4px" text="Previous" color="#DC5674" border="1px solid #DC5674" width="100px" height="39px" bgColor="#fff" @handleClick="handlePre"></WButton>
        <WButton radius="4px" text="Next" v-throttle v-loading="loading" width="84px" height="39px" @handleClick="handleNext" class="next-btn"></WButton>
      </div>
    </div>
  </el-form>
</template>
<script>
import MFormItem from '@/views/client/sell/components/MFormItem.vue';
import MSelect from '@/views/client/sell/components/MSelect.vue';
import MInput from '@/views/client/sell/components/MInput.vue';
import MDate from '@/views/client/sell/components/MDate.vue';
import VuePhoneNumberInput from 'vue-phone-number-input';
import 'vue-phone-number-input/dist/vue-phone-number-input.css';
import WButton from '@/components/Button';
import { addHomeInfo, listAssign, viladStep, numberParse, numberFormat } from '@/util/index';
import { mapGetters } from 'vuex';
export default {
  components: { MFormItem, MSelect, WButton, MInput, MDate, VuePhoneNumberInput },
  data() {
    const validaNum = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Buyer Agency Comp is required '));
      } else {
        if (value < 0 || value > 100) {
          callback(new Error('Please provide a correct number'));
        }
        callback();
      }
    };
    const validaPhone = (rule, value, callback) => {
      if (!value) {
        callback(new Error('Phone is required '));
      } else {
        console.log("this.phoneNumberError===>",this.phoneNumberError);
        if (this.phoneNumberError) {
          callback(new Error('Error Phone'));
        }
        callback();
      }
    };

    const validaDate = (rule, value, callback) => {
      let nowTime = new Date().getTime();
      let targetTime = new Date(value).getTime();
      if (targetTime - nowTime < 0) {
        callback(new Error('Should be later than today'));
      }
      callback();
    };
    return {
      bgColor: '#ddd',
      items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
      hsdOptions: [10023, 10029, 10034, 10098],
      GVOptions: [' ', 'Yes', 'No'],
      phoneNumberError: false,
      form: {
        houseStep: '4',
        hoaFee: '',
        buyerAgencyComp: '',
        sellerPhone: '',
        houseId: '',
        heightSchoolDistrict: '',
        greenValidation: '',
        powerProduction: '',
        startShowDate: ''
      },
      loading: false,
      rules: {
        hoaFee: [{ required: true, message: 'HOA Fee(Monthly)', trigger: 'blur' }],
        buyerAgencyComp: [{ required: true, validator: validaNum, trigger: 'blur' }],
        sellerPhone: [{ required: true, validator: validaPhone, trigger: 'blur' }],
        startShowDate: [{ validator: validaDate, trigger: 'change' }]
      },
      pickerOptionsS: {
        disabledDate: time => {
          // 设置可选择的日期为今天之后的一个月内
          let curDate = new Date().getTime();
          // 这里算出一个月的毫秒数,这里使用30的平均值,实际中应根据具体的每个月有多少天计算
          let day = 100 * 24 * 3600 * 1000;
          let dateRegion = curDate + day;
          return (
            time.getTime() < curDate || time.getTime() >= dateRegion //限制小于当天的日期
          ); //
        }
      },
      disabledData: [
        {
          key: 'hoaFee',
          value: ''
        },
        {
          key: 'buyerAgencyComp',
          value: ''
        },
        {
          key: 'sellerPhone',
          value: ''
        }
      ]
    };
  },
  computed: {
    ...mapGetters(['systemList'])
  },
  created() {
    // this.form.sellerPhone = ' ';
  },
  mounted() {
    let homeInfo = this.$store.getters.homeInfo;

    if (homeInfo && homeInfo.houseId) {
      listAssign(this.form, homeInfo);
      console.log('this.form===>', this.form);
      this.form.houseStep = viladStep(homeInfo.houseStep, this.form.houseStep);
    }
  },
  methods: {
    /**
     * 手机号输入框更新
     * @param {*} val
     */
    phoneNumberUpdate(row) {
      console.log('手机号输入更新==>', row.isValid);
      this.phoneNumberError = !row.isValid;
    },
    handlePre() {
      this.$router.push('/sell/features');
    },
    onInput() {
      this.form.hoaFee = numberFormat(this.form.hoaFee);
    },
    handleNext() {
      this.$refs.form.validate().then(success => {
        if (success) {
          this.form.hoaFee = numberParse(this.form.hoaFee);
          this.loading = true;
          //新增房屋
          addHomeInfo(this.form)
            .then(res => {
              if (res) {
                let obj = this.$store.getters.homeInfo;
                this.$store.commit('SET_HOME_INFO', Object.assign(obj, this.form));
                this.loading = false;
                this.$router.push('/sell/description');
              } else {
                this.$message.error(res.message);
                this.loading = false;
              }
            })
            .catch(err => {
              this.$message.error(err);
              this.loading = false;
            });
        }
      });
    }
  }
};
</script>
<style scoped lang="less">
.sell-more-detail-container {
  position: relative;
  width: 100%;
  height: 100%;
  .title {
    margin-bottom: 40px;
    .text {
      .MoaflyText(700, 26px, 32px, #0f1b43);
    }
    .small-text {
      .MoaflyText(500, 14px, 17px, rgba(15, 27, 67, 0.8));
      margin-top: 16px;
    }
  }
  .content {
    .form-content {
      width: 668px;
      .flex();
      justify-content: space-between;
      flex-wrap: wrap;
    }
    /deep/.phone-number {
      width: 314px !important;
      height: 56px;
      // 选择国家
      .select-country-container {
        height: 100%;
        width: 100px;
        min-width: 100px;
        max-width: 100px;
        .country-selector {
          height: 100%;
          .country-selector__input {
            height: 100%;
            padding-top: 0px;
            border-color: rgba(15, 27, 67, 0.4) !important;
            &:hover {
              border-color: rgba(15, 27, 67, 0.4) !important;
            }
          }

          &.is-valid {
            .country-selector__input {
              border-color: rgba(15, 27, 67, 0.4) !important;
            }
          }
          &.is-focused {
            .country-selector__input {
              border-color: #f56c6c !important;
              box-shadow: rgb(220, 86, 116) 0 0 0 0.125rem !important;
            }
          }
        }
        .country-selector__label {
          display: none;
        }
      }
      // 输入内容
      .input-phone-number {
        height: 100%;
        .input-tel__input {
          height: 100%;
          &:hover {
            border-color: rgba(15, 27, 67, 0.4) !important;
          }
        }
        &.is-valid {
          .input-tel__input {
            caret-color: rgba(15, 27, 67, 0.4) !important;
            border-color: rgba(15, 27, 67, 0.4) !important;
          }
          .input-tel__label {
            color: rgba(15, 27, 67, 0.4) !important;
          }
        }
        &.is-focused {
          .input-tel__input {
            border-color: #f56c6c !important;
            box-shadow: rgb(220, 86, 116) 0 0 0 0.125rem !important;
          }
        }
      }

      // .country-selector__input {
      //   &:hover {
      //     border-color: rgba(15, 27, 67, 0.4) !important;
      //   }
      // }
      .input-tel.is-focused {
        .input-tel__input {
          border-color: #f56c6c !important;
          box-shadow: 0 0 0 0.125rem rgb(220, 86, 116) !important;
          &:hover {
            border-color: #f56c6c !important;
          }
        }
        .input-tel__label {
          color: #f56c6c !important;
        }
      }
    }
  }
  .footer {
    display: flex;
    position: absolute;
    right: 0;
    bottom: 60px;
    .next-btn {
      margin-left: 20px;
    }
  }
}
</style>
