<template>
  <div class="about-container">
    <div class="header">
      <div class="shade"></div>
    </div>
    <div class="featuresB"></div>
    <div class="bannerSelling"></div>
    <div class="problemB"></div>
    <div class="about-content">
      <div class="headerTop">
        <span class="shade-text">Sign up to buy or sell a home for free</span>
      </div>
      <!-- 房子特征 -->
      <div class="features">
        <div class="features-left">
          <div class="features-left-title">You deserve the full sale price for your home</div>
          <div class="features-left-content">
            At moafly, we′ve turned the traditional way of selling homes on its head! Now, you can cut out the costly middleman without cutting corners. We provide you with all the best tools,
            resources and vendors that leading real estate agents use. You’ll receive a professional listing on all the major sites, your own customized dashboard where you can view offers, and our
            expert assistance every step of the way. Our mission is to help you navigate the path to a speedy and successful sale without the need for a realtor. The best part? Working with moafly is
            100% free!
          </div>
        </div>
        <div class="features-left">
          <w-popups></w-popups>
        </div>
      </div>
      <!-- 简化卖房子，房子logo -->
      <!-- 简化卖房子，房子logo -->
      <div class="banner-selling">
        <div class="banner-selling-left">
          <div class="banner-selling-left-title">Selling your home, Simplified</div>
          <div :style="!loginStatus ? 'visibility:hidden;' : ''" class="banner-selling-left-content">Sign up to buy or sell a home for free</div>
          <div v-if="!loginStatus" :style="!loginStatus ? 'visibility:hidden;' : ''" class="banner-selling-left-signUp">
            <el-input v-model="input" class="el-inp" placeholder="Email@address"></el-input>
            <el-button class="el-btn" type="primary" @click="signIn">Sign up free</el-button>
          </div>
        </div>
        <img class="banner-selling-right" :src="require('@/assets/images/imgBGC.png')" alt="" />
      </div>

      <div class="problem">
        <div class="banner-problem-question">
          <w-question></w-question>
        </div>
      </div>
    </div>
    <bottonFooter></bottonFooter>
  </div>
</template>
<script>
import wQuestion from '@/components/Index/question.vue';
import bottonFooter from '@/components/footer/index';
import WPopups from '@/components/Popups';
import { getToken } from '@/util/auth';
export default {
  components: {
    wQuestion,
    bottonFooter,
    WPopups
  },
  data() {
    return {
      loginStatus: getToken()
    };
  },
  methods: {}
};
</script>
<style scoped lang="less">
.about-container {
  .size();
  overflow: auto;
  flex-direction: column;
  position: relative;
  .header {
    width: 100%;
    height: 639px;
  }
  .featuresB {
    width: 100%;
    height: 600px;
    background-color: #eeedf9;
  }
  .bannerSelling {
    width: 100%;
    height: 337px;
    background-color: #0f1b43;
  }
  .problemB {
    width: 100%;
    height: 801px;
    background-color: #eeedf9;
  }
  .about-content {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: calc(100% - 500px);
    margin: 0 auto;
    // height: 500px;
    // height: calc(100% - @navBarHeight);
    color: #fff;
    // margin-top: 80px;
    // .border();
    .headerTop {
      width: 100%;
      height: 639px;
      display: flex;
      align-items: center;
      justify-content: center;
      .shade-text {
        font-size: 58px;
        letter-spacing: 1.16px;
        color: #ffffff;
        opacity: 1;
      }
    }
    .features {
      width: 100%;
      height: 600px;
      display: flex;
      align-items: center;
      .features-left {
        width: 50%;
        margin-right: 8%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        // align-items: center;
      }
      .features-left-title {
        font-size: 22px;
        letter-spacing: 0.44px;
        color: #131f44;
        font-weight: bold;
      }
      .features-left-content {
        margin-top: 10px;
        width: 631px;
        font-size: 16px;
        letter-spacing: 0.32px;
        color: #131f44;
        line-height: 22px;
      }
    }
    .banner-selling {
      width: 100%;
      height: 337px;
      display: flex;
      align-items: center;
      .banner-selling-left {
        height: 100%;
        padding: 32px 0 56px 0;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        width: 502px;
        justify-content: space-between;
        .banner-selling-left-title {
          font-size: 50px;
          color: #ffffff;
          line-height: 70px;
        }
        .banner-selling-left-content {
          font: normal normal medium 22px/27px 'Lato-Medium';
          letter-spacing: 0.44px;
          color: #ffffff;
        }
        .banner-selling-left-signUp {
          display: flex;
          align-items: center;
          .el-inp {
            width: 266px;
            height: 40px;
            background: #ffffff;
            opacity: 1;
            border-radius: 8px;
            border: none;
          }
          .el-btn {
            width: 166px;
            height: 40px;
            border-radius: 8px;
            font-size: 15px;
            color: #ffffff;
            background-color: rgb(239, 72, 115);
            margin-left: 9px !important;
            border: none;
            text-align: center;
            // line-height: 40px;
          }
        }
      }
      .banner-selling-right {
        margin-left: 135px;
        width: 852px;
        height: 638px;
      }
    }
    .problem {
      width: 100%;
      height: 801px;
      padding: 180px 0 0 0;
      box-sizing: border-box;
      .banner-problem-question {
        width: 100%;
        // height: 50%;
        // .border();
        .flex();
      }
    }
  }
  .w-footer {
    margin-top: 60px;
  }
}
</style>
