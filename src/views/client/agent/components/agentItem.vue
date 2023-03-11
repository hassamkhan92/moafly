<!--
 * @Author: zulezhe
 * @Date: 2021-11-07 23:17:35
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-08-08 22:32:46
 * @Path: https://gitee.com/zulezhe/
 * @Description:
-->
<template>
  <div class="content-item" :class="layoutType">
    <div class="img-container">
      <img :src="item.avatar" alt="" />
      <i class="iconfont icon-shoucang" :class="isCollect ? 'active' : ''" @click="handleCollect"></i>
      <i class="iconfont icon-play" @click="handlePlay"></i>
      <Tag v-show="item.comingSoon === 0" class="tag" :text="agentStatusByText(0)"></Tag>
    </div>
    <div class="desc-container">
      <div class="desc-title bold-text">
        {{ item.name }}
      </div>
      <div class="desc-rate bold-text">
        <Rate :value="item.rate" disabled text-color="#ff9900"> </Rate>
      </div>
      <div class="desc-price">
        <i class="iconfont icon-shuqian"></i>
        {{ item.price }} &nbsp;USD / hour
      </div>
      <div class="desc-address">
        <i class="iconfont icon-31dingwei"></i>
        {{ item.address }}
      </div>
      <div class="desc-detail">
        {{ item.description }}
      </div>
      <div class="desc-button">
        <Button @handleClick="handleClick(item)" width="133px" height="30px" size="16px"></Button>
      </div>
    </div>
  </div>
</template>
<script>
import Button from '@/components/Button';
import Rate from '@/components/Rate/index.vue';
import Tag from '@/views/client/home/tag.vue';
import { agentStatusByText } from '@/shared/home/index.js';
export default {
  props: {
    layoutType: {
      type: String,
      default: 'list'
    },
    item: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  components: { Button, Tag, Rate },
  data() {
    return {
      test: 0,
      isCollect: false
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    agentStatusByText: agentStatusByText,
    handleClick(item) {
      this.$emit('handleClick', item);
    },
    handleCollect(item) {
      console.log('收藏', item);
      this.isCollect = !this.isCollect;
      this.$emit('handleCollect', item);
    },
    handlePlay(item) {
      console.log('点击播放', item);
      this.$emit('handlePlay', item);
    },
    formatRate(rate) {
      return rate ? (rate.toString().split('.')[1] ? rate : rate + '.0') : '0.0';
    }
  }
};
</script>
<style scoped lang="less">
.content-item {
  width: 100%;
  height: 339px;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
  box-sizing: border-box;
  margin-left: 10px;
  .img-container {
    width: 270px;
    height: 270px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      border-radius: 8px;
    }
    .iconfont {
      font-size: 22px;
      position: absolute;
      color: #ddd;
    }
    .icon-shoucang {
      right: 20px;
      top: 18px;
    }
    .icon-shoucang.active {
      &::before {
        color: #fc1944;
        content: '\e625';
      }
    }
    .icon-play {
      left: 17px;
      bottom: 12px;
    }
    .tag {
      position: absolute;
      background: #353f62;
      top: 10px;
      left: 15px;
      .flex();
    }
  }
  .desc-container {
    width: 558px;
    .desc-title {
      // width: 260px;
      height: 23px;
      font-size: 23px;
      font-weight: bold;
      color: #333333;
      line-height: 27px;
    }
    .desc-rate {
      margin-top: 16px;
      display: flex;
      align-items: center;
      .el-rate {
        display: inline-block;
        margin-left: 13px;
      }
    }
    .desc-price {
      margin-top: 13px;
      .iconfont {
        margin-right: 13px;
      }
    }
    .desc-address {
      margin-top: 13px;
      .iconfont {
        margin-right: 13px;
      }
    }
    .desc-detail {
      margin-top: 20px;
      font-size: 16px;
      font-weight: 400;
      color: #666666;
      line-height: 24px;
    }

    .desc-button {
      width: 100%;
      height: 30px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-top: 20px;
    }
  }
}
.content-item.image {
  width: 32%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.39);
  padding: 0;
  margin-bottom: 20px;
  cursor: pointer;
  border-radius: 8px;
  .img-container {
    width: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .desc-container {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    .desc-detail {
      .multi-line(100%, 3);
      display: none;
    }
    .desc-button {
      border-radius: 15px;
      // display: none;
      /deep/ .button-container {
        width: 100% !important;
      }
    }
  }
}
</style>
