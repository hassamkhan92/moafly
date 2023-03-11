<template>
  <div class="pay-status-container">
    <div class="content">
      <div class="back-btn" @click="goBack">
        <i class="iconfont icon-zhixiangzuo"></i>
        <span class="text">Check My Listings</span>
      </div>
      <div class="center">
        <img class="icon" :src="require('@/assets/images/pay/success.png')" />
        <div class="title">Congratulations!</div>
        <div class="small-title">You home will be alive in MLS soon!</div>
        <WButton text="Remind my agent" radius="4px" bgColor="rgba(0,0,0,0)" border="1px solid #353F62" color="#353F62" class="pay-status-btn" @handleClick="handleSuccess"></WButton>
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
    handleSuccess() {
      this.$emit('handleSuccess');
      this.$router.push('/person/my-agent');
    },
    goBack() {
      this.$router.push('/person/selling-homes');
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
    width: 1200px;
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
      width: 360px;
      height: 308px;
      .flex();
      flex-direction: column;
      .icon {
      }
      .title {
        font-size: 24px;
        font-weight: bold;
        color: #5ec64c;
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
