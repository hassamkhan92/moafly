<!--
 * @Author: zulezhe
 * @Date: 2022-12-11 22:33:22
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-12-12 21:52:11
 * @Path: https://gitee.com/zulezhe/
 * @Description:
-->
<template>
  <div class="agent-item">
    <div class="icon">
      <img :src="agentInfo.agentHeaderImg" />
    </div>
    <div class="agent-detail">
      <div class="detail-level1 level">
        <p class="name">{{ agentInfo.agentName }}</p>
        <WButton @handleClick="handleClick" class="btn" bgColor="rgba(220, 86, 116, 0.3)" text="Hire Agian" width="108px" height="28px" size="12px" radius="6px" color="#DC5674"></WButton>
      </div>
      <div class="detail-level2 level">
        <p class="bold"><img class="svg-icon" :src="require('@/assets/svg/price-hour.svg')" alt="" />{{ Number(agentInfo.agentPrice).toFixed(0) }} USD/ hour</p>
        <div class="rate-box">
          <el-rate :value="Number(agentInfo.agentScore) || 0.0" disabled />
          <div class="rage-title">{{ agentInfo.agentScore || '0.0' }}</div>
        </div>
      </div>
      <div class="detail-level3 level">
        <p class="address"><img class="svg-icon" :src="require('@/assets/svg/address.svg')" alt="" />{{ agentInfo.agentLocation }}</p>
      </div>
      <div class="detail-level4 level">
        <p class="introduction" v-html="
          agentInfo.agentIntroduce
            .replace(/\n/g, ' ')
            .replace(/&#60;i&#62;/g, '')
            .replace(/&#60;\/i&#62;/g, '')
        ">
        </p>
      </div>
      <div v-if="displayedContractList && displayedContractList.length" class="detail-level5">
        <p class="contract-title">Contracts</p>
        <contract v-for="(item, idx) in displayedContractList" :key="idx" :contractInfo="item"></contract>
      </div>
    </div>
    <enterPayMentDialog ref="enterPayMentDialog"></enterPayMentDialog>
    <payMentDialog @handlerAddCard="handlerAddCard" ref="paymentDetailDialog"></payMentDialog>
  </div>
</template>

<script>
import WButton from '@/components/Button';
import contract from '../contract';
import enterPayMentDialog from '@/views/client/personal/wallet/components/enterPayMentDialog.vue';
import payMentDialog from '@/views/client/personal/wallet/components/payMentDialog.vue';
import { getPayInfo } from '@/util/util.js';
export default {
  props: ['agentInfo'],
  components: {
    WButton,
    contract,
    enterPayMentDialog,
    payMentDialog
  },
  data() {
    return {
      displayedContractNum: 3
    };
  },
  computed: {
    displayedContractList() {
      if (this.displayedContractNum !== 0) return this.agentInfo.contractInfoList.slice(0, this.displayedContractNum);
      else return this.agentInfo.contractInfoList;
    }
  },
  methods: {
    handleClick() {
      getPayInfo().then(data => {
        if (data) {
          this.$router.push(`/agent/hire/${this.agentInfo.salesAgentId}`);
        } else {
          this.$refs.paymentDetailDialog.init();
        }
      });
    },
    //绑定银行卡
    handlerAddCard() {
      this.$refs.enterPayMentDialog.init();
    }
  }
};
</script>

<style lang="less" scoped>
p {
  margin: 0;
}
.svg-icon {
  margin-right: 8px;
}
@import './index.less';
</style>
