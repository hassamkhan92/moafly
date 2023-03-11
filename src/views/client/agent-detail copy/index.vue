<template>
  <div class="agent-detail-main">
    <div class="agent-detail-content">
      <div class="detail-header">
        <div class="agent-header-left">
          <div class="agent-header-img">
            <img class="header-img" :src="agentDetailData.agentHeaderImg" alt="" />
          </div>
          <div class="agent-info-box">
            <p class="agent-info-name">{{ agentDetailData.agentName }}</p>
            <p class="agent-info-address"><img class="agent-icon address-icon" :src="require('@/assets/images/agent/location.png')" alt="" /> {{ agentDetailData.agentLocation }}</p>
            <p class="agent-info-tag"><img class="agent-icon" :src="require('@/assets/images/agent/agent-detail-tag.png')" alt="" />{{ msg }}</p>
          </div>
        </div>
        <div class="agent-header-right">
          <img v-if="isCollection" @click="handlerCollect(0)" class="opera-collection" :src="require('@/assets/images/agent/collection-active.png')" alt="" />
          <img v-else class="opera-collection" @click="handlerCollect(1)" :src="require('@/assets/images/agent/collection.png')" alt="" />
          <p @click="handlerHire" v-loading="btnLoad" class="opera-box cursor">Hire</p>
        </div>
      </div>
      <div class="flex-box">
        <div class="detail-content">
          <div class="detail-content-left">
            <p class="agent-title1">Meet Eric</p>
            <div class="agent-video">
              <video v-if="agentDetailData.agentVideo" type="video/mp4" :controls="false" style="width:100%;height:100%" src=""></video>
              <img v-else class="video-img" :src="agentVideoImgUrl" alt="" />
            </div>
            <p class="agent-title1">Verifications</p>
            <p class="agent-email">
              <span class="email-title title">Email:</span>
              <span class="email-text title"> {{ agentDetailData.agentEmail }}</span>
            </p>
            <p class="agent-license">Agent License #: {{ agentDetailData.agentPhoneNum }}</p>
            <p class="agent-title1">Languages</p>
            <div class="agent-languages">
              <p class="languages">
                <span class="language-title title">English: </span>
                <span class="language-text title">{{ agentDetailData.language }}</span>
              </p>
            </div>
            <p class="agent-title1">Education</p>
            <p class="agent-suny">SUNY Adirondack</p>
            <p class="agent-suny-text">{{ agentDetailData.educationExperienceList }}</p>
            <p class="agent-title1">Location</p>
            <div class="agent-address">
              <Map el="map" @complete="mapComplete"></Map>
            </div>
          </div>
          <div class="detail-content-right">
            <div class="detail-sill">
              <div class="skills-price">
                <p class="skills-title title">Skills</p>
                <p class="price-title title">${{ agentDetailData.agentPrice }}/hr</p>
              </div>
              <ul class="skills-tags">
                <li v-for="(item, idx) in skillsList" :key="idx" class="tag-item">{{ item.label }}</li>
              </ul>
              <p class="agent-introduction">Introduction</p>
              <p class="agent-introduction-text">{{ agentDetailData.agentIntroduce }}</p>
            </div>
            <div class="detail-most-recent">
              <p class="agent-recent-title">Most Recent Reviews</p>
              <ul v-if="evaluateVOList && evaluateVOList.length" class="reviews-box">
                <li v-for="(item, idx) in evaluateVOList" :key="idx" class="review-item">
                  <div class="review-info">
                    <div class="review-header">
                      <img class="header-img" :src="item.headImg || evalHeaderImgUrl" alt="" />
                    </div>
                    <div class="review-name-rate">
                      <p class="review-name">Sophia</p>
                      <p class="review-rate">
                        <el-rate :value="item.evaluateScore" disabled show-score text-color="#ff9900" score-template="{value}"> </el-rate><span class="review-time">{{ item.evaluateTime }}</span>
                      </p>
                    </div>
                  </div>
                  <p class="review-text">
                    {{ item.evaluateContent }}
                  </p>
                </li>
              </ul>
              <empty v-else class="empty"></empty>
            </div>
          </div>
        </div>
      </div>
    </div>
    <enterPayMentDialog ref="enterPayMentDialog"></enterPayMentDialog>
    <payMentDialog @handlerAddCard="handlerAddCard" ref="paymentDetailDialog"></payMentDialog>
  </div>
</template>

<script>
import * as api from '@/api';
import empty from './components/empty.vue';
import { getPayInfo } from '@/util/util.js';
import enterPayMentDialog from '@/views/client/personal/wallet/components/enterPayMentDialog.vue';
import payMentDialog from '@/views/client/personal/wallet/components/payMentDialog.vue';
import Map from '@/Gmap/ui/Map';
import Is from '@/util/is.js';
export default {
  name: 'agent-detail',
  components: {
    empty,
    Map,
    enterPayMentDialog,
    payMentDialog
  },
  data() {
    return {
      agentVideoImgUrl: require('@/assets/images/agent/agent-video.png'), //视频占位
      evalHeaderImgUrl: require('@/assets/images/avatar.png'), //评价头像
      hireStatus: 'Hire', //雇佣状态文案
      relationStateCode: 0, //雇佣状态值
      agentDetailData: {}, //中介详情
      skillsList: [], //技能列表
      evaluateVOList: [], //凭借列表
      isCollection: false, //收藏中介状态
      msg: 'RIsing talent',
      btnLoad: false //按钮loading
    };
  },
  mounted() {
    this.getAgentDetail();
    this.getAgentHireStatus();
  },
  methods: {
    /**
     * 地图加载完成
     */
    mapComplete(map) {
      this.map = map;
      this.map.streetViewControl = false;
      this.map.fullscreenControl = false;
      this.map.scaleControl = false;
      this.map.zoomControl = false;
      this.map.mapTypeControl = false;
      console.log('this.map=>', this.map);
    },
    /**
     * 获取中介详情
     */
    getAgentDetail() {
      api.agent.detailAgent(this.$route.query.id).then(res => {
        if (res.code === 'K-000000' && res.context && Is.obj(res.context)) {
          this.agentDetailData = res.context;
          this.agentScore = res.context.agentScore ? Number(res.context.agentScore) : 0;
          // this.agentLocation = res.context.agentLocation;
          this.evaluateVOList = res.context.evaluateVOList;
          if (res.context.agentSkills) {
            this.msg = this.msg.toUpperCase();
            this.skillsList = res.context.agentSkills.split(',').map(item => {
              return {
                label: item
              };
            });
          }
        } else {
          console.log('Interface failed!' + res);
        }
      });
    },
    //绑定银行卡
    handlerAddCard() {
      this.$refs.enterPayMentDialog.init();
    },
    //雇佣中介
    handlerHire() {
      this.btnLoad = true;
      getPayInfo().then(data => {
        if (data) {
          this.$router.push(`/agent/hire/${this.$route.query.id}`);
        } else {
          this.$refs.paymentDetailDialog.init();
        }
        this.btnLoad = false;
      });
    },
    //收藏中介
    handlerCollect(value) {
      if (value) {
        this.isCollection = true;
        this.$message.success('Successful collection');
      } else {
        this.isCollection = false;
        this.$message.success('Cancel successfully');
      }
    },
    /**
     * 获取中介雇佣状态
     */
    getAgentHireStatus() {
      api.agent.getAgentHireStatus(this.$route.query.id).then(res => {
        if (res.code === 'K-000000') {
          console.log('res===>', res);
          let relationStateCode = res.context.relationState;
          this.relationStateCode = relationStateCode;
          if (relationStateCode === 0) {
            this.hireStatus = 'Hire';
          } else if (relationStateCode === 1) {
            this.hireStatus = 'Check billings';
          } else if (relationStateCode === 2) {
            this.hireStatus = 'Hire';
          } else if (relationStateCode === 3) {
            this.hireStatus = 'Check billings';
          } else {
            this.hireStatus = 'Hire';
          }
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
p {
  margin: 0;
}
.agent-detail-main {
  padding-top: 140px;
  width: 100%;
  padding-bottom: 177px;
  .agent-detail-content {
    width: 1308px;
    margin: 0 auto;
    .detail-header {
      width: 100%;
      height: 240px;
      padding: 40px 48px 40px 40px;
      box-sizing: border-box;
      border: 1px solid #e0e0e0;
      border-radius: 16px;
      background: url('~@/assets/images/anent-detail-header.png') no-repeat 0 0 / cover;
      .flex();
      justify-content: space-between;
      .agent-header-left {
        .flex();
        justify-content: flex-start;
        .agent-header-img {
          width: 160px;
          height: 160px;
          border-radius: 50%;
          .header-img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
        .agent-info-box {
          margin-left: 40px;
          .agent-icon {
            margin-right: 8px;
          }
          .address-icon {
            transform: translateY(5px);
          }
          .agent-info-name {
            .MoaflyText(600, 48px, 58px, #0f1b43);
          }
          .agent-info-address {
            margin: 13px 0 43px 0;
            .MoaflyText(400, 18px, 22px, #0f1b43);
          }
          .agent-info-tag {
            .MoaflyText(500, 16px, 19px, #dc5674);
          }
        }
      }
      .agent-header-right {
        height: 100%;
        .flex();
        justify-content: flex-end;
        align-items: flex-start;
        .opera-collection {
          margin-right: 24px;
        }
        .opera-box {
          min-width: 150px;
          padding: 3px 3px;
          background: #dc5674;
          border-radius: 25px;
          .MoaflyText(500, 18px, 36px, #ffffff);
          text-align: center;
        }
      }
    }
    .flex-box {
      display: flex;
      .detail-content {
        width: 100%;
        min-height: 896px;
        margin-top: 24px;
        border: 1px solid #e0e0e0;
        border-radius: 16px;
        .flex();
        justify-content: flex-start;
        .detail-content-left {
          width: 326px;
          height: 100%;
          border-right: 1px solid #e0e0e0;
          padding: 24px;
          box-sizing: border-box;
          .agent-title1 {
            .MoaflyText(600, 18px, 22px, #0f1b43);
            margin-bottom: 12px;
          }
          .agent-video {
            width: 274px;
            height: 156px;
            // background: rgba(0, 0, 0, 0.2);
            border-radius: 8px;
            margin-bottom: 24px;
            .video-img {
              width: 100%;
              height: 100%;
            }
          }
          .agent-email {
            margin-bottom: 7px;
            .title {
              .MoaflyText(400, 16px, 19px, #0f1b43);
            }
            .email-text {
              color: #dc5674;
            }
          }
          .agent-license {
            .MoaflyText(400, 16px, 19px, #0f1b43);
            margin-bottom: 24px;
          }
          .agent-languages {
            margin-bottom: 24px;
            .languages {
              .title {
                .MoaflyText(400, 16px, 19px, #0f1b43);
              }
              .language-text {
                color: #0f1b4399;
              }
            }
          }
          .agent-suny {
            .MoaflyText(400, 16px, 19px, #0f1b43);
            margin-bottom: 8px;
          }
          .agent-suny-text {
            .MoaflyText(400, 16px, 19px, rgba(15, 27, 67, 0.6));
            margin-bottom: 24px;
          }
          .agent-address {
            width: 274px;
            height: 156px;
            background: rgba(0, 0, 0, 0.2);
            border-radius: 8px;
          }
        }
        .detail-content-right {
          width: calc(100% - 326px);
          height: 100%;
          .detail-sill {
            width: 100%;
            height: 218px;
            border-bottom: 1px solid #e0e0e0;
            padding: 24px;
            box-sizing: border-box;
            .skills-price {
              width: 100%;
              .flex();
              justify-content: space-between;
              margin-bottom: 16px;
              .title {
                .MoaflyText(600, 24px, 29px, #0f1b43);
              }
            }
            .skills-tags {
              width: 100%;
              .flex();
              justify-content: flex-start;
              .tag-item {
                padding: 4px 9px;
                background: rgba(238, 238, 238, 0.5);
                border-radius: 6px;
                .MoaflyText(500, 16px, 19px, #6a86e7);
                text-align: center;
                margin-right: 8px;
                margin-bottom: 16px;
              }
            }
            .agent-introduction {
              .MoaflyText(600, 24px, 29px, #0f1b43);
              margin-bottom: 12px;
            }
            .agent-introduction-text {
              width: 100%;
              .MoaflyText(400, 18px, 22px, rgba(15, 27, 67, 0.8));
            }
          }
          .detail-most-recent {
            position: relative;
            width: 100%;
            min-height: 617px;
            padding: 24px;
            box-sizing: border-box;
            .empty {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translateX(-50%) translateY(-50%);
            }
            .agent-recent-title {
              .MoaflyText(600, 24px, 29px, #0f1b43);
              margin-bottom: 34px;
            }
            .reviews-box {
              width: 100%;
              .review-item {
                width: 100%;
                min-height: 170px;
                margin-bottom: 46px;
                // border: 1px solid red;
                .review-info {
                  width: 100%;
                  height: 80px;
                  .flex();
                  justify-content: flex-start;
                  align-content: flex-start;
                  margin-bottom: 24px;
                  .review-header {
                    width: 80px;
                    height: 80px;
                    // border: 1px solid red;
                    border-radius: 50%;
                    .header-img {
                      width: 80px;
                      height: 80px;
                      border-radius: 50%;
                    }
                  }
                  .review-name-rate {
                    margin-left: 24px;
                    /deep/.el-rate__text {
                      .MoaflyText(400, 16px, 19px, #373f5f);
                      color: #373f5f !important;
                    }
                    .review-name {
                      .MoaflyText(700, 18px, 22px, #0f1b43);
                      margin-bottom: 16px;
                    }
                    .review-rate {
                      .flex();
                      justify-content: flex-start;
                      align-content: flex-start;
                      .review-time {
                        .MoaflyText(500, 16px, 19px, rgba(15, 27, 67, 0.4));
                        margin-left: 12px;
                      }
                    }
                  }
                }
                .review-text {
                  width: 100%;
                  .MoaflyText(500, 18px, 22px, rgba(15, 27, 67, 0.4));
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
