<template>
  <div class="detail_info-Estimated">
    <HeaderTitle title="Estimated cost" />
    <div class="slider_box">
      <div class="title_box">
        <p class="title1">Purchase price</p>
        <p class="title2">${{ numberFormat(standard) }}</p>
      </div>
      <div class="slider_step">
        <q-slider color="#353f62" v-model="standard" :min="0" :max="10000000" />
      </div>
      <div class="slider_item">
        <el-row :gutter="20">
          <el-col :span="8">
            <p class="text_hover">Monthly cost</p>
          </el-col>
          <el-col :span="4">
            <p class="text_hover">$5,059</p>
          </el-col>
          <el-col :span="8">
            <p class="text_hover">Pay when you close</p>
          </el-col>
          <el-col :span="4">
            <p class="text_hover">$181,562</p>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <p class="text">Principal and interest<span class="text_hover_after">4.9%</span></p>
          </el-col>
          <el-col :span="4">
            <p class="text">$3,715</p>
          </el-col>
          <el-col :span="8">
            <p class="text">Down payment<span class="text_hover_after">4.9%</span></p>
          </el-col>
          <el-col :span="4">
            <p class="text_hover_after">$175,000</p>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <p class="text">Property taxes</p>
          </el-col>
          <el-col :span="4">
            <p class="text">$1,166</p>
          </el-col>
          <el-col :span="8">
            <p class="text">1% Opendoor credit</p>
          </el-col>
          <el-col :span="4">
            <p class="text">$8,750</p>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <p class="text">HOA fee</p>
          </el-col>
          <el-col :span="4">
            <p class="text">$18</p>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="sider_text">
      Actual amounts may vary. This cost estimate is meant for informational purposes only and is not intended to be construed as financial advice. Opendoor always encourages you to reach out to an
      advisor regarding your own situation.
    </div>
  </div>
</template>

<script>
import HeaderTitle from './HeaderTitle.vue';
import { numberFormat } from '@/util/index';
export default {
  components: {
    HeaderTitle
  },
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
  data() {
    return {
      homeDetail: {},
      standard: 0
    };
  },
  methods: {
    numberFormat: numberFormat
  }
};
</script>

<style lang="less" scoped>
.detail_info-Estimated {
  padding-top: 32px;
  padding-bottom: 32px;
  border-bottom: 1px solid #afafaf;
  .slider_box {
    margin-top: 31px;
    .title_box {
      .flex();
      justify-content: space-between;
      .title1 {
        font-size: 16px;
        font-family: LibreFranklin-SemiBold, LibreFranklin;
        font-weight: 600;
        color: #333333;
        line-height: 19px;
      }
      .title2 {
        font-size: 20px;
        font-family: LibreFranklin-SemiBold, LibreFranklin;
        font-weight: 600;
        color: #333333;
        line-height: 24px;
      }
    }
    .slider_step {
      padding: 0 5px 0 10px;
    }
    .slider_item {
      width: 100%;
      margin-top: 36px;
      p {
        margin-bottom: 24px;
      }
      .text_hover {
        font-size: 16px;
        font-family: LibreFranklin-SemiBold, LibreFranklin;
        font-weight: 600;
        color: #333333;
        line-height: 19px;
      }
      .text {
        font-size: 16px;
        font-family: LibreFranklin-Regular, LibreFranklin;
        font-weight: 400;
        color: #666666;
        line-height: 19px;
      }
      .text_hover_after {
        position: relative;
        color: #ff9a1c;
        &::after {
          position: absolute;
          content: '';
          width: 100%;
          height: 1px;
          left: 0;
          bottom: 0;
        }
      }
    }
  }
  .sider_text {
    width: 100%;
    font-size: 16px;
    font-family: LibreFranklin-Regular, LibreFranklin;
    font-weight: 400;
    color: #666666;
    line-height: 19px;
  }
}
</style>
