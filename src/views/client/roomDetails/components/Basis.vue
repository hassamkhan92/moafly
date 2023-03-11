<!--
 * @Author: zulezhe
 * @Date: 2022-06-06 20:51:52
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-06-09 00:42:13
 * @Path: https://gitee.com/zulezhe/
 * @Description:
-->
<template>
  <div class="detail_info-basis">
    <el-row :gutter="20">
      <el-col :xs="12" :md="8" :lg="4">
        <p class="title text-left">Beds</p>
        <p class="text text-left">{{ homeDetail.bedroomsTotal || '-' }}</p>
      </el-col>
      <el-col :xs="12" :md="8" :lg="4">
        <p class="title text-left">Baths</p>
        <p class="text text-left">{{ homeDetail.bathroomsFull || '-' }}</p>
      </el-col>
      <el-col :xs="12" :md="8" :lg="4">
        <p class="title text-left">Home size</p>
        <p v-if="numberFormat(homeDetail.livingArea)" class="text">{{ numberFormat(homeDetail.livingArea) }} sq. ft.</p>
        <p v-else class="text text-left">-</p>
      </el-col>
      <el-col :xs="12" :md="8" :lg="4">
        <p class="title text-left">Lot size</p>
        <p v-if="homeDetail.lotSizeArea" class="text">{{ homeDetail.lotSizeArea }} sq. ft.</p>
        <p v-else class="text text-left">-</p>
      </el-col>
      <el-col :xs="12" :md="8" :lg="6">
        <p class="title text-left">HOA dues</p>
        <p class="text text-left">${{ homeDetail.associationFee }} a month</p>
      </el-col>
      <el-col :xs="12" :md="8" :lg="2">
        <p class="title">Status</p>
        <p class="text">{{ homeDetail.mlsStatus || '-' }}</p>
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
