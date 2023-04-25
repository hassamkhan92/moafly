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
    <h3>View Details</h3>
    <Summary :data="data" />
    <Roadmap />
    <Offers />
  </div>
</template>

<script>
import Summary from '../components/summary';
import Roadmap from '../components/roadmap';
import Offers from '../components/receivedOffers';
import { offer } from '@/api';

export default {
  components: { Summary, Roadmap, Offers },
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
