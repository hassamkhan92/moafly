<template>
  <div class="container">
    <div class="section-home">
      <div class="top-agents-container">
        <div class="top-agents">
          <div class="top-agents-title">Buy Or Sell With Just One Click</div>
          <p class="top-agents-text">Moafly is modernizing the real estate game with on-demand, commission-free agents ready to work for you.</p>
          <i-button type="primary" padding-left="26px" padding-top="22px" @click="jumpTo('/request')">Let's Get Started</i-button>
        </div>
      </div>
    </div>
    <div class="search-container">
      <div class="search">
        <input type="text" maxlength="64" placeholder="Start Here: Find My Agent" class="input" />
        <i-button type="secondary" @click="jumpTo('/agent')">
          Search
        </i-button>
      </div>
    </div>

    <div class="section-agents">
      <div class="agents-home">
        <h4>How Moafly does Real Estate on your terms…</h4>
        <ul>
          <li>
            <span class="icon"></span>
            <span class="text">Pay our agents by the hour with no competitive commissions, so you get a partner fully invested in your needs, not their own.</span>
          </li>
          <li>
            <span class="icon"></span>
            <span class="text">Our a la carte services give you the freedom to pay for what you actually need. No more, no less.</span>
          </li>
          <li>
            <span class="icon"></span>
            <span class="text">Our team can help navigate anything real estate throws at you.</span>
          </li>
        </ul>
      </div>

      <div class="agents-info">
        <h4>Meet Team Moafly…</h4>
        <div class="agents-info-content">
          <agent-card :class="'agent-card-container-' + index" :item="item" v-for="(item, index) in agentList" :key="item.agentId"></agent-card>
        </div>
      </div>
    </div>

    <div class="section-sell">
      <div class="list-my">
        <div class="list-my-wrap">
          <div class="list-my-text">Ready to sell your home with NO agent required?</div>
          <div class="list-my-small-text">We'll create a custom MLS listing for your home and give you a roadmap for getting the most out of your sale - risk-free.</div>
          <i-button type="light" padding-top="22px" padding-left="52px" @click="jumpTo('/sell/Address')">List My House Now </i-button>
        </div>
      </div>
    </div>
    <div class="home-info">
      <div class="centent">
        <h4>Listed by Moafly…</h4>
        <div class="agent-wrap">
          <el-row :gutter="30" style="width: 100%">
            <el-col v-for="(item, index) in homeList" :key="index" :xs="24" :sm="12" :md="8" :lg="6">
              <HomeCard :item="item"></HomeCard>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <div class="seen-info">
      <div class="centent">
        <h4>As seen in</h4>
        <div class="seen-list">
          <div class="seen-item" v-for="(item, index) in seenList" :key="index">
            <img class="seen-img" :src="item.icon" alt="" />
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import IButton from './components/button.vue';
import AgentCard from './components/agent-card.vue';
import HomeCard from './components/home-card.vue';
import Footer from '@/components/footer/index.vue';
import { agent } from '@/api';
import * as api from '@/api';
export default {
  components: { IButton, AgentCard, HomeCard },
  data() {
    return {
      avatar: this.$store.getters.userInfo?.headImg,
      test: 0,
      agentList: [],
      homeList: [],
      showVideo: false,
      seenList: [
        {
          id: 1,
          icon: require('@/assets/svg/seen_icon1.png')
        },
        {
          id: 2,
          icon: require('@/assets/svg/seen_icon2.png')
        },
        {
          id: 3,
          icon: require('@/assets/svg/seen_icon3.png')
        },
        {
          id: 4,
          icon: require('@/assets/svg/seen_icon4.png')
        }
      ],
      params: {
        pageNum: 1,
        pageSize: 8,
        listAgentStateLicense: '02012834'
      }
    };
  },
  computed: {
    token() {
      return this.$store.getters.token;
    }
  },
  mounted() {
    agent.listAgent({ pageNum: 1, pageSize: 100 }).then(res => {
      const agents = res.context.dataContent;
      agents.sort((a, b) => b.agentScore - a.agentScore);
      this.agentList = [
        {
          agentId: 1,
          agentName: 'David Ha',
          agentScore: null,
          agentPrice: 325,
          agentLocation: 'Los Angeles, California',
          agentIntroduce: 'We work for you, others work for the commission',
          agentHeaderImg: 'https://moaflytest.s3.us-east-2.amazonaws.com/moafly/20220801/1659361581292.jpg',
          agentVideo: null,
          agentPhoneNum: '+1 888-383-6881',
          agentEmail: 'davidha@moafly.com',
          agentSkills: 'Contracting,House touring,Price negotiation,List my home',
          employNums: null,
          agentEmployState: 1,
          evaluateVOList: null,
          taskId: null,
          comingSoon: 1
        },
        {
          agentId: 7,
          agentName: 'Alex Calle',
          agentScore: null,
          agentPrice: 325,
          agentLocation: 'Los Angeles, California',
          agentIntroduce:
            'When you combine my real estate experience with my extensive training, my clients always win. My designations include the Accredited Buyer’s Representative (ABR) and the Certified Real Estate Brokerage Manager (CRB).',
          agentHeaderImg: 'https://moaflytest.s3.us-east-2.amazonaws.com/moafly/20220802/1659411922893.jpg',
          agentVideo: null,
          agentPhoneNum: '+1 232-123-4231',
          agentEmail: 'alex@moafly.com',
          agentSkills: 'List my home',
          employNums: null,
          agentEmployState: 1,
          evaluateVOList: null,
          taskId: null,
          comingSoon: 1
        },
        {
          agentId: 9,
          agentName: 'Denis Vanegas',
          agentScore: null,
          agentPrice: 325.0,
          agentLocation: 'Florida',
          agentIntroduce:
            'With a passion for service in Florida, Denis is ready to help with your homebuying and selling needs. As a proud member of the moafly family, Denis carries the values of hard work, integrity, and outstanding client service into everything he does.',
          agentHeaderImg: 'https://moaflytest.s3.us-east-2.amazonaws.com/moafly/20230119/1674099456407.jpg',
          agentVideo: null,
          agentPhoneNum: '2132840268',
          agentEmail: 'Denis@moafly.com',
          agentSkills: 'Contracting,House touring',
          employNums: null,
          agentEmployState: 1,
          evaluateVOList: null,
          taskId: null,
          featuredReview: null,
          educationExperienceList: null,
          language: null,
          videoUrl: null,
          agentLicense: 'SL3430681',
          comingSoon: 1
        },
        {
          agentId: 5,
          agentName: 'Geoffrey Poyen',
          agentScore: null,
          agentPrice: 325,
          agentLocation: 'Miami, Florida',
          agentIntroduce: 'I’ve spent two decades excelling in the competitive landscape of Florida real estate, establishing a reputation as a well-respected and innovative agent.',
          agentHeaderImg: 'https://moaflytest.s3.us-east-2.amazonaws.com/moafly/20221020/1666197643802.jpg',
          agentVideo: null,
          agentPhoneNum: '+1 212-154-1232',
          agentEmail: 'geoffrey@moafly.com',
          agentSkills: 'Contracting',
          employNums: null,
          agentEmployState: 1,
          evaluateVOList: null,
          taskId: null,
          comingSoon: 1
        }
      ];
    });
    this.getRecommendData();
  },
  destroyed() {
    let dom = document.querySelector('.header-container');
    if (dom) dom.style.display = '';
  },
  methods: {
    /**
     * 去个人中心
     */
    goPersonal() {
      this.$router.push('/my-account');
    },
    //返回个人中心
    goDashboard() {
      this.$router.push('/person');
    },
    //去钱包
    goWallet() {
      this.$router.push('/wallet');
    },
    // 退出登陆
    doLogOut() {
      this.$store.dispatch('doRemove');
      this.$router.push('/login');
    },
    handleVideoPlay() {
      this.showVideo = true;
    },
    jumpTo(url) {
      this.$router.push(url);
    },
    /**
     * 获取推荐的房屋
     */
    getRecommendData() {
      api.search
        .getHomeList(this.params)
        .then(res => {
          if (res.code === 'K-000000' && res.context) {
            if (res.context.dataContent && Array.isArray(res.context.dataContent)) {
              if (res.context.dataContent.length > 0) {
                this.homeList = res.context.dataContent;
              } else {
                return;
                // console.log('没有获取房屋数据1');
              }
            } else {
              return;
              // console.log('没有获取房屋数据2');
            }
          } else {
            return;
            // console.log('没有获取房屋数据3');
          }
        })
        .catch(err => {
          return;
          // console.log('搜索房屋失败', err);
        });
    }
  }
};
</script>

<style lang="less" scoped>
@import './index';
.tag {
  position: relative;
  background: #353f62;
  left: 15px;
  top: -555px;
  .flex();
}
.averate-img {
  width: 38px;
  height: 38px;
  border-radius: 50%;
}
</style>
