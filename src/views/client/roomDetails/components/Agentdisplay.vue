<template>
  <div class="detail_info_Agentdisplay">
    <div class="Agentdisplay_left">
      <div class="title">
        <p>Hire moafly agents on demand. Get your full commision back.</p>
      </div>
      <el-row :gutter="30" class="title_names">
        <el-col class="name" :span="6"
          ><div class="dot_moafly"></div>
          Highly educated</el-col
        >
        <el-col class="name" :span="6"
          ><div class="dot_moafly"></div>
          Platform guarantee</el-col
        >
        <el-col class="name" :span="6"
          ><div class="dot_moafly"></div>
          Hire on demand</el-col
        >
        <el-col class="name" :span="6"
          ><div class="dot_moafly"></div>
          High efficiency</el-col
        >
      </el-row>
      <WButton text="Learn More" bgColor="#DC5674" radius="6px" height="34px" size="12px" width="153px" @handleClick="handleToAgent"></WButton>
    </div>
    <div class="Agentdisplay_right">
      <img :src="iconImgUrl" alt="" />
    </div>
  </div>
</template>

<script>
import WButton from '@/components/Button';
export default {
  components: { WButton },
  methods: {
    handleToAgent() {
      this.$router.push('/agent');
    }
  },
  data() {
    return {
      iconImgUrl: require('@/assets/images/detail/moafly_agent_display.png')
    };
  }
};
</script>

<style lang="less" scoped>
.detail_info_Agentdisplay {
  margin-top: 32px;
  width: 100%;
  border: 1px solid #0f1b43;
  margin-bottom: 32px;
  background: #ffffff;
  border-radius: 16px;
  padding: 30px;
  box-sizing: border-box;
  .flex();
  justify-content: space-between;
  .Agentdisplay_left {
    width: 100%;
    margin-bottom: 30px;
    text-align: center;
    @media (min-width: 992px) {
      width: calc(65% - 30px);
      margin-bottom: 0;
    }
    .button-container {
      margin: auto;
      @media (min-width: 992px) {
        margin: 0;
      }
    }
    .title {
      font-size: 24px;
      font-family: LibreFranklin-SemiBold, LibreFranklin;
      font-weight: 600;
      color: #333333;
    }
    .title_names {
      width: 100%;
      margin-top: 24px;
      margin-bottom: 24px;
      width: 100%;
      margin-left: 0 !important;
      .name {
        font-size: 16px;
        font-family: LibreFranklin-Regular, LibreFranklin;
        font-weight: 400;
        color: #333333;
        padding: 0 !important;
        .dot_moafly {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #dc5674;
          margin-right: 8px;
          display: inline-block;
        }
      }
    }
  }
  .Agentdisplay_right {
    width: 100%;
    @media (min-width: 992px) {
      width: calc(35% - 30px);
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
