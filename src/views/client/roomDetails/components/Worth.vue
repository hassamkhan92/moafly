<template>
  <div class="detail_info-Worth">
    <HeaderTitle title="What it’s worth" />
    <p class="worth_text_box">
      <span class="text1">$875,000</span>
      <span class="text2">High confidence</span>
    </p>
    <p class="worth_title">Interested in learning more about the value of this home? Talk with one of our partner agents. It’s free and without any obligation.</p>
  </div>
</template>

<script>
import HeaderTitle from './HeaderTitle.vue';
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
      homeDetail: {}
    };
  }
};
</script>

<style lang="less" scoped>
.detail_info-Worth {
  width: 100%;
  padding-top: 32px;
  border-top: 1px solid #afafaf;
  border-bottom: 1px solid #afafaf;
  .worth_text_box {
    margin-top: 24px;
    .text1 {
      font-size: 20px;
      font-family: LibreFranklin-SemiBold, LibreFranklin;
      font-weight: 600;
      color: #333333;
      line-height: 24px;
      margin-right: 48px;
    }
    .text2 {
      font-size: 16px;
      font-family: LibreFranklin-SemiBold, LibreFranklin;
      font-weight: 600;
      color: #333333;
      line-height: 19px;
    }
  }
  .worth_title {
    font-size: 16px;
    font-family: LibreFranklin-Regular, LibreFranklin;
    font-weight: 400;
    color: #666666;
    line-height: 19px;
  }
}
</style>
