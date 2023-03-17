<!--
 * @Author: zulezhe
 * @Date: 2022-02-09 21:47:06
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-08-04 21:56:54
 * @Path: https://gitee.com/zulezhe/
 * @Description:
-->
<template>
  <div class="pay-status-container">
    <div class="content">
      <div class="back-btn" @click="goBack">
        <i class="iconfont icon-zhixiangzuo"></i>
        <span class="text">Back to Moafly</span>
      </div>
      <div class="center">
        <img class="icon" src="../../../assets/images/pay/failed.png" />
        <div class="title">Oh snap!</div>
        <div class="small-title">I'm sorry you didn't pay successfully !</div>
        <WButton text="Try Again" radius="4px" bgColor="rgba(0,0,0,0)" border="1px solid #353F62" color="#353F62" class="pay-status-btn" @handleClick="handleFailed"></WButton>
      </div>
    </div>
  </div>
</template>
<script>
import WButton from '@/components/Button';
export default {
  components: { WButton },
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    handleFailed() {
      this.$emit('handleFailed');
      this.$router.back();
    },
    goBack() {
      this.$router.back();
    }
  }
};
</script>
<style scoped lang="less">
.pay-status-container {
  width: 100%;
  height: calc(100% - 320px);
  padding-top: 80px;
  box-sizing: border-box;
  .content {
    max-width: 1200px;
    width: 100%;
    height: 100%;
    min-height: 200px;
    margin: 0 auto;
    position: relative;
    .flex();
    .back-btn {
      position: absolute;
      left: 0;
      top: 50px;
      cursor: pointer;
      .iconfont,
      .text {
        font-size: 20px;
        font-weight: 400;
        color: #333333;
      }
      .text {
        margin-left: 10px;
      }
    }
    .center {
      // width: 270px;
      height: 308px;
      .flex();
      flex-direction: column;
      .icon {
      }
      .title {
        font-size: 24px;
        font-weight: bold;
        color: #ec6941;
        margin-top: 38px;
      }
      .small-title {
        font-size: 16px;
        font-weight: 500;
        color: #333333;
        margin-top: 20px;
      }
      /deep/.pay-status-btn {
        margin-top: 30px;
        &:hover {
          border: 0 !important;
          .button-text,
          .iconfont {
            color: #fff !important;
          }
        }
      }
    }
  }
}
</style>
