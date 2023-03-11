<!--
 * @Author: zulezhe
 * @Date: 2021-11-09 01:40:51
 * @LastEditors: zulezhe
 * @LastEditTime: 2023-02-02 00:13:39
 * @Path: https://gitee.com/zulezhe/
 * @Description:
-->
<template>
  <div class="agent-detail-container">
    <div class="agent-detail-center">
      <div class="detail-left">
        <div class="left-top" :style="{ backgroundImage: `url(${agentHeaderImg})`, backgroundRepeat: 'no-repeat', backgroundPosition: '0 0', backgroundSize: 'contain' }"></div>
        <div class="left-bottom">
          <div class="info">
            <Title></Title>
            <Content :list="agentInformation" @handleActive="handleInfoActive" />
          </div>
          <div class="skills">
            <Title title="SKILLS"></Title>
            <Content :list="skillsList" @handleActive="handleSkillsActive" />
          </div>
        </div>
      </div>
      <div class="detail-right">
        <div class="agent-introduce">
          <div class="introduce-title bold-text">
            {{ agentName }}
          </div>
          <div class="license regular-text">Agent License #:{{ agentLicense }}</div>
          <div class="rankings">RATING</div>
          <div class="rate">
            <!-- <Rate :value="agentScore"></Rate> -->
            <Rate :value="agentScore" :ShowText="false"></Rate>
            <p class="rate-value">{{ agentScore }}</p>
          </div>
          <div class="hire-me">
            <Button text="Hire Me" @handleClick="hireAgent" radius="6px"></Button>
          </div>
        </div>
        <el-tabs class="detail-content" v-model="activeTabPane" @tab-click="handleTabsClick">
          <el-tab-pane label="About Me" name="first">
            <Title title="INTRODUCTION" width="330px"></Title>
            <div
              class="detail-text regular-text"
              v-html="
                agentIntroduce
                  .replace(/\n/g, '<br/>')
                  .replace(/&#60;i&#62;/g, '<i>')
                  .replace(/&#60;\/i&#62;/g, '</i>')
              "
            ></div>
            <!-- <Title title="FEATURED REVIEW" width="330px"></Title>
            <div class="detail-text regular-text">
              “{{ agentName }} did a great job on my home sale. From working through buyer challenges to providing good advice, she was a solid partner in making the process as easy as it could be. I
              would wholeheartedly recommend her to someone that is needing a competent, responsive agent. Thanks!“
            </div> -->
          </el-tab-pane>
          <el-tab-pane label="Most Recent Reviews" name="second">
            <Appraise :appraiseList="evaluateVOList"></Appraise>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <Footer></Footer>
    <enterPayMentDialog ref="enterPayMentDialog"></enterPayMentDialog>
    <payMentDialog @handlerAddCard="handlerAddCard" ref="paymentDetailDialog"></payMentDialog>
  </div>
</template>
<script>
import * as api from '@/api';
import Title from './components/title.vue';
import Content from './components/content.vue';
import Rate from '@/components/Rate/index.vue';
import Button from '@/components/Button';
import Appraise from './components/appraise.vue';
import Wpopups from '@/components/Popups';
import { getPayInfo } from '@/util/util.js';
import enterPayMentDialog from '@/views/client/personal/wallet/components/enterPayMentDialog.vue';
import payMentDialog from '@/views/client/personal/wallet/components/payMentDialog.vue';
import { getToken } from '@/util/auth';
export default {
  components: { Title, Content, Rate, Button, Appraise, Wpopups, enterPayMentDialog, payMentDialog },
  data() {
    return {
      loading: false,
      agentName: '',
      agentLicense: '',
      agentScore: '',
      agentLocation: '',
      agentSkills: '',
      agentVideo: '',
      agentIntroduce: '',
      agentHeaderImg: '', // 头像
      paymentLink: '',
      evaluateVOList: [], //评论数据
      popIsShow: false,
      popIsShow2: false,
      popIsShow3: false,
      activeTabPane: 'first',
      rate: 5,
      hireStatus: 'Default', // 雇佣状态
      form: {
        orderMoney: 500,
        orderRemark: '',
        orderTitle: '',
        salesAgentId: 0
      },
      rules: {
        orderTitle: [
          { required: true, message: 'Please tell us your request', trigger: 'blur' },
          { min: 3, max: 20, message: 'Headings are between 3 and 20 characters long', trigger: 'blur' }
        ],
        orderRemark: [{ required: true, message: 'Please explain in more detail (optional)', trigger: 'blur' }]
      },
      agentInformation: [
        {
          id: 0,
          label: '',
          icon: require('@/assets/images/agent/1.png'),
          color: '#000',
          active: false
        },
        {
          id: 1,
          label: '',
          icon: require('@/assets/images/agent/2.png'),
          color: '#000',
          active: false
        },
        {
          id: 3,
          label: '',
          icon: require('@/assets/images/agent/4.png'),
          color: '#000',
          active: false
        }
      ],
      skillsList: []
    };
  },
  computed: {},
  created() {},
  mounted() {
    this.getAgentDetail();
  },
  methods: {
    handleSkillsActive(item, index) {
      console.log('选中Skills===>', item, index);
    },
    handleInfoActive(item, index) {
      console.log('选中Info===>', item, index);
    },
    //绑定银行卡
    handlerAddCard() {
      this.$refs.enterPayMentDialog.init();
    },
    /**
     * 获取中介详情
     */
    getAgentDetail() {
      api.agent.detailAgent(this.$route.query.id).then(res => {
        if (res.code === 'K-000000') {
          this.agentName = res.context.agentName;
          this.agentLicense = res.context.agentLicense ? res.context.agentLicense : 'Coming soon';
          this.agentInformation[2].label = res.context.agentEmail;
          this.agentScore = res.context.agentScore;
          this.agentInformation[0].label = res.context.agentPrice + ' USD / Hour';
          this.agentLocation = res.context.agentLocation;
          this.agentInformation[1].label = res.context.agentPhoneNum;
          this.agentSkills = res.context.agentSkills;
          this.evaluateVOList = res.context.evaluateVOList;
          if (this.agentSkills) {
            this.skillsList = this.agentSkills.split(',').map(item => {
              return {
                label: item
              };
            });
          }
          this.agentVideo = res.context.agentVideo;
          this.agentIntroduce = res.context.agentIntroduce;
          this.agentHeaderImg = res.context.agentHeaderImg;
        } else {
          console.log('Interface failed!' + res);
        }
      });
    },
    //雇佣中介
    hireAgent() {
      this.btnLoad = true;
      let token = getToken();
      if (token) {
        getPayInfo().then(data => {
          if (data) {
            this.$router.push(`/agent/hire/${this.$route.query.id}`);
          } else {
            this.$refs.paymentDetailDialog.init();
          }
          this.btnLoad = false;
        });
      } else {
        this.$router.push('/login');
      }
    },
    /**
     * 切换tabs
     */
    handleTabsClick(tab, event) {
      console.log(tab, event);
      console.log(this.activeTabPane);
    }
  }
};
</script>
<style scoped lang="less">
@import url('./index.less');
</style>
