<!--
 * @Author: zulezhe
 * @Date: 2022-12-29 22:44:00
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-12-29 22:47:21
 * @Path: https://gitee.com/zulezhe/
 * @Description: 
-->
<template>
  <div class="pay-status-container">
    <div class="content">
      <img class="img" src="../../../assets/images/pay/success.png" />
      <div class="title">You have paid successfully！</div>
      <div class="small-title">next step?</div>
      <div class="small-title title2">
        The agent has already received your offer. He/She will contact you within a business day.
      </div>
      <div class="btn-box">
        <WButton class="profile" radius="6px" text="Download receipt" color="#DC5674" border="1px solid #DC5674" @handleClick="handlerDowload" width="166px" height="27px" bgColor="#fff"></WButton>
        <WButton class="profile" v-throttle radius="6px" text="Back to Dashboard" @handleClick="handlerPathDash" width="166px" height="27px"></WButton>
      </div>
    </div>
  </div>
</template>
<script>
import WButton from '@/components/Button';
import { getSessionPayLink } from '@/util/util.js';
export default {
  components: { WButton },
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    handlerDowload() {
      let link = getSessionPayLink();
      console.log('link=>', link);
      window.open(link, '_blank');
    },
    handlerPathDash() {
      this.$router.push('/person/Finance');
    }
  }
};
</script>
<style scoped lang="less">
.pay-status-container {
  width: 100%;
  height: calc(100% - 320px);
  padding-top: 159px;
  box-sizing: border-box;
  .content {
    max-width: 1308px;
    width: 100%;
    min-height: 697px;
    margin: 0 auto;
    background: #ffffff;
    border: 1px solid #e0e0e0;
    border-radius: 16px;
    .img {
      margin: 140px auto 0;
      display: block;
      width: 274px;
      height: 170px;
    }
    .title {
      .MoaflyText(500, 30px, 36px, #0f1b43);
      margin: 29px auto 0;
      text-align: center;
    }

    .small-title {
      .MoaflyText(400, 16px, 28px, #0f1b43);
      text-align: center;
      // text-transform: capitalize;
      margin: 24px auto 0;
    }
    .title2 {
      margin-top: 10px;
    }
    .btn-box {
      width: 100%;
      margin: 90px auto 0;
      .flex();
      /deep/ div {
        &:not(:last-child) {
          margin-right: 20px;
        }
        @media (max-width: 575px) {
          width: 100% !important;
          &:not(:last-child) {
            margin-bottom: 20px;
          }
        }
      }
    }
  }
}
</style>
