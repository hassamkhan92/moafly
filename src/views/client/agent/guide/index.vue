<template>
  <div class="agent">
    <div class="agent-banner">
      <div class="agent-banner-center">
        <div class="content-left content">
          <div class="title-box">
            <p class="agent-titlt1 title">We're Reimagining Real Estate, One Custom-Tailored Solution At A Time</p>
            <p class="agent-title2 title">
              At Moafly, our agents work for you. Not the other way around. By removing competitive commission rates from the real estate equation, we give buyers and sellers the freedom to find an
              agent who puts their needs first, leading to a more balanced marketplace.
            </p>
            <WButton class="agent-btn" :iconShow="true" text="Learn more" bgColor="#DC5674" height="40px" radius="8px" width="200px" @handleClick="handleToAgent"></WButton>
          </div>
        </div>
        <!-- 右侧图片 -->
        <div class="content-right content">
          <WVideo class="agent-best-video"></WVideo>
        </div>
      </div>
    </div>
    <!-- agent内容 -->
    <div class="agnet-content">
      <div class="content-center">
        <!--  Why moafly agents stand out?-->
        <div class="agent-why">
          <div class="agent-title">
            The Moafly Promise…
          </div>
          <!-- 内容 -->
          <div class="why-content">
            <div class="why-item">
              <div class="item-icon">
                <img :src="why_iconImg" alt="" />
              </div>
              <div class="item-title">No Commision</div>
              <div class="item-text">
                Less stress for our agents and more time to focus on your needs. We take the burden of costly commissions off the table so our team can give you their full attention.
              </div>
            </div>
            <div class="why-item">
              <div class="item-icon">
                <img :src="why_iconImg" alt="" />
              </div>
              <div class="item-title">On-Demand Support</div>
              <div class="item-text">Tired of hidden fees throwing you for a loop? Our transparent pricing lets you pay for your services by the hour with no surprises or unwanted charges ever.</div>
            </div>
            <div class="why-item">
              <div class="item-icon">
                <img :src="why_iconImg" alt="" />
              </div>
              <div class="item-title">Ultra-Secure Platform</div>
              <div class="item-text">
                We take the safety of our clients and agents seriously. Our platform uses the latest data protection technology to ensure that your transaction is completely secure.
              </div>
            </div>
            <div class="why-item">
              <div class="item-icon">
                <img :src="why_iconImg" alt="" />
              </div>
              <div class="item-title">Rapid Results</div>
              <div class="item-text">
                On average, Moafly real estate transactions take as little as 3 hours. So, you can spend less time navigating the market and more time settling into your new home.
              </div>
            </div>
          </div>
        </div>
        <!-- How to hire moafly agents? -->
        <div class="agent-how">
          <div class="agent-title">Buy or Sell In 4 Simple Steps…</div>
          <!-- 内容 -->
          <div class="how-conent">
            <div v-for="(item, idx) in agentHowList" :key="idx" class="how-item how-bottom" :class="'how-item-' + idx">
              <img :src="item.imgUrl" alt="" class="how-images" />
              <div class="item-number">{{ item.value }}</div>
              <div class="item-title">{{ item.label }}</div>
              <div class="item-mask">
                <span class="mask-title">{{ item.desc }} </span>
              </div>
            </div>
          </div>
        </div>
        <!-- Most Popular Moafly Agents -->
        <div class="agent-most">
          <div class="agent-title">Real Estate Rising Stars…</div>
          <div class="most-content swiper-container">
            <div class="swiper-wrapper">
              <div v-for="(item, idx) in popularAgentList" :key="idx" class="swiper-slide most-item">
                <div class="item-image">
                  <img :src="item.agentHeaderImg" alt="" />
                </div>
                <div class="item-content">
                  <p class="item-name">{{ item.agentName }}</p>
                  <p class="item-price item-text">$ {{ item.agentPrice }} / Hour</p>
                  <p class="item-adress item-text">{{ item.agentLocation }}</p>
                  <WButton class="btn" text="Learn more" bgColor="#DC5674" height="32px" radius="4px" width="117px" @handleClick="handleClick"></WButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <bottonFooter></bottonFooter>
  </div>
</template>

<script>
import * as api from '@/api';
import WVideo from '@/components/Video/agent.vue';
import bottonFooter from '@/components/footer/index';
import WButton from '@/components/Button/index.vue';
import why_icon from '@/assets/images/why_icon.png';
import { agentHowList } from './index.js';
export default {
  name: 'agent',
  components: {
    WButton,
    bottonFooter,
    WVideo
  },
  data() {
    return {
      popularAgentList: [], //中介列表
      why_iconImg: why_icon,
      agentHowList: agentHowList,
      mostAgentList: []
    };
  },
  mounted() {
    this.getAgentList();
  },
  methods: {
    handleClick() {
      this.$router.push('/agent');
    },
    handInSell() {
      this.$router.push('/agent/Address');
    },
    handleToAgent() {
      this.$router.push('/agent');
    },
    getAgentList() {
      api.agent.listAgent({ pageNum: 1, pageSize: 100 }).then(res => {
        if (res.code === 'K-000000') {
          const agentList = res.context.dataContent;
          agentList.sort((a, b) => b.employNums - a.employNums);
          this.popularAgentList = agentList.slice(0, 3);
          console.log('this.popularAgentList===>', this.popularAgentList);
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.agent {
  width: 100%;
  height: 100%;
  padding-top: 80px;
  .agent-banner {
    width: 100%;
    background: rgba(19, 26, 60, 0.03);
    .agent-banner-center {
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
        .agent-titlt1 {
          max-width: 539px;
          width: 100%;
          font-family: 'Libre Franklin';
          font-style: normal;
          font-weight: 700;
          font-size: 34px;
          line-height: 48px;
          color: #0f1b43;
          .color {
            color: #dc5674;
          }
        }
        .box-bottom {
          margin-bottom: 24px;
        }
        .agent-title2 {
          max-width: 539px;
          width: 100%;
          font-family: 'Libre Franklin';
          font-style: normal;
          font-weight: 400;
          font-size: 18px;
          line-height: 24px;
          color: #474d61;
          margin-top: 16px;
        }
      }
      .content-left {
        justify-content: flex-start;
      }
      .content-right {
        height: 350px;
      }
      .agent-btn {
        margin-top: 40px;
      }
    }
  }
  .agnet-content {
    width: calc(100% - 30px);
    padding: 0 15px;
    .content-center {
      max-width: 1200px;
      width: 100%;
      margin: 0 auto;
      .agent-title {
        max-width: 437px;
        width: 100%;
        font-family: 'Libre Franklin';
        font-style: normal;
        font-weight: 700;
        font-size: 30px;
        line-height: 36px;
        color: #0f1b43;
        margin-bottom: 29px;
      }
      .agent-why {
        width: calc(100% - 30px);
        padding: 40px 15px 70px;
        .why-content {
          width: 100%;
          .flex();
          gap: 30px 0;
          @media (min-width: 992px) {
            gap: 0 26px;
          }
          .why-item {
            min-height: 258px;
            border: 1px solid #dc5674;
            box-shadow: 0px 4px 12px rgba(15, 27, 67, 0.1);
            border-radius: 16px;
            padding: 13px 32px 28px 24px;
            box-sizing: border-box;
            flex: 0 0 100%;
            @media (min-width: 992px) {
              flex: 0 0 calc(25% - 20px);
            }
            .item-icon {
              .flex();
              justify-content: flex-end;
              img {
                width: 60px;
                height: 60px;
              }
            }
            .item-title {
              font-family: 'Libre Franklin';
              font-style: normal;
              font-weight: 500;
              font-size: 18px;
              line-height: 22px;
              color: #0f1b43;
            }
            .item-text {
              font-family: 'Libre Franklin';
              font-style: normal;
              font-weight: 400;
              font-size: 16px;
              line-height: 19px;
              color: rgba(15, 27, 67, 0.6);
              margin-top: 16px;
            }
          }
        }
      }
      .agent-how {
        width: 100%;
        .how-conent {
          width: 100%;
          position: relative;
          .flex();
          .how-bottom {
            z-index: 10;
          }
          .how-item {
            position: relative;
            height: 200px;
            background-color: rgba(0, 0, 0, 0.8);
            cursor: pointer;
            overflow: hidden;
            flex: 0 0 100%;
            gap: 30px 20px;
            @media (min-width: 768px) {
              flex: 0 0 calc(50% - 20px);
            }
            @media (min-width: 992px) {
              flex: 0 0 calc(25% - 20px);
            }
            &.how-item-0 {
              @media (min-width: 992px) {
                border-radius: 16px 0 0 16px;
              }
            }
            &.how-item-3 {
              @media (min-width: 992px) {
                border-radius: 0 16px 16px 0;
              }
            }
            .how-images {
              position: absolute;
              top: 0;
              left: 0;
              z-index: -1;
              opacity: 0.7;
              width: 100%;
              height: 100%;
            }
            .item-number {
              margin: 44px auto;
              width: 46px;
              height: 46px;
              border-radius: 50%;
              background: rgba(255, 255, 255, 0.4);
              font-family: 'Libre Franklin';
              font-style: normal;
              font-weight: 500;
              font-size: 18px;
              line-height: 22px;
              color: #ffffff;
              .flex();
            }
            .item-title {
              margin: 24px auto;
              font-family: 'Libre Franklin';
              font-style: normal;
              font-weight: 500;
              font-size: 18px;
              line-height: 22px;
              color: #ffffff;
              text-align: center;
            }
            .item-mask {
              position: absolute;
              top: 0;
              left: 0;
              bottom: 0;
              right: 0;
              background: #dc5674;
              padding: 27px 18px 18px;
              transition: all 0.6s ease-in-out;
              transform: translateY(100%);
              z-index: -1;
              .mask-title {
                font-family: 'Libre Franklin';
                font-style: normal;
                font-weight: 500;
                font-size: 16px;
                line-height: 22px;
                color: #ffffff;
              }
            }
            &:hover {
              .item-mask {
                transform: translateY(0);
                z-index: 9;
              }
            }
          }
        }
      }
      .agent-most {
        position: relative;
        width: 100%;
        padding: 40px 0;
        .swiper-container {
          width: 100%;
          .swiper-wrapper {
            width: 100%;
            display: flex;
            justify-content: space-between;
          }
          .swiper-slide {
            width: 384px;
            background: #f8f8f8;
            border-radius: 16px;
            padding: 16px;
            box-sizing: border-box;
            .flex();
            justify-content: flex-start;
            .item-image {
              width: 138px;
              height: 138px;
              border-radius: 8px;
              margin-right: 24px;
              img {
                border-radius: 8px;
                width: 100%;
                height: 100%;
                object-fit: cover;
                object-position: top center;
              }
            }
            .item-content {
              width: 100%;
              margin-top: 15px;
              p {
                margin: 0;
              }
              .item-name {
                font-family: 'Libre Franklin';
                font-style: normal;
                font-weight: 500;
                font-size: 16px;
                line-height: 19px;
                color: #0f1b43;
                margin-bottom: 16px;
              }
              .item-text {
                font-family: 'Libre Franklin';
                font-style: normal;
                font-weight: 400;
                font-size: 14px;
                line-height: 17px;
                color: #0f1b43;
                opacity: 0.6;
                margin-bottom: 8px;
              }
              /deep/.btn {
                margin-top: 8px;
                .button-text {
                  .icon-xiangyou {
                    display: none !important;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  .swiper-pagination {
    width: 300px;
    height: 10px;
    bottom: 20px;
    left: 37%;
    z-index: 999;
  }
  /deep/.swiper-pagination-clickable .swiper-pagination-bullet {
    margin: 0 5px !important;
    background: rgb(220, 86, 116) !important;
  }
}
</style>
