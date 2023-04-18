<template>
  <div class="detail_info-Features">
    <p class="feature-title">Feature</p>
    <div class="feature_box">
      <el-row :gutter="20" class="features-row">
        <el-col class="features-col" :xs="12" :md="8" :lg="3">
          <p class="title">On Moafly</p>
          <p class="text" v-if="homeDetail.daysOnMarket">{{ homeDetail.daysOnMarket }} days</p>
          <p class="text" v-else>-</p>
        </el-col>
        <el-col class="features-col" :xs="12" :md="8" :lg="3">
          <p class="title">Type</p>
          <p class="text" v-if="homeDetail.propertyType">{{ homeDetail.propertyType }}</p>
          <p class="text" v-else>-</p>
        </el-col>
        <el-col class="features-col" :xs="12" :md="8" :lg="3">
          <p class="title">City</p>
          <p class="text">{{ homeDetail.city }}</p>
        </el-col>
        <el-col class="features-col" :xs="12" :md="8" :lg="3">
          <p class="title">Home size</p>
          <p class="text" v-if="homeDetail.livingArea">{{ homeDetail.livingArea }} sq. ft.</p>
          <p class="text" v-else>-</p>
        </el-col>
        <el-col class="features-col" :xs="12" :md="8" :lg="3">
          <p class="title">Built in</p>
          <p class="text" v-if="homeDetail.yearBuilt">{{ homeDetail.yearBuilt }}</p>
          <p class="text" v-else>-</p>
        </el-col>
        <el-col class="features-col" :xs="12" :md="8" :lg="3">
          <p class="title">Lot size</p>
          <p class="text" v-if="homeDetail.lotSizeArea">{{ homeDetail.lotSizeArea }} sq. ft.</p>
          <p class="text" v-else>-</p>
        </el-col>
        <el-col class="features-col" :xs="12" :md="8" :lg="3">
          <p class="title">Price per sqft</p>
          <p class="text" v-if="homeDetail.livingArea && homeDetail.livingArea > 0">${{ formatPricePer() }}</p>
          <p class="text" v-else>-</p>
        </el-col>
        <el-col class="features-col" :xs="12" :md="8" :lg="3">
          <p class="title">Beds</p>
          <p class="text" v-if="homeDetail.bedroomsTotal">{{ homeDetail.bedroomsTotal }}</p>
          <p class="text" v-else>-</p>
        </el-col>
        <el-col class="features-col" :xs="12" :md="8" :lg="3">
          <p class="title">Baths</p>
          <p class="text" v-if="homeDetail.bathroomsFull">{{ homeDetail.bathroomsFull }}</p>
          <p class="text" v-else>-</p>
        </el-col>
        <el-col class="features-col" :xs="12" :md="8" :lg="5">
          <p class="title">HOA dues</p>
          <p class="text" v-if="homeDetail.associationFee">${{ homeDetail.associationFee }} a month</p>
          <p class="text" v-else>-</p>
        </el-col>
      </el-row>
    </div>
    <div class="feat_btns">
      <WButton text="Start An Offer" bgColor="#DC5674" radius="6px" height="34px" size="12px" width="153px" @handleClick="showOfferModal"></WButton>
      <p class="bug-moafly-title">(Buy with Moafly, save up to ${{ handleGetNumber() }})</p>
    </div>
    <OfferDialog :showModal="visible" @handlerClose="visible = false" />
  </div>
</template>

<script>
import WButton from '@/components/Button';
import OfferDialog from './OfferDialog.vue';
import { formatNumber } from '@/util/index.js';

export default {
  components: { WButton, OfferDialog },
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
      visible: false,
      homeDetail: {}
    };
  },
  methods: {
    handleGetNumber() {
      return formatNumber((this.homeDetailsData.listPrice * this.homeDetailsData.buyerAgencyCompensation) / 100);
    },
    formatPricePer() {
      return (this.homeDetail.listPrice / this.homeDetail.livingArea).toFixed(1);
    },
    showOfferModal() {
      this.visible = true;
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
