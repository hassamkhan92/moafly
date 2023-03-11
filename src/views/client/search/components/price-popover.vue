<!--
 * @Author: zulezhe
 * @Date: 2022-09-22 23:36:16
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-12-02 22:41:34
 * @Path: https://gitee.com/zulezhe/
 * @Description:
-->
<template>
  <div class="bedrooom-content">
    <div class="price-range">
      <!-- 区间内容 -->
      <div class="price-range-content">
        <div
          v-for="item in splitCount"
          :key="item"
          :data-value="(maxPrice / splitCount) * item"
          :style="{
            width: '3px',
            height: item < splitCount / 2 ? (item / (splitCount / 2)) * 100 + '%' : ((splitCount - item) / (splitCount / 2)) * 100 + '%',
            'margin-left': (240 - splitCount * 3) / splitCount + 'px'
          }"
          :class="['line-item', params.minPrice >= (maxPrice / splitCount) * item ? 'active' : '', params.maxPrice < (maxPrice / splitCount) * item ? 'active' : '']"
        ></div>
      </div>
      <!-- 左右拖拽按钮 -->
      <div class="price-range-line-con">
        <el-slider v-model="value" range :show-tooltip="true" @change="change" @input="input" :min="minPrice" :max="maxPrice" :step="maxPrice / splitCount"> </el-slider>
      </div>
    </div>
    <!-- 价格区间 -->
    <div class="price-interval">
      <el-row class="price-row">
        <el-col :span="10" class="start-price select-price">
          <!-- <ZuInputNumber :val="params.minPrice" :controls="false" :min="minPrice" :max="maxPrice"></ZuInputNumber> -->
        </el-col>
        <el-col :span="4" class="_price">—</el-col>
        <el-col :span="10" class="end-price select-price">
          <!-- <ZuInputNumber :val="params.maxPrice" :controls="false" :min="minPrice" :max="maxPrice"></ZuInputNumber> -->
        </el-col>
      </el-row>
    </div>
    <!-- 底部按钮 -->
    <div class="opera-box">
      <div class="btn-box">
        <div @click="handlerRestPrice" class="reset-btn">Reset</div>
        <div @click="handlerConfirmPrice" class="confirm-btn">Confirm</div>
      </div>
    </div>
  </div>
</template>
<script>
// import ZuInputNumber from '@/components/zu-input-number';
export default {
  // components: { ZuInputNumber },
  data() {
    return {
      minPrice: 0,
      maxPrice: 2000000,
      splitCount: 40,
      leftOffectX: 0,
      rightOffectX: 0,
      activeLineWidth: null,
      value: [0, 2000000],
      step: 10000,
      params: {
        minPrice: 0,
        maxPrice: 2000000
      }
    };
  },
  computed: {},
  created() {},
  mounted() {
    // this.activeLineWidth = this.$refs.activeLineRef.getBoundingClientRect().width;
    this.activeLineWidth = 240;
  },
  methods: {
    //重置价格
    handlerRestPrice() {
      this.params.minPrice = this.minPrice;
      this.params.maxPrice = this.maxPrice;
      this.value = [0, 2000000];
    },
    //确定价格
    handlerConfirmPrice() {
      this.priceVisible = false;
      console.log('确定==>', this.params);
      this.$emit('confirmPrice', this.params);
    },
    change(val) {
      console.log('发生变化最后值===>', val);
    },
    input(val) {
      console.log('发生变化===>', this.value);
      this.params.minPrice = this.value[0];
      this.params.maxPrice = this.value[1];
    }
  }
};
</script>
<style scoped lang="less">
.price-range {
  position: relative;
  .flex();
  // 区间内容
  .price-range-content {
    position: absolute;
    bottom: 0;
    .line-item {
      background: #dc5674;
      border-radius: 2px;
      display: inline-block;
      &.active {
        background: #e4e7ed;
      }
    }
  }
  // 按钮拖拽区域
  .price-range-line-con {
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    // 底部默认进度条
    .el-slider {
      /deep/.el-slider__runway {
        margin: 0 !important;
        height: 4px;
        .el-slider__bar {
          height: 4px;
          background-color: rgba(220, 86, 116, 1);
        }
        .el-slider__button {
          width: 24px;
          height: 24px;
          border: 2px solid rgba(220, 86, 116, 1);
          .flex();
          &::before {
            content: '';
            display: block;
            height: 16px;
            width: 16px;
            background-size: 100% 100%;
            background-image: url('~@/assets/images/search/menu.svg');
            background-repeat: no-repeat;
            background-position: 0 0;
          }
        }
      }
    }
  }
}
// 价格区间
.price-interval {
  margin-top: 30px;
  ._price {
    .flex();
    margin-top: 5px;
  }
  .select-price {
    .el-input__inner {
      height: 30px;
      border: none;
    }
  }
}
.ant-input-number {
  /deep/.ant-input-number-handler-wrap {
    display: none !important;
  }
  &:focus {
    border-color: #dc5674 !important;
    box-shadow: 0 0 0 2px #dc5674;
  }
  &:hover {
    border-color: #dc5674 !important;
  }
  &.ant-input-number-focused {
    box-shadow: 0 0 0 2px #dc5674;
  }
}

// 底部按钮
.opera-box {
  padding: 20px 16px 16px 16px;
  .num-custom {
    .flex();
    justify-content: space-between;
    .title {
      font-family: 'Libre Franklin';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 17px;
      color: #000000;
    }
    .icon-num {
      font-size: 20px;
      color: #dc5674;
    }
    .num-text {
      margin: 0 14px;
    }
  }
  .btn-box {
    .flex();
    justify-content: space-between;
    font-family: 'Libre Franklin';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 28px;
    text-transform: capitalize;
    margin-top: 20px;
    .reset-btn {
      width: 58px;
      height: 28px;
      border: 1px solid #dc5674;
      border-radius: 6px;
      color: #dc5674;
      text-align: center;
      cursor: pointer;
    }
    .confirm-btn {
      width: 114px;
      height: 28px;
      background: #dc5674;
      border-radius: 6px;
      color: #ffffff;
      text-align: center;
      cursor: pointer;
    }
  }
}
</style>
