<template>
  <div class="question-container">
    <ul class="q-list-con">
      <li v-for="(item, index) in data" :key="index" class="item item7" @mouseenter="mouseover(index)" @mouseleave="mouseleave()">
        <a href="javascript:;" :class="{ active: active === index }">{{ item.question }}</a>
        <transition name="fade">
          <div v-show="active === index" class="content">
            <div class="text">{{ item.content }}</div>
          </div>
        </transition>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      active: 1,
      data: [
        {
          show: false,
          active: 1,
          question: 'Why would we help sellers list their homes for free?',
          content: 'We aren′t your traditional brokerage. Our brokerage and platform is created with the single idea that sellers shouldn′t have to pay any fees to sell their home.'
        },
        {
          show: false,
          active: 2,
          question: 'Are we a real brokerage?',
          content: 'Yes, we are licensed by the California Department of Real Estate.'
        },
        {
          show: false,
          active: 3,
          question: 'How long does it take for the listing to go live?',
          content: 'The listing will go live onto the MLS and all other online platforms in a few hours.'
        },
        {
          show: false,
          active: 4,
          question: 'Can I cancel my listing?',
          content: 'Yes, you can cancel your listing at any time.'
        },
        {
          show: false,
          active: 5,
          question: 'How much commission should I offer a buyer agent?',
          content:
            'We suggest 3% because the agents that are already working with buyers in the area will show your home right away. If the buyer came directly to the platform and made an offer without using an agent, you won′t be paying any commission. WE DON′T CHARGE ANYTHING FOR LISTING AND SELLING YOUR HOME!!!'
        },
        {
          show: false,
          active: 6,
          question: 'Will I get any help after I accept at offer?',
          content:
            'Our marketplace will provide you the with all the resources you′ll need. You can select your own escrow, title, transaction coordinator, etc. If you already have one that you love and aren′t on our marketplace, feel free to invite them onto the platform. We want the best possible community to service your transaction.'
        },
        {
          show: false,
          active: 7,
          question: 'Is moafly just a listing service?',
          content: 'No, we are a real estate community that offers the A to Z for your home needs.'
        },
        {
          show: false,
          active: 8,
          question: 'What areas do we cover?',
          content: 'We are currently operating in Los Angeles County and Orange Country. We expect cover the entire California by end of 2020.'
        },
        {
          show: false,
          active: 9,
          question: 'When will moafly operate in other states?',
          content: 'We expect to expand to more states in 2020. Stay tune.'
        }
      ]
    };
  },
  methods: {
    mouseover(index) {
      this.active = index;
    },
    mouseleave() {}
  }
};
</script>

<style scoped lang="less">
.question-container {
  .size(90%, 90%);
  // .border();
  .q-list-con {
    .size(40%, 100%);
    position: relative;
    .item {
      width: 100%;
      height: 10%;
      margin-top: 1%;
      // .border();
      text-align: right;
      .flex();
      justify-content: flex-end;
      a {
        border-radius: 8px;
        color: #131f44;
        padding: 10px;
      }
    }
    .active {
      background-color: #e3e2ef;
    }
    .content {
      position: absolute;
      left: 102%;
      top: 0;
      .size(723px, 426px);
      background: #e3e2ef 0% 0% no-repeat padding-box;
      border-radius: 8px;
      text-align: center;
      .flex();
      .text {
        width: 606px;
        height: 124px;
        text-align: left;
        letter-spacing: 0.3px;
        color: #131f44;
        line-height: 30px;
        // .border();
      }
    }
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 1s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
}
</style>
