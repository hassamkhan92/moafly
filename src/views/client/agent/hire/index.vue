<template>
  <div class="hire-container">
    <div class="back"><i class="el-icon-back" @click="handleGoBack"></i></div>
    <p class="hire-title">Hire</p>

    <div class="agent-info">
      <img class="icon" :src="agentInfo.icon" />
      <div class="info">
        <div class="name">{{ agentInfo.name }}</div>
        <div class="city">
          <img class="location-icon" :src="require('@/assets/images/agent/location.png')" alt="" />
          <span class="city-text">{{ agentInfo.location }}</span>
        </div>
        <p class="agent-introduce">{{ agentInfo.agentIntroduce }}</p>
      </div>
    </div>

    <!-- <div class="request-info form">
      <h3>Request Details</h3>
      <div class="items">
        <div class="item">
          <h6 class="title optional">Related Request Posting</h6>
          <el-select class="input" v-model="submitData.taskId" placeholder="Select an open request posting…">
            <el-option v-for="item in relatedRequest" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </div>
        <div class="item">
          <h6 class="title">Request title</h6>
          <el-input class="input" v-model="submitData.orderTitle" placeholder="Enter the request title" />
        </div>
      </div>
    </div> -->
    <div class="terms-info form">
      <div class="terms-title">Terms</div>
      <div class="items">
        <div class="item">You are protected by <a href="/">Moafly Payment Protection</a>. Only pay for the work you authorize.</div>
        <div class="item-option">
          <p class="option-title">
            Payment Option
          </p>
          <div class="cards-container">
            <option-card
              :active="submitData.payType === 0"
              label
              icon="hour"
              :payImg="pay_hour_left"
              title="Pay by the hour"
              description="Pay for the number of hours worked on a task"
              @click="changePayType(0)"
            ></option-card>
            <option-card
              :payImg="pay_hour_right"
              :active="submitData.payType === 1"
              icon="fixed"
              title="Pay a fixed price"
              description="Pay a fixed price negotiated with your agent"
              @click="changePayType(1)"
            ></option-card>
          </div>
        </div>
        <div class="item">
          <h6 v-if="submitData.payType === 0" class="title">Pay by the hour for your task</h6>
          <h6 v-if="submitData.payType === 1" class="title">Pay a fixed price for your task</h6>
          <el-input v-show="submitData.payType === 1" size="small" class="input pay-input" @input="onInput" v-model="submitData.orderMoney" placeholder="0.00">
            <template #prefix>$</template>
          </el-input>
          <!--   <template slot="append"> USD / hr </template> -->
          <el-input v-if="submitData.payType === 0" size="small" class="input pay-input" disabled :value="agentInfo.agentPrice + ' USD / Hr '"> </el-input>
          <p class="pay-request-title">
            This is the price you and <a href="/" target="_blank">{{ agentInfo.name }}</a> have agreed upon
          </p>
        </div>
      </div>
    </div>
    <!-- job Description -->
    <div class="job-description-box">
      <div class="title">Job Description</div>
      <div class="job-title">
        <p class="text">Job Title</p>
        <el-input size="small" class="input job-title-input" v-model="submitData.orderTitle"> </el-input>
      </div>
      <div class="job-details">
        <p class="text">Job Details</p>
        <el-input type="textarea" size="small" class="input job-details-input" v-model="submitData.orderRemark"> </el-input>
      </div>
      <div class="related-request">
        <div class="request-title">
          <div @click="handlerChangePost" :class="{ 'show-active': isShowAcitve }" class="show-post"></div>
          <span class="text">Related Task Post</span>
        </div>
        <el-select v-if="isShowAcitve" size="small" class="request-select" v-model="submitData.taskId" placeholder="Select an open request posting…">
          <el-option v-for="item in relatedRequest" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </div>
    </div>
    <div class="submit">
      <div class="notice">
        <el-checkbox v-model="agreement"
          >Yes, I understand and agree to the <a href="/">Moafly Terms of Service</a>, including the <a href="/">User Agreement</a> and <a href="/">Privacy Policy</a>.</el-checkbox
        >
      </div>
      <div class="actions">
        <el-button type="text">Cancel</el-button>

        <el-button v-throttle class="sunmit" type="text" @click="handleContin">Continue</el-button>
      </div>
    </div>
    <paymentDetailDialog @handleSubmit="handlerConfirmSubmit" ref="paymentDetailDialog" @getPayInfo="getPayInfo"></paymentDetailDialog>
  </div>
</template>
<script>
import OptionCard from './components/OptionCard/index.vue';
import paymentDetailDialog from '@/views/client/personal/wallet/components/paymentDetailDialog.vue';
import { agent, task } from '@/api';
import { getFormKeysRules, numberParse, numberFormat } from '@/util/index';
import { confirmSubmit, setSessionPayLink } from '@/util/util.js';
import { getPayInfo } from '@/util/util.js';
export default {
  components: { OptionCard, paymentDetailDialog },
  data() {
    return {
      payUrl: 'https://pay.stripe.com/receipts/payment/CAcaFwoVYWNjdF8xS0UzUlRHc2dXTVVFSWVrKJWlspwGMgaD6kKgk4U6LBb2XvNLNxAL9uq09-vZrP8WaQW4o6t4wJII0xddCaA0hIxof3W9qVOZq8X-',
      pay_hour_left: require('@/assets/images/agent/pay_hour_left.png'),
      pay_hour_right: require('@/assets/images/agent/pay_hour_right.png'),
      agentInfo: {
        name: '',
        location: '',
        icon: '',
        agentIntroduce: ''
      },
      agentId: 0,
      relatedRequest: [],
      /** 提交数据 */
      submitData: {
        taskId: '',
        orderTitle: '',
        payType: 0,
        orderMoney: '',
        orderRemark: '',
        salesAgentId: 0,
        hourTime: ''
      },
      /** 同意用户须知 */
      agreement: true,
      isShowAcitve: false,
      params: {
        pageNum: 1,
        pageSize: 10,
        taskState: 1 // 查询的都是开启开放的任务
      },
      disabledData: [
        {
          key: 'orderTitle',
          value: ''
        },
        {
          key: 'orderMoney',
          value: ''
        }
      ],
      disabledHourData: [
        {
          key: 'orderTitle',
          value: ''
        }
      ],
      payData: {}
    };
  },
  computed: {},
  mounted() {
    this.agentId = this.$route.params.agentId;
    agent
      .detailAgent(this.agentId)
      .then(res => {
        if (res.code !== 'K-000000') throw res.message;
        this.agentInfo.name = res.context.agentName;
        this.agentInfo.location = res.context.agentLocation;
        this.agentInfo.icon = res.context.agentHeaderImg;
        this.agentInfo.agentIntroduce = res.context.agentIntroduce;
        this.agentInfo.agentPrice = res.context.agentPrice;
      })
      .catch(err => {
        console.err(err);
        this.$router.push('/404');
      });

    task.listTask(this.params).then(({ context }) => {
      context.dataContent.forEach(v => {
        this.relatedRequest.push({
          value: v.taskId,
          label: v.taskTitle
        });
      });
    });
  },
  methods: {
    //价格切换
    onInput() {
      this.submitData.orderMoney = numberFormat(this.submitData.orderMoney);
    },
    onInputNumber($event) {
      this.submitData.hourTime = $event.target.value;
    },
    //协议
    handlerChangePost() {
      this.isShowAcitve = !this.isShowAcitve;
    },
    handleGoBack() {
      this.$router.go(-1);
    },
    changePayType(v) {
      this.$forceUpdate();
      this.submitData.hourTime = '';
      this.submitData.orderMoney = '';
      this.submitData.payType = v;
    },
    //提交
    handleContin() {
      this.handleSubmit();
    },
    handleSubmit() {
      getPayInfo().then(data => {
        if (data) {
          if (this.submitData.payType === 1) {
            this.submitData.orderMoney = numberParse(this.submitData.orderMoney);
          } else {
            this.submitData.orderMoney = 1;
            // this.submitData.orderMoney = this.agentInfo.agentPrice * Number(this.submitData.hourTime);
          }
          this.submitData.salesAgentId = Number(this.agentId);
          const cloneData = JSON.parse(JSON.stringify(this.submitData));
          delete cloneData.hourTime;
          agent
            .hireAgent(cloneData)
            .then(res => {
              if (res.code === 'K-000000' && res.context) {
                this.payData = {
                  orderCode: res.context,
                  orderMoney: cloneData.orderMoney,
                  paymentMethodId: ''
                };
                this.$refs.paymentDetailDialog.init(this.payData, cloneData.payType);
              }
            })
            .catch(err => {
              this.$message.error('an error has occured');
            });
        } else {
          this.$message.warn('You have not yet bound the payment method');
          setTimeout(() => {
            this.$router.push('/wallet');
          }, 1000 * 2);
        }
      });
    },
    getPayInfo(cardInfo) {
      this.payData.paymentMethodId = cardInfo.id;
    },
    //确认付款
    handlerConfirmSubmit(payData) {
      confirmSubmit(payData).then(res => {
        if (res) {
          this.$refs.paymentDetailDialog.handlerClose();
          this.$router.push('/hire/success');
          setSessionPayLink(res);
        } else {
          this.$refs.paymentDetailDialog.btnLoad = false;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import './index';
</style>
