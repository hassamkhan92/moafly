<!--
 * @Author: zulezhe
 * @Date: 2022-11-21 20:19:48
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-12-11 22:45:52
 * @Path: https://gitee.com/zulezhe/
 * @Description:
-->
<template>
  <div class="detail_info-basis">
    <el-row :gutter="20" class="details-box">
      <el-col :xs="24" :sm="12" :md="8" :lg="4">
        <div class="detail-wrap">
          <p class="title text-left">Beds</p>
          <p class="text text-left">{{ homeDetail.bedsTotal || '-' }}</p>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="4">
        <div class="detail-wrap">
          <p class="title text-left">Baths</p>
          <p class="text text-left">{{ homeDetail.baths || '-' }}</p>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="4">
        <div class="detail-wrap">
          <p class="title text-left">Home size</p>
          <p v-if="numberFormat(homeDetail.livingArea)" class="text">{{ numberFormat(homeDetail.livingArea) }} sq. ft.</p>
          <p v-else class="text text-left">-</p>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="4">
        <div class="detail-wrap">
          <p class="title text-left">Lot size</p>
          <p v-if="homeDetail.lotSize" class="text">{{ homeDetail.lotSize }} sq. ft.</p>
          <p v-else class="text text-left">-</p>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="6">
        <div class="detail-wrap">
          <p class="title text-left">HOA dues</p>
          <p class="text text-left">${{ homeDetail.hoaFee }} a month</p>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="2">
        <div class="detail-wrap">
          <p class="title">Status</p>
          <p class="text">{{ homeDetail.houseState || '-' }}</p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { numberFormat } from '@/util/index.js';
export default {
  name: 'basis',
  props: {
    homeDetailsData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      homeDetail: {}
    };
  },
  watch: {
    homeDetailsData(newVal, oldVal) {
      this.homeDetail = newVal;
    }
  },
  created() {
    this.homeDetail = this.homeDetailsData;
  },
  methods: {
    numberFormat: numberFormat
  }
};
</script>

<style lang="less" scoped>
.detail_info-basis {
  .detail-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;
    p {
      flex: 0 0 49%;
    }
  }
  .title {
    font-size: 16px;
    font-family: LibreFranklin-Regular, LibreFranklin;
    font-weight: 400;
    color: #666666;
    line-height: 19px;
    margin-bottom: 6px;
  }
  .text {
    font-size: 16px;
    font-family: LibreFranklin-SemiBold, LibreFranklin;
    font-weight: 600;
    color: #333333;
    line-height: 19px;
  }
}
</style>
