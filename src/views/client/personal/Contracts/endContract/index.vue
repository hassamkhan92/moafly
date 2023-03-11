<template>
  <div class="end_contract_main">
    <div class="end_contract_content">
      <p><i @click="goBack" class="el-icon-back"></i></p>
      <p class="end_contract_title">End contract</p>
      <div class="end_contrant_agent_info box_info">
        <p class="agent_info_title">Agent</p>
        <p class="agent_info_value">{{ agentName }}</p>
        <p class="agent_info_title">Contract Title</p>
        <p class="agent_info_value">{{ inviteTitle }}</p>
      </div>
      <div class="end_contract_public_feedback box_info">
        <div class="public_feedback_top">
          <p class="public_feedback_name">Public feedback</p>
          <p class="public_feedback_title">This feedback will be shared on your agent’s profile only after they’ve left feedback for <span style="color:#FF9A1C "> Learn more</span></p>
        </div>
        <div class="public_feedback_bottom">
          <div class="feedback_agent_rate_box">
            <p class="feedback_agent_title">Feedback to agent</p>
            <div v-for="(item, idx) in commentList" :key="idx" class="agent_rate_boxc">
              <el-rate :value="item.score" @change="val => handlerRateChange(val, item)" text-color="#ff9900"> </el-rate>
              <p class="feetback_name">{{ item.title }}</p>
            </div>
            <p class="total_score">Total Score: {{ totalScore }}</p>
          </div>
          <!-- 输入框 -->
          <div class="share_agent_community">
            <p class="share_agent_community_title">Share your experience with this agent to Moafly community</p>
            <div class="share_agent_community_input">
              <el-input type="textarea" :rows="4" placeholder="Your comments will be shared publicly" v-model="userComment.evaluateContent"> </el-input>
            </div>
          </div>
        </div>
      </div>
      <div class="end_contrant_action box_info">
        <w-button class="action_btn" width="142px" height="30px" text="End Contract" size="12px" radius="29px" @handleClick="handlerEndContract"></w-button>
        <p @click="goBack" class="btn_cancel">Cancel</p>
      </div>
    </div>
  </div>
</template>

<script>
import WButton from '@/components/Button';
import * as api from '@/api';
export default {
  name: 'end_contract',
  components: {
    WButton
  },
  data() {
    return {
      commentList: [
        {
          title: 'Skills',
          score: 0
        },
        {
          title: 'Quality of Work ',
          score: 0
        },
        {
          title: 'Availability',
          score: 0
        },
        {
          title: 'Adherence to Schedule',
          score: 0
        },
        {
          title: 'Communication',
          score: 0
        },
        {
          title: 'Cooperation',
          score: 0
        }
      ],
      agentName: '',
      inviteTitle: '',
      userComment: {
        customreSalesRelationId: '',
        evaluateContent: '',
        evaluateScore: ''
      }
    };
  },
  mounted() {
    this.customreSalesRelationId = this.$route.query.customreSalesRelationId;
    this.agentName = this.$route.query.agentName;
    this.inviteTitle = this.$route.query.inviteTitle;
  },
  computed: {
    totalScore() {
      return (
        this.commentList.reduce((current, item) => {
          return current + item.score;
        }, 0) / 6
      ).toFixed(2);
    }
  },
  methods: {
    //返回上级页面
    goBack() {
      this.$router.go(-1);
    },
    handlerRateChange(val, item) {
      this.$set(item, 'score', val);
    },
    /** 提交评价 */
    handlerEndContract() {
      if (!this.userComment.evaluateContent || !this.totalScore) {
        return this.$q.notify({
          type: 'warning',
          message: `Please complete the evaluation.`
        });
      }
      let params = {
        customreSalesRelationId: this.customreSalesRelationId,
        evaluateContent: this.userComment.evaluateContent,
        evaluateScore: this.totalScore
      };
      console.log('params===>', params);
      api.hiringHistory.addComment(params).then(res => {
        if (res.code == 'K-000000') {
          this.$q.notify({
            type: 'positive',
            message: `Application is successful`
          });
          this.$router.go(-1);
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.end_contract_main {
  width: 100%;
  padding-top: 80px;
  .end_contract_content {
    max-width: 1200px;
    height: 100%;
    margin: 0 auto;
    padding: 30px 0;
    .el-icon-back {
      font-size: 40px;
    }
    .end_contract_title {
      font-size: 36px;
      font-family: LibreFranklin-SemiBold, LibreFranklin;
      font-weight: 600;
      color: #333333;
      line-height: 44px;
    }
    .box_info {
      width: 100%;
      background: #ffffff;
      border-radius: 4px;
      border: 1px solid #e1e1e1;
      margin-top: 16px;
    }
    .end_contrant_agent_info {
      height: 168px;
      padding: 24px;
      .agent_info_title {
        font-size: 16px;
        font-family: LibreFranklin-SemiBold, LibreFranklin;
        font-weight: 600;
        color: #333333;
        line-height: 19px;
      }
      .agent_info_value {
        font-size: 14px;
        font-family: LibreFranklin-Regular, LibreFranklin;
        font-weight: 400;
        color: #333333;
        line-height: 17px;
      }
    }
    .end_contract_public_feedback {
      height: auto;
      .public_feedback_top {
        height: 108px;
        border-bottom: 1px solid #e1e1e1;
        padding: 24px;
        .public_feedback_name {
          font-size: 24px;
          font-family: LibreFranklin-SemiBold, LibreFranklin;
          font-weight: 600;
          color: #333333;
          line-height: 29px;
        }
        .public_feedback_title {
          font-size: 12px;
          font-family: LibreFranklin-Regular, LibreFranklin;
          font-weight: 400;
          color: #333333;
          line-height: 15px;
        }
      }
      .public_feedback_bottom {
        height: clac(100% - 108px);
        padding: 24px;
        .feedback_agent_rate_box {
          .feedback_agent_title {
            font-size: 16px;
            font-family: LibreFranklin-SemiBold, LibreFranklin;
            font-weight: 600;
            color: #333333;
            line-height: 19px;
          }
          .agent_rate_boxc {
            .flex();
            justify-content: flex-start;
            margin-top: 13px;
            p {
              margin: 0;
            }
            .feetback_name {
              font-size: 14px;
              font-family: LibreFranklin-Regular, LibreFranklin;
              font-weight: 400;
              color: #333333;
              line-height: 17px;
              margin-left: 13px;
            }
          }
          .total_score {
            font-size: 16px;
            font-family: LibreFranklin-SemiBold, LibreFranklin;
            font-weight: 600;
            color: #333333;
            line-height: 19px;
            margin-top: 24px;
          }
        }
        .share_agent_community {
          width: 100%;
          margin-top: 24px;
          .share_agent_community_title {
            font-size: 16px;
            font-family: LibreFranklin-SemiBold, LibreFranklin;
            font-weight: 600;
            color: #333333;
            line-height: 19px;
          }
          ::v-deep.share_agent_community_input {
            width: 100%;
            height: 164px;
            background: #ffffff;
            border-radius: 4px;
            border: 1px solid #999999;
            .el-textarea {
              height: 100%;
              .el-textarea__inner {
                height: 100%;
                border: none;
              }
            }
          }
        }
      }
    }
    .end_contrant_action {
      height: 78px;
      .flex();
      justify-content: flex-start;
      padding: 24px;
      .btn_cancel {
        font-size: 16px;
        font-family: LibreFranklin-SemiBold, LibreFranklin;
        font-weight: 600;
        color: #353f62;
        line-height: 19px;
        margin: 0;
        margin-left: 40px;
      }
    }
  }
}
</style>
