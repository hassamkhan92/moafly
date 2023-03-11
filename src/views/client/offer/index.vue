<template>
  <div v-if="step <= 5" class="offer-container">
    <div v-if="step !== 2" class="house-info">
      <div class="left">
        <img class="home-photo" :src="houseInfo.imgUrl" />
        <div class="info-col">
          <div class="row-content">{{ homeDetail.unparsedAddress || '-' }}</div>
          <div class="row-header">{{ `${homeDetail.city || '-'}, ${homeDetail.stateOrProvince || '-'} ${homeDetail.postalCode || '-'}` }}</div>
        </div>
        <div class="info-col">
          <div class="row-content">${{ homeDetail.listPrice ? Number(homeDetail.listPrice).toLocaleString() : '-' }}</div>
          <div class="row-header">Price</div>
        </div>
      </div>

      <div class="right">
        <div class="info-col">
          <div class="row-content">{{ houseInfo.bedRoomsTotal || '-' }}</div>
          <div class="row-header">Beds</div>
        </div>
        <div class="info-col">
          <div class="row-content">{{ houseInfo.bathRoomsTotal || '-' }}</div>
          <div class="row-header">Baths</div>
        </div>
        <div class="info-col">
          <div class="row-content">{{ houseInfo.livingArea || '-' }}</div>
          <div class="row-header">Sq. Ft.</div>
        </div>
      </div>
    </div>

    <div :class="`offer-process step-${step}`">
      <template v-if="step === 1">
        <h2 class="title text-center">Before we get started, have you seen this home in person?</h2>
        <i-radio-button-group v-model="offerInfo.isHave">
          <i-radio-button text="Yes, I have" :value="1"></i-radio-button>
          <i-radio-button text="No, I haven't" :value="0"></i-radio-button>

          <div v-if="offerInfo.isHave === 1" class="hint">
            <h3 class="hint-title">Great!</h3>
            <p class="hint-text">Let's get your offer going.</p>
          </div>

          <div v-else-if="offerInfo.isHave === 0" class="hint">
            <h3 class="hint-title">Got it.!</h3>
            <p class="hint-text">We can figure out if a tour makes sense after we get your offer going.</p>
          </div>
        </i-radio-button-group>
      </template>

      <template v-else-if="step === 2">
        <h2 class="title">Okay! Here's what to expect:</h2>
        <div class="steps-info">
          <div class="step-container">
            <div class="step-rounded">Step1</div>
            <h3 class="step-title">Tell us about yourself</h3>
            <p class="step-text">Answer three quick questions online.</p>
          </div>
          <div class="step-container">
            <div class="step-rounded">Step2</div>
            <h3 class="step-title">Talk to a Moafly Agent</h3>
            <p class="step-text">A local buyer's agent will reach out to discuss the offer you have in mind.</p>
          </div>
          <div class="step-container">
            <div class="step-rounded">Step3</div>
            <h3 class="step-title">Develop a game plan</h3>
            <p class="step-text">If you choose to work with us, your buyer's agent will represent you and write your official offer.</p>
          </div>
          <div class="step-container">
            <div class="step-rounded">Step4</div>
            <h3 class="step-title">Finalize the details</h3>
            <p class="step-text">Your agent will do all the paperwork and negotiate on your behalf.</p>
          </div>
        </div>
        <div class="step-questions">
          <p class="questions-hint">Questions: call us at</p>
          <p class="questions-phone">888.231.2324</p>
        </div>
      </template>

      <template v-else-if="step === 3">
        <h2 class="title text-center">Do you have an offer price in mind?</h2>
        <h6 class="subtitle">Nothing you enter here is final. You and your agent will determine what's best for you.</h6>
        <i-radio-button-group v-model="offerInfo.offerPrice">
          <i-radio-button text="Yes, I have" :value="-1"></i-radio-button>
          <div v-if="offerInfo.offerPrice === -1" class="extra">
            <h6 class="extra-title">What would you like to offer?</h6>
            <el-input v-model="inputOfferPrice" placeholder="$0"></el-input>
          </div>
          <i-radio-button text="No, I'll decide with my Moafly Agent" :value="0"></i-radio-button>
        </i-radio-button-group>
      </template>

      <template v-else-if="step === 4">
        <h2 class="title text-center">How do you plan to pay for this home?</h2>
        <h6 class="subtitle">Nothing you enter here is final. You and your agent will determine what's best for you.</h6>
        <i-radio-button-group v-model="offerInfo.payType">
          <i-radio-button text="Loan" :value="0"></i-radio-button>
          <div v-if="offerInfo.payType === 0" class="extra">
            <h6 class="extra-title">Down Payment</h6>
            <el-input v-model="inputDownPayment" placeholder="0" @input="handleInputDownPaymentChange">
              <template slot="append">%</template>
            </el-input>
          </div>
          <i-radio-button text="All cash" :value="1"></i-radio-button>
          <i-radio-button text="I'll decide with my Moafly Agent" :value="2"></i-radio-button>
        </i-radio-button-group>
      </template>

      <template v-else-if="step === 5">
        <h2 class="title text-center">Tell us a little about yourself</h2>
        <h6 class="subtitle">Nothing you enter here is final. You and your agent will determine what's best for you.</h6>
        <el-row class="user-info-form" :gutter="20">
          <el-form :model="userInfo" label-position="top" ref="userInfoForm" :rules="userInfoRules">
            <el-col :sm="12">
              <el-form-item class="required" label="First Name" prop="fullName">
                <el-input v-model="userInfo.fullName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :sm="12">
              <el-form-item class="required" label="Last Name" prop="lastName">
                <el-input v-model="userInfo.lastName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :sm="12">
              <el-form-item class="required" label="Email" prop="email">
                <el-input v-model="userInfo.email"></el-input>
              </el-form-item>
            </el-col>
            <el-col :sm="12">
              <el-form-item class="required" label="Phone" prop="phoneNum">
                <el-input v-model="userInfo.phoneNum"></el-input>
              </el-form-item>
            </el-col>
            <el-col :sm="24">
              <el-form-item class="optional" label="Is there anything else you want us to know before we talk?">
                <el-input type="textarea" :rows="3" resize="none" v-model="userInfo.remarker" prop="remarker"></el-input>
              </el-form-item>
            </el-col>
            <el-col :sm="24">
              <p>By continuing, you agree to our <a class="privacy" href="/">Terms of Use</a> and <a class="privacy" href="/">Privacy Policy</a></p>
            </el-col>
          </el-form>
        </el-row>
      </template>
    </div>

    <div class="step-footer">
      <pre-button
        v-if="step === 1"
        class="back"
        width="153px"
        height="50px"
        text="Back"
        size="20px"
        radius="4px"
        border="1px solid #ddd"
        color="#999"
        bg-color="#fff"
        @handleClick="handleGoBack"
      ></pre-button>
      <!-- 上一步 -->
      <pre-button
        v-if="step > 2"
        class="back"
        width="153px"
        height="50px"
        text="Previous"
        size="20px"
        radius="4px"
        border="1px solid #ddd"
        color="#999"
        bg-color="#fff"
        @handleClick="stepGoBack"
      ></pre-button>
      <!-- 下一步 -->
      <w-button
        v-if="step < 5"
        class="next"
        width="153px"
        height="50px"
        text="Next"
        size="20px"
        radius="4px"
        border="1px solid #ddd"
        :disabled="isButtonNextDisabled"
        @handleClick="stepGoNext"
      ></w-button>
      <!-- 提交 -->
      <w-button v-else class="next" width="153px" height="50px" text="Submit" size="20px" radius="4px" border="1px solid #ddd" @handleClick="handleSubmit" :disabled="submited"></w-button>
    </div>
  </div>
  <Submitted v-else :data="submitedResult"></Submitted>
</template>

<script>
import iRadioButtonGroup from './components/iRadioButtonGroup.vue';
import iRadioButton from './components/iRadioButton.vue';
import preButton from '@/components/Pre';
import wButton from '@/components/Button';
import is from '@/util/is';
import { offer, search } from '@/api/index.js';
import Submitted from './components/submitted';

export default {
  components: { iRadioButtonGroup, iRadioButton, preButton, wButton, Submitted },
  data() {
    const requiredValidator = (rule, value, callback) => {
      if (value === '') callback(new Error('required'));
      else callback();
    };

    return {
      /** 房屋id */
      id: this.$route.query.id,
      /** 当前流程步骤 */
      step: 1,
      /** 输入框的值 */
      inputOfferPrice: '',
      /** 输入框的值 */
      inputDownPayment: '',
      submited: false,
      homeDetail: {},
      houseInfo: {
        bathRoomsTotal: null,
        bedRoomsTotal: null,
        houseAddress: '',
        imgUrl: undefined,
        listPrice: 0,
        listingKey: '',
        livingArea: null
      },
      offerInfo: {
        isHave: null,
        offerPrice: null,
        downPayment: 0,
        payType: null
      },
      userInfo: {
        fullName: '',
        lastName: '',
        email: '',
        phoneNum: '',
        remarker: ''
      },
      submitedResult: {},
      userInfoRules: {
        fullName: [
          {
            validator: requiredValidator
          }
        ],
        lastName: [
          {
            validator: requiredValidator
          }
        ],
        email: [
          {
            validator: (rule, value, callback) => {
              if (value === '') callback(new Error('required'));
              else if (!is.email(value)) callback(new Error('invalid email'));
              else callback();
            }
          }
        ],
        phoneNum: [
          {
            validator: requiredValidator
          }
        ]
      }
    };
  },
  mounted() {
    const id = this.$route.params.id;
    search
      .getHomeDetails(id)
      .then(res => {
        if (res.code === 'K-000000') {
          const context = res.context;
          this.houseInfo.bathRoomsTotal = Number(context.bathroomsFull) + context.bathroomsHalf * 0.5;
          this.houseInfo.bedRoomsTotal = context.bedroomsTotal;
          this.houseInfo.houseAddress = context.unparsedAddress;
          this.houseInfo.imgUrl = context.imgList[0];
          this.houseInfo.listPrice = context.listPrice;
          this.houseInfo.listingKey = context.listingId;
          this.houseInfo.livingArea = context.livingArea;
          this.homeDetail = context;
        } else throw res;
      })
      .catch(() => {
        this.$router.go(-1);
      });
  },
  methods: {
    handleGoBack() {
      this.$router.go(-1);
    },
    stepGoBack() {
      this.step--;
    },
    stepGoNext() {
      this.step++;
    },
    handleInputDownPaymentChange() {
      const payment = Number(this.inputDownPayment);
      if (payment >= 0 && payment <= 100) this.offerInfo.downPayment = payment;
      else this.offerInfo.downPayment = 0;
    },
    handleSubmit() {
      this.$refs.userInfoForm
        .validate()
        .then(() => {
          this.submited = true;
          let data = Object.assign(this.houseInfo, this.offerInfo, this.userInfo, {
            offerPrice: this.computedOfferPrice,
            downPayment: this.offerInfo.payType === 0 ? this.offerInfo.downPayment : null
          });
          offer
            .addCustomerOffer(data)
            .then(res => {
              if (res.code !== 'K-000000') return Promise.reject();
              this.step = Infinity;
              data = Object.assign(data, res.context, this.homeDetail);
              this.submitedResult = data;
            })
            .catch(err => {
              console.log(err);
              this.submited = false;
            });
        })
        .catch(() => {
          return;
        });
    }
  },
  computed: {
    isButtonNextDisabled() {
      if (this.step === 1 && this.offerInfo.isHave !== null) return false;
      else if (this.step === 2) return false;
      else if (this.step === 3 && this.offerInfo.offerPrice !== null) {
        if (this.offerInfo.offerPrice === -1 && this.computedOfferPrice >= 0) return false;
        else if (this.offerInfo.offerPrice === 0) return false;
        return true;
      } else if (this.step === 4 && this.offerInfo.payType !== null) {
        if (this.offerInfo.payType === 0 && this.offerInfo.downPayment === 0) return true;
        else return false;
      }
      return true;
    },
    computedOfferPrice() {
      const inputPrice = String(this.inputOfferPrice);
      let price = 0;
      if (this.offerInfo.offerPrice === 0) return 0;
      if (inputPrice[0] === '$') price = Number(inputPrice.substring(1));
      else price = Number(inputPrice);
      if (price > 0) return price;
      else return -1;
    }
  }
};
</script>

<style lang="less" scoped>
@import './index';
</style>
