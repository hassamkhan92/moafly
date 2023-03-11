<!--
 * @Author: zulezhe
 * @Date: 2022-06-06 20:51:52
 * @LastEditors: zulezhe
 * @LastEditTime: 2023-01-09 21:34:35
 * @Path: https://gitee.com/zulezhe/
 * @Description:
-->
<template>
  <div class="detail_info-Introduction ">
    <!-- <a class="hiddenContent  nowrap-text" :class="{ 'nowrap-close': !isMore }">
      {{ homeDetailsData.houseIntroduce || "Current listing doesn't provide any public remarks." }}
    </a> -->
    <!-- <a v-if="isMore && homeDetailsData.houseIntroduce" class="read-more cursor" @click="handlerReadMore">read more</a> -->
    <div class="hiddenContent" :class="{ 'nowrap-close': !isMore }">
      {{ homeDetailsData.houseDescrible || "Current listing doesn't provide any public remarks." }}
    </div>
  </div>
</template>

<script>
import { computeLineCount } from '@/util/util.js';
import VueText from '@/components/VueText';
export default {
  components: {
    VueText
  },
  props: {
    homeDetailsData: {
      type: Object,
      default: () => {}
    }
  },

  data() {
    return {
      isMore: false,
      houseDescrible:
        "Current listing doesn't provide any public remarks.Current listing doesn't provide any public remarks.Current listing doesn't provide any public remarks.Current listing doesn't provide any public remarks.Current listing doesn't provide any public remarks.Current listing doesn't provide any public remarks.Current listing doesn't provide any public remarks.Current listing doesn't provide any public remarks.Current listing doesn't provide any public remarks.Current listing doesn't provide any public remarksCurrent listing doesn't provide any public remarks"
    };
  },
  mounted() {
    this.$nextTick(() => {
      if (this.homeDetailsData.houseDescrible) {
        this.isMore = computeLineCount();
      }
    });
    console.log('this.isMore', this.isMore);
  },
  methods: {
    handlerReadMore() {
      if (this.isMore) {
        this.isMore = false;
      }
    }
  }
};
</script>

<style lang="less" scoped>
p {
  margin: 0;
}
.detail_info-Introduction {
  position: relative;
  width: 100%;
  padding-top: 15px;
  .hiddenContent {
    width: 100%;
    font-size: 16px;
    font-weight: 400;
    color: #333333;
    line-height: 26px;
    word-wrap: break-word;
  }
  .read-more {
    position: absolute;
    bottom: 10px;
    right: -73px;
    font-size: 14px;
    font-family: LibreFranklin-SemiBold, LibreFranklin;
    font-weight: 600;
    color: #dc5674;
    line-height: 24px;
    margin-top: 12px;
  }
}
.nowrap-text {
  height: 138px;
  overflow: hidden;
  display: -webkit-box; /*弹性伸缩盒子*/
  -webkit-box-orient: vertical; /*子元素垂直排列*/
  -webkit-line-clamp: 5; /*可以显示的行数，超出部分用...表示*/
  text-overflow: ellipsis; /*（多行文本的情况下，用省略号“…”隐藏溢出范围的文本)*/
}
.nowrap-close {
  height: auto;
}
</style>
