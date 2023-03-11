<!--
 * @Author: zulezhe
 * @Date: 2021-11-12 00:55:57
 * @LastEditors: zulezhe
 * @LastEditTime: 2023-01-19 21:25:23
 * @Path: https://gitee.com/zulezhe/
 * @Description:
-->
<template>
  <div class="rate-container bold-text">
    <el-rate v-model="rate" disabled :text-color="textColor"> </el-rate>
    <span v-show="ShowText">{{ rateText }}</span>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    ShowText: {
      type: Boolean,
      default: true
    },
    value: {
      type: [Number, String],
      default: 0.0
    },
    textColor: {
      type: String,
      default: '#ff9900'
    }
  },
  data() {
    return {
      rate: 0.0,
      rateText: '0.0'
    };
  },
  created() {},
  mounted() {
    this.format();
  },
  watch: {
    value(oldVal, newVal) {
      if (oldVal) {
        let str = oldVal.toString();
        if (str.split('.')[1]) {
          this.rateText = str;
        } else {
          this.rateText = str + '.0';
        }
        this.rate = parseFloat(this.value);
      }
    }
  },
  methods: {
    format() {
      if (this.value) {
        let str = this.value.toString();
        if (str.split('.')[1]) {
          this.rateText = str;
        } else {
          this.rateText = str + '.0';
        }
        this.rate = parseFloat(this.value);
      }
    }
  }
};
</script>
<style scoped lang="less">
.rate-container {
  width: 100%;
  display: flex;
  font-size: 20px;
  align-items: center;
  /deep/.el-rate {
    .el-rate__item {
      .el-rate__icon {
        font-size: 20px;
        color: rgb(255, 185, 45);
      }
    }
  }
}
</style>
