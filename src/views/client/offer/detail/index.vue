<!--
 * @Author: zulezhe
 * @Date: 2022-08-08 21:30:51
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-08-08 21:34:16
 * @Path: https://gitee.com/zulezhe/
 * @Description:
-->
<template>
  <div class="offer-detail-container">
    <div class="back"><i class="el-icon-back" @click="handleGoBack"></i></div>
    <h3>Offer Summary</h3>
    <Summary :data="data"></Summary>

    <div class="need-help-container">
      <h3>Need help with your offer?</h3>
      <el-row class="card-list" :gutter="30">
        <el-col :sm="12" :md="8" :lg="6" v-for="i in 4" :key="i">
          <el-card class="agent-card" body-style="padding:0">
            <div class="img">
              <img src="https://moaflytest.s3.us-east-2.amazonaws.com/moafly/20220417/1650201266264.jpg" />
              <i class="iconfont icon-play"></i>
            </div>
            <div class="card-body">
              <div class="name">Laura Addario Salgues</div>
              <div class="rate">
                <div class="score">{{ Number(5).toFixed(1) }}</div>
                <el-rate :value="5" disabled></el-rate>
              </div>
              <div class="money">
                <i class="iconfont icon-shuqian"></i>
                14 USD/hour
              </div>
              <div class="address">
                <i class="iconfont icon-31dingwei"></i>
                Los Angeles, California
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Summary from '../components/summary';
import { offer } from '@/api';

export default {
  components: { Summary },
  mounted() {
    const offerId = this.$route.params.offerId;
    offer.getOfferDetail(offerId).then(res => {
      this.data = res.context;
    });
  },
  data() {
    return {
      data: {}
    };
  },
  methods: {
    handleGoBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="less" scoped>
@import './index';
</style>
