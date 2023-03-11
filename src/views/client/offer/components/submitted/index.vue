<!--
 * @Author: zulezhe
 * @Date: 2022-08-08 21:30:51
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-08-08 21:34:29
 * @Path: https://gitee.com/zulezhe/
 * @Description:
-->
<template>
  <div class="submitted-container">
    <div class="received">
      <h2>Offer terms received!</h2>
      <p>A local agent will reach out shortly by phone or email to discuss your offer and how we can help.</p>
    </div>
    <div class="content">
      <div class="introduction">
        <h4>What Happens Next?</h4>
        <p>
          If you decide to work with us after speaking to your agent, your agent will guide you through the entire offer process from helping you prepare your offer to sending it to the seller and
          negotiating on your behalf.
        </p>
      </div>

      <div
        :class="{
          summary: true,
          show: showPanel
        }"
      >
        <div role="button" class="title" tabindex="0" @click="handleTogglePanel">
          <h6>Offer Summary</h6>
          <i class="el-icon-arrow-down"></i>
        </div>
        <div class="panel">
          <Summary class="content" :data="data"></Summary>
        </div>
      </div>

      <div class="footer">
        <router-link to="/person/my-offers">View Offer Status</router-link>
        <span>(310) 912-7337</span>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Summary from '../summary';

export default {
  props: ['data'],
  components: { Summary },
  data() {
    return {
      showPanel: false
    };
  },
  methods: {
    handleTogglePanel() {
      this.showPanel = !this.showPanel;
    }
  }
};
</script>

<style lang="less" scoped>
@import './index';
</style>
