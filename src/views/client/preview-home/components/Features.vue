<template>
  <div class="detail_info-Features">
    <p class="feature-title">Feature</p>
    <div class="feature_box">
      <el-row class="features-row" :gutter="20">
        <el-col class="features-col" :xs="12" :md="8" lg="3">
          <p class="title">On Moafly</p>
          <p class="text" v-if="homeDetail.daysOnMarket">{{ homeDetail.daysOnMarket }} days</p>
          <p class="text" v-else>-</p>
        </el-col>
        <el-col class="features-col" :xs="12" :md="8" lg="3">
          <p class="title">Type</p>
          <p class="text" v-if="homeDetail.propertySubtype">{{ homeDetail.propertySubtype }}</p>
          <p class="text" v-else>-</p>
        </el-col>
        <el-col class="features-col" :xs="12" :md="8" lg="3">
          <p class="title">City</p>
          <p class="text">{{ homeDetail.houseCity }}</p>
        </el-col>
        <el-col class="features-col" :xs="12" :md="8" lg="3">
          <p class="title">Home size</p>
          <p class="text" v-if="homeDetail.livingArea">{{ homeDetail.livingArea }} sq. ft.</p>
          <p class="text" v-else>-</p>
        </el-col>
        <el-col class="features-col" :xs="12" :md="8" lg="3">
          <p class="title">Built in</p>
          <p class="text" v-if="homeDetail.yearBuilt">{{ homeDetail.yearBuilt }}</p>
          <p class="text" v-else>-</p>
        </el-col>
        <el-col class="features-col" :xs="12" :md="8" lg="3">
          <p class="title">Lot size</p>
          <p class="text" v-if="homeDetail.lotSize">{{ homeDetail.lotSize }} sq. ft.</p>
          <p class="text" v-else>-</p>
        </el-col>
        <el-col class="features-col" :xs="12" :md="8" lg="3">
          <p class="title">Price per sqft</p>
          <p class="text" v-if="homeDetail.livingArea && Number(homeDetail.livingArea) > 0">${{ formatPricePer() }}</p>
          <p class="text" v-else>-</p>
        </el-col>
        <el-col class="features-col" :xs="12" :md="8" lg="3">
          <p class="title">Beds</p>
          <p class="text" v-if="homeDetail.bedsTotal">{{ homeDetail.bedsTotal }}</p>
          <p class="text" v-else>-</p>
        </el-col>
        <el-col class="features-col" :xs="12" :md="8" lg="3">
          <p class="title">Baths</p>
          <p class="text" v-if="homeDetail.baths">{{ homeDetail.baths }}</p>
          <p class="text" v-else>-</p>
        </el-col>
        <el-col class="features-col" :xs="12" :md="8" lg="5">
          <p class="title">HOA dues</p>
          <p class="text" v-if="homeDetail.hoaFee">${{ homeDetail.hoaFee }} a month</p>
          <p class="text" v-else>-</p>
        </el-col>
      </el-row>
    </div>
    <div class="feat_btns">
      <!-- <WButton text="Get more info" radius="5px" height="50px" size="20px" width="236px"></WButton> -->
      <WButton text="Start An Offer" bgColor="#DC5674" radius="6px" height="34px" size="12px" width="153px" @handleClick="handleClick"></WButton>
      <p class="bug-moafly-title">(Buy with Moafly, save up to ${{ handleGetNumber() }})</p>
      <!-- <div class="title_box">
        <p class="title title1">Buy with Moafly, save up to $ {{ handleGetNumber() }}</p>
        <p class="title title2">We’ll guide you through every step.</p>
      </div> -->
    </div>
  </div>
</template>

<script>
import WButton from '@/components/Button';
import { formatNumber } from '@/util/index.js';
export default {
  components: { WButton },
  props: {
    homeDetailsData: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    homeDetailsData(newVal, oldVal) {
      this.homeDetail = newVal;
    }
  },
  created() {
    this.homeDetail = this.homeDetailsData;
  },
  data() {
    return {
      homeDetail: {}
    };
  },
  methods: {
    handleGetNumber() {
      return formatNumber((this.homeDetailsData.listPrice * this.homeDetailsData.buyerAgencyCompensation) / 100);
    },
    handleClick() {
      this.$router.push(`/buy/offer/${this.$route.params.houseId}`);
    },
    formatPricePer() {
      return (this.homeDetail.listPrice / this.homeDetail.livingArea).toFixed(1);
    }
  }
};
</script>

<style lang="less" scoped>
.detail_info-Features {
  width: 100%;
  padding-bottom: 23px;
  border-bottom: 1px solid #eeeeee;
  .feature-title {
    font-family: 'Libre Franklin';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
    color: #0f1b43;
    margin-bottom: 15px;
  }
  .features-row {
    display: flex;
    flex-wrap: wrap;
    gap: 30px 0;
    margin-bottom: 30px;
    .features-col {
      float: none;
    }
  }
  .feature_box {
    width: 100%;
    .title {
      font-size: 14px;
      font-family: 'Libre Franklin';
      font-style: normal;
      font-weight: 400;
      color: rgba(15, 27, 67, 0.6);
      line-height: 17px;
    }
    .text {
      font-family: 'Libre Franklin';
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 19px;
      color: #0f1b43;
    }
  }
  .feat_btns {
    width: 100%;
    .flex();
    justify-content: flex-start;
    .button-container {
      margin-right: 20px;
    }
    .bug-moafly-title {
      font-family: 'Libre Franklin';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 17px;
      color: rgba(15, 27, 67, 0.6);
      margin-top: 15px;
    }
  }
}
</style>
