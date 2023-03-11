<template>
  <div class="coming-sooon-container">
    <div class="coming-soon-content">
      <div class="form-container">
        <div class="title">We know it takes some time but</div>
        <div class="extrude-title">SIT TIGHT!</div>
        <div class="input-title">Fill in your email and we'll let you know when we launch</div>
        <WInput ref="wuInput" @handleShowPop="handleShowPop"></WInput>
      </div>
    </div>
    <div class="popups-mask" v-show="popIsShow">
      <div class="popups">
        <div class="popups-img">
          <img :src="require('@/assets/images/comingsoon/msg.png')" alt="" />
        </div>
        <div class="popups-title">
          Thank you for subscribtion!
        </div>
        <div class="popups-small-title">
          We will notify you once we are ready!
        </div>
        <div class="popups-footer">
          <div class="popups-button" @click="handleOk">Okay <i class="iconfont icon-xiangyou"></i></div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import WInput from './components/input.vue';
import * as api from '@/api';
export default {
  components: { WInput },
  data() {
    return {
      popIsShow: false,
      logo: require('@/assets/images/logoColor.png')
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    handleOk() {
      this.popIsShow = false;
    },
    handleShowPop(email) {
      this.popIsShow = true;
      let params = {
        touristEmail: email
      };
      api.user.addTourist(params).then(res => {
        this.popIsShow = true;
        this.$refs.wuInput.restForm();
      });
    }
  }
};
</script>
<style scoped lang="less">
.coming-sooon-container {
  width: 100%;
  margin-top: 80px;
  /deep/.comming-soon-header {
    background-color: #fff;
    box-shadow: 0px 2px 7px 0px rgba(16, 28, 70, 0.3);
    .link {
      color: #000 !important;
    }
  }
  .coming-soon-content {
    width: 100%;
    height: 626px;
    overflow: hidden;
    background: url('~@/assets/images/comingsoon/bg.png') no-repeat 0 0;
    background-size: cover;
    .form-container {
      width: 600px;
      height: 260px;
      margin: 255px 0 0 400px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .title {
        font-size: 30px;
        font-family: LibreFranklin;
        font-weight: 500;
        color: #000000;
      }
      .extrude-title {
        font-size: 79px;
        font-family: LibreFranklin;
        font-weight: 500;
        color: #333333;
      }
      .input-title {
        font-size: 18px;
        font-family: LibreFranklin;
        font-weight: 500;
        color: #666666;
      }
      .tips-title {
        font-size: 20px;
        font-family: LibreFranklin;
        font-weight: 500;
        span {
          color: #353f62;
        }
      }
    }
  }
  .popups-mask {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.4);
  }
  .popups {
    width: 710px;
    height: 429px;
    background: #ffffff;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 40px 0 0 0;
    box-sizing: border-box;
    .popups-img {
      width: 77px;
      height: 67px;
    }
    .popups-title {
      font-size: 32px;
      font-family: LibreFranklin;
      font-weight: bold;
      color: #333333;
    }
    .popups-small-title {
      font-size: 20px;
      font-family: LibreFranklin;
      font-weight: 500;
      color: #999999;
    }
    .popups-footer {
      width: 710px;
      height: 130px;
      background: #dddddd;
      border-radius: 0px 0px 16px 16px;
      display: flex;
      justify-content: center;
      align-items: center;
      .popups-button {
        width: 135px;
        height: 50px;
        background: #353f62;
        border-radius: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        cursor: pointer;
        .iconfont {
          margin-left: 10px;
          color: #fff;
        }
        &:hover {
          background-color: #000;
          .iconfont::before {
            content: '\e624';
          }
        }
      }
    }
  }
}

@media (max-width: 1200px) {
  .coming-soon-content {
    display: flex;
    justify-content: center;
    align-items: center;
    .form-container {
      margin: auto !important;
    }
  }
}
</style>
