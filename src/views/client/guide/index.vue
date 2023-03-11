<template>
  <div class="sell">
    <div class="sell-banner">
      <div class="sell-banner-center">
        <div class="content-left content">
          <div class="title-box">
            <p class="sell-titlt1 title">List Your Home The Moafly Way: No fees, no commissions, and no headaches guaranteed.</p>
            <p class="sell-title2 title">
              Selling your home shouldn't be complicated. That's why we use an innovative blend of leading AI software and localized real estate expertise to take the frustration out of listing your
              property, so you can earn more and worry less.
            </p>
            <WButton class="sell-btn" text="Let’s List It" bgColor="#DC5674" height="40px" radius="8px" width="200px" :iconShow="true" @handleClick="handInSell"></WButton>
          </div>
        </div>
        <!-- 右侧图片 -->
        <div class="content-right content">
          <WVideo url="https://moaflytest.s3.us-east-2.amazonaws.com/Selling+Home+2.mp4" poster="https://moaflytest.s3.us-east-2.amazonaws.com/Selling+Home+2.mp4?vframe/jpg/offset/3/w/1920/h/800" />
          <!-- <img :src="require('@/assets/images/sell_home.png')" alt="" /> -->
        </div>
      </div>
    </div>
    <!-- 服务 -->
    <div class="sell-service">
      <div class="service-center">
        <div class="service-item">
          <img class="top-img" :src="service_box_topImgUrl" alt="" />
          <p class="service-title1"><img class="icon-img1" :src="service_icon4ImageUrl" alt="" /><span>01</span></p>
          <p class="service-title2">Give us the inside scoop on what makes your home shine, so we can build an eye-catching listing that attracts the buyers you’re looking for.</p>
        </div>
        <div class="service-item">
          <img class="top-img" :src="service_box_topImgUrl" alt="" />
          <p class="service-title1"><img class="icon-img1" :src="service_icon4ImageUrl" alt="" /><span>02</span></p>
          <p class="service-title2">Next, we build your MLS listing from scratch in a fraction of the time, allowing you to find potential buyers fast.</p>
        </div>
        <div class="service-item">
          <img class="top-img" :src="service_box_topImgUrl" alt="" />
          <p class="service-title1"><img class="icon-img1" :src="service_icon4ImageUrl" alt="" /><span>03</span></p>
          <p class="service-title2">Now, all you have to do is sit back and wait for the best offer on your property. Simple, right?</p>
        </div>
      </div>
    </div>
    <bottonFooter></bottonFooter>
  </div>
</template>

<script>
import bottonFooter from '@/components/footer/index';
import WButton from '@/components/Button/index.vue';
import WVideo from '@/components/Video/agent.vue';
export default {
  name: 'sell',
  components: {
    WButton,
    bottonFooter,
    WVideo
  },
  data() {
    return {
      service_icon4ImageUrl: require('@/assets/images/contact-us-icon.png'),
      service_box_topImgUrl: require('@/assets/images/service-box_top.png')
    };
  },
  methods: {
    handInSell() {
      this.$store.commit('SET_HOME_ID', '');
      this.$store.commit('SET_HOME_INFO', {});
      this.$router.push('/sell');
    }
  }
};
</script>

<style lang="less" scoped>
.sell {
  width: 100%;
  height: 100%;
  padding-top: 80px;
  .sell-banner {
    width: 100%;
    background: rgba(19, 26, 60, 0.03);
    .sell-banner-center {
      max-width: 1200px;
      height: 100%;
      margin: 0 auto;
      padding: 36px 0;
      box-sizing: border-box;
      .flex();
      gap: 30px 0;
      .content {
        width: calc(100% - 30px);
        padding-left: 15px;
        padding-right: 15px;
        height: 100%;
        .flex();
        @media (min-width: 1200px) {
          width: calc(50% - 30px);
        }
        img {
          width: 100%;
          height: 100%;
        }
        .title {
          margin: 0;
          width: 100%;
          text-align: left;
        }
        .sell-titlt1 {
          font-family: 'Libre Franklin';
          font-style: normal;
          font-weight: 700;
          font-size: 40px;
          line-height: 48px;
          color: #0f1b43;
          .color {
            color: #dc5674;
          }
        }
        .box-bottom {
          margin-bottom: 24px;
        }
        .sell-title2 {
          font-family: 'Libre Franklin';
          font-style: normal;
          font-weight: 400;
          font-size: 18px;
          line-height: 24px;
          color: #474d61;
          margin-bottom: 5px;
        }
      }
      .content-left {
        .title-box {
          max-width: 540px;
          width: 100%;
          .sell-titlt1 {
            font-family: 'Libre Franklin';
            font-style: normal;
            font-weight: 700;
            font-size: 34px;
            line-height: 48px;
          }
          .sell-title2 {
            font-family: 'Libre Franklin';
            font-style: normal;
            font-weight: 400;
            font-size: 18px;
            line-height: 24px;
            color: #474d61;
            margin-top: 16px;
          }
        }
      }
      .content-right {
        height: 350px;
      }
      .sell-btn {
        margin-top: 40px;
      }
    }
  }
  .sell-service {
    width: calc(100% - 30px);
    padding: 40px 15px 70px;
    .service-center {
      max-width: 1200px;
      width: 100%;
      margin: 0 auto;
      .flex();
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 30px 0;
      @media (min-width: 992px) {
        gap: 0 30px;
      }
      .service-item {
        position: relative;
        padding-top: 41px;
        box-sizing: border-box;
        height: 237px;
        box-shadow: 0px 4px 12px rgba(15, 27, 67, 0.2);
        border-radius: 16px;
        .flex();
        align-items: flex-start;
        flex-wrap: wrap;
        flex: 0 0 100%;
        @media (min-width: 992px) {
          flex: 0 0 calc(33.333% - 20px);
        }
        p {
          margin: 0;
          text-align: center;
        }
        .top-img {
          position: absolute;
          top: 0;
          left: 0;
          z-index: 15;
          width: 100%;
        }

        .icon-img1 {
          width: 32px;
          height: 32px;
          margin-right: -15px;
          z-index: 15;
        }

        .service-title1 {
          width: 100%;
          text-align: center;
          font-family: 'Libre Franklin';
          font-style: normal;
          font-weight: 400;
          font-size: 24px;
          line-height: 24px;
          color: #474d61;
          margin-top: 20px;
        }
        .service-title2 {
          width: 286px;
          font-family: 'Libre Franklin';
          font-style: normal;
          font-weight: 400;
          font-size: 18px;
          line-height: 24px;
          color: #0f1b43;
        }
      }
    }
  }
}
</style>
